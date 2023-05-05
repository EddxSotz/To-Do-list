import './style.css';

const form = document.getElementById('input_form');
const addItemInput = document.getElementById('AddToList');

// Define the To-Do List array
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Function to save the To-Do List in local storage
function saveList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Function to add a new task to the To-Do List
function addTask(description) {
  // Create a new task object with default values
  const newTask = {
    description: description,
    completed: false,
    index: todoList.length
  };
  // Add the new task to the array
  todoList.push(newTask);
  // Save the updated To-Do List in local storage
  saveList();
}

// Function to delete a task from the To-Do List
function deleteTask(index) {
  // Remove the task with the given index from the array
  todoList.splice(index, 1);
  // Update the indexes of all remaining tasks
  todoList.forEach((task, i) => {
    task.index = i;
  });
  // Save the updated To-Do List in local storage
  saveList();
}

// Function to edit the description of a task in the To-Do List
function editTaskDescription(index, newDescription) {
  // Update the description of the task with the given index
  todoList[index].description = newDescription;
  // Save the updated To-Do List in local storage
  saveList();
}

// Function to render the To-Do List on the web page
function renderList() {
  const listContainer = document.getElementById('list-container');
  // Clear the list container
  listContainer.innerHTML = '';
  // Iterate over the To-Do List array and create an HTML list item for each task
  todoList.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => {
      task.completed = checkbox.checked;
      saveList();
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.index);
      renderList();
    });
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;
    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);
  });
}

// Call the renderList() function to display the To-Do List on page load
renderList();

form.addEventListener('submit', () => {
  addTask(addItemInput.value);
  renderList();
});
