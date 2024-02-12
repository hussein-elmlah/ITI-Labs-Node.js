const User = require('../models/User');

class UsersController {
  static async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: `Failed to create user: ${error.message}` });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: `Failed to get users: ${error.message}` });
    }
  }

  static async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: `Failed to delete user: ${error.message}` });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: `Failed to update user: ${error.message}` });
    }
  }
}

module.exports = UsersController;
