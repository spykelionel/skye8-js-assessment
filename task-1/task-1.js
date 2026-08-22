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
};

/** @type {{ id: string, name: string, amount: number }[]} */
let expenses = [];

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
function validateExpense(name, amount) {  
  const errors = {};
  const trimmedName = String(name).trim();
  const trimmedAmount = String(amount).trim();
  const numericAmount = Number(trimmedAmount);

  if (!trimmedName) {
    errors.name = "Please enter an expense name.";
  }

  if (!trimmedAmount) {
    errors.amount = "Please enter an amount.";
  } else if (!Number.isFinite(numericAmount)) {
    errors.amount = "Amount must be a number.";
  } else if (numericAmount <= 0) {
    errors.amount = "Amount must be greater than zero.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  expenses.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: String(name).trim(),
    amount: Number(amount),
  });
  renderExpenses();
  renderSummary();
}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  renderSummary();
}

// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {
  els.list.replaceChildren();

  expenses.forEach((expense) => {
    const item = document.createElement("li");
    item.className = "list__item";

    const details = document.createElement("div");
    details.className = "list__details";

    const name = document.createElement("span");
    name.className = "list__title";
    name.textContent = expense.name;

    const amount = document.createElement("span");
    amount.className = "list__meta";
    amount.textContent = `$${expense.amount.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn btn--danger";
    removeButton.dataset.expenseId = expense.id;
    removeButton.textContent = "Delete";
    removeButton.setAttribute("aria-label", `Delete ${expense.name}`);

    details.append(name, amount);
    item.append(details, removeButton);
    els.list.append(item);
  });
}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {
  const hasExpenses = expenses.length > 0;
  els.empty.hidden = hasExpenses;
  els.total.textContent = hasExpenses ? `$${calculateTotal().toFixed(2)}` : "-";
  els.count.textContent = String(expenses.length);
}

function init() {
  // TODO [T1-07]: Bind the form submit and the delete delegation, then
  // perform the first render.
  els.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameError = document.getElementById("expense-name-error");
    const amountError = document.getElementById("expense-amount-error");
    nameError.textContent = "";
    amountError.textContent = "";

    const result = validateExpense(els.name.value, els.amount.value);
    if (!result.valid) {
      nameError.textContent = result.errors.name || "";
      amountError.textContent = result.errors.amount || "";
      return;
    }

    addExpense(els.name.value, els.amount.value);
    els.form.reset();
    els.name.focus();
  });

  els.list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-expense-id]");
    if (button) {
      removeExpense(button.dataset.expenseId);
    }
  });

  renderExpenses();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", init);
