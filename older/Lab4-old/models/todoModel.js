const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoSchema = new Schema({ 
  title: String,
  status: String,
});

const Todo = mongoose.model('Todo', todoSchema);


exports.createTodo = (req, res) => {
  const newTodo = new Todo({
      title: req.body.title,
      status: req.body.status? req.body.status : "to-do",
  });
  newTodo.save((err, todo) => {
      if (err) return res.status(400).send(err);
      res.status(201).json(todo);
  });
};
