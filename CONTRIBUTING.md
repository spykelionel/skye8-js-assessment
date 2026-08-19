# Submitting your assessment

Skye8 JavaScript Practical Assessment - SKY8-JSA-001

## 1. Fork

Fork this repository to your own GitHub account using the Fork button. Do not
request write access to this repository, and do not push a branch to it.

## 2. Clone and branch

```bash
git clone https://github.com/<your-username>/skye8-js-assessment.git
cd skye8-js-assessment
git checkout -b assessment/<your-username>
```

The branch name matters. It is how submissions are tracked.

## 3. Work

Serve the site locally and implement the tasks.

```bash
python3 -m http.server 5173
```

Commit as you go, in meaningful slices. Push regularly so your progress is
visible.

```bash
git add <specific files>
git commit -m "Implement expense validation"
git push -u origin assessment/<your-username>
```

## 4. Deploy

Pick one.

**Netlify.** Log in with GitHub, `Add new site`, `Import an existing project`,
select your fork. Build command: leave empty. Publish directory: `.`. Deploy.

**Vercel.** `Add New`, `Project`, import your fork. Framework preset: `Other`.
Root directory: `./`. Deploy.

**GitHub Pages.** Repository `Settings`, `Pages`, source `Deploy from a
branch`, branch `assessment/<your-username>`, folder `/ (root)`. Save, then
wait for the deployment to finish.

## 5. Verify the deployment

Open the hosted URL in a browser. Then:

1. Confirm the dashboard renders.
2. Open each of the five tasks from the dashboard.
3. Use each application on the hosted site, not just locally.
4. Open the console on each page and confirm it is clean.
5. Resize to a narrow viewport and check each page.

A hosted site that fails here is an automatic fail. Check it.

## 6. Record the URL

Add the verified URL to the `Live application` section of your fork's
`README.md`, commit and push.

## 7. Open the pull request

From your fork, open one pull request into this repository's `main` branch.

```text
base:    <maintainer>/skye8-js-assessment  main
compare: <your-username>/skye8-js-assessment  assessment/<your-username>
```

Title it:

```text
Assessment submission - <Your Full Name> - <Cohort>
```

Fill in the pull request template completely. Every section. An incomplete
template is returned unreviewed and the clock keeps running.

## 8. After submitting

Do not force push to the branch after opening the pull request. If you need to
fix something, push a normal commit. The reviewer needs a stable history.

Respond to review comments on the pull request itself.

---

Maintainer: Engr. Lionel A.
