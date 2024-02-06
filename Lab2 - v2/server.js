const http = require("http");
const fs = require("fs");
const path = require("path");
const { todosDataPath, readTodos } = require("./database");

const hostname = "localhost";
const port = 3000;

function createHttpServer() {
  // Create HTTP server
  const server = http.createServer((req, res) => {
    // Routing logic
    if (req.url === "/" && req.method === "GET") {
      serveHomePage(res);
    } else if (req.url === "/astronomy" && req.method === "GET") {
      serveAstronomyPage(res);
    } else if (req.url === "/astronomy/image" && req.method === "GET") {
      serveImagePage(res);
    } else {
      serve404Page(res);
    }
  });

  // Start server
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function serveHomePage(res) {
  // Set response content type
  res.setHeader("Content-Type", "text/html");

  // Read todos from database file
  const todosStream = fs.createReadStream(todosDataPath, "utf-8");

  // Serve home page
  res.write(`<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="/style.css"><title>Home Page</title></head><body><h1>TODO List</h1><ul>`);
  todosStream.on("data", (chunk) => {
    const todos = JSON.parse(chunk);
    todos.forEach((todo) => {
      res.write(`<li>${todo.title}</li>`);
    });
  });
  todosStream.on("end", () => {
    res.write(`</ul></body></html>`);
    res.end();
  });
}

function serveAstronomyPage(res) {
  // Set response content type
  res.setHeader("Content-Type", "text/html");

  // Define image source
  const imgSrc = "/astronomy/image";

  // Serve astronomy page
  res.write(`<!DOCTYPE html><html><head><title>Astronomy Page</title></head><body><h1>Astronomy Page</h1><img src="${imgSrc}" alt="Astronomy Image"><p>Wadi El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p></body></html>`);
  res.end();
}

function serveImagePage(res) {
  // Set response content type
  res.setHeader("Content-Type", "image/jpeg");

  // Serve image
  const imagePath = path.join(__dirname, "public", "images", "astronomy_image.jpg");
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
}

function serve404Page(res) {
  // Set status code and response content type
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");

  // Serve 404 page
  const notFoundPagePath = path.join(__dirname, "public", "404", "index.html");
  const notFoundPageStream = fs.createReadStream(notFoundPagePath);
  notFoundPageStream.pipe(res);
}

module.exports = createHttpServer;
