const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const asyncWrapper = require('../lib/async-wrapper');

// POST /users
router.post('/', asyncWrapper(async (req, res) => {
  const user = await UsersController.createUser(req.body);
  res.status(201).json(user);
}));

// GET /users
router.get('/', asyncWrapper(async (req, res) => {
  const users = await UsersController.getAllUsers();
  res.json(users.map(user => user.firstName));
}));

// DELETE /users/:id
router.delete('/:id', asyncWrapper(async (req, res) => {
  await UsersController.deleteUser(req.params.id);
  res.sendStatus(204);
}));

// PATCH /users/:id
router.patch('/:id', asyncWrapper(async (req, res) => {
  const updatedUser = await UsersController.updateUser(req.params.id, req.body);
  res.json({ user: updatedUser });
}));

module.exports = router;
