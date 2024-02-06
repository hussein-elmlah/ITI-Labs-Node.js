// server.js
const http = require("http");

const hostname = "localhost";
const port = 3000;

function createHttpServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/todos' && req.method === "GET") {
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
      )
    }
  })

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = createHttpServer;

// Start the HTTP server
// createHttpServer();
