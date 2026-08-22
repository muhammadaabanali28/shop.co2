const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

const readJSON = (filename) => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeJSON = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
