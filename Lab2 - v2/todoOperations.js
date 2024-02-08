// todoOperations.js
const { saveNextTodoId, readTodos, saveTodos } = require('./database');
let { nextTodoId } = require('./database');

function addTodoTask(title) {
  const todos = readTodos();
  console.log(todos);
  const newTask = {
    id: ++nextTodoId,
    title,
    status: 'to-do',
  };

  todos.push(newTask);
  saveTodos(todos); // Save the updated todo list
  saveNextTodoId(nextTodoId); // Save the nextTodoId
  console.log(`To-do Task added: ${newTask.title}`);
  displayDatabaseInfo(todos);
}

function listTodoTasks(status) {
  const todos = readTodos();
  if (!status) {
    console.log('To-Do List:');
    displayDatabaseInfo(todos);
    return;
  }
  if (!(status === 'to-do' || status === 'in-progress' || status === 'done')) {
    console.error('Invalid status. Allowed values: to-do, in-progress, done.');
    return;
  }

  const filteredTodos = todos.filter((task) => task.status === status);
  console.log(`To-Do List with status '${status}':`);
  displayDatabaseInfo(filteredTodos);
}

function editTodoTask(id, options) {
  const todos = readTodos();
  const taskToEdit = findTaskById(Number(id));
  if (!taskToEdit) {
    console.error(`No task found with ID ${id}`);
    return;
  }

  if (!options.title && !options.status) {
    console.error('Specify -t or -s or both to update the task.');
    return;
  }

  if (options.title) {
    taskToEdit.title = options.title;
    console.log(`To-do task with ID ${id} edited: ${taskToEdit.title}`);
  }

  if (options.status) {
    if (['to-do', 'in-progress', 'done'].includes(options.status)) {
      taskToEdit.status = options.status;
      console.log(`To-do task with ID ${id} marked as '${taskToEdit.status}'`);
    } else {
      console.error('Invalid status. Allowed values: to-do, in-progress, done.');
      return;
    }
  }

  saveTodos(todos);
  displayDatabaseInfo(todos);
}

function deleteTodoTask(id) {
  let todos = readTodos();
  const taskToDelete = findTaskById(Number(id));

  // console.log(todos);
  // console.log(taskToDelete);
  // const indexToDelete2 = todos.indexOf(taskToDelete);
  // console.log(indexToDelete2);
  // console.log(todos);
  // console.log(typeof(todos));

  if (!taskToDelete) {
    console.error(`No task found with ID ${id}`);
    return;
  }

  // const indexToDelete = todos.indexOf(taskToDelete);
  // const deletedTask = todos.splice(indexToDelete, 1);

  todos = todos.filter(
      (task) => task.id!== taskToDelete.id,
  );

  saveTodos(todos);

  console.log(`To-do task with ID ${id} deleted`);
  displayDatabaseInfo(todos);
}

function findTaskById(id) {
  const todos = readTodos();
  return todos.find((task) => task.id === id);
}

function displayDatabaseInfo(todosToDisplay) {
  console.log(
    '\n\n---------------------- Start of database information ----------------------\n\n',
  );
  console.log(
    todosToDisplay
      .map((task) => `ID:${task.id},  Title:${task.title},  Status:${task.status}`)
      .join('\n'),
  );
  console.log(
    '\n\n---------------------- End of database information ----------------------',
  );
}

module.exports = {
  addTodoTask, listTodoTasks, editTodoTask, deleteTodoTask,
};
