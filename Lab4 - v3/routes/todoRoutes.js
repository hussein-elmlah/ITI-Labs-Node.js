const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todosController');

// GET /todos
router.get('/', TodosController.getAllTodos);

// POST /todos
router.post('/', TodosController.createTodo);

// PATCH /todos/:id
router.patch('/:id', TodosController.updateTodo);

// DELETE /todos/:id
router.delete('/:id', TodosController.deleteTodo);

module.exports = router;
