const http = require("http");
const fs = require("fs");
const path = require("path");
const { todosDataPath } = require("./database");

const hostname = "localhost";
const port = 3000;

function createHttpServer() {
  const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      serveHomePage(res);
    } else if (req.url === "/astronomy" && req.method === "GET") {
      serveAstronomyPage(res);
    } else if (req.url === "/astronomy/image" && req.method === "GET") {
      serveStaticFile(res, path.join(__dirname, "public", "images", "astronomy_image.jpg"), "image/jpeg");
    } else {
      serve404Page(res);
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function serveHomePage(res) {
  res.setHeader("Content-Type", "text/html");

  const todosStream = fs.createReadStream(todosDataPath, "utf-8");  

  res.write(`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/home-style.css">
  <title>Home Page</title>
</head>
<body>
  <h1>TODO List</h1>
  <ul>`);

  todosStream.on("data", (chunk) => {
    const todos = JSON.parse(chunk);
    todos.forEach((todo) => {
      res.write(`<li>${todo.title}</li>`);
    });
  });

  todosStream.on("end", () => {
    res.write(`</ul>
</body>
</html>`);
    res.end();
  });
}

function serveAstronomyPage(res) {
  res.setHeader("Content-Type", "text/html");

  const imgSrc = "/astronomy/image";

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

function serveStaticFile(res, filePath, contentType) {
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (err) => {
    console.error(`Error reading file ${filePath}:`, err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  res.writeHead(200, { 'Content-Type': contentType });
  fileStream.pipe(res);
}

function serve404Page(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");

  const notFoundPagePath = path.join(__dirname, "public", "404", "index.html");
  serveStaticFile(res, notFoundPagePath, "text/html");
}

module.exports = createHttpServer;
