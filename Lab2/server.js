// server.js
const http = require("http");

const hostname = "localhost";
const port = 3000;

function createHttpServer() {
  const server = http.createServer((req, res) => {
    if (req.url === "/todos" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `
        <html>
        <body>
        <h1>Hello World!</h1>
        </body>
        </html>
        `
      );
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

module.exports = createHttpServer;
