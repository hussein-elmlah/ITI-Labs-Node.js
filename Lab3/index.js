const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { todosDataPath } = require("./database");
const todoRouter = require("./routes/todoRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());



app.use('/todos', todoRouter);

// Serve static files (Assuming your Angular build is in the frontend/dist directory)
// app.use(express.static(__dirname + '/frontend/dist'));

// Handle undefined routes - serve the Angular app for any other route
app.get("*", (req, res) => {
  const notFoundPagePath = path.join(__dirname, "public", "404", "index.html");
  res.status(404).sendFile(notFoundPagePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
