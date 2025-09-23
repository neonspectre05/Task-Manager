let tasks = [];
let currentFilter = 'all';

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const filteredTasks = getFilteredTasks();
    
    taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'task-item completed' : 'task-item';
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
    
    updateTaskCount();
}

function getFilteredTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function showAll() {
    currentFilter = 'all';
    renderTasks();
}

function showActive() {
    currentFilter = 'active';
    renderTasks();
}

function showCompleted() {
    currentFilter = 'completed';
    renderTasks();
}

function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    document.getElementById('taskCount').textContent = `${activeTasks} tasks remaining`;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

// Allow adding tasks with Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Theme functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
}

// Load theme on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    renderTasks();
});
