$(document).ready(function () {
  const $list = $('#ft_list');

  function renderList() {
    $list.empty();
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.reverse().forEach((todo, index) => {
      const $item = $('<div class="todo"></div>').text(todo);
      $item.on('click', function () {
        if (confirm('Delete this task?')) {
          todos.splice(todos.length - 1 - index, 1); // because reversed
          localStorage.setItem('todos', JSON.stringify(todos));
          renderList();
        }
      });
      $list.append($item);
    });
  }

  $('#new-btn').on('click', function () {
    const task = prompt('Enter new TODO:');
    if (task && task.trim() !== '') {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]');
      todos.push(task.trim());
      localStorage.setItem('todos', JSON.stringify(todos));
      renderList();
    }
  });

  renderList(); // Initial load
});
