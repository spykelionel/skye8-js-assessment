# Task 1 - Interactive Expense Calculator

## Objective

Build an interactive expense calculator that captures, lists and totals
expenses with validated input.

## What you are building

A form that accepts an expense name and an amount. Each submission adds an
expense to a list. The user sees a running total and count, and can delete
any expense. All data is held in a JavaScript array of objects.

## Required features

- [ ] Validate name (not empty) and amount (numeric, greater than zero)
- [ ] Display validation messages in the `.field-error` elements
- [ ] Add valid expenses to state and re-render
- [ ] Display the expense list from state
- [ ] Calculate the total on demand from the array
- [ ] Update total and count on every add and delete
- [ ] Delete an expense by id
- [ ] Show the empty state when no expenses exist

## JavaScript concepts assessed

Variables, functions, events, DOM manipulation, input validation,
array operations, state-driven rendering.

## Provided for you

- `index.html` with the form, summary stats and list container
- Element ids: `expense-form`, `expense-name`, `expense-amount`,
  `expense-list`, `expense-total`, `expense-count`, `expense-empty`
- `task-1.js` with function stubs and TODO markers
- The shared design system in `assets/css/style.css`

## What you must not do

- Hardcode the total or any expense row in HTML
- Read the total back from the DOM
- Store a running total in a variable you update manually
- Use innerHTML with unescaped user input
- Add a framework or external dependency

## Definition of done

- [ ] All seven TODO markers implemented
- [ ] Expenses stored as `{ id, name, amount }` objects
- [ ] Total derived on every render, never stored
- [ ] Validation covers empty, non-numeric, zero and negative
- [ ] Empty state shows when no expenses exist
- [ ] Zero console errors
- [ ] Responsive at 360px, 768px and 1280px
- [ ] Dashboard link works from this page

See [../README.md](../README.md) and [../GRADING.md](../GRADING.md).
