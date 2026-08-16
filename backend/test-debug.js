const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://aaban-87:password321@cluster0.3v5gztm.mongodb.net/shopco?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
});

async function test() {
  try {
    await client.connect();
    console.log("Connected!");
    process.exit(0);
  } catch (e) {
    console.log("Error:", e.message);
    console.log("Error code:", e.code);
    console.log("Error name:", e.name);
    process.exit(1);
  }
}
test();
