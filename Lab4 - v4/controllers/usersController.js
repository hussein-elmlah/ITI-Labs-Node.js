// controllers/usersController.js

const User = require('../models/User');
const CustomError = require('../lib/customError');

exports.createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new CustomError(error.message, 422);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find({}, { firstName: 1, _id: 0 });
    return users;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

exports.deleteUser = async (userId) => {
  try {
    const acknowledge = await User.deleteOne({ _id: userId });
    if (acknowledge.deletedCount === 0) {
      throw new CustomError('User not found', 404);
    }
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};

exports.updateUser = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};
