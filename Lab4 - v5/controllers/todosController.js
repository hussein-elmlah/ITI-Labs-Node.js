const Todo = require("../models/Todo");
const CustomError = require("../lib/customError");

exports.createTodo = async ({ title, tags, userId }) => {
  try {
    const todo = await Todo.create({ title, tags, userId });
    return todo;
  } catch (error) {
    throw new CustomError(`Failed to create todo: ${error.message}`, error.status);
  }
};

exports.updateTodo = async (id, updates) => {
  try {
    const todo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      throw new CustomError("Todo not found", 404);
    }
    return todo;
  } catch (error) {
    // Check if the error is a CastError
    if (error.name === "CastError") {
      // Handle the CastError, such as returning a custom error message
      throw new CustomError("Invalid ID format", 400); // Bad Request
    } else {
      // Throw other errors
      throw new CustomError(`Failed to update todo: ${error.message}`, error.status);
    }
  }
};

exports.deleteTodo = async (id) => {
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      throw new CustomError("Todo not found", 404);
    }
  } catch (error) {
    throw new CustomError(`Failed to delete todo: ${error.message}`, error.status);
  }
};

exports.getTodosWithFilters = async (limit = 10, skip = 0, status) => {
    if (skip < 0) {
        skip = 0;
    }
    if (limit < 0 || limit > 10) {
        limit = 10;
    }
  try {
    const query = {};
    if (status) {
      query.status = status;
    }
    const todos = await Todo.find(query).limit(limit).skip(skip);
    return todos;
  } catch (error) {
    throw new CustomError(`Failed to fetch todos: ${error.message}`, error.status);
  }
};
  