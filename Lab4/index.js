const express = require("express");
const mongoose = require("mongoose");

// Routes
const todoRouter = require("./routes/todosRoutes");
const userRouter = require("./routes/usersRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todosDB", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/todos", todoRouter);
app.use("/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
