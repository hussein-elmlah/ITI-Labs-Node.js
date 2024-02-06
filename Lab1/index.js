"use strict";
const fs = require("fs");
const { program } = require("commander");
const path = require("path");

// Database connection
const currentFilePath = __filename;
const currentDirectory = path.dirname(currentFilePath);
const todosDataPath = path.join(
  currentDirectory,
  "databases",
  "todosDB",
  "todos.json"
);

let todos = JSON.parse(fs.readFileSync(todosDataPath, "utf8"));

// Get last id
const todosMetadataPath = path.join(
  currentDirectory,
  "databases",
  "todosDB",
  "todos.metadata.json"
);

let todosMetadata = JSON.parse(fs.readFileSync(todosMetadataPath, "utf8"));
let idCounter = todosMetadata[0].counter;

// Function to save to 'todos' database
function saveTodoList(todosToSave) {
  fs.writeFileSync(todosDataPath, JSON.stringify(todosToSave, null, 2));
}

// Function to save idCounter to 'todos.metadata.json'
function saveCounter(idCounterToSave) {
  todosMetadata[0].counter = idCounterToSave;
  fs.writeFileSync(todosMetadataPath, JSON.stringify(todosMetadata, null, 2));
}

// Function to show database information
function showDatabase(todosToShow) {
    console.log(
      "\n\n---------------------- Start of database information ----------------------\n\n"
    );
  
    todosToShow.forEach((task) => {
      console.log(`ID:${task.id},  Title:${task.title},  Status:${task.status}`);
    });
  
    console.log(
      "\n\n---------------------- End of database information ----------------------"
    );
  }
  

//================================================================

// Command to add task 
program
  .command("add")
  .description("Add a to-do Task")
  .requiredOption("-t, --title <string>", "title of the Task")
  .action((options) => {
    const newTask = {
      id: ++idCounter,
      title: options.title,
      status: "to-do",
    };

    todos.push(newTask);
    saveTodoList(todos);
    saveCounter(idCounter);
    console.log(`To-do Task added: ${newTask.title}`);
    showDatabase(todos);
  });

//================================================================

// Command to list tasks
program
  .command("list")
  .description("List all todos")
  .option(
    "-s, --status <string>",
    "Filter entries by status [to-do, in-progress, done]"
  )
  .action((options) => {
    if (!(options.status === "to-do" || options.status === "in-progress" || options.status === "done")) {
      showDatabase(todos);
    } else {
      const filteredTodos = todos.filter(
        (task) => task.status === options.status
      );
      console.log(`To-Do List with status '${options.status}':`);
      showDatabase(filteredTodos);
    }
  });




//================================================================

// Function to find entry by ID
function findEntryById(id) {
    return todos.find((entry) => entry.id === id);
  }
  
  // Command to edit tasks
  program
    .command("edit <id>")
    .description("Edit a to-do entry by ID")
    .option("-t, --title <string>", "New title for the entry")
    .option("-s, --status <string>", "New status for the entry")
    .action((id, options) => {
      const entryToEdit = findEntryById(Number(id));
      if (!entryToEdit) {
        console.error(`No entry found with ID ${id}`);
        return;
      }
  
      if (!options.title && !options.status) {
        console.error("Specify -t or -s or both to update the entry.");
        return;
      }
  
      if (options.title) {
        entryToEdit.title = options.title;
        console.log(`To-do entry with ID ${id} edited: ${entryToEdit.title}`);
      }
      if (options.status) {
        entryToEdit.status = options.status;
        console.log(
          `To-do entry with ID ${id} marked as '${entryToEdit.status}'`
        );
      }
      saveTodoList(todos);
      showDatabase(todos);
    });
  
// Command to delete tasks
program
  .command("delete <id>")
  .description("Delete a to-do entry by ID")
  .action((id) => {
    const indexToDelete = todos.findIndex((entry) => entry.id === Number(id));

    if (indexToDelete === -1) {
      console.error(`No entry found with ID ${id}`);
      return;
    }

    const deletedEntry = todos.splice(indexToDelete, 1)[0];
    saveTodoList(todos);

    console.log(`To-do entry with ID ${id} deleted: ${deletedEntry.title}`);
    showDatabase(todos);
  });



//================================================================

// Parse command line arguments
program.parse(process.argv);

//================================================================
