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

// TODO [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
function getGrade(score) {
  if (score >= 80) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F";
  }
}

// TODO [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a
// score above 100.
function validateStudent(name, score) {
  var errors = {};
  var isValid = true;

  // Check name
  if (!name || name.trim() === "") {
    errors.name = "Please enter a student name.";
    isValid = false;
  }

  // Check score
  if (score === "" || score === null || score === undefined) {
    errors.score = "Please enter a score.";
    isValid = false;
  } else {
    var scoreNumber = Number(score);

    if (isNaN(scoreNumber)) {
      errors.score = "Score must be a number.";
      isValid = false;
    } else if (scoreNumber < 0) {
      errors.score = "Score cannot be below 0.";
      isValid = false;
    } else if (scoreNumber > 100) {
      errors.score = "Score cannot be above 100.";
      isValid = false;
    }
  }

  return { valid: isValid, errors: errors };
}

// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
  var newId = "stu-" + Date.now();
  var scoreNumber = Number(score);
  var grade = getGrade(scoreNumber);

  var newStudent = {
    id: newId,
    name: name.trim(),
    score: scoreNumber,
    grade: grade
  };

  students.push(newStudent);

  // Clear the form
  els.name.value = "";
  els.score.value = "";

  // Clear error messages
  document.getElementById("student-name-error").textContent = "";
  document.getElementById("student-score-error").textContent = "";

  renderStudents();
  renderStats();
}

// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {
  var newList = [];
  for (var i = 0; i < students.length; i++) {
    if (students[i].id !== id) {
      newList.push(students[i]);
    }
  }
  students = newList;

  renderStudents();
  renderStats();
}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {
  if (students.length === 0) {
    return {
      average: "-",
      highest: "-",
      lowest: "-",
      count: 0
    };
  }

  var totalScore = 0;
  var highestScore = students[0].score;
  var lowestScore = students[0].score;

  for (var i = 0; i < students.length; i++) {
    var currentScore = students[i].score;
    totalScore = totalScore + currentScore;

    if (currentScore > highestScore) {
      highestScore = currentScore;
    }
    if (currentScore < lowestScore) {
      lowestScore = currentScore;
    }
  }

  var averageScore = totalScore / students.length;
  // One decimal place
  var averageRounded = averageScore.toFixed(1);

  return {
    average: averageRounded,
    highest: highestScore,
    lowest: lowestScore,
    count: students.length
  };
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {
  els.list.innerHTML = "";

  for (var i = 0; i < students.length; i++) {
    var student = students[i];

    var listItem = document.createElement("li");
    listItem.className = "list-item";

    var primary = document.createElement("span");
    primary.className = "list-item__primary";
    primary.textContent = student.name;

    var meta = document.createElement("span");
    meta.className = "list-item__meta";
    meta.textContent = "Score: " + student.score + " | Grade: " + student.grade;

    var actions = document.createElement("div");
    actions.className = "list-item__actions";

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-id", student.id);

    actions.appendChild(deleteBtn);
    listItem.appendChild(primary);
    listItem.appendChild(meta);
    listItem.appendChild(actions);

    els.list.appendChild(listItem);
  }
}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {
  var stats = calculateStats();

  els.average.textContent = stats.average;
  els.highest.textContent = stats.highest;
  els.lowest.textContent = stats.lowest;
  els.count.textContent = String(stats.count);

  if (students.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.

  els.form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameValue = els.name.value;
    var scoreValue = els.score.value;

    var result = validateStudent(nameValue, scoreValue);

    var nameErrorEl = document.getElementById("student-name-error");
    var scoreErrorEl = document.getElementById("student-score-error");

    nameErrorEl.textContent = result.errors.name || "";
    scoreErrorEl.textContent = result.errors.score || "";

    if (result.valid) {
      addStudent(nameValue, scoreValue);
    }
  });

  els.list.addEventListener("click", function (event) {
    var target = event.target;
    if (target.tagName === "BUTTON" && target.getAttribute("data-id")) {
      var idToRemove = target.getAttribute("data-id");
      removeStudent(idToRemove);
    }
  });

  renderStudents();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
