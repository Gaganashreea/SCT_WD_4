const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task');
const deadlineInput = document.getElementById('deadline');

let tasks = [];
let editingTaskId = null;  


function formatDateTime(dateTime) {
    if (!dateTime) return 'No deadline';

    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true  
    });

    return `${formattedDate} ${formattedTime}`;
}


function saveTask() {
    const taskText = newTaskInput.value.trim();  
    const deadline = deadlineInput.value;

    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    if (editingTaskId) {
        
        tasks = tasks.map(task => {
            if (task.id === editingTaskId) {
                return {
                    ...task,
                    text: taskText,
                    deadline: formatDateTime(deadline)
                };
            }
            return task;
        });
        editingTaskId = null;  
    } else {
        
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            deadline: formatDateTime(deadline)
        };
        tasks.push(task);
    }

    renderTasks();
    resetForm();
}


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task ${task.completed ? 'completed' : ''}`;

        const taskContent = `
            <span>${task.text} (Due: ${task.deadline})</span>
            <div class="task-actions">
                <button onclick="completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
            </div>
        `;
        li.innerHTML = taskContent;
        taskList.appendChild(li);
    });
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
}


function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        newTaskInput.value = task.text;
        deadlineInput.value = task.deadline;
        editingTaskId = id;  
        addTaskBtn.textContent = 'Update Task';  
    }
}

function resetForm() {
    newTaskInput.value = '';
    deadlineInput.value = '';
    addTaskBtn.textContent = 'Add Task'; 
}


addTaskBtn.addEventListener('click', saveTask);




