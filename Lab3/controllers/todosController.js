// controllers/todosController.js

const { saveTodosCounter, readTodos, saveTodos } = require("../database");
let { todosCounter } = require("../database");


// Get a todo by ID
exports.getTodoById = (req, res) => {
  const todos = readTodos();
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
};

// Get todos by status and/or title or all todos
exports.getFilteredTodos = (req, res) => {
  const { status, title } = req.query;

  // Validate other query parameters
  const invalidParams = Object.keys(req.query).filter(
    (param) => param !== "status" && param !== "title"
  );
  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid parameter(s): ${invalidParams.join(", ")}`,
    });
  }

  // Read todos from the database
  let filteredTodos = readTodos();

  // Filter todos based on status if provided
  if (status) {
    if (!["to-do", "in-progress", "done"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Allowed values: to-do, in-progress, done",
      });
    }
    filteredTodos = filteredTodos.filter((todo) => todo.status === status);
  }

  // Filter todos based on title if provided
  if (title) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.title.toLowerCase() === title.toLowerCase()
    );
  }

  res.json(filteredTodos);
};

// Create a new todo
exports.createTodo = (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: ++todosCounter,
    title: req.body.title,
    status: req.body.status ? req.body.status : "to-do",
  };
  todos.push(newTodo);
  saveTodos(todos);
  saveTodosCounter(todosCounter); // Save the todosCounter
  res.status(201).json(newTodo);
};

// Delete a todo by ID
exports.deleteTodoById = (req, res) => {
  const todos = readTodos();
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  if (todoIndex === -1) return res.status(404).send("Todo not found");
  todos.splice(todoIndex, 1);
  saveTodos(todos);
  res.send("Todo deleted");
};

// Update a todo by ID
exports.updateTodoById = (req, res) => {
  const todos = readTodos();
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("Todo not found");
  }

  if (req.body.id && req.body.id !== todo.id) {
    return res.status(400).send("You do not have permission to update ID");
  }

  if (req.body.status) {
    if (["to-do", "in-progress", "done"].includes(req.body.status)) {
      todo.status = req.body.status;
    } else {
      return res.status(400).send("Invalid status value");
    }
  }

  if (req.body.title) {
    todo.title = req.body.title;
  }

  saveTodos(todos);
  res.json(todo);
};