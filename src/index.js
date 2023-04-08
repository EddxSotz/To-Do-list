import './style.css';

const tasks = [
  { description: "Do laundry", completed: false, index: 1 },
  { description: "Buy groceries", completed: true, index: 2 },
  { description: "Clean room", completed: false, index: 3 }
];

function renderTaskList() {
  const taskListElement = document.getElementById("task-list");

  // Sort tasks by index value
  tasks.sort((a, b) => a.index - b.index);

  // Clear existing list items
  taskListElement.innerHTML = "";

  // Create a new list item for each task
  tasks.forEach(task => {
    const listItemElement = document.createElement("li");
    listItemElement.textContent = task.description;
    if (task.completed) {
      listItemElement.classList.add("completed");
    }
    taskListElement.appendChild(listItemElement);
  });
}

// Render task list on page load
renderTaskList();