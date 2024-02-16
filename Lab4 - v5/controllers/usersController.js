// controllers/userController.js
const User = require("../models/User");
const CustomError = require("../lib/customError");

exports.createUser = async (body) => {
  const user = await User.create(body).
  catch((error) => {
    return new CustomError(`Failed to create user: ${error.message}`, 500);
  });
  return user;
};

exports.getUsersFirstName = async () => {
  const users = await User.find({}, "firstName").catch((error) => {
    return new CustomError(`Failed to get users: ${error.message}`, 500);
  });
  return users;
};

exports.deleteUser = async (id) => {
  await User.findByIdAndDelete(id).catch((error) => {
    return new CustomError(`Failed to delete user: ${error.message}`, 500);
  });
};

exports.updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, { new: true }).catch(
    (error) => {
      return new CustomError(`Failed to update user: ${error.message}`, 500);
    }
  );
  return user;
};
