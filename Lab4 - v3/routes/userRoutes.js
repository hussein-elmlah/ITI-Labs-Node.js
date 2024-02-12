const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

// POST /users
router.post('/', UsersController.createUser);

// GET /users
router.get('/', UsersController.getAllUsers);

// DELETE /users/:id
router.delete('/:id', UsersController.deleteUser);

// PATCH /users/:id
router.patch('/:id', UsersController.updateUser);

module.exports = router;
