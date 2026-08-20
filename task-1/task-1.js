/**
 * Skye8 JavaScript Practical Assessment
 * Task 1 - Interactive Expense Calculator
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

/**
 * Helper: Clears all `.field-error` elements within the form.
 */
function clearErrors() {
  if (!els.form) return;
  const errorElements = els.form.querySelectorAll(".field-error");
  errorElements.forEach((el) => {
    el.textContent = "";
  });
}

/**
 * Helper: Populates `.field-error` elements corresponding to validated fields.
 * @param {Record<string, string>} errors 
 */
function displayErrors(errors) {
  clearErrors();
  if (errors.name && els.name) {
    const nameFieldError = els.name.closest(".field")?.querySelector(".field-error") 
      || document.getElementById("name-error");
    if (nameFieldError) nameFieldError.textContent = errors.name;
  }
  if (errors.amount && els.amount) {
    const amountFieldError = els.amount.closest(".field")?.querySelector(".field-error") 
      || document.getElementById("amount-error");
    if (amountFieldError) amountFieldError.textContent = errors.amount;
  }
}

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
function validateExpense(name, amount) {
  const errors = {};
  const trimmedName = typeof name === "string" ? name.trim() : "";

  // Validate Name
  if (!trimmedName) {
    errors.name = "Expense name is required.";
  }

  // Validate Amount
  if (amount === "" || amount === null || amount === undefined) {
    errors.amount = "Amount is required.";
  } else {
    const numAmount = Number(amount);
    if (Number.isNaN(numAmount)) {
      errors.amount = "Amount must be a valid number.";
    } else if (numAmount <= 0) {
      errors.amount = "Amount must be greater than zero.";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };
}

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  const newExpense = {
    id: "exp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    amount: Number(amount)
  };

  expenses.push(newExpense);

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
  return expenses.reduce((sum, item) => sum + item.amount, 0);
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {
  if (!els.list) return;

  // Clear existing nodes safely
  els.list.textContent = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.className = "expense-item";

    const infoDiv = document.createElement("div");
    infoDiv.className = "expense-item__info";

    const nameSpan = document.createElement("span");
    nameSpan.className = "expense-item__name";
    nameSpan.textContent = expense.name;

    const amountSpan = document.createElement("span");
    amountSpan.className = "expense-item__amount";
    amountSpan.textContent = expense.amount.toLocaleString("en-US") + " XAF";

    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(amountSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger btn--sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-id", expense.id);
    deleteBtn.setAttribute("aria-label", `Delete expense ${expense.name}`);

    li.appendChild(infoDiv);
    li.appendChild(deleteBtn);

    els.list.appendChild(li);
  });
}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {
  const total = calculateTotal();
  const count = expenses.length;

  if (els.total) {
    els.total.textContent = total.toLocaleString("en-US") + " XAF";
  }

  if (els.count) {
    els.count.textContent = count.toString();
  }

  if (els.empty) {
    if (count === 0) {
      els.empty.style.display = "block";
      els.empty.removeAttribute("hidden");
    } else {
      els.empty.style.display = "none";
      els.empty.setAttribute("hidden", "true");
    }
  }
}

// TODO [T1-07]: Bind the form submit and the delete delegation, then
// perform the first render.
function init() {
  // Bind form submission
  if (els.form) {
    els.form.addEventListener("submit", function (e) {
      e.preventDefault();

      clearErrors();

      const rawName = els.name ? els.name.value : "";
      const rawAmount = els.amount ? els.amount.value : "";

      const result = validateExpense(rawName, rawAmount);

      if (!result.valid) {
        displayErrors(result.errors);
        return;
      }

      addExpense(rawName, rawAmount);

      els.form.reset();
      if (els.name) els.name.focus();
    });
  }

  // Bind event delegation for deleting expenses
  if (els.list) {
    els.list.addEventListener("click", function (e) {
      const deleteBtn = e.target.closest("button[data-id]");
      if (deleteBtn) {
        const id = deleteBtn.getAttribute("data-id");
        if (id) {
          removeExpense(id);
        }
      }
    });
  }

  // Perform initial rendering on load
  renderExpenses();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", init);