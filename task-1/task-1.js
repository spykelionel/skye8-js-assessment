/**
 * Skye8 JavaScript Practical Assessment
 * Task 1 - Interactive Expense Calculator
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("expense-form"),
  name: document.getElementById("expense-name"),
  amount: document.getElementById("expense-amount"),
  list: document.getElementById("expense-list"),
  total: document.getElementById("expense-total"),
  count: document.getElementById("expense-count"),
  empty: document.getElementById("expense-empty"),
  nameError: document.getElementById("expense-name-error"),
  amountError: document.getElementById("expense-amount-error"),
};

/** @type {{ id: string, name: string, amount: number }[]} */
let expenses = [];

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
function validateExpense(name, amount) {
  const errors = {};
  let valid = true;

  // Validate name: not empty
  if (!name || name.trim() === "") {
    errors.name = "Expense name is required";
    valid = false;
  }

  // Validate amount: not empty, numeric, > 0
  const amountNum = parseFloat(amount);
  if (amount === "" || amount === null) {
    error.amount = "Amount is required";
    valid = false;
  } else if (isNaN(amountNum)) {
    error.amount = "Amount must be a number";
    valid = false;
  } else if (amountNum <= 0) {
    error.amount = "Amount must be greater than zero";
    valid = false;
  }
  return { valid, errors };
}

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  const newExpense = {
    id: Date.now().toString(), // The unique id
    name: name.trim(),
    amount: parseFloat(amount),
  };
  expenses.push(newExpense);
  renderExpenses();
  renderSummary();
  els.form.reset(); //clear the form
}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  renderSummary();
}

// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

// Helper to escape user input to avoid XSS. No innerHTML with unescaped input.
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {
  els.list.innerHTML = ""; //clear first

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.className = "list__item";
    li.setAttribute("data-id", expense.id);

    // Create elements safely without innerHTML concatenation
    const nameSpan = document.createElement("span");
    nameSpan.textContent = expense.name;

    const amountSpan = document.createElement("span");
    amountSpan.textContent = `FCFA ${expense.amount.toFixed(2)}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger btn--small";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-id", expense.id);

    li.appendChild(nameSpan);
    li.appendChild(amountSpan);
    li.appendChild(deleteBtn);
    els.list.appendChild(li);
  });
}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {
  const total = calculateTotal();
  const count = expenses.length;

  els.total.textContent = count > 0 ? `FCFA ${total.toFixed(2)}` : "-";
  els.count.textContent = count;

  // Show/hide empty state
  if (count === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}

// Helper to clear errors
function clearErrors() {
  els.nameError.textContent = "";
  els.amountError.textContent = "";
}

// TODO [T1-07]: Bind the form submit and the delete delegation, then
// perform the first render.
function init() {
  // Form submit
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = els.name.value;
    const amount = els.amount.value;

    const validation = validateExpense(name, amount);

    if (!validation.valid) {
      if (validation.errors.name) {
        els.amountError.textContent = validation.errors.name;
      }
      if (validation.errors.amount) {
        els.amountError.textContent = validation.errors.amount;
      }
      return;
    }

    addExpense(name, amount);
  });

  // Delete delegation - listen on the list
  els.list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
      removeExpense(e.target.dataset.id);
    }
  });

  // First render
  renderExpenses();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", init);


.