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

  const errors = {};

  name = name.trim();
  score = score.trim();

  if (name === "") {
    errors.name = "Please enter a student name.";
  }

  if (score === "") {
    errors.score = "Please enter a score.";
  } else if (isNaN(score)) {
    errors.score = "Score must be a number.";
  } else if (Number(score) < 0 || Number(score) > 100) {
    errors.score = "Score must be between 0 and 100.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };
}


// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
  score = Number(score);

  const student = {
    id: Date.now().toString(),
    name: name.trim(),
    score: score,
    grade: getGrade(score)
  };

  students.push(student);

  renderStudents();
  renderStats();
}


// TODO [T2-04]: Remove one student by id and re-render.

function removeStudent(id) {
  students = students.filter(function(student) {
    return student.id !== id;
  });

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

  let total = 0;
  let highest = students[0].score;
  let lowest = students[0].score;

  students.forEach(function(student) {

    total = total + student.score;

    if (student.score > highest) {
      highest = student.score;
    }

    if (student.score < lowest) {
      lowest = student.score;
    }
  });
   const average = total / students.length;

  return {
    average: average.toFixed(1),
    highest: highest,
    lowest: lowest,
    count: students.length
  };
}




// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {
   els.list.replaceChildren();

  students.forEach(function(student) {

    const item = document.createElement("li");
    item.className = "list__item";

    const details = document.createElement("div");
    details.className = "list__details";

    const name = document.createElement("span");
    name.className = "list__title";
    name.textContent = student.name;

    const score = document.createElement("span");
    score.className = "list__meta";
    score.textContent = "Score: " + student.score;

    const grade = document.createElement("span");
    grade.className = "list__meta";
    grade.textContent = "Grade: " + student.grade;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--danger";
    button.textContent = "Delete";
    button.dataset.studentId = student.id;

    details.append(name, score, grade);
    item.append(details, button);

    els.list.append(item);
  });
}





// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {

  const stats = calculateStats();

  els.average.textContent = stats.average;
  els.highest.textContent = stats.highest;
  els.lowest.textContent = stats.lowest;
  els.count.textContent = stats.count;

  if (students.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.
   els.form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nameError = document.getElementById("student-name-error");
    const scoreError = document.getElementById("student-score-error");

    nameError.textContent = "";
    scoreError.textContent = "";

    const result = validateStudent(
      els.name.value,
      els.score.value
    );

    if (!result.valid) {

      nameError.textContent = result.errors.name || "";
      scoreError.textContent = result.errors.score || "";
 return;
    }

    addStudent(
      els.name.value,
      els.score.value
    );

    els.form.reset();
    els.name.focus();
  });


  els.list.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

      const id = event.target.dataset.studentId;

      removeStudent(id);
    }
  });
 renderStudents();
  renderStats();
}


document.addEventListener("DOMContentLoaded", init);
