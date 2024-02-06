const TodosModel = require('../models/todos');

const getAll = () => {
  const todos = TodosModel.getAll();
  return todos;
};

module.exports = {
  getAll,
};
