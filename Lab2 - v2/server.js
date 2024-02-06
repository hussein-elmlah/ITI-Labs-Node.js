// Import necessary modules
const http = require("http"); // For creating HTTP server
const fs = require("fs"); // For file system operations
const path = require("path"); // For working with file paths
const { todosDataPath, readTodos } = require("./database"); // Import function to read todos

// Define hostname and port for the server
const hostname = "localhost";
const port = 3000;

// Function to create and start the HTTP server
function createHttpServer() {
  // Create an HTTP server instance
  const server = http.createServer((req, res) => {
    // Handle requests for the root ("/") path
    if (req.url === "/" && req.method === "GET") {
      // Serve the home page
      serveHomePage(res);
    } else if (req.url === "/astronomy" && req.method === "GET") {
      // Serve the astronomy page
      serveAstronomyPage(res);
    } else if (req.url === "/astronomy/image" && req.method === "GET") {
      // Serve the astronomy image
      serveImagePage(res);
    } else {
      // If the requested path is unknown, serve a 404 page
      serve404Page(res);
    }
  });

  // Start the server to listen for incoming requests
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

// Function to serve the home page
function serveHomePage(res) {
  // Set the content type of the response to HTML
  res.setHeader("Content-Type", "text/html");

  // Read todos from the database file
  const todosStream = fs.createReadStream(todosDataPath, "utf-8");

  // Write HTML content to display the todo list
  res.write(`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/home-style.css"> <!-- Link to home-style.css -->
  <title>Home Page</title>
</head>
<body>
  <h1>TODO List</h1>
  <ul>`);

  // Read todos data stream
  todosStream.on("data", (chunk) => {
    const todos = JSON.parse(chunk);
    todos.forEach((todo) => {
      // Write each todo as a list item
      res.write(`<li>${todo.title}</li>`);
    });
  });

  // When all data is read, close the list and end the response
  todosStream.on("end", () => {
    res.write(`</ul>
</body>
</html>`);
    res.end();
  });
}

// Function to serve the astronomy page
function serveAstronomyPage(res) {
  // Set the content type of the response to HTML
  res.setHeader("Content-Type", "text/html");

  // Define the path to the astronomy image
  const imgSrc = "/astronomy/image";

  // Write HTML content to display the astronomy page
  res.write(`<!DOCTYPE html>
<html>
<head>
  <title>Astronomy Page</title>
</head>
<body>
  <h1>Astronomy Page</h1>
  <img src="${imgSrc}" alt="Astronomy Image">
  <p>Wadi El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p>
</body>
</html>`);
  res.end();
}

// Function to serve the astronomy image
function serveImagePage(res) {
  // Set the content type of the response to image/jpeg
  res.setHeader("Content-Type", "image/jpeg");

  // Read the image file and pipe it to the response
  const imagePath = path.join(__dirname, "public", "images", "astronomy_image.jpg");
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
}

// Function to serve the 404 page
function serve404Page(res) {
  // Set the status code to 404
  res.statusCode = 404;

  // Set the content type of the response to HTML
  res.setHeader("Content-Type", "text/html");

  // Read the index.html file for the 404 page and serve it
  const notFoundPagePath = path.join(__dirname, "public", "404", "index.html");
  const notFoundPageStream = fs.createReadStream(notFoundPagePath);

  // Pipe the content of the 404 page to the response
  notFoundPageStream.pipe(res);
}

// Export the function to create the HTTP server
module.exports = createHttpServer;
