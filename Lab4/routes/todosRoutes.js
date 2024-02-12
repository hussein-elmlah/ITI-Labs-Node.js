const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

// Routes
router.get("/", todosController.getFilteredTodos);
router.get("/:id", todosController.getTodoById);
router.post("/", todosController.createTodo);
router.patch("/:id", todosController.updateTodoById);
router.delete("/:id", todosController.deleteTodoById);

module.exports = router;
