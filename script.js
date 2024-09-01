document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-button');
  const clearButton = document.getElementById('clear-button');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  addButton.addEventListener('click', addTodo);
  clearButton.addEventListener('click', clearAll);

  function addTodo() {
    if (todoInput.value.trim() === '') {
      return; // Prevent adding empty todo items
    }

    const newTodo = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function () {
      newTodo.classList.toggle('completed');
      saveTodoListToLocalStorage(); // Update the saved todo list when the checkbox is clicked
    };

    newTodo.appendChild(checkbox);
    const todoText = document.createTextNode(todoInput.value);
    newTodo.appendChild(todoText);

    newTodo.classList.add('todo-item');
    todoList.appendChild(newTodo);
    todoInput.value = '';

    saveTodoListToLocalStorage(); // Save the updated todo list after adding a new item
  }

  function saveTodoListToLocalStorage() {
    const todoListHtml = todoList.innerHTML;
    localStorage.setItem('todoList', todoListHtml);
  }

  function clearAll() {
    todoList.innerHTML = ''; // Clear the HTML content of the todo list
    localStorage.removeItem('todoList'); // Remove the saved todo list from localStorage
  }

  // Load saved todo list from localStorage on page load
  const savedTodoList = localStorage.getItem('todoList');
  if (savedTodoList) {
    todoList.innerHTML = savedTodoList;
  }
});
