const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 8 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 15 },
  dob: { type: Date },
  password: { type: String, required: true, minlength: 8 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
