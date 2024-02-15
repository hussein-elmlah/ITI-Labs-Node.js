const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todosController');

router.post('/', async (req, res) => {
  try {
    const todo = await todoController.createTodo(req.body, req.user);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const todo = await todoController.updateTodo(req.params.id, req.body);
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await todoController.deleteTodo(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const todos = await todoController.getUserTodos(req.params.userId);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { limit, skip, status } = req.query;
    const todos = await todoController.getFilteredTodos(limit, skip, status);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
