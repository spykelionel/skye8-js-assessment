/**
 * Task 2 - Student Grade Manager
 * Skye8 - JavaScript Practical Assessment - SKY8-JSA-001
 */

// STATE

// Single source of truth. Every student is an object shaped like
// { id, name, score, grade }.
let students = [];
 
// Gives every new student a unique id, so we know which one to delete.
let nextStudentId = 1;
 
// GRAB THE ELEMENTS WE NEED FROM THE PAGE

const form = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const scoreInput = document.getElementById('student-score');
const nameErrorEl = document.getElementById('student-name-error');
const scoreErrorEl = document.getElementById('student-score-error');
 
const averageEl = document.getElementById('stat-average');
const highestEl = document.getElementById('stat-highest');
const lowestEl = document.getElementById('stat-lowest');
const countEl = document.getElementById('stat-count');
 
const listEl = document.getElementById('student-list');
const emptyStateEl = document.getElementById('student-empty');
 
// TODO 1: DERIVE A LETTER GRADE FROM A SCORE
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50
function deriveGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}
 
// TODO 2: VALIDATE NAME AND SCORE

// Checks the two fields and returns whether they are valid, along with
// any error messages that should be shown. Nothing is added to state
// here -- this function only checks the input.
function validateStudent(rawName, rawScore) {
  const errors = { name: '', score: '' };
 
  const name = rawName.trim();
  if (name.length === 0) {
    errors.name = 'Please enter a student name.';
  }
 
  const scoreText = rawScore.trim();
  const score = Number(scoreText);
 
  if (scoreText.length === 0) {
    errors.score = 'Please enter a score.';
  } else if (Number.isNaN(score)) {
    errors.score = 'Score must be a number.';
  } else if (score < 0 || score > 100) {
    errors.score = 'Score must be between 0 and 100.';
  }
 
  const isValid = errors.name === '' && errors.score === '';
 
  return { isValid, name, score, errors };
}
 
// TODO 3: DISPLAY VALIDATION MESSAGES

function showErrors(errors) {
  nameErrorEl.textContent = errors.name;
  scoreErrorEl.textContent = errors.score;
}
 
function clearErrors() {
  nameErrorEl.textContent = '';
  scoreErrorEl.textContent = '';
}
 
// TODO 4: ADD A VALID STUDENT TO STATE, THEN RE-RENDER
function addStudent(name, score) {
  students.push({
    id: nextStudentId,
    name: name,
    score: score,
    grade: deriveGrade(score),
  });
  nextStudentId = nextStudentId + 1;
 
  render(); // state changed, so redraw the page
}
 
// TODO 5: DELETE A STUDENT BY ID, THEN RECALCULATE STATISTICS
function deleteStudent(idToRemove) {
  students = students.filter(function (student) {
    return student.id !== idToRemove;
  });
 
  render(); // render() redraws the list AND recalculates every statistic
}
 
// TODO 6: CALCULATE STATISTICS FROM THE ARRAY (never stored)

function calculateAverage() {
  let total = 0;
  for (let i = 0; i < students.length; i++) {
    total = total + students[i].score;
  }
  return total / students.length;
}
 
function calculateHighest() {
  let highest = students[0].score;
  for (let i = 1; i < students.length; i++) {
    if (students[i].score > highest) {
      highest = students[i].score;
    }
  }
  return highest;
}
 
function calculateLowest() {
  let lowest = students[0].score;
  for (let i = 1; i < students.length; i++) {
    if (students[i].score < lowest) {
      lowest = students[i].score;
    }
  }
  return lowest;
}
 
// TODO 7: DISPLAY THE STUDENT LIST FROM STATE (name, score and grade)

function renderList() {
  listEl.textContent = '';
 
  students.forEach(function (student) {
    const item = document.createElement('li');
    item.className = 'list__item';
 
    const nameSpan = document.createElement('span');
    nameSpan.className = 'list__item-name';
    nameSpan.textContent = student.name; // textContent = safe, no HTML injection
 
    const scoreSpan = document.createElement('span');
    scoreSpan.className = 'list__item-amount';
    scoreSpan.textContent = student.score + ' pts';
 
    const gradeSpan = document.createElement('span');
    gradeSpan.className = 'list__item-amount';
    gradeSpan.textContent = 'Grade ' + student.grade;
 
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn--icon list__item-remove';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete ' + student.name);
    deleteButton.addEventListener('click', function () {
      deleteStudent(student.id);
    });
 
    item.appendChild(nameSpan);
    item.appendChild(scoreSpan);
    item.appendChild(gradeSpan);
    item.appendChild(deleteButton);
    listEl.appendChild(item);
  });
}
 

// TODO 8: UPDATE STATISTICS -- DASH FOR ZERO STUDENTS, NEVER NaN
function renderStats() {
  const hasStudents = students.length > 0;
 
  // toFixed(1) always shows one decimal place, e.g. 82 -> "82.0".
  averageEl.textContent = hasStudents ? calculateAverage().toFixed(1) : '-';
  highestEl.textContent = hasStudents ? String(calculateHighest()) : '-';
  lowestEl.textContent = hasStudents ? String(calculateLowest()) : '-';
  countEl.textContent = String(students.length);
}
 
// Shows/hides the empty state and the list together.
function renderEmptyState() {
  const hasStudents = students.length > 0;
  emptyStateEl.style.display = hasStudents ? 'none' : '';
  listEl.style.display = hasStudents ? '' : 'none';
}
 
// One function that does the full re-render, so every state change
// (add or delete) only ever has to call render().
function render() {
  renderList();
  renderStats();
  renderEmptyState();
}
 
// EVENTS
form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
 
  const result = validateStudent(nameInput.value, scoreInput.value);
 
  if (!result.isValid) {
    showErrors(result.errors);
    return;
  }
 
  clearErrors();
  addStudent(result.name, result.score);
 
  form.reset();
  nameInput.focus();
});
render();
 