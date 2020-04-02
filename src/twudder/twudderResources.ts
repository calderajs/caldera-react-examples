import { MooAccount } from "./Account";
import { MooType } from "./Moo";
import { SharedResource } from "caldera";
import { Client } from "pg";

type Listener = () => void;

const createTablesQuery = `
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

const addMooQuery = `
  INSERT INTO moos (username, body, tags, mentions)
  VALUES ($1, $2, $3, $4);`;

const createMooTrigger = `
  BEGIN;

  CREATE OR REPLACE FUNCTION notify_moo ()
  RETURNS trigger AS $$
    DECLARE
      new_moo   record;
    BEGIN
      SELECT 
        row_to_json(a.*) AS moo_account, 
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

const addAccountQuery = `
  INSERT INTO accounts (username, password, name)
  VALUES ($1, $2, $3)
  ON CONFLICT (username) DO UPDATE SET
    username = EXCLUDED.username,
    password = EXCLUDED.password,
    name = EXCLUDED.name`;

const createAccountTrigger = `
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

// Currently not in use - should run it to clean up database if not wanted
const cleanupScript = `
  BEGIN;
  DROP TRIGGER IF EXISTS moo_changed ON moos;
  DROP FUNCTION IF EXISTS notify_moo;
  DROP TRIGGER IF EXISTS account_added ON accounts;
  DROP FUNCTION IF EXISTS notify_accounts;
  DROP TABLE IF EXISTS moos;
  DROP TABLE IF EXISTS accounts;
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
    account: parsedPayload.moo_account,
    text: parsedPayload.body,
    tags: parsedPayload.tags,
    mentions: parsedPayload.mentions
  };
};

const parseAccountPayload = (payload: string): MooAccount => {
  return JSON.parse(payload);
};

export const makeMooResource = (
  initialValue: MooType[]
): SharedResource<MooType[]> => {
  let currValue: MooType[] = initialValue;
  const listeners: Set<Listener> = new Set();

  client.on("notification", msg => {
    if (msg.channel !== "moo") return;
    console.log(`Notification on ${msg.channel} with payload ${msg.payload}`);
    const parsedPayload = msg.payload;
    if (parsedPayload) {
      currValue.push(parseMooPayload(parsedPayload));
      listeners.forEach(listener => listener());
    }
  });

  return {
    getValue: () => currValue,
    addListener: (listener: Listener) => listeners.add(listener),
    removeListener: (listener: Listener) => listeners.delete(listener),
    updateListeners: (newValue: MooType[]) => {
      newValue.map(newMoo =>
        client.query(
          addMooQuery,
          [newMoo.account.username, newMoo.text, newMoo.tags, newMoo.mentions],
          handleErrorsFor("addMooQuery")
        )
      );
    }
  };
};

export const makeAccountsResource = (
  initialValue: Map<string, MooAccount>
): SharedResource<Map<string, MooAccount>> => {
  let currValue: Map<string, MooAccount> = initialValue;
  const listeners: Set<Listener> = new Set();

  client.on("notification", msg => {
    if (msg.channel !== "new_account") return;
    console.log(`Notification on ${msg.channel} with payload ${msg.payload}`);
    const payload = msg.payload;
    if (payload) {
      const parsedPayload = parseAccountPayload(payload);
      currValue.set(parsedPayload.username, parsedPayload);
      listeners.forEach(listener => listener());
    }
  });

  return {
    getValue: () => currValue,
    addListener: (listener: Listener) => listeners.add(listener),
    removeListener: (listener: Listener) => listeners.delete(listener),
    updateListeners: (newValue: Map<string, MooAccount>) => {
      newValue.forEach(value =>
        client.query(
          addAccountQuery,
          [value.username, value.password, value.name],
          handleErrorsFor("addAccountQuery")
        )
      );
    }
  };
};

const setupDatabase = () => {
  client.connect(handleErrorsFor("connect"));
  client.query(createTablesQuery, handleErrorsFor("createTablesQuery"));

  client.query(createMooTrigger, handleErrorsFor("createMooTrigger"));
  client.query("LISTEN moo", handleErrorsFor("listen for moo"));

  client.query(createAccountTrigger, handleErrorsFor("createAccountTrigger"));
  client.query("LISTEN new_account", handleErrorsFor("listen for new account"));
};

const client = new Client({
  user: "twudder-client",
  host: "localhost",
  database: "twudder",
  port: 5432
});
setupDatabase();
