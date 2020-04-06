import { MooAccount } from "./Account";
import { MooType } from "./Moo";
import { SharedResource } from "caldera";
import { Client } from "pg";
import sql from "sql-template-tag";

type Listener = () => void;

const createTablesQuery = sql`
  BEGIN;

  CREATE TABLE IF NOT EXISTS accounts (
    username text PRIMARY KEY, 
    password text, 
    name text);
  
  CREATE TABLE IF NOT EXISTS moos ( 
    username text references accounts (username), 
    body text, 
    tags text[], 
    mentions text[]);

  COMMIT;
`;

const createMooTrigger = sql`
  BEGIN;

  CREATE OR REPLACE FUNCTION notify_moo ()
  RETURNS trigger AS $$
    DECLARE
      new_moo   record;
    BEGIN
      SELECT 
        row_to_json(a.*) AS account, 
        NEW.body, 
        NEW.tags, 
        NEW.mentions
      INTO new_moo
      FROM accounts a WHERE a.username = NEW.username;
      
      PERFORM pg_notify(
        'moo',
        row_to_json(new_moo)::text
      );

      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS moo_changed ON moos;

  CREATE TRIGGER moo_changed AFTER INSERT OR UPDATE ON moos 
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

const parseMooPayload = (payload: string): MooType => {
  const parsedPayload = JSON.parse(payload);
  return {
    account: parsedPayload.account,
    text: parsedPayload.body,
    tags: parsedPayload.tags,
    mentions: parsedPayload.mentions,
  };
};

const parseAccountPayload = (payload: string): MooAccount => {
  return JSON.parse(payload);
};

const makeMooResource = (
  initialValue: MooType[]
): SharedResource<MooType[]> => {
  let currValue: MooType[] = initialValue;
  const listeners: Set<Listener> = new Set();

  client.query(
    sql`
      WITH rows AS (
        SELECT 
          row_to_json(a.*) AS account, 
          m.body, 
          m.tags, 
          m.mentions
        FROM accounts a JOIN moos m
        ON a.username = m.username
      )
      SELECT row_to_json(rows)::text FROM rows`,
    (err, result) => {
      if (err) handleErrorsFor("getMoosQuery")(err);
      currValue = currValue.concat(
        result.rows.map((value) => parseMooPayload(value.row_to_json))
      );
      listeners.forEach((listener) => listener());
    }
  );

  client.on("notification", (msg) => {
    if (msg.channel !== "moo") return;
    console.log(`Notification on ${msg.channel} with payload ${msg.payload}`);
    const parsedPayload = msg.payload;
    if (parsedPayload) {
      currValue.push(parseMooPayload(parsedPayload));
      listeners.forEach((listener) => listener());
    }
  });

  return {
    getValue: () => currValue,
    addListener: (listener) => listeners.add(listener),
    removeListener: (listener) => listeners.delete(listener),
    updateListeners: (newValue) => {
      newValue.map((newMoo) =>
        client.query(
          sql`INSERT INTO moos (username, body, tags, mentions)
            VALUES (${newMoo.account.username}, ${newMoo.text}, ${newMoo.tags}, ${newMoo.mentions});`,
          handleErrorsFor("addMooQuery")
        )
      );
    },
  };
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

export let resources: {
  moos: ReturnType<typeof makeMooResource>;
  accounts: ReturnType<typeof makeAccountsResource>;
};

export const setupDatabase = async () => {
  await client.connect();
  await client.query(createTablesQuery);
  await client.query(createMooTrigger);
  await client.query(sql`LISTEN moo`);

  await client.query(createAccountTrigger);
  await client.query(sql`LISTEN new_account`);

  resources.moos = makeMooResource([]);
  resources.accounts = makeAccountsResource(new Map<string, MooAccount>());
};
