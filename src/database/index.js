import { MongoClient } from "mongodb";
import assert from "assert";

// Database Name
const dbName = "myproject";

// Use connect method to connect to the server
MongoClient.connect(process.env.MONGO_URL, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
