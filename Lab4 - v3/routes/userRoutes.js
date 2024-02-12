
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

router.post('/', UsersController.createUser);
router.get('/', UsersController.getAllUsers);
router.delete('/:id', UsersController.deleteUser);
router.patch('/:id', UsersController.updateUser);

module.exports = router;
