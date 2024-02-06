// Import necessary modules
const http = require("http"); // For creating HTTP server
const fs = require("fs"); // For file system operations
const path = require("path"); // For working with file paths
const { todosDataPath } = require("./database"); // Import function to read todos

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
      // Serve the image page
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
  res.write("<h1>TODO List</h1>");
  res.write("<ul>");

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
    res.write("</ul>");
    res.end();
  });
}

// Function to serve the astronomy page
function serveAstronomyPage(res) {
  // Set the content type of the response to HTML
  res.setHeader("Content-Type", "text/html");

  // Write HTML content to display the astronomy page
  res.write(
    `<h1>Astronomy Page</h1><img src="/astronomy/image" alt="Astronomy Image">`
  );
  res.write(
    "<p>Wadi El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p>"
  );

  // End the response
  res.end();
}

// Function to serve the image page
function serveImagePage(res) {
  // Set the content type of the response to image/jpeg
  res.setHeader("Content-Type", "image/jpeg");

  // Read the image file and pipe it to the response
  const imagePath = path.join(__dirname, "astronomy_image.jpg");
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
}

// Function to serve the 404 page
function serve404Page(res) {
  // Set the status code to 404
  res.statusCode = 404;

  // Set the content type of the response to HTML
  res.setHeader("Content-Type", "text/html");

  // Write HTML content for the 404 page
  res.write("<h1>404 Page Not Found</h1>");

  // End the response
  res.end();
}

// Export the function to create the HTTP server
module.exports = createHttpServer;
