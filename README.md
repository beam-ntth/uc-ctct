# University of California Clinical Training Coordination Tool

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Team Development Standards

### Workflow

Repo Organization

This model follows from this [example](https://nvie.com/posts/a-successful-git-branching-model/).

The repo will have two branches that will be present throughout the entire lifecycle of the project, `master` and `dev`.

`master` will always represent production ready code, while `dev` will always have the most recently developed code.

In addition, we will have supporting branches that will eventually be erased or merged into the `dev` branch.

These feature branches will be named using the following syntax:

  `<initials>-<name-of-feature>`

Team members will use the following process to develop a feature or bug fix:

1. First, create a feature branch using the syntax stated above.

2. Before making any changes, ALWAYS pull the most recent version of the project `git pull`.

3. Makes changes in your local machine then push it to the `<initials>-<name-of-feature>` branch, `git push origin <initals>-<name-of-feature>`.

4. When your changes are ready for review, open a pull request to the `dev` branch.

5. Pull requests require at least **one other teammate** to review and merge the code. Reviewer, please state a detailed comment for your approval.

6. The pull request creator SHOULD make any reasonable changes requested by the reviewers.

7. Archive the feature branch once it has been merged to `dev`.

8. Once the `dev` branch is in a stable state (no bugs, significant work has been made since last merge to `main`), we will merge it to the `main` branch. Merging to the `main` branch requires all members to comment :ship: (type `:ship:`).

### Style Guides

Follow Google's style guides for:

- [HTML and CSS](https://google.github.io/styleguide/htmlcssguide.html)

- [JavaScript](https://google.github.io/styleguide/jsguide.html)

## Core Developers

- Natheethorn Teacharuangchit

- Emmy Huynh

- Maria Tilve

- Joshua-Troy Meneses
