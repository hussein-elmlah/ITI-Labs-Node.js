
const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todosController');

router.get('/', TodosController.getAllTodos);
router.post('/', TodosController.createTodo);
router.get('/:id', TodosController.getTodoById); // New route to get todo by id
router.patch('/:id', TodosController.updateTodo);
router.delete('/:id', TodosController.deleteTodo);

module.exports = router;
