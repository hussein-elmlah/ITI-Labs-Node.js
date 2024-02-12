const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Routes
router.post("/", usersController.registerUser);
router.get("/", usersController.getRegisteredUsers);
router.delete("/:id", usersController.deleteUserById);
router.patch("/:id", usersController.editUserById);

module.exports = router;
