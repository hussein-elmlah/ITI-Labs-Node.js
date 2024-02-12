const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 5, maxlength: 20 },
  status: { type: String, default: 'to-do', enum: ['to-do', 'in-progress', 'done'] },
  tags: [{ type: String, maxlength: 10 }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
