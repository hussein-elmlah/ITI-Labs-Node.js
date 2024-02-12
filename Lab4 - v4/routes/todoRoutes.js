// routes/todosRoutes.js

const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todosController');
const asyncWrapper = require('../lib/async-wrapper');

router.get('/', async (req, res) => {
  const todos = await asyncWrapper(TodosController.getAllTodos());
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = await asyncWrapper(TodosController.createTodo(req.body));
  res.status(201).json(todo);
});

router.patch('/:id', async (req, res) => {
  const todo = await asyncWrapper(TodosController.updateTodo(req.params.id, req.body));
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await asyncWrapper(TodosController.deleteTodo(req.params.id));
  res.sendStatus(204);
});

module.exports = router;
