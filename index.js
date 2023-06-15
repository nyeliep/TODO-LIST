const myTodo = document.getElementById('myUL');

const fetchTodos = async () => {
  try {
    const response = await fetch('https://dummyjson.com/todos');
    if (!response.ok) {
      throw new Error('Error fetching todos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const displayTodos = async () => {
  try {
    const todosResponse = await fetchTodos();
    console.log(JSON.stringify(todosResponse));

    if (Array.isArray(todosResponse.todos)) {
      const todos = todosResponse.todos;
      todos.forEach((todo, index) => {
        const listItem = createTodoItem(todo, index);
        myTodo.appendChild(listItem);
      });
    } else {
      console.error("Error displaying todos: Invalid response structure");
    }
  } catch (error) {
    console.error("Error displaying todos:", error);
  }
};

const createTodoItem = (todo, index) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${index}: ${JSON.stringify(todo)}`;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button')
  removeButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(removeButton);

  return listItem;
};

displayTodos();

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (var j = 0; j < close.length; j++) {
  close[j].addEventListener("click", function() {
    var div = this.parentElement;
    div.remove();
  });
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
  var li = createTodoItem(document.getElementById("myInput").value, 0);
  if (li.textContent === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var close = li.getElementsByClassName("close");
  close[0].addEventListener("click", function() {
    var div = this.parentElement;
    div.remove();
  });
}

