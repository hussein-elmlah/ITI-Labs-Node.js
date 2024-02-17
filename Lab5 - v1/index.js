const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/todosDB";

// Connect to MongoDB database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Middlewares
app.use(express.json());
app.use(cors());

// Define route handling middleware for specific paths.
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// Route handling middleware for handling all unmatched routes with a 404 response.
app.use("*", (req, res) => {
  res.status(404).send("Not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status).send(`Something broke! \n ${err.message}`);
});

// Error handling for uncaught exceptions
process.on("uncaughtException", function (err) {
  console.log("Uncaught exception occurred:", err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
