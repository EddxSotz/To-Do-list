import './style.css';
import clearCompleted from './tasks.js';

const form = document.getElementById('input_form');
const addItemInput = document.getElementById('AddToList');
const clearCompletedButton = document.getElementById('clear_completed');
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
    description,
    completed: false,
    index: todoList.length,
  };
  // Add the new task to the array
  todoList.push(newTask);
  // Save the updated To-Do List in local storage
  saveList();
  // eslint-disable-next-line no-use-before-define
  renderList();
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
  // eslint-disable-next-line no-use-before-define
  renderList();
}

// Function to edit the description of a task in the To-Do List
function editTaskDescription(index, newDescription) {
  // Update the description of the task with the given index
  todoList[index].description = newDescription;
  // Save the updated To-Do List in local storage
  saveList();
  // eslint-disable-next-line no-use-before-define
  renderList();
}

// Function to render the To-Do List on the web page
function renderList() {
  const listContainer = document.getElementById('list-container');
  // Clear the list container
  listContainer.innerHTML = '';
  // Iterate over the To-Do List array and create an HTML list item for each task
  todoList.forEach((task) => {
    const listItem = document.createElement('li');
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button_container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check_box';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveList();
    });

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'edit_list_input';

    // Create delete button for deleting list element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.index);
      renderList();
    });

    // Create save button for changing list item description
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none';

    // Create input element when edit button is pressed
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', () => {
      editButton.style.display = 'none';
      saveButton.style.display = '';
      inputElement.focus();
      inputElement.value = task.description;
      descriptionSpan.replaceWith(inputElement);
    });

    saveButton.addEventListener('click', () => {
      saveButton.style.display = 'none';
      editButton.style.display = '';
      editTaskDescription(task.index, inputElement.value);
      task.description = inputElement.value;
      inputElement.replaceWith(descriptionSpan);
      renderList();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(deleteButton);
    listItem.appendChild(buttonContainer);
    listContainer.appendChild(listItem);
  });
}

// Call the renderList() function to display the To-Do List on page load
renderList();

form.addEventListener('submit', () => {
  addTask(addItemInput.value);
  renderList();
});

clearCompletedButton.addEventListener('click', () => {
  todoList = clearCompleted(todoList);
  saveList();
  renderList();
});
