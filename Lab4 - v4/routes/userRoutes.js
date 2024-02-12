const express = require('express');
const router = express.Router();
const asyncWrapper = require('../lib/async-wrapper');
const UsersController = require('../controllers/usersController');
const CustomError = require('../lib/customError');

// POST /users
router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createUser(req.body));
  if (err) {
    return next(new CustomError('Error creating user', 400));
  }
  res.status(201).json(user);
});

// GET /users
router.get('/', async (req, res, next) => {
  const [err, users] = await asyncWrapper(UsersController.getAllUsers());
  if (err) {
    return next(new CustomError('Error getting users', 400));
  }
  res.json(users);
});

// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  const [err, data] = await asyncWrapper(UsersController.deleteUser(req.params.id));
  if (err) {
    return next(new CustomError('Error deleting user', 400));
  }
  res.sendStatus(204);
});

// PATCH /users/:id
router.patch('/:id', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.updateUser(req.params.id, req.body));
  if (err) {
    return next(new CustomError('Error updating user', 400));
  }
  res.json(user);
});

module.exports = router;
