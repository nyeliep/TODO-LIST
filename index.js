const todoContainer = document.getElementById('list');
const input = document.getElementById('input');
let todos = [];

const newElement = () => {
  const task = input.value;
  if (task.trim() !== '') {
    const todo = {
      id: Date.now(),
      task,
      completed: false
    };
    todos.push(todo);
    displayTodos();
    input.value = '';
  }
};

const handleCompletionChange = (event, id) => {
  const todo = todos.find(item => item.id === id);
  if (todo) {
    todo.completed = event.target.checked;
    displayTodos();
  }
};

const deleteTodo = (id) => {
  todos = todos.filter(item => item.id !== id);
  displayTodos();
};

const displayTodos = () => {
  todoContainer.innerHTML = '';
  todos.forEach(item => {
    const li = document.createElement('li');
    const todo = document.createElement('span');
    const deleteButton = document.createElement('button');
    todo.textContent = item.task;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(item.id));
    li.appendChild(todo);
    li.appendChild(deleteButton);
    if (item.completed) {
      li.classList.add('completed');
    }
    todoContainer.appendChild(li);
  });
};




// other js

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}