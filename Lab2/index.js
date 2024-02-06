// app.js
const appServer = require("./server");
const program = require("./commands");

// Start the HTTP server
appServer();

// Parse command line arguments
program.parse(process.argv);
