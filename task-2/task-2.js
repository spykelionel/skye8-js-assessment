/**
 * Skye8 JavaScript Practical Assessment
 * Task 2 - Student Grade Manager
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("student-form"),
  name: document.getElementById("student-name"),
  score: document.getElementById("student-score"),
  list: document.getElementById("student-list"),
  average: document.getElementById("stat-average"),
  highest: document.getElementById("stat-highest"),
  lowest: document.getElementById("stat-lowest"),
  count: document.getElementById("stat-count"),
  empty: document.getElementById("student-empty"),
  nameError: document.getElementById("student-name-error"),
  scoreError: document.getElementById("student-score-error"),
};

let students = [];

// TODO [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// TODO [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a
// score above 100.
function validateStudent(name, score) {
  const errors = {};
  let valid = true;
  const scoreNum = parseFloat(score);

  if (!name.trim()) {
    errors.name = "Name is required";
    valid = false;
  }
  if (score === "") {
    errors.score = "Score is required";
    valid = false;
  } else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
    errors.score = "Score must be 0-100";
    valid = false;
  }
  return { valid, errors };
}

// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
  students.push({
    id: Date.now().toString(),
    name: name.trim(),
    score: parseFloat(score),
    grade: getGrade(parseFloat(score)),
  });
  renderStudents();
  renderStats();
  els.form.reset();
}

// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {
  students = students.filter((s) => s.id !== id);
  renderStudents();
  renderStats();
}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {
  if (students.length === 0) return { average: "-", highest: "-", lowest: "-", count: 0 };
  const scores = students.map((s) => s.score);
  const total = scores.reduce((a, b) => a + b, 0);
  return {
    average: (total / scores.length).toFixed(1),
    highest: Math.max(...scores),
    lowest: Math.min(...scores),
    count: scores.length,
  };
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {
  els.list.innerHTML = "";
  students.forEach((s) => {
    const li = document.createElement("li");
    li.className = "list__item";
    li.innerHTML = `
      <span>${s.name}</span>
      <span>${s.score} - Grade ${s.grade}</span>
      <button type="button" class="btn btn--danger btn--small" data-id="${s.id}">Delete</button>
    `;
    els.list.appendChild(li);
  });
}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {
  const stats = calculateStats();
  els.average.textContent = stats.average;
  els.highest.textContent = stats.highest;
  els.lowest.textContent = stats.lowest;
  els.count.textContent = stats.count;
  els.empty.style.display = students.length === 0 ? "block" : "none";
}

// TODO [T2-08]: Bind the form submit and the delete delegation, then
// perform the first render.
function init() {
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    els.nameError.textContent = "";
    els.scoreError.textContent = "";
    const { valid, errors } = validateStudent(els.name.value, els.score.value);
    if (!valid) {
      els.nameError.textContent = errors.name || "";
      els.scoreError.textContent = errors.score || "";
      return;
    }
    addStudent(els.name.value, els.score.value);
  });

  els.list.addEventListener("click", (e) => {
    if (e.target.dataset.id) removeStudent(e.target.dataset.id);
  });

  renderStudents();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
