let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <input type="checkbox" class="form-check-input" ${task.done ? 'checked' : ''}
          onchange="toggleTask(${index})">
        <span style="${task.done ? 'text-decoration:line-through; color:#aaa;' : ''}">${task.text}</span>
      </div>
      <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${index})">✕</button>
    `;
    list.appendChild(li);
  });

  document.getElementById('taskCount').textContent = `${tasks.length} task(s)`;
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  renderTasks();
}

// Allow Enter key to add task
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  document.getElementById('taskInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
  });
});