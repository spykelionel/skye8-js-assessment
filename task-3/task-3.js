/* *
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
    if (!raw) {
      return [];
    }
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
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
  var trimmed = text.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Please enter a task description." };
  }
  return { valid: true, error: "" };
}
 
// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  var newTodo = {
    id: String(Date.now()),
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
  var newTodos = [];
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newTodos.push(todos[i]);
    }
  }
  todos = newTodos;
 
  saveState();
  renderTodos();
  renderStats();
}
 
// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  var result = [];
 
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
 
    if (currentFilter === "all") {
      result.push(todo);
    } else if (currentFilter === "pending" && todo.completed === false) {
      result.push(todo);
    } else if (currentFilter === "completed" && todo.completed === true) {
      result.push(todo);
    }
  }
 
  return result;
}
 
// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  // Clear the list first.
  els.list.innerHTML = "";
 
  var filteredTodos = getFilteredTodos();
 
  for (var i = 0; i < filteredTodos.length; i++) {
    var todo = filteredTodos[i];
 
    // One list item per task.
    var item = document.createElement("li");
    item.className = "list__item";
 
    // Checkbox to mark complete/incomplete.
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("click", function (todoId) {
      return function () {
        toggleTodo(todoId);
      };
    }(todo.id));
 
    // Task text (using textContent, never innerHTML, so it is safe).
    var text = document.createElement("span");
    text.textContent = todo.text;
    if (todo.completed) {
      text.style.textDecoration = "line-through";
    }
 
    // Delete button.
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function (todoId) {
      return function () {
        removeTodo(todoId);
      };
    }(todo.id));
 
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
 
    els.list.appendChild(item);
  }
}
 
// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  var total = todos.length;
 
  var completed = 0;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      completed = completed + 1;
    }
  }
 
  var pending = total - completed;
 
  els.statTotal.textContent = String(total);
  els.statCompleted.textContent = String(completed);
  els.statPending.textContent = String(pending);
 
  // Show the empty state only when the current filter has no tasks.
  var filteredTodos = getFilteredTodos();
  if (filteredTodos.length === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}
 
function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.
 
  // Load saved tasks.
  todos = loadState();
 
  // Handle adding a new task.
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();
 
    var text = els.input.value;
    var validation = validateTodo(text);
 
    var errorEl = document.getElementById("todo-input-error");
 
    if (!validation.valid) {
      if (errorEl) {
        errorEl.textContent = validation.error;
      }
      return;
    }
 
    if (errorEl) {
      errorEl.textContent = "";
    }
 
    addTodo(text);
    els.input.value = "";
  });
 
  // Handle filter buttons.
  els.filterAll.addEventListener("click", function () {
    currentFilter = "all";
    els.filterAll.setAttribute("aria-pressed", "true");
    els.filterPending.setAttribute("aria-pressed", "false");
    els.filterCompleted.setAttribute("aria-pressed", "false");
    renderTodos();
    renderStats();
  });
 
  els.filterPending.addEventListener("click", function () {
    currentFilter = "pending";
    els.filterAll.setAttribute("aria-pressed", "false");
    els.filterPending.setAttribute("aria-pressed", "true");
    els.filterCompleted.setAttribute("aria-pressed", "false");
    renderTodos();
    renderStats();
  });
 
  els.filterCompleted.addEventListener("click", function () {
    currentFilter = "completed";
    els.filterAll.setAttribute("aria-pressed", "false");
    els.filterPending.setAttribute("aria-pressed", "false");
    els.filterCompleted.setAttribute("aria-pressed", "true");
    renderTodos();
    renderStats();
  });
 
  // First render, using whatever was loaded from storage.
  renderTodos();
  renderStats();
}
 
document.addEventListener("DOMContentLoaded", init);
 
