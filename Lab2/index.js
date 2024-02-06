// app.js
const myServer = require("./server");
const program = require("./commands");

// Start the HTTP server
// myServer();

// Parse command line arguments
program.parse(process.argv);
