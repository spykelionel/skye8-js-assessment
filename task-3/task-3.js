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
    var stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    var parsed = JSON.parse(stored);
    // Make sure it is an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    // If anything goes wrong, return empty list
    return [];
  }
}

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  var jsonString = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEY, jsonString);
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
function validateTodo(text) {
  if (!text || text.trim() === "") {
    return { valid: false, error: "Please enter a task description." };
  }
  return { valid: true, error: "" };
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  var newId = "todo-" + Date.now();
  var newTask = {
    id: newId,
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTask);
  saveState();

  // Clear the input
  els.input.value = "";
  document.getElementById("todo-input-error").textContent = "";

  renderTodos();
  renderStats();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // Flip the completed value
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
  var newList = [];
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newList.push(todos[i]);
    }
  }
  todos = newList;
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  if (currentFilter === "all") {
    return todos;
  }

  var filtered = [];
  for (var i = 0; i < todos.length; i++) {
    if (currentFilter === "pending" && todos[i].completed === false) {
      filtered.push(todos[i]);
    }
    if (currentFilter === "completed" && todos[i].completed === true) {
      filtered.push(todos[i]);
    }
  }
  return filtered;
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  els.list.innerHTML = "";

  var visibleTodos = getFilteredTodos();

  for (var i = 0; i < visibleTodos.length; i++) {
    var task = visibleTodos[i];

    var listItem = document.createElement("li");
    listItem.className = "list-item";

    // Primary text
    var primary = document.createElement("span");
    primary.className = "list-item__primary";
    primary.textContent = task.text;

    // If completed, maybe show a visual cue (optional simple style)
    if (task.completed) {
      primary.style.textDecoration = "line-through";
      primary.style.opacity = "0.7";
    }

    // Meta
    var meta = document.createElement("span");
    meta.className = "list-item__meta";
    meta.textContent = task.completed ? "Completed" : "Pending";

    // Actions
    var actions = document.createElement("div");
    actions.className = "list-item__actions";

    // Toggle button
    var toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "btn";
    toggleBtn.textContent = task.completed ? "Mark pending" : "Mark complete";
    toggleBtn.setAttribute("data-action", "toggle");
    toggleBtn.setAttribute("data-id", task.id);

    // Delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-action", "delete");
    deleteBtn.setAttribute("data-id", task.id);

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    listItem.appendChild(primary);
    listItem.appendChild(meta);
    listItem.appendChild(actions);

    els.list.appendChild(listItem);
  }
}

// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  var total = todos.length;
  var completedCount = 0;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      completedCount = completedCount + 1;
    }
  }

  var pendingCount = total - completedCount;

  els.statTotal.textContent = String(total);
  els.statCompleted.textContent = String(completedCount);
  els.statPending.textContent = String(pendingCount);

  // Empty state depends on the filtered list
  var visible = getFilteredTodos();
  if (visible.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function setActiveFilter(filterName) {
  currentFilter = filterName;

  // Update aria-pressed on the three buttons
  els.filterAll.setAttribute("aria-pressed", filterName === "all" ? "true" : "false");
  els.filterPending.setAttribute("aria-pressed", filterName === "pending" ? "true" : "false");
  els.filterCompleted.setAttribute("aria-pressed", filterName === "completed" ? "true" : "false");

  renderTodos();
  renderStats();
}

function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.

  // Load saved todos
  todos = loadState();

  // Form submit
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();

    var textValue = els.input.value;
    var result = validateTodo(textValue);

    var errorEl = document.getElementById("todo-input-error");
    errorEl.textContent = result.error || "";

    if (result.valid) {
      addTodo(textValue);
    }
  });

  // Filter buttons
  els.filterAll.addEventListener("click", function () {
    setActiveFilter("all");
  });
  els.filterPending.addEventListener("click", function () {
    setActiveFilter("pending");
  });
  els.filterCompleted.addEventListener("click", function () {
    setActiveFilter("completed");
  });

  // Toggle and delete (event delegation)
  els.list.addEventListener("click", function (event) {
    var target = event.target;
    if (target.tagName !== "BUTTON") {
      return;
    }

    var action = target.getAttribute("data-action");
    var id = target.getAttribute("data-id");

    if (action === "toggle") {
      toggleTodo(id);
    }
    if (action === "delete") {
      removeTodo(id);
    }
  });

  // First render
  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
