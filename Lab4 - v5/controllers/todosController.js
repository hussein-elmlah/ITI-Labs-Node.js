const Todo = require('../models/Todo');
const CustomError = require('../lib/customError');

exports.createTodo = async ({ title, tags, userId }) => {
    try {
        const todo = await Todo.create({ title, tags, userId });
        return todo;
    } catch (error) {
        throw new CustomError(`Failed to create todo: ${error.message}`, 500);
    }
};

exports.updateTodo = async (id, updates) => {
    try {
        const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
        if (!todo) {
            throw new CustomError('Todo not found', 404);
        }
        return todo;
    } catch (error) {
        throw new CustomError(`Failed to update todo: ${error.message}`, 500);
    }
};

exports.deleteTodo = async (id) => {
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            throw new CustomError('Todo not found', 404);
        }
    } catch (error) {
        throw new CustomError(`Failed to delete todo: ${error.message}`, 500);
    }
};

exports.getTodosByUserId = async (userId) => {
    try {
        const todos = await Todo.find({ userId });
        return todos;
    } catch (error) {
        throw new CustomError(`Failed to fetch todos: ${error.message}`, 500);
    }
};

exports.getTodosWithFilters = async (limit = 10, skip = 0, status) => {
    try {
        const query = {};
        if (status) {
            query.status = status;
        }
        const todos = await Todo.find(query).limit(limit).skip(skip);
        return todos;
    } catch (error) {
        throw new CustomError(`Failed to fetch todos: ${error.message}`, 500);
    }
};
