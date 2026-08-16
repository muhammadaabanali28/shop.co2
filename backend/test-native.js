const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });

async function test() {
  try {
    await client.connect();
    console.log("Connected!");
    const dbs = await client.db().admin().listDatabases();
    console.log("Databases:", dbs.databases.map(d => d.name));
    process.exit(0);
  } catch (e) {
    console.log("Error:", e.message);
    process.exit(1);
  }
}
test();
