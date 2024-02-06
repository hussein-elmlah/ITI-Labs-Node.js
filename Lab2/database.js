// database.js
const fs = require("fs");
const path = require("path");

const todosDataPath = path.join(__dirname, "databases", "todosDB", "todos.json");

function readTodos() {
  return JSON.parse(fs.readFileSync(todosDataPath, "utf8"));
}

function saveTodos(todosToSave) {
  fs.writeFileSync(todosDataPath, JSON.stringify(todosToSave, null, 2));
}

module.exports = { readTodos, saveTodos };
