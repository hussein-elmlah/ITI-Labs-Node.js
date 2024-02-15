const User = require('../models/user');

// Register a user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName, dob } = req.body;
    const user = new User({
      username,
      password,
      firstName,
      lastName,
      dob
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get first names of registered users
exports.getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Edit a user by ID
exports.editUserById = async (req, res) => {
  try {
    const { username, password, firstName, lastName, dob } = req.body;
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (dob) updatedFields.dob = dob;

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
