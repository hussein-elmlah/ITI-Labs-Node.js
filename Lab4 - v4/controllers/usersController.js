const User = require('../models/User');
const CustomError = require('../lib/customError');

exports.createUser = async (body) => {
    const user = await User.create(body)
        .catch((error) => {
            throw new CustomError(`Failed to create user: ${error.message}`, 500);
        });
    return user;
};

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};

exports.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new CustomError(`User not found with id: ${id}`, 404);
    }
    return user;
};

exports.updateUser = async (id, body) => {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
        throw new CustomError(`User not found with id: ${id}`, 404);
    }
    return user;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new CustomError(`User not found with id: ${id}`, 404);
    }
    return user;
};
