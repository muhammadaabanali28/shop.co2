const fs = require("fs");
const content = fs.readFileSync(".env", "utf8");
console.log("Raw .env content:");
console.log(JSON.stringify(content));
const match = content.match(/MONGO_URI=(.*)/);
if (match) {
  console.log("\nMONGO_URI value:", match[1].trim());
} else {
  console.log("MONGO_URI not found");
}
