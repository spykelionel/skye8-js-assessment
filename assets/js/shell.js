/**
 * Skye8 JavaScript Practical Assessment
 * Page shell - shared across all pages
 *
 * Maintainer: Engr. Lionel A.
 *
 * This file is complete. It must not contain assessment logic.
 */
(function () {
  "use strict";

  /* Stamp the current year into elements with data-year */
  var yearEls = document.querySelectorAll("[data-year]");
  var currentYear = new Date().getFullYear();
  for (var i = 0; i < yearEls.length; i++) {
    yearEls[i].textContent = currentYear;
  }

  /* Mark the active breadcrumb from the body data-task attribute */
  var task = document.body.dataset.task;
  if (task) {
    var crumbs = document.querySelectorAll(".breadcrumb a");
    for (var j = 0; j < crumbs.length; j++) {
      if (crumbs[j].dataset.task === task) {
        crumbs[j].setAttribute("aria-current", "page");
      }
    }
  }
})();
