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
  var errors = {};
  var isValid = true;

  // Check if name is empty or only spaces
  if (!name || name.trim() === "") {
    errors.name = "Please enter an expense name.";
    isValid = false;
  }

  // Check if amount is empty
  if (amount === "" || amount === null || amount === undefined) {
    errors.amount = "Please enter an amount.";
    isValid = false;
  } else {
    // Convert amount to a number
    var amountNumber = Number(amount);

    // Check if it is a real number
    if (isNaN(amountNumber)) {
      errors.amount = "Amount must be a number.";
      isValid = false;
    } else if (amountNumber <= 0) {
      // Zero or negative is not allowed
      errors.amount = "Amount must be greater than zero.";
      isValid = false;
    }
  }

  return { valid: isValid, errors: errors };
}
// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  // Create a unique id using the current time
  var newId = "exp-" + Date.now();

  // Create the expense object
  var newExpense = {
    id: newId,
    name: name.trim(),
    amount: Number(amount)
  };

  // Add it to the array
  expenses.push(newExpense);

  // Clear the form
  els.name.value = "";
  els.amount.value = "";

  // Clear any old error messages
  document.getElementById("expense-name-error").textContent = "";
  document.getElementById("expense-amount-error").textContent = "";

  // Update the screen
  renderExpenses();
  renderSummary();
}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {
  // Keep only the expenses that do NOT match the id
  var newList = [];
  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      newList.push(expenses[i]);
    }
  }
  expenses = newList;

  // Update the screen
  renderExpenses();
  renderSummary();
}

// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  var total = 0;
  for (var i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }
  return total;
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {}

function init() {
  // TODO [T1-07]: Bind the form submit and the delete delegation, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
