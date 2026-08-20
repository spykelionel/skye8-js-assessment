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
};

/** @type {{ id: string, name: string, score: number, grade: string }[]} */
let students = [];

// [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a score above 100.
function validateStudent(name, score) {
  const errors = {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedScore = typeof score === "string" ? score.trim() : "";

  if (!trimmedName) {
    errors.name = "Student name is required.";
  }

  if (!trimmedScore) {
    errors.score = "Score is required.";
  } else {
    const numericScore = Number(trimmedScore);
    if (isNaN(numericScore)) {
      errors.score = "Score must be a valid number.";
    } else if (numericScore < 0 || numericScore > 100) {
      errors.score = "Score must be between 0 and 100.";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
  const nameErrorEl = document.getElementById("student-name-error");
  const scoreErrorEl = document.getElementById("student-score-error");

  if (nameErrorEl) nameErrorEl.textContent = "";
  if (scoreErrorEl) scoreErrorEl.textContent = "";

  const validation = validateStudent(name, score);

  if (!validation.valid) {
    if (validation.errors.name && nameErrorEl) {
      nameErrorEl.textContent = validation.errors.name;
    }
    if (validation.errors.score && scoreErrorEl) {
      scoreErrorEl.textContent = validation.errors.score;
    }
    return false;
  }

  const numericScore = Number(score.trim());
  const newStudent = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    name: name.trim(),
    score: numericScore,
    grade: getGrade(numericScore),
  };

  students.push(newStudent);

  els.name.value = "";
  els.score.value = "";

  renderStudents();
  renderStats();
  return true;
}
// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {
  return { average: "-", highest: "-", lowest: "-", count: 0 };
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
