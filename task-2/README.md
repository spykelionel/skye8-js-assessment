# Task 2 - Student Grade Manager

## Objective

Build a student grade manager that grades students and derives class
statistics from a dataset.

## What you are building

A form that accepts a student name and a score out of 100. Each submission
adds a student with a derived letter grade to a list. Class statistics
(average, highest, lowest, count) recalculate on every change.

## Required features

- [ ] Derive grade from score: A 80-100, B 70-79, C 60-69, D 50-59, F below 50
- [ ] Validate name (not empty) and score (numeric, 0-100)
- [ ] Display validation messages in the `.field-error` elements
- [ ] Add valid students to state and re-render
- [ ] Display the student list from state with name, score and grade
- [ ] Calculate average (one decimal), highest, lowest and count from the array
- [ ] Delete a student by id and recalculate statistics
- [ ] Show dash for all statistics with zero students, never NaN

## JavaScript concepts assessed

Arrays, objects, conditions, derived statistics, input validation,
state-driven rendering.

## Provided for you

- `index.html` with the form, stat grid and list container
- Element ids: `student-form`, `student-name`, `student-score`,
  `student-list`, `stat-average`, `stat-highest`, `stat-lowest`,
  `stat-count`, `student-empty`
- `task-2.js` with function stubs and TODO markers
- The shared design system in `assets/css/style.css`

## What you must not do

- Hardcode any statistic in HTML
- Maintain statistics as running counters
- Allow NaN to appear in the interface
- Use innerHTML with unescaped user input
- Add a framework or external dependency

## Definition of done

- [ ] All eight TODO markers implemented
- [ ] Students stored as `{ id, name, score, grade }` objects
- [ ] All statistics derived from the array on every render
- [ ] Average displayed to one decimal place
- [ ] Dash shown for all stats with zero students
- [ ] Validation covers empty name and out-of-range scores
- [ ] Zero console errors
- [ ] Responsive at 360px, 768px and 1280px
- [ ] Dashboard link works from this page

See [../README.md](../README.md) and [../GRADING.md](../GRADING.md).
