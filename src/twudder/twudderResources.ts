import { MooAccount } from "./Account";
import { MooType } from "./Moo";
import { SharedResource, makeSharedResource, useSharedReducer } from "caldera";
import { Client } from "pg";
import sql from "sql-template-tag";

const createTablesQuery = sql`
  BEGIN;

  CREATE TABLE IF NOT EXISTS accounts (
    username text PRIMARY KEY,
    name text,
    pw_hash text, 
    created_at timestamp DEFAULT now()
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
    body: row.body,
    tags: row.tags,
    mentions: row.mentions,
  };
};

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
  database: process.env.PG_DATABASE ?? "twudder",
});

let moos: SharedResource<MooType[]>;

export const setupDatabase = async () => {
  await client.connect();
  await client.query(createTablesQuery);
  await client.query(createMooTrigger);
  await client.query(sql`LISTEN moo`);

  const [{ pg_backend_id: sessionPID }] = (
    await client.query<{ pg_backend_id: number }>(sql`select pg_backend_pid()`)
  ).rows;

  moos = makeSharedResource(
    (
      await client.query<MooRow>(
        sql`
      SELECT
      ${MOO_FIELDS} 
      ORDER by moos.created_at ASC;
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
};

export const useMoos = () =>
  useSharedReducer(async (prevMoos, toInsert: MooType) => {
    const {
      account: { username },
      body,
      tags,
      mentions,
    } = toInsert;
    const [insertedMoo] = (
      await client.query<MooRow>(
        sql`INSERT into moos (username, body, tags, mentions)
            VALUES (${username}, ${body}, ${tags}, ${mentions})
            RETURNING ${MOO_FIELDS}`
      )
    ).rows;
    return [...prevMoos, rowToMooObject(insertedMoo)];
  }, moos);

export const createAccount = async (details: MooAccount, password: string) => {
  await client.query(
    sql`INSERT INTO accounts (username, name, pw_hash) 
        VALUES (${details.username}, ${details.name}, crypt(${password}, gen_salt('md5')))`
  );
};

export const authenticate = async (username: string, password: string) => {
  const { rows } = await client.query<MooAccount>(
    sql`SELECT username, name 
        FROM accounts
        WHERE username = ${username} and pw_hash = crypt(${password}, pw_hash)`
  );
  return rows.length === 1 ? rows[0] : undefined;
};

export const doesUsernameExist = async (username: string) => {
  const [res] = (
    await client.query<{ exists: boolean }>(
      sql`SELECT EXISTS (SELECT 1 FROM accounts WHERE username = ${username})`
    )
  ).rows;
  return res.exists;
};
