/**
 * Skye8 JavaScript Practical Assessment
 * Task 3 - Persistent To-Do Application
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var STORAGE_KEY = "skye8.task3.todos";

var els = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  list: document.getElementById("todo-list"),
  filterAll: document.getElementById("filter-all"),
  filterPending: document.getElementById("filter-pending"),
  filterCompleted: document.getElementById("filter-completed"),
  statTotal: document.getElementById("stat-total"),
  statCompleted: document.getElementById("stat-completed"),
  statPending: document.getElementById("stat-pending"),
  empty: document.getElementById("todo-empty"),
};

/** @type {{ id: string, text: string, completed: boolean, createdAt: string }[]} */
var todos = [];

/** @type {"all"|"pending"|"completed"} */
var currentFilter = "all";

// TODO [T3-01]: Load state from localStorage under STORAGE_KEY.
// Parse with JSON.parse inside a try/catch. Corrupt or absent data
// must produce an empty array, never a thrown error.
function loadState() {
  return [];
  function loadState() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    var parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    return [];
  }
}
}

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.

 function validateTodo(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return {
      valid: false,
      error: "Task cannot be empty."
    };
  }

  return {
    valid: true,
    error: ""
  };
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
function validateTodo(text) {
  return { valid: false, error: "" };
  
  if (typeof text !== "string" || text.trim() === "") {
    return {
      valid: false,
      error: "Task cannot be empty."
    };
  }

  return {
    valid: true,
    error: ""
  };
}


// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  var result = validateTodo(text);

  if (!result.valid) {
    return result;
  }

  var todo = {
    id: Date.now().toString() + "-" + Math.random().toString(36).slice(2),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);

  saveState();
  renderTodos();
  renderStats();

  return {
    valid: true,
    error: ""
  };
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed,
        createdAt: todo.createdAt
      };
    }

    return todo;
  });

  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  if (currentFilter === "pending") {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  }

  if (currentFilter === "completed") {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }

  return todos;
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  els.list.replaceChildren();

  var filteredTodos = getFilteredTodos();

  filteredTodos.forEach(function (todo) {
    var item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = todo.id;

    if (todo.completed) {
      item.classList.add("completed");
    }

    var text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    var toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "todo-toggle";
    toggleButton.dataset.action = "toggle";
    toggleButton.dataset.id = todo.id;
    toggleButton.textContent = todo.completed
      ? "Mark Pending"
      : "Complete";

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = todo.id;
    deleteButton.textContent = "Delete";

    item.appendChild(text);
    item.appendChild(toggleButton);
    item.appendChild(deleteButton);

    els.list.appendChild(item);
  });
}

// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  var total = todos.length;

  var completed = todos.filter(function (todo) {
    return todo.completed;
  }).length;

  var pending = todos.filter(function (todo) {
    return !todo.completed;
  }).length;

  els.statTotal.textContent = total;
  els.statCompleted.textContent = completed;
  els.statPending.textContent = pending;

  var filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.
}

document.addEventListener("DOMContentLoaded", init);
