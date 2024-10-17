// DOM Elements
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const taskNameInput = document.getElementById("task-name");
const taskDateInput = document.getElementById("task-date");
const taskCategoryInput = document.getElementById("task-category");
const filterButtons = document.querySelectorAll(".filter-btn");

// Retrieve tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Event Listener for Adding Tasks
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTask(taskNameInput.value, taskDateInput.value, taskCategoryInput.value);
    todoForm.reset();
});

// Add Task Function
function addTask(name, date, category) {
    const task = {
        id: Date.now(),
        name,
        date,
        category,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

// Save Tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks Function
function renderTasks(filter = "all") {
    todoList.innerHTML = "";
    tasks
        .filter(task => filter === "all" || task.category === filter)
        .forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <span>${task.name} - ${task.date} (${task.category})</span>
                <div>
                    <button onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>`;
            todoList.appendChild(li);
        });
}

// Toggle Task Completion
function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Filter Tasks by Category
filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        renderTasks(this.dataset.filter);
    });
});

// Initial Render
renderTasks();
