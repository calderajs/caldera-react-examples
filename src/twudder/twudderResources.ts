import { MooAccount } from "./Account";
import { MooType } from "./Moo";
import { SharedResource, makeSharedResource, useSharedReducer } from "caldera";
import { Client } from "pg";
import sql from "sql-template-tag";

type Listener = VoidFunction;

const createTablesQuery = sql`
  BEGIN;

  CREATE TABLE IF NOT EXISTS accounts (
    username text PRIMARY KEY, 
    password text, 
    salt text,
    name text,
    created_at text DEFAULT now()
  );
  
  CREATE TABLE IF NOT EXISTS moos ( 
    id serial PRIMARY KEY,
    username text REFERENCES accounts (username), 
    body text, 
    tags text[], 
    mentions text[],
    created_at timestamp DEFAULT now()
  );

  COMMIT;
`;

const createMooTrigger = sql`
  BEGIN;

  CREATE OR REPLACE FUNCTION notify_moo()
  RETURNS trigger AS $$
    BEGIN      
      PERFORM pg_notify(
        'moo',
        NEW.id
      );

      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS moo_inserted ON moos;

  CREATE TRIGGER moo_inserted AFTER INSERT ON moos 
  FOR EACH ROW EXECUTE PROCEDURE notify_moo();

  COMMIT;
`;

const createAccountTrigger = sql`
  BEGIN;

  CREATE OR REPLACE FUNCTION notify_accounts ()
  RETURNS trigger AS $$
    BEGIN
      PERFORM pg_notify(
        'new_account',
        row_to_json(NEW)::text
      );

      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS account_added ON accounts;

  CREATE TRIGGER account_added AFTER INSERT OR UPDATE ON accounts 
  FOR EACH ROW EXECUTE PROCEDURE notify_accounts();

  COMMIT;
`;

const handleErrorsFor = (caller: string) => (err: Error) => {
  if (err) {
    console.log(`ERROR: on ${caller}`);
    throw err;
  }
};

const MOO_FIELDS = sql`
    id,
    body,
    tags,
    mentions,
    username as account_username,
    name as account_name
  FROM moos
  JOIN accounts ON accounts.username = moos.username
`;

type MooRow = {
  id: number;
  body: string;
  tags: string[];
  mentions: string[];
  account_username: string;
  account_name: string;
};

const rowToMooObject = (row: MooRow): MooType => {
  return {
    account: {
      username: row.account_username,
      name: row.account_name,
    },
    text: row.body,
    tags: row.tags,
    mentions: row.mentions,
  };
};

const parseAccountPayload = (payload: string): MooAccount => {
  return JSON.parse(payload);
};

const makeAccountsResource = (
  initialValue: Map<string, MooAccount>
): SharedResource<Map<string, MooAccount>> => {
  let currValue: Map<string, MooAccount> = initialValue;
  const listeners: Set<Listener> = new Set();

  client.query(
    sql`SELECT row_to_json(accounts)::text FROM accounts`,
    (err, result) => {
      if (err) handleErrorsFor("getAccountsQuery")(err);
      result.rows.map((value) => {
        const account = parseAccountPayload(value.row_to_json);
        currValue.set(account.username, account);
      });
      listeners.forEach((listener) => listener());
    }
  );

  client.on("notification", (msg) => {
    if (msg.channel !== "new_account") return;
    console.log(`Notification on ${msg.channel} with payload ${msg.payload}`);
    const payload = msg.payload;
    if (payload) {
      const parsedPayload = parseAccountPayload(payload);
      currValue.set(parsedPayload.username, parsedPayload);
      listeners.forEach((listener) => listener());
    }
  });

  return {
    getValue: () => currValue,
    addListener: (listener) => listeners.add(listener),
    removeListener: (listener) => listeners.delete(listener),
    updateListeners: (newValue) => {
      newValue.forEach((value) =>
        client.query(
          sql`INSERT INTO accounts (username, password, name)
            VALUES (${value.username}, ${value.password}, ${value.name})
            ON CONFLICT (username) DO UPDATE SET
              username = EXCLUDED.username,
              password = EXCLUDED.password,
              name = EXCLUDED.name`,
          handleErrorsFor("addAccountQuery")
        )
      );
    },
  };
};

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
  database: process.env.PG_DATABASE ?? "twudder",
});

let moos: SharedResource<MooType[]>;
let resources: {
  accounts: ReturnType<typeof makeAccountsResource>;
} = {} as any;

export const setupDatabase = async () => {
  await client.connect();
  await client.query(createTablesQuery);
  await client.query(createMooTrigger);
  await client.query(sql`LISTEN moo`);

  await client.query(createAccountTrigger);
  await client.query(sql`LISTEN new_account`);

  const [{ pg_backend_id: sessionPID }] = (
    await client.query<{ pg_backend_id: number }>(sql`select pg_backend_pid()`)
  ).rows;

  moos = makeSharedResource(
    (
      await client.query<MooRow>(
        sql`
      SELECT
      ${MOO_FIELDS} 
      ORDER by moos.created_at DESC;
    `
      )
    ).rows.map(rowToMooObject)
  );

  client.on("notification", async (msg) => {
    if (msg.channel !== "moo" || msg.processId === sessionPID) return;

    console.log(`Notification on ${msg.channel} with payload ${msg.payload}`);
    const payload = msg.payload;

    if (payload) {
      const [insertedMoo] = (
        await client.query<MooRow>(
          sql`SELECT ${MOO_FIELDS} WHERE id = ${parseInt(payload)}`
        )
      ).rows;
      const currentValue = moos.getValue();
      moos.updateListeners([...currentValue, rowToMooObject(insertedMoo)]);
    }
  });

  resources = {
    accounts: makeAccountsResource(new Map<string, MooAccount>()),
  };
};

export const useMoo = () =>
  useSharedReducer((prevMoos, toInsert) => {
    return prevMoos;
  }, moos);
