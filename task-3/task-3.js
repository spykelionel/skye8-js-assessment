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
  try {
    var rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return [];
    }
    var parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
}
// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
function validateTodo(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return { valid: false, error: "Task description cannot be empty." };
  }
  return { valid: true, error: "" };
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  var newTodo = {
    id: Date.now().toString() + "_" + Math.random().toString(36).substring(2, 9),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      return Object.assign({}, todo, { completed: !todo.completed });
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


/// [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  els.list.innerHTML = "";
  var filtered = getFilteredTodos();

  filtered.forEach(function (todo) {
    var li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " todo-item--completed" : "");
    li.dataset.id = todo.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-item__checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.action = "toggle";
    checkbox.dataset.id = todo.id;
    checkbox.setAttribute(
      "aria-label",
      'Mark "' + todo.text + '" as ' + (todo.completed ? "pending" : "completed")
    );

    var textSpan = document.createElement("span");
    textSpan.className = "todo-item__text";
    textSpan.textContent = todo.text; // Safely set text content without innerHTML injection

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger btn--sm todo-item__delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = todo.id;
    deleteBtn.setAttribute("aria-label", 'Delete task "' + todo.text + '"');

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    els.list.appendChild(li);
  });
}
// [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  var total = todos.length;
  var completed = todos.filter(function (t) {
    return t.completed;
  }).length;
  var pending = total - completed;

  els.statTotal.textContent = String(total);
  els.statCompleted.textContent = String(completed);
  els.statPending.textContent = String(pending);

  var filteredTodos = getFilteredTodos();
  var isEmpty = filteredTodos.length === 0;

  if (els.empty) {
    els.empty.style.display = isEmpty ? "block" : "none";
    els.empty.hidden = !isEmpty;
  }
}

// Sets active state on the active filter button and aria-pressed attributes
function setFilter(filter) {
  currentFilter = filter;

  var filterMap = [
    { btn: els.filterAll, name: "all" },
    { btn: els.filterPending, name: "pending" },
    { btn: els.filterCompleted, name: "completed" },
  ];

  filterMap.forEach(function (item) {
    if (item.btn) {
      var isActive = item.name === currentFilter;
      item.btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  });

  renderTodos();
  renderStats();
}

function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.
}

document.addEventListener("DOMContentLoaded", init);
