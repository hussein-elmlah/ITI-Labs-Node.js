// controllers/todosController.js

const Todo = require('../models/Todo');
const CustomError = require('../lib/customError');

exports.getAllTodos = async () => {
  try {
    const todos = await Todo.find();
    return todos;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

exports.createTodo = async (todoData) => {
  try {
    const todo = await Todo.create(todoData);
    return todo;
  } catch (error) {
    throw new CustomError(error.message, 422);
  }
};

exports.updateTodo = async (todoId, updatedData) => {
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, updatedData, { new: true });
    if (!todo) {
      throw new CustomError('Todo not found', 404);
    }
    return todo;
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};

exports.deleteTodo = async (todoId) => {
  try {
    const acknowledge = await Todo.deleteOne({ _id: todoId });
    if (acknowledge.deletedCount === 0) {
      throw new CustomError('Todo not found', 404);
    }
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};
