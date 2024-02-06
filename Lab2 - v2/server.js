const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

function createHttpServer() {
  const server = http.createServer((req, res) => {
    if (req.method === "GET") {
      if (req.url === "/") {
        serveTodoList(req, res);
      } else if (req.url === "/astronomy") {
        serveAstronomyPage(req, res);
      } else {
        serveNotFoundPage(res);
      }
    } else {
      serveNotFoundPage(res);
    }
  });

  server.listen(port, hostname, (error) => {
    if (error) {
      console.error("Error starting the server:", error.message);
    } else {
      console.log(`Server running at http://${hostname}:${port}/`);
    }
  });
}

function serveTodoList(req, res) {
  res.setHeader("Content-Type", "text/html");

  const todosPath = path.join(__dirname, "todos.json");
  const stylePath = path.join(__dirname, "style.css");

  if (!fs.existsSync(todosPath)) {
    res.write("<body><h1>Empty ToDo List</h1></body>");
    return res.end();
  }

  const todosStream = fs.createReadStream(todosPath, "utf-8");
  const styleStream = fs.createReadStream(stylePath, "utf-8");

  let todos = "";
  todosStream.on("data", (chunk) => {
    todos += chunk;
  });

  let style = "";
  styleStream.on("data", (chunk) => {
    style += chunk;
  });

  todosStream.on("end", () => {
    res.write("<body> <ul>");
    todos = JSON.parse(todos);
    todos.forEach((todo) => {
      res.write(`<li>${todo.text}</li>`);
    });
    res.write("</ul>");
    styleStream.on("end", () => {
      res.write(`<style>${style}</style></body>`);
      return res.end();
    });
  });
}

function serveAstronomyPage(req, res) {
  const imgSrc =
    "https://media.cnn.com/api/v1/images/stellar/prod/200505225212-04-fossils-and-climate-change-museum.jpg?q=x_0,y_0,h_1125,w_1999,c_fill/h_720,w_1280";
  res.setHeader("Content-Type", "text/html");
  res.write(`<body><div><img src="${imgSrc}"></div></body>`);
  res.write(
    "<p>Wati El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p>"
  );
  return res.end();
}

function serveNotFoundPage(res) {
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>404: Page Not Found</h1>");
  return res.end();
}

module.exports = createHttpServer;
