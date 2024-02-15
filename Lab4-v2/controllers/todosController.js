const Todo = require('../models/todo');

// Get a todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get todos by status and/or title or all todos
exports.getFilteredTodos = async (req, res) => {
  try {
    const { status, title } = req.query;
    let query = {};
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };

    const todos = await Todo.find(query);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, status, tags } = req.body;
    const todo = new Todo({
      title,
      status: status || 'to-do',
      tags
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update a todo by ID
exports.updateTodoById = async (req, res) => {
  try {
    const { title, status, tags } = req.body;
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (status) updatedFields.status = status;
    if (tags) updatedFields.tags = tags;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete a todo by ID
exports.deleteTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");
    res.send("Todo deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
