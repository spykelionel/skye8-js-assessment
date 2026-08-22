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
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null || raw === undefined) {
      return [];
    }
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (e) {
    return [];
  }
}

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
function validateTodo(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return { valid: false, error: "Task description is required." };
  }
  return { valid: true, error: "" };
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  var todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = !todos[i].completed;
      break;
    }
  }
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
  return todos.slice();
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  els.list.innerHTML = "";

  var filtered = getFilteredTodos();

  for (var i = 0; i < filtered.length; i++) {
    var todo = filtered[i];

    var li = document.createElement("li");
    li.className = "list-item";
    if (todo.completed) {
      li.className += " list-item--completed";
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.action = "toggle";
    checkbox.dataset.id = todo.id;
    checkbox.setAttribute("aria-label", "Mark as " + (todo.completed ? "pending" : "completed"));

    var textSpan = document.createElement("span");
    textSpan.className = "list-item__primary";
    textSpan.textContent = todo.text;
    if (todo.completed) {
      textSpan.style.textDecoration = "line-through";
      textSpan.style.opacity = "0.6";
    }

    var actions = document.createElement("div");
    actions.className = "list-item__actions";

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger btn--sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = todo.id;

    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(actions);

    els.list.appendChild(li);
  }
}

// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  var total = todos.length;
  var completed = 0;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      completed++;
    }
  }
  var pending = total - completed;

  els.statTotal.textContent = String(total);
  els.statCompleted.textContent = String(completed);
  els.statPending.textContent = String(pending);

  var filtered = getFilteredTodos();
  if (filtered.length === 0) {
    els.empty.hidden = false;
    els.list.hidden = true;
  } else {
    els.empty.hidden = true;
    els.list.hidden = false;
  }
}

function setFilter(filter) {
  currentFilter = filter;
  els.filterAll.setAttribute("aria-pressed", filter === "all" ? "true" : "false");
  els.filterPending.setAttribute("aria-pressed", filter === "pending" ? "true" : "false");
  els.filterCompleted.setAttribute("aria-pressed", filter === "completed" ? "true" : "false");
  renderTodos();
  renderStats();
}

function init() {
// TODO [T3-10]: Load state, bind the form submit, bind filter
// buttons, bind toggle and delete delegation, then perform the
// first render.

  todos = loadState();

  els.form.addEventListener("submit", function (e) {
    e.preventDefault();

    var errorEl = document.getElementById("todo-input-error");
    if (errorEl) {
      errorEl.textContent = "";
    }

    var text = els.input.value;
    var result = validateTodo(text);

    if (!result.valid) {
      if (errorEl) {
        errorEl.textContent = result.error;
      }
      return;
    }

    addTodo(text);
    els.form.reset();
    els.input.focus();
  });

  els.filterAll.addEventListener("click", function () {
    setFilter("all");
  });
  els.filterPending.addEventListener("click", function () {
    setFilter("pending");
  });
  els.filterCompleted.addEventListener("click", function () {
    setFilter("completed");
  });

  els.list.addEventListener("click", function (e) {
    var target = e.target;
    if (!target || !target.dataset) {
      return;
    }
    var action = target.dataset.action;
    var id = target.dataset.id;
    if (!id) {
      return;
    }
    if (action === "delete") {
      removeTodo(id);
    }
  });

  els.list.addEventListener("change", function (e) {
    var target = e.target;
    if (target && target.dataset && target.dataset.action === "toggle" && target.dataset.id) {
      toggleTodo(target.dataset.id);
    }
  });

  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
