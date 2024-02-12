const Todo = require('../models/Todo');
const CustomError = require('../lib/customError');

exports.createTodo = async (body) => {
    const todo = await Todo.create(body)
        .catch((error) => {
            throw new CustomError(`Failed to create todo: ${error.message}`, 500);
        });
    return todo;
};

exports.getAllTodos = async () => {
    const todos = await Todo.find();
    return todos;
};

exports.getTodoById = async (id) => {
    const todo = await Todo.findById(id);
    if (!todo) {
        throw new CustomError(`Todo not found with id: ${id}`, 404);
    }
    return todo;
};

exports.updateTodo = async (id, body) => {
    const todo = await Todo.findByIdAndUpdate(id, body, { new: true });
    if (!todo) {
        throw new CustomError(`Todo not found with id: ${id}`, 404);
    }
    return todo;
};

exports.deleteTodo = async (id) => {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        throw new CustomError(`Todo not found with id: ${id}`, 404);
    }
    return todo;
};
