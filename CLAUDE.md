# CLAUDE.md

Repository guidance for Claude Code working in the Skye8 JavaScript Practical
Assessment.

## What this repository is

A frontend practical assessment. Five vanilla JavaScript applications reachable
from one dashboard, hosted at a single URL, submitted as one pull request.

## Hard constraints

- Vanilla JavaScript only. No React, Vue, Angular, Svelte, jQuery, Alpine.
- No CSS framework. No Bootstrap, no Tailwind.
- No bundler, no package manager, no `package.json`, no `node_modules`.
- The site must work from any static host and from a local static server.
- Relative paths only. Never a leading slash in an `href` or a `src`.

## Before changing anything

1. Read `README.md` in full, including the task specific instructions.
2. Read `GRADING.md` so you know what is actually being measured.
3. Read the README in the task folder you are about to work on.
4. Inspect the existing files. The dashboard, the design system, the page
   markup and the datasets are already written. Build on them.
5. Run `git status` and `git remote -v`.

Do not start writing code until you have done all five.

## The contract you must not break

Element ids in `task-N/index.html` and function names in `task-N/task-N.js` are
referenced by the grading rubric. Extend them. Do not rename them.

The datasets in `task-4/data.js` and `task-5/data.js` are fixed so that every
submission is graded against the same data. You may add records. You may not
remove records and you may not mutate the arrays at runtime. `sort` mutates, so
sort a copy.

## The work

Implement every `// TODO [Tn-nn]` marker. There are 45 across the five tasks.
Nothing else in the repository is deliberately incomplete.

Work one task at a time. Finish and test a task before starting the next.

## Architecture expectations

Named functions with single responsibilities. Keep data processing separate
from DOM rendering. A function that filters should not also render, and a
function that renders should not also calculate.

Good: `calculateTotal()`, `renderExpenses()`, `applyFilters()`,
`updateDashboard()`, `handleFormSubmit()`.

Not acceptable: `doStuff()`, `process()`, `thing()`, `function1()`, or a single
150-line function that does everything.

Never inject unescaped user input through `innerHTML`. Use `textContent` or
create elements.

## Styling

`assets/css/style.css` already carries every component the tasks need, with
design tokens on `:root`. Use the existing classes and tokens. If you need
something new, extend the stylesheet using the tokens. Never put a colour, a
font stack or a spacing literal in a task file, and never write inline styles.

## Testing, before you claim a task is done

For each task:

1. Serve the site (`python3 -m http.server 5173`) and open the page.
2. Exercise the normal path.
3. Submit empty input, invalid input and boundary values.
4. Delete everything and confirm the empty state.
5. For task 3, refresh the page and confirm the data survived. Then corrupt
   the stored value in devtools and confirm it recovers rather than throwing.
6. For tasks 4 and 5, combine a search with a filter with a sort and confirm
   all three apply at once.
7. For task 5, apply a filter and confirm every KPI changed with it.
8. Check the console. Zero errors, zero warnings.
9. Resize to 360px and confirm nothing overflows.
10. Click back to the dashboard and confirm the link works.

Do not assume something works because the code reads correctly.

## Git

Commit in meaningful slices as you go. One commit per coherent piece of work.

Acceptable: `Implement expense validation`, `Add grade banding function`,
`Persist tasks to localStorage`, `Compose product search with category filter`,
`Derive dashboard KPIs from the filtered set`, `Fix table overflow on mobile`.

Not acceptable: `update`, `changes`, `stuff`, `final`, `test`, `asdf`, or one
commit containing the entire assessment.

Do not force push. Do not delete branches. Do not rewrite pushed history.

## Deployment

Deploy the fork to Netlify, Vercel or GitHub Pages. Inspect the repository for
existing deployment configuration first and use it if present.

If deployment credentials are not available in the environment, do not
improvise and do not invent a URL. Complete the implementation, then state
plainly what the user must do: which platform, which setting, which command.

Once deployed, open the URL and test all five tasks on it. Only then write it
into the README `Live application` section and into the pull request.

## Submission

One pull request from `assessment/<username>` on the fork into the starter
repository's `main`, with `.github/pull_request_template.md` filled in
completely and honestly, including the AI assistance section.

## Absolute rules

Never fabricate a deployment URL, a repository URL, a test result or a
successful deployment status. If something is blocked, say what is blocked and
what is needed to unblock it.

Never mark a requirement as complete in the pull request template unless you
have verified it on the hosted site.

Never claim the assessment is finished while any TODO marker remains.
