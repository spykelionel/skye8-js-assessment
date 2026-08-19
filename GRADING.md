# Grading rubric

Skye8 JavaScript Practical Assessment - SKY8-JSA-001
Maintainer: Engr. Lionel A.

## Weighting

| Area                                     | Weight  |
| ---------------------------------------- | ------- |
| Task 1 - Interactive Expense Calculator  | 10      |
| Task 2 - Student Grade Manager           | 12      |
| Task 3 - Persistent To-Do Application    | 18      |
| Task 4 - Product Search, Filter and Sort | 18      |
| Task 5 - Interactive Sales Dashboard     | 22      |
| Code quality and architecture            | 8       |
| Accessibility and responsiveness         | 5       |
| Git history and documentation            | 4       |
| Pull request quality                     | 3       |
| **Total**                                | **100** |

## Band descriptors

| Band        | Score     | Meaning                                                                             |
| ----------- | --------- | ----------------------------------------------------------------------------------- |
| Distinction | 85 to 100 | All five tasks correct, clean architecture, thoughtful extras, honest documentation |
| Strong pass | 70 to 84  | All five tasks working with minor defects, sound structure                          |
| Pass        | 55 to 69  | Four tasks working, or five with notable defects                                    |
| Referred    | 40 to 54  | Substantial gaps, resubmission window offered                                       |
| Fail        | below 40  | Core requirements unmet                                                             |

## Per-task marking

Each task is marked across four dimensions.

| Dimension                                      | Share |
| ---------------------------------------------- | ----- |
| Functional correctness against the task README | 50    |
| Data handling, derived rather than hardcoded   | 25    |
| Validation, edge cases and empty states        | 15    |
| Rendering quality and separation of concerns   | 10    |

## Automatic fail conditions

Any one of these caps the submission at Fail regardless of everything else.

1. A framework, a CSS framework, a bundler or an npm dependency is present.
2. The hosted URL in the pull request does not load, or does not exist.
3. Statistics, totals or filtered results are hardcoded in HTML.
4. A submission the intern cannot explain in the review call.
5. Code copied from another intern's fork.
6. The pull request template is submitted blank or substantially incomplete.

## Heavily penalised

- KPIs in task 5 that ignore the active filters.
- Data lost on refresh in task 3.
- Filters that reset each other in tasks 4 and 5.
- `NaN` or `Infinity` visible in the interface.
- Console errors on load.
- Horizontal overflow at 360px.
- A single commit containing the whole assessment.
- Unescaped `innerHTML` with user input.

## Credited beyond the requirements

Marked in the code quality band, not as extra tasks.

- Debounced search input.
- Keyboard operability throughout, including delete actions.
- Sensible use of `Intl.NumberFormat` and `Intl.DateTimeFormat`.
- Event delegation rather than per-row listeners.
- Genuinely useful empty and error states.
- A clean, readable commit history that tells the story of the build.
- Honest, specific writing in the challenges section of the pull request.

## Review call

Every submission gets a short live review. You will be asked to open your
hosted site, walk through your task 5 aggregation logic, and explain one
decision you made and one thing you would do differently. Prepare for it.
