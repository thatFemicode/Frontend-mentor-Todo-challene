'use strict';

window.addEventListener('load', function () {
  todos.forEach((t) => {
    newTodo(t.value, t.checked);
    countCompleted();
  });
});
// Function to change theme
const themeChanger = document.querySelector('.tgl-btn');
let topImg = document.querySelector('.top-img');
themeChanger.addEventListener('click', changeTheme);

function changeTheme() {
  document.body.classList.toggle('light');
}

// Funtion to get todo to change dynamically
// Getting UI elements

function isBefore(elem1, el2) {
  for (
    let cur = elem1.previousSibling;
    cur && cur.nodeType !== 9;
    cur = cur.previousSibling
  ) {
    if (cur === el2) {
      return true;
    } else {
      return false;
    }
  }
}
// todoInput.addEventListener('keyup', newTodo);
let elem;
const todosContainer = document.querySelector('.todos');
function newTodo(value, completed = false) {
  const todo = document.createElement('div');
  const todoText = document.createElement('p');
  const todoCheckBox = document.createElement('input');
  const todoCheckBoxLabel = document.createElement('label');
  const todoCross = document.createElement('span');
  todoText.textContent = value;
  todoCheckBox.type = 'checkbox';
  todoCheckBox.id = `${value.replace(/\s+/g, '')}`;
  todoCheckBox.name = `${value.replace(/\s+/g, '')}`;
  todoCheckBox.title = 'checkbox';
  todoCheckBox.checked = completed;
  todoCheckBoxLabel.htmlFor = `${value.replace(/\s+/g, '')}`;

  // Function to create new Todos after it has been typed
  todoCheckBoxLabel.addEventListener('click', function (e) {
    if (todoCheckBox.checked) {
      todoText.classList.remove('strikethrough');
      todoCheckBoxLabel.classList.remove('active');
      updateTodos(value, false);
      countCompleted();
    } else {
      updateTodos(value, true);
      countCompleted();
      todoText.classList.add('strikethrough');
      todoCheckBoxLabel.classList.add('active');
    }
  });
  todoText.addEventListener('click', (e) => {
    if (todoCheckBox.checked) {
      todoCheckBox.checked = false;
      todoText.classList.remove('strikkethrough');
      todoCheckBoxLabel.classList.remove('active');
      updateTodos(value, false);
      countCompleted();
    } else {
      todoCheckBox.checked = true;
      updateTodos(value, true);
      countCompleted();
      todoText.classList.add('strikethrough');
      todoCheckBoxLabel.classList.add('active');
    }
  });
  todoCross.addEventListener('click', function (e) {
    e.target.parentElement.remove();
    todos = todos.filter(function (t) {
      t.value !== value;
    });
    countCompleted();
    if (todos.length === 0) {
      updateUi(true);
    }
  });
  todo.classList.add('todo');
  todoCheckBoxLabel.classList.add('circle');
  if (todoCheckBox.checked) {
    todoCheckBoxLabel.classList.add('active');
    todoText.classList.add('strikethrough');
  }
  todoCross.classList.add('cross');

  todo.appendChild(todoCheckBox);
  todo.appendChild(todoCheckBoxLabel);
  todo.appendChild(todoText);
  todo.appendChild(todoCross);

  // Pure Js drag and drop
  // todo.draggable = true;
  // todo.addEventListener('dragstart', (e) => {
  //   e.dataTransfer.effectAllowed = 'move';
  //   elem = e.target;
  //   // console.log(elem.previousSibling.previousSibling);
  //   // console.log(elem.textContent);
  // });

  // todo.addEventListener('dragover', function (e) {
  //   let el1;
  //   e.preventDefault();
  //   if (e.target.classList.contains('todo')) {
  //     el1 = e.target;
  //     // console.log(el1.textContent);
  //     // console.log(this.nodeType);
  //   } else {
  //     el1 = e.target.parentElement;
  //     // console.log(el1);
  //   }
  //   if (isBefore(elem, el1)) {
  //     el1.parentNode.insertBefore(elem, el1);
  //     // console.log(elem);
  //   } else {
  //     el1.parentNode.insertBefore(elem, el1.nextSibling);
  //     // console.log(elem);
  //   }
  // });
  // todo.addEventListener('dragend', function () {
  //   elem = null;
  //   // let index = todos.findIndex((t) => t.value === value);
  //   // // console.log(index);
  //   // todos.splice(index, 1);
  //   // console.log(todos);

  //   if (todo.nextSibling) {
  //     let index1 = todos.findIndex(function (t) {
  //       t.value === todo.nextSibling.querySelector('p').textContent;
  //     });
  //     todos.splice(index1, 0, {
  //       value: value,
  //       checked: todo.querySelector('input').checked,
  //     });
  //     console.log(todos);
  //   } else {
  //     todos.push({
  //       value: value,
  //       checked: todo.querySelector('input').checked,
  //     });
  //   }
  // });
  // console.log(todo.nextSibling.querySelector('p').textContent);
  // console.log(todo.querySelector('p').textContent);
  todosContainer.appendChild(todo);
}
// Getting UI Elements
const submitInput = document.querySelector('.submit');
const todoInput = document.querySelector('.todoinput');
const completedCount = document.querySelector('.completedcount');
const remarks = document.querySelector('.remarks');
const footer = document.querySelector('.footer');
const clear = document.querySelector('.clears');
const active = document.querySelector('.activates');
const completed = document.querySelector('.completed');
const showAl = document.querySelector('.showall');

let todos = [
  {
    value: 'Complete online javascript course',
    checked: true,
  },
  {
    value: 'Jog around the park 3x',
    checked: false,
  },
  {
    value: '10 minute meditation',
    checked: false,
  },
  {
    value: 'Read for 1 hour',
    checked: false,
  },
  {
    value: 'Pick up groceries',
    checked: false,
  },
  {
    value: 'Complete Todo app on Frontend Mentor',
    checked: false,
  },
];

// Function to update UI if no element is there
function updateUi(notodos) {
  if (notodos) {
    remarks.querySelectorAll('div').forEach(function (d) {
      d.style.display = 'none';
    });
    const p = document.createElement('p');
    p.textContent = 'No todos ';
    remarks.appendChild(p);
    remarks.style.borderRadius = '8px';
    footer.style.display = 'none';
  } else {
    footer.style.display = 'block';
    remarks.style.borderRadius = '0px';
    remarks.style.borderBottomLeftRadius = '8px';
    remarks.querySelector('p').remove();
    remarks.querySelectorAll('div').forEach(function (d) {
      d.style.display = 'flex';
    });
  }
}
const addTodo = (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (e.target.value != '') {
      createTodo(e.target.value);
    }
  }
  if (todoInput.value === '') {
    alert('Add a Task');
  }
};
todoInput.addEventListener('keyup', addTodo);
// Submit function
const submitTodo = () => {
  if (todoInput.value !== '') {
    createTodo(todoInput.value);
  }
};
submitInput.addEventListener('click', submitTodo);
function createTodo(value) {
  todos.push({ value: value, checked: false });
  newTodo(value);
  todoInput.value = '';
  countCompleted();
  if (todos.length > 0 && todos.length < 2) {
    updateUi(false);
  }
}
// Function to Update todos
function updateTodos(value, bool) {
  todos.forEach(function (t) {
    if (t.value === value) t.checked = bool;
  });
}
// Function to count completed todos, i.e to check how many todos are left
function countCompleted() {
  completedCount.textContent = `${
    todos.filter((t) => t.checked === false).length
  } items left`;
}
// Function to clear complted todos
function clearCompleted() {
  todos = todos.filter((t) => t.checked !== true);
  document.querySelectorAll('.todo').forEach((todo) => {
    if (todo.querySelector('input').checked) {
      todo.remove();
    }
  });
  if (todos.length === 0) {
    updateUi(true);
  }
}
clear.addEventListener('click', clearCompleted);

// function to show all
function showAll(e) {
  document.querySelectorAll('.filters div').forEach((d, i) => {
    if (i === 0) {
      d.classList.add('filterActive');
    } else {
      d.classList.remove('filterActive');
    }
  });
  document.querySelectorAll('.todo').forEach(function (todo) {
    todo.style.display = 'grid';
  });
}
showAl.addEventListener('click', showAll);

// Function to show active todos
function showActive(e) {
  document.querySelectorAll('.filters div').forEach(function (d, i) {
    if (i === 1) {
      d.classList.add('filterActive');
    } else {
      d.classList.remove('filterAcive');
    }
  });
  document.querySelectorAll('.todo').forEach(function (todo) {
    todo.style.display = 'grid';
    // console.log(todo);
    if (todo.querySelector('input').checked) {
      todo.style.display = 'none';
      // console.log(todo);
    }
  });
}
active.addEventListener('click', showActive);
// Function to show complete todos
function showCompleted() {
  document.querySelectorAll('.filters div').forEach(function (d, i) {
    if (i === 2) {
      d.classList.add('filterActive');
    } else {
      d.classList.remove('filterActive');
    }
  });
  document.querySelectorAll('.todo').forEach(function (todo) {
    todo.style.display = 'grid';
    if (!todo.querySelector('input').checked) {
      todo.style.display = 'none';
    }
  });
}
completed.addEventListener('click', showCompleted);

// Sortable js for drag and drop
var el = document.querySelector('.todos');
var sortable = Sortable.create(el, {
  onEnd: function (evt) {
    const todo = evt.item;
    const value = todo.querySelector('p').textContent;
    let index = todos.findIndex((t) => t.value === value);
    todos.splice(index, 1);

    if (todo.nextSibling) {
      let index1 = todos.findIndex(
        (t) => t.value === todo.nextSibling.querySelector('p').textContent
      );
      todos.splice(index1, 0, {
        value: value,
        checked: todo.querySelector('input').checked,
      });
    } else {
      todos.push({
        value: value,
        checked: todo.querySelector('input').checked,
      });
    }
  },
});
