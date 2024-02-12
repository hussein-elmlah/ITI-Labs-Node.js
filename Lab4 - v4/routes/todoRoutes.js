const express = require('express');
const router = express.Router();
const asyncWrapper = require('../lib/async-wrapper');
const TodosController = require('../controllers/todosController');
const CustomError = require('../lib/customError');

// GET /todos
router.get('/', async (req, res, next) => {
  const [err, todos] = await asyncWrapper(TodosController.getAllTodos());
  if (err) {
    return next(new CustomError('Error getting todos', 400));
  }
  res.json(todos);
});

// POST /todos
router.post('/', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.createTodo(req.body));
  if (err) {
    return next(new CustomError('Error creating todo', 400));
  }
  res.status(201).json(todo);
});

// PATCH /todos/:id
router.patch('/:id', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.updateTodo(req.params.id, req.body));
  if (err) {
    return next(new CustomError('Error updating todo', 400));
  }
  res.json(todo);
});

// DELETE /todos/:id
router.delete('/:id', async (req, res, next) => {
  const [err, data] = await asyncWrapper(TodosController.deleteTodo(req.params.id));
  if (err) {
    return next(new CustomError('Error deleting todo', 400));
  }
  res.sendStatus(204);
});

module.exports = router;
