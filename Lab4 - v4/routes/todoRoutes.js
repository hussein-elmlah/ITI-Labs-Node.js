// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const TodosController = require("../controllers/todosController");
const asyncWrapper = require("../lib/async-wrapper");
const CustomError = require("../lib/customError");

router.post("/", async (req, res, next) => {
  const [err, todo] = await asyncWrapper(
    TodosController.createTodo(req.body, req.userId)
  );
  if (err) {
    return next(new CustomError("Error creating todo", 400));
  }
  res.status(201).json(todo);
});

router.patch("/:id", async (req, res, next) => {
  const [err, todo] = await asyncWrapper(
    TodosController.updateTodo(req.params.id, req.body)
  );
  if (err) {
    return next(new CustomError("Error updating todo", 400));
  }
  res.json({ todo });
});

router.delete("/:id", async (req, res, next) => {
  const [err] = await asyncWrapper(TodosController.deleteTodo(req.params.id));
  if (err) {
    return next(new CustomError("Error deleting todo", 400));
  }
  res.sendStatus(204);
});

router.get("/users/:userId/todos", async (req, res, next) => {
  const [err, todos] = await asyncWrapper(
    TodosController.getTodosByUserId(req.params.userId)
  );
  if (err) {
    return next(new CustomError("Error getting todos", 400));
  }
  res.json(todos);
});

router.get("/", async (req, res, next) => {
  const { limit = 10, skip = 0, status = "" } = req.query;
  const [err, todos] = await asyncWrapper(
    TodosController.getTodosWithFilters(limit, skip, status)
  );
  if (err) {
    return next(new CustomError("Error getting todos", 400));
  }
  res.json(todos);
});

module.exports = router;
