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
  inputError: document.getElementById("todo-input-error"),
};

var todos = [];
var currentFilter = "all";

// TODO [T3-01]: Load state from localStorage under STORAGE_KEY.
// Parse with JSON.parse inside a try/catch. Corrupt or absent data
// must produce an empty array, never a thrown error.
function loadState() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    var parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
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
  if (!text || text.trim() === "") return { valid: false, error: "Task description is required" };
  return { valid: true, error: "" };
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  todos.push({
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  });
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  if (currentFilter === "pending") return todos.filter((t) => !t.completed);
  if (currentFilter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {
  els.list.innerHTML = "";
  var filtered = getFilteredTodos();
  filtered.forEach((todo) => {
    var li = document.createElement("li");
    li.className = "list__item" + (todo.completed ? " is-completed" : "");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.id = todo.id;
    var span = document.createElement("span");
    span.textContent = todo.text;
    var delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn btn--danger btn--small";
    delBtn.dataset.deleteId = todo.id;
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    els.list.appendChild(li);
  });
  els.empty.style.display = todos.length === 0 ? "block" : "none";
}

// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  els.statTotal.textContent = todos.length;
  els.statCompleted.textContent = todos.filter((t) => t.completed).length;
  els.statPending.textContent = todos.filter((t) => !t.completed).length;

  // aria-pressed for filters
  els.filterAll.setAttribute("aria-pressed", currentFilter === "all");
  els.filterPending.setAttribute("aria-pressed", currentFilter === "pending");
  els.filterCompleted.setAttribute("aria-pressed", currentFilter === "completed");
}

// TODO [T3-10]: Load state, bind the form submit, bind filter
// buttons, bind toggle and delete delegation, then perform the
// first render.
function init() {
  todos = loadState();

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    els.inputError.textContent = "";
    var val = validateTodo(els.input.value);
    if (!val.valid) {
      els.inputError.textContent = val.error;
      return;
    }
    addTodo(els.input.value);
    eval.form.reset();
  });

  // The filter buttons
  els.filterAll.addEventListener("click", () => {
    currentFilter = "all";
    renderTodos();
    renderStats();
  });
  els.filterPending.addEventListener("click", () => {
    currentFilter = "pending";
    renderTodos();
    renderStats();
  });
  els.filterCompleted.addEventListener("click", () => {
    currentFilter = "completed";
    renderTodos();
    renderStats();
  });

  // The toggle + delete deletion
  els.list.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") toggleTodo(e.target.dataset.id);
    if (e.target.dataset.deleteId) removeTodo(e.target.dataset.deleteId);
  });

  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
