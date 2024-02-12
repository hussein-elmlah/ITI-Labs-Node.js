// routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const asyncWrapper = require('../lib/async-wrapper');

router.post('/', async (req, res) => {
  const user = await asyncWrapper(UsersController.createUser(req.body));
  res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await asyncWrapper(UsersController.getAllUsers());
  res.json(users);
});

router.delete('/:id', async (req, res) => {
  await asyncWrapper(UsersController.deleteUser(req.params.id));
  res.sendStatus(204);
});

router.patch('/:id', async (req, res) => {
  const user = await asyncWrapper(UsersController.updateUser(req.params.id, req.body));
  res.json({ user });
});

module.exports = router;
