/**
 * Task 1 - Interactive Expense Calculator
 * Skye8 - JavaScript Practical Assessment - SKY8-JSA-001
 */
 
// STATE

// This array is the single source of truth. Every expense is an object
// shaped like { id, name, amount }. We never store a running total in
// a separate variable -- the total is always calculated fresh from this
// array whenever we need it.
let expenses = [];
 
// Used to give every new expense a unique id, so we know which one to
// delete later. It just goes up by 1 each time.
let nextExpenseId = 1;

// GRAB THE ELEMENTS WE NEED FROM THE PAGE

const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const nameErrorEl = document.getElementById('expense-name-error');
const amountErrorEl = document.getElementById('expense-amount-error');
 
const totalEl = document.getElementById('expense-total');
const countEl = document.getElementById('expense-count');
const listEl = document.getElementById('expense-list');
const emptyStateEl = document.getElementById('expense-empty');
 
// FEATURE 1: VALIDATE NAME AND AMOUNT

function validateExpense(rawName, rawAmount) {
  const errors = { name: '', amount: '' };
 
  const name = rawName.trim();
  if (name.length === 0) {
    errors.name = 'Please enter an expense name.';
  }
 
  // Number() turns "" into 0 and turns text like "abc" into NaN, so we
  // check for both of those cases separately from the "empty" case.
  const amountText = rawAmount.trim();
  const amount = Number(amountText);
 
  if (amountText.length === 0) {
    errors.amount = 'Please enter an amount.';
  } else if (Number.isNaN(amount)) {
    errors.amount = 'Amount must be a number.';
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than zero.';
  }
 
  const isValid = errors.name === '' && errors.amount === '';
 
  return { isValid, name, amount, errors };
}
 

// FEATURE 2: DISPLAY VALIDATION MESSAGES
function showErrors(errors) {
  nameErrorEl.textContent = errors.name;
  amountErrorEl.textContent = errors.amount;
}
 
function clearErrors() {
  nameErrorEl.textContent = '';
  amountErrorEl.textContent = '';
}
 

// FEATURE 3: ADD A VALID EXPENSE TO STATE, THEN RE-RENDER
function addExpense(name, amount) {
  expenses.push({
    id: nextExpenseId,
    name: name,
    amount: amount,
  });
  nextExpenseId = nextExpenseId + 1;
 
  render(); 
}
 
// FEATURE 4: DELETE AN EXPENSE BY ID, THEN RE-RENDER
function deleteExpense(idToRemove) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== idToRemove;
  });
 
  render(); 
}
 

// FEATURE 5: CALCULATE THE TOTAL ON DEMAND 
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }
  return total;
}
 
function formatAsCurrency(value) {
  return '$' + value.toFixed(2);
}
 
// FEATURE 6: DISPLAY THE EXPENSE LIST FROM STATE
function renderList() {
  
  listEl.textContent = '';
 
  expenses.forEach(function (expense) {
    const item = document.createElement('li');
    item.className = 'list__item';
 
    const nameSpan = document.createElement('span');
    nameSpan.className = 'list__item-name';
    nameSpan.textContent = expense.name; 
 
    const amountSpan = document.createElement('span');
    amountSpan.className = 'list__item-amount';
    amountSpan.textContent = formatAsCurrency(expense.amount);
  });
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn--icon list__item-remove';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete ' + expense.name);
    deleteButton.addEventListener('click', function () {
      deleteExpense(expense.id);
    });
 
    item.appendChild(nameSpan);
    item.appendChild(amountSpan);
    item.appendChild(deleteButton);
    listEl.appendChild(item);
  };

 
// FEATURE 7: UPDATE TOTAL AND COUNT
function renderSummary() {
  const hasExpenses = expenses.length > 0;
  totalEl.textContent = hasExpenses ? formatAsCurrency(calculateTotal()) : '-';
  countEl.textContent = String(expenses.length);
}
 

// FEATURE 8: SHOW THE EMPTY STATE WHEN THERE ARE NO EXPENSES
function renderEmptyState() {
  const hasExpenses = expenses.length > 0;
  emptyStateEl.style.display = hasExpenses ? 'none' : '';
  listEl.style.display = hasExpenses ? '' : 'none';
}
 
// only ever has to call render().
function render() {
  renderList();
  renderSummary();
  renderEmptyState();
}
 

// EVENTS
form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
 
  const result = validateExpense(nameInput.value, amountInput.value);
 
  if (!result.isValid) {
    showErrors(result.errors);
    return;
  }
 
  clearErrors();
  addExpense(result.name, result.amount);
 
  form.reset();
  nameInput.focus();
});
 
// INITIAL RENDER
render();
 
