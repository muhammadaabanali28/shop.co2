const mongoose = require("mongoose");

const uri = "mongodb+srv://aaban-87:password321@cluster0.3v5gztm.mongodb.net/shopco?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => { console.log("Connected!"); process.exit(0); })
  .catch(e => { console.log("Error:", e.message); process.exit(1); });

setTimeout(() => { console.log("Timeout!"); process.exit(1); }, 15000);
