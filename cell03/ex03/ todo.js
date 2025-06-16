const ftList = document.getElementById('ft_list');

function saveTasks() {
  const tasks = [];
  ftList.querySelectorAll('.todo').forEach(div => {
    tasks.push(div.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/";
}

function loadTasks() {
  const match = document.cookie.match(/(^|;) ?todos=([^;]*)(;|$)/);
  if (match) {
    try {
      const tasks = JSON.parse(decodeURIComponent(match[2]));
      tasks.reverse().forEach(task => addTask(task, false));
    } catch (e) {
      console.error('Error parsing saved tasks');
    }
  }
}

function addTask(taskText, save = true) {
  const div = document.createElement('div');
  div.className = 'todo';
  div.textContent = taskText;
  div.addEventListener('click', () => {
    if (confirm('Do you want to delete this TO DO?')) {
      div.remove();
      saveTasks();
    }
  });
  ftList.insertBefore(div, ftList.firstChild);
  if (save) saveTasks();
}

document.getElementById('new-btn').addEventListener('click', () => {
  const task = prompt('Enter a new TO DO:');
  if (task && task.trim() !== '') {
    addTask(task.trim());
  }
});

// Load saved tasks on startup
window.onload = loadTasks;
