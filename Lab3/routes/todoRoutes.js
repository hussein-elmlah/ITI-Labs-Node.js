const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get('/', function(req, res) {
    serveHomePage(res)
});
router.get('/:id', function(req, res) {
    // console.log(req.params.id)
    serveHomePage(res)
});

//================================================================================================================================
//================================================================================================================================

function serveHomePage(res) {
  res.setHeader("Content-Type", "text/html");
  const todosDataPath = path.join(
    __dirname,
    '..',
    'databases',
    'todosDB',
    'todos.json',
  );
  const todosStream = fs.createReadStream(todosDataPath, "utf-8");
  todosStream.on("error", (error) => {
    console.error("An error occurred while reading the file:", error);
  });

  res.write(`<!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/home-style.css">
    <title>Home Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>
  <body class = "bg-dark text-light">
    <h1>TODO List</h1>
    <ol class="list-group list-group-numbered">
  `);

  todosStream.on("data", (chunk) => {
    const todos = JSON.parse(chunk);
    todos.forEach((todo) => {
      res.write(`<li class="list-group-item">${todo.title}</li>`);
    });
  });

  todosStream.on("end", () => {
    res.write(`</ol>
  </body>
  </html>`);
    res.end();
  });
}


//================================================================================================================================
//================================================================================================================================

/*  
// commands.js
const { program } = require('commander');
const {
  addTodoTask,
  listTodoTasks,
  editTodoTask,
  deleteTodoTask,
} = require('./todoOperations');

program
  .command('add')
  .description('Add a to-do Task')
  .requiredOption('-t, --title <string>', 'Title of the Task')
  .action((options) => {
    addTodoTask(options.title);
  });

program
  .command('list')
  .description('List all todos')
  .option(
    '-s, --status <string>',
    'Filter entries by status [to-do, in-progress, done]',
  )
  .action((options) => {
    listTodoTasks(options.status);
  });

program
  .command('edit <id>')
  .description('Edit a to-do entry by ID')
  .option('-t, --title <string>', 'New title for the entry')
  .option('-s, --status <string>', 'New status for the entry')
  .action((id, options) => {
    editTodoTask(Number(id), options);
  });

program
  .command('delete <id>')
  .description('Delete a to-do entry by ID')
  .action((id) => {
    deleteTodoTask(Number(id));
  });

// New command to start the server
program
  .command('runServer')
  .description('Start the HTTP server')
  .action(() => {
    const appServer = require('./server');
    appServer();
  });

*/
//================================================================================================================================
//================================================================================================================================

module.exports = router;