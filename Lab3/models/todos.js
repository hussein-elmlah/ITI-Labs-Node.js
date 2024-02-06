const fs = require('fs');

const getAll = () => {
  const todos = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
  return todos;
};

module.exports = {
  getAll,
};
