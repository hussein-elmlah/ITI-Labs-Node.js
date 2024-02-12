// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const asyncWrapper = require("../lib/async-wrapper");
const CustomError = require("../lib/customError");

router.post("/", async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createUser(req.body));
  if (err) {
    return next(new CustomError("Error creating user", 400));
  }
  res.status(201).json(user);
});

router.get("/", async (req, res, next) => {
  const [err, users] = await asyncWrapper(UsersController.getUsersFirstName());
  if (err) {
    return next(new CustomError("Error getting users", 400));
  }
  res.json(users);
});

router.delete("/:id", async (req, res, next) => {
  const [err] = await asyncWrapper(UsersController.deleteUser(req.params.id));
  if (err) {
    return next(new CustomError("Error deleting user", 400));
  }
  res.sendStatus(204);
});

router.patch("/:id", async (req, res, next) => {
  const [err, user] = await asyncWrapper(
    UsersController.updateUser(req.params.id, req.body)
  );
  if (err) {
    return next(new CustomError("Error updating user", 400));
  }
  res.json({ user });
});

module.exports = router;
