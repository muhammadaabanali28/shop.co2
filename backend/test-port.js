const net = require("net");
const s = net.connect(27017, "ac-7n3sp9s-shard-00-00.3v5gztm.mongodb.net", () => {
  console.log("Port 27017 Connected!");
  s.end();
});
s.on("error", e => console.log("Error:", e.message));
setTimeout(() => { console.log("Timeout"); process.exit(1); }, 10000);
