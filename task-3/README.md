# Task 3 - Persistent To-Do Application

## Objective

Build a persistent to-do application with full CRUD, filtering and
localStorage persistence.

## What you are building

A form that accepts a task description. Tasks can be added, completed,
reverted and deleted. Three filters (all, pending, completed) control the
view. Counters track total, completed and pending. All data persists
across page refreshes through localStorage.

## Required features

- [ ] Add tasks with a text description
- [ ] Reject empty and whitespace-only text
- [ ] Toggle tasks between completed and pending
- [ ] Delete tasks
- [ ] Three filters: all, pending, completed with active state
- [ ] Three counters: total, completed, pending (all derived)
- [ ] Persist to localStorage under `skye8.task3.todos`
- [ ] Guard JSON.parse with try/catch
- [ ] Recover gracefully from corrupt stored data
- [ ] Filtering does not delete data

## JavaScript concepts assessed

State management, CRUD operations, localStorage, JSON serialisation,
filtering, event handling, defensive programming.

## Provided for you

- `index.html` with the form, stats, filter buttons and list container
- Element ids: `todo-form`, `todo-input`, `todo-list`, `filter-all`,
  `filter-pending`, `filter-completed`, `stat-total`, `stat-completed`,
  `stat-pending`, `todo-empty`
- `task-3.js` with function stubs, STORAGE_KEY and TODO markers
- The shared design system in `assets/css/style.css`

## What you must not do

- Store counters as running totals
- Mutate DOM and localStorage independently
- Let filtering delete data from the array
- Use innerHTML with unescaped user input
- Add a framework or external dependency

## Definition of done

- [ ] All ten TODO markers implemented
- [ ] Tasks stored as `{ id, text, completed, createdAt }` objects
- [ ] Data survives a page refresh
- [ ] Corrupt localStorage produces an empty list, not an error
- [ ] All counters derived from the array
- [ ] Filter selection reflected with aria-pressed
- [ ] Zero console errors
- [ ] Responsive at 360px, 768px and 1280px
- [ ] Dashboard link works from this page

See [../README.md](../README.md) and [../GRADING.md](../GRADING.md).
