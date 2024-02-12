const Todo = require('../models/Todo');

class TodosController {
  static async getAllTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: `Failed to get todos: ${error.message}` });
    }
  }

  static async createTodo(req, res) {
    try {
      const todo = await Todo.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: `Failed to create todo: ${error.message}` });
    }
  }

  static async updateTodo(req, res) {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: `Failed to update todo: ${error.message}` });
    }
  }

  static async deleteTodo(req, res) {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: `Failed to delete todo: ${error.message}` });
    }
  }
}

module.exports = TodosController;
