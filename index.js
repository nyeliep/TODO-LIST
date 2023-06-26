const myTodo = document.getElementById('myUL');
const addBtn = document.querySelector('.addBtn');

const fetchTodos = async () => {
  try {
    const response = await fetch('https://dummyjson.com/todos?limit=4');
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
  
    if (Array.isArray(todosResponse.todos)) {
      const todos = todosResponse.todos;
      todos.forEach((todo, index) => {
        const listItem = createTodoItem(todo);
        myTodo.appendChild(listItem);
      });
    } else {
      console.error("Error displaying todos: Invalid response structure");
    }
  } catch (error) {
    console.error("Error displaying todos:", error);
  }
};

const createTodoItem = (todo) => {
  const listItem = document.createElement('li');
  listItem.classList.add('todo-item'); 
   
  const label= document.createElement('label');
  label.textContent = `${todo.todo} (Completed: ${todo.completed})`
  label.classList.add('todo-label'); 

  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  checkbox.addEventListener('change', async (event) => {
    todo.completed = event.target.checked;
    label.textContent = `${todo.todo} (Completed: ${todo.completed})`;
    await updateTodo(todo.id, todo.completed);
  });

  listItem.appendChild(checkbox);

  checkbox.appendChild(document.createTextNode(`${todo.todo}`));
  
  listItem.appendChild(label);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', () => {
    deleteTodo(todo.id);
    listItem.remove();
  });

  listItem.appendChild(removeButton);

  return listItem;
};
 
// adding new todos
const newElement = async () => {
  try {
    const input = document.getElementById('myInput');
    const todoTitle = input.value;

    const result = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo: todoTitle,
        completed: false,
        userId: 5
      })
    })
      .then(response => response.json())
      .catch(error => error.message);

    if (result.id) {
      const listItem = createTodoItem(result);
      myTodo.appendChild(listItem);
      input.value = '';
      console.log('Added todo:', result);
    } else {
      console.error('Error adding todo:', result.message);
    }
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

// updating todos
const updateTodo = (todoId, completed) => {
  fetch(`https://dummyjson.com/todos/${todoId}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      completed: completed,
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error updating todo:', error));
};


// deleting todos
const deleteTodo = (todoId) => {
  fetch(`https://dummyjson.com/todos/${todoId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error deleting todo:', error));
};

displayTodos();

addBtn.addEventListener('click', newElement);








// addBtn.addEventListener('click', newElement);


// const createTodoItem = (todo, index) => {
//   const listItem = document.createElement('li');
//   listItem.textContent = `${index}: ${JSON.stringify(todo)}`;

//   const removeButton = document.createElement('button');
//   removeButton.textContent = 'Remove';
//   removeButton.classList.add('remove-button')
//   removeButton.addEventListener('click', () => {
//     listItem.remove();
//   });

//   listItem.appendChild(removeButton);

//   return listItem;
// };

// displayTodos();

// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// for (var j = 0; j < close.length; j++) {
//   close[j].addEventListener("click", function() {
//     var div = this.parentElement;
//     div.remove();
//   });
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = createTodoItem(document.getElementById("myInput").value, 0);
//   if (li.textContent === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var close = li.getElementsByClassName("close");
//   close[0].addEventListener("click", function() {
//     var div = this.parentElement;
//     div.remove();
//   });
// }

