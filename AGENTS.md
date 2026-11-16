# AGENTS.md

## 1. Purpose & Core Principles

This file defines universal development rules for all contributors, including AI coding agents.

These rules apply regardless of programming language, framework, architecture, or project type.

### Core Principles

- Understand before modifying.
- Follow the existing architecture and conventions.
- Prefer simple, maintainable solutions over unnecessary complexity.
- Avoid unnecessary dependencies.
- Keep changes focused and scoped to the requested task.
- Never introduce breaking changes without explicit approval.
- Preserve existing functionality unless the task requires changing it.
- Verify changes before considering a task complete.
- Never assume. Inspect the codebase and its documentation first.

---

## 2. Documentation Is the Source of Truth

Before starting any task, inspect the project's documentation.

Follow existing documentation instead of introducing conflicting rules or assumptions.

### Reference Repositories & Examples

Some projects may have reference GitHub repositories that demonstrate preferred implementation patterns, architecture, coding conventions, or UI approaches.

When reference repositories are provided:

- Inspect the relevant repository before starting implementation.
- Use it as a reference for understanding the expected approach and implementation quality.
- Follow relevant patterns where they fit the current project's architecture.
- Do not blindly copy code or assume both projects use the same technology stack.
- Adapt examples to the current project's conventions and requirements.
- Check relevant branches or directories when the reference points to a specific implementation.
- If the repository is inaccessible, ask the user for access or an alternative reference.
- Never treat a reference repository as overriding explicit project requirements.

Reference repositories are sources of guidance, not replacements for the current project's documentation or architecture.

### Documentation Priority

Use the following priority when resolving conflicting instructions:

1. Explicit instructions from the user.
2. This `AGENTS.md` file.
3. Project-specific agent instructions in nested `AGENTS.md` files.
4. Project documentation and architecture decisions.
5. Existing implementation patterns and conventions.
6. General development best practices.

### Documentation Rules

Check whether the project contains relevant documentation, such as:

- `README.md` — Project overview, setup, and usage.
- `PROJECT_PROGRESS.md` — Current implementation status and remaining work.
- `ARCHITECTURE.md` — System architecture and technical decisions.
- `CONTRIBUTING.md` — Contribution and development guidelines.
- `CHANGELOG.md` — Project changes and release history.
- `API.md` or API documentation — Endpoint contracts and integration details.
- `docs/` — Additional technical documentation.

These files are examples, not mandatory requirements for every project.

- Read relevant documentation before implementation.
- Keep documentation consistent with actual implementation.
- Update affected documentation when changing behavior, architecture, APIs, or workflows.
- Do not create duplicate documentation when an existing document serves the same purpose.
- Do not silently contradict established architectural decisions.
- If documentation is outdated, identify the inconsistency and update it when relevant.
- Never claim an implementation is complete if required work remains unfinished.

### Documentation Writing Standards

Documentation must be written for human developers, not to demonstrate that an AI agent completed a task.

**Write natural, concise, technically accurate documentation. Avoid AI-generated writing patterns.**

Rules:

- Use straightforward language that a developer would naturally use.
- Explain what something does, why it exists, and how to use it.
- Prefer practical explanations over generic introductions.
- Be specific about implementation details.
- Use examples when they genuinely help understanding.
- Keep paragraphs short and avoid unnecessary repetition.
- Use headings that describe the actual content.
- Avoid excessive bullet points and deeply nested sections.
- Avoid unnecessary summaries, conclusions, and introductions.
- Do not repeat information already explained elsewhere.
- Do not use marketing language, exaggerated claims, or generic filler.
- Do not use phrases such as "In today's fast-paced digital world", "robust and scalable solution", "seamlessly integrates", or similar AI-style wording.
- Do not describe ordinary implementation decisions as revolutionary or exceptional.
- Do not add emojis or decorative formatting unless the project already uses them or explicitly requests them.
- Do not write documentation that merely restates the code line by line.
- Never invent features, behavior, commands, configurations, or technical decisions.

Documentation should sound like it was written and maintained by an experienced developer who understands the project.

**Quality test:** If a developer reads the documentation, they should understand the project or feature without feeling that they are reading generic AI-generated content.

---

## 3. Understand the Codebase Before Coding

Before making changes:

1. Inspect the repository structure.
2. Identify the technology stack and installed tooling.
3. Read relevant documentation.
4. Inspect affected modules and their dependencies.
5. Understand existing naming conventions and coding patterns.
6. Identify potential side effects and integration points.
7. Determine appropriate tests and validation commands.

Do not rewrite existing implementations simply because another approach is preferred.

Reuse existing utilities, components, services, and abstractions whenever appropriate.

Avoid unnecessary refactoring unrelated to the requested task.

---

## 4. GitHub Workflow & Branching Strategy

Follow **GitHub Flow** for all development work.

### Main Branch Protection

- Never commit directly to `main` or the repository's designated production branch.
- Never push directly to protected branches.
- All changes must be developed on dedicated branches.
- Integrate changes through Pull Requests.
- Never bypass branch protection rules or required CI checks.

### Branch Naming Convention

Use descriptive branch names with the following prefixes:

| Prefix | Purpose |
|---|---|
| `feature/` | New functionality |
| `ui/` | Frontend UI development, page layouts, visual improvements, styling, and component implementation |
| `bugfix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `refactor/` | Code restructuring |
| `docs/` | Documentation changes |
| `test/` | Test additions or modifications |
| `chore/` | Maintenance and tooling |
| `ci/` | CI/CD changes |

Examples:

- `feature/user-authentication`
- `ui/dashboard-layout`
- `ui/reusable-card-components`
- `ui/responsive-navigation`
- `ui/landing-page`
- `bugfix/payment-validation`
- `refactor/api-error-handling`
- `docs/update-setup-guide`
- `test/add-user-service-tests`
- `chore/update-project-dependencies`

### Branch Selection Rules

- Use `ui/` for frontend-focused work, including page implementation, UI components, styling, responsiveness, animations, and visual refinements.
- Use `feature/` for new functionality that is not primarily frontend UI work.
- Use `bugfix/` for fixing existing defects.
- Use `refactor/` when restructuring code without changing intended behavior.
- Use `docs/` for documentation-only changes.
- Use `test/` for test-focused changes.
- Use `chore/` for general maintenance.
- Use `ci/` for CI/CD changes.

When a task involves multiple areas, choose the prefix that best represents its primary purpose.

### Development Workflow

For every task:

1. Start from the latest target branch.
2. Create a dedicated branch using the naming convention.
3. Implement the requested changes.
4. Run relevant tests, linting, formatting, and type checks.
5. Review the complete diff.
6. Commit changes using Conventional Commits.
7. Push the feature branch.
8. Open a Pull Request targeting the appropriate base branch.
9. Provide a clear summary and testing information.
10. Address review feedback and CI failures.

Never merge a Pull Request yourself unless explicitly authorized.

### Commit Convention

Follow Conventional Commits:

`type(scope): description`

Common types:

- `feat` — New functionality.
- `fix` — Bug fixes.
- `refactor` — Code restructuring.
- `docs` — Documentation changes.
- `test` — Tests.
- `chore` — Maintenance.
- `ci` — CI/CD changes.
- `perf` — Performance improvements.
- `style` — Formatting or styling without behavioral changes.

Examples:

- `feat(auth): add password reset`
- `fix(api): handle expired sessions`
- `refactor(users): simplify profile service`
- `docs(readme): update installation steps`
- `style(dashboard): improve responsive layout`

Commit messages must be descriptive and reflect actual changes. Avoid vague messages such as `update`, `fix stuff`, or `AI changes`.

---

## 5. Package & Dependency Safety

**Installed packages and dependencies must be treated as protected external resources.**

Do not modify, edit, patch, overwrite, or manually manipulate installed packages.

### Strict Rules

- Never edit files inside `node_modules/`, `vendor/`, virtual environments, package caches, or equivalent installed dependency directories.
- Never modify installed package source code to work around limitations.
- Never manually overwrite package files.
- Never patch dependencies directly.
- Never modify package internals or distribution files.
- Never use package-manager commands that unexpectedly upgrade or replace existing dependencies.
- Never change dependency versions without explicit approval.
- Never remove installed packages without explicit approval.
- Never introduce a new dependency without establishing that existing project tools cannot reasonably solve the problem.

### Dependency Management

If a dependency appears broken or incompatible:

1. Inspect its documented API and current usage.
2. Check the project's existing version and configuration.
3. Identify the actual cause of the problem.
4. Look for a solution within application code or supported configuration.
5. Explain when a dependency change is genuinely necessary.
6. Obtain approval before changing dependencies.

Changes to dependency manifests, lockfiles, package scripts, or installation configuration must be intentional and task-related.

Do not regenerate lockfiles unnecessarily.

---

## 6. Code Quality & Implementation Standards

Follow the conventions of the existing codebase.

### General Standards

- Write readable, maintainable, and predictable code.
- Use meaningful names for variables, functions, classes, and modules.
- Keep functions and modules focused on clear responsibilities.
- Avoid unnecessary abstractions and premature optimization.
- Avoid duplicated logic when a reusable solution is justified.
- Handle errors explicitly.
- Validate external input at appropriate boundaries.
- Avoid hardcoded secrets, credentials, and environment-specific configuration.
- Avoid dead code, unused imports, and unnecessary comments.
- Do not suppress errors or warnings simply to make checks pass.
- Do not use unsafe types or bypass type safety without a valid reason.

### Architecture

- Respect the established architecture.
- Maintain clear separation of responsibilities.
- Avoid unnecessary coupling between modules.
- Keep business logic in appropriate layers.
- Reuse established patterns instead of introducing competing patterns.
- Do not introduce architectural complexity without a clear benefit.

### Frontend & UI Implementation

When working on frontend applications:

- Follow the existing design system and visual guidelines.
- Reuse existing components before creating new ones.
- Keep components focused and reusable where appropriate.
- Maintain consistent typography, spacing, colors, and visual hierarchy.
- Ensure responsive behavior across supported screen sizes.
- Preserve accessibility, including keyboard navigation and semantic HTML.
- Handle loading, empty, error, and success states where applicable.
- Avoid unnecessary inline styles and duplicated CSS.
- Keep UI components separate from business logic when the existing architecture supports it.
- Avoid introducing visual inconsistencies between screens.
- Do not redesign unrelated pages or components.
- Do not replace established UI libraries or design systems without approval.

For new components, inspect existing implementations and follow their naming, structure, styling, and composition patterns.

### Security

- Never expose secrets, tokens, or credentials.
- Validate and sanitize untrusted input.
- Apply appropriate authorization and authentication checks.
- Avoid insecure defaults.
- Follow established security practices and framework recommendations.
- Never weaken security controls to make implementation easier.

---

## 7. Testing & Verification

Every change must be verified according to its impact.

### Testing Requirements

- Add or update tests when introducing or changing functionality.
- Fix existing tests affected by the changes.
- Test important edge cases.
- Verify error handling and unexpected inputs.
- Avoid modifying tests merely to hide implementation problems.
- Do not remove existing test coverage without justification.

### Before Completing a Task

Run the relevant project checks when available:

- Unit tests.
- Integration tests.
- End-to-end tests.
- Type checking.
- Linting.
- Formatting checks.
- Production builds.

If a check cannot be executed, clearly state why.

Never claim tests passed if they were not executed.

---

## 8. Change Management

Keep every task focused.

- Modify only files necessary for the requested task.
- Do not reformat unrelated files.
- Do not rename unrelated modules or directories.
- Do not remove existing functionality without authorization.
- Do not overwrite user changes.
- Do not revert changes you did not introduce.
- Inspect Git status before modifying files and before committing.
- Preserve uncommitted work belonging to the user.
- Avoid large-scale rewrites unless explicitly requested.

If a task requires changes beyond its original scope, explain why before proceeding.

---

## 9. Environment & Configuration

- Never expose environment variables or secrets in logs, commits, or documentation.
- Do not commit local environment files containing secrets.
- Follow existing environment variable naming conventions.
- Update example environment files when introducing new required variables.
- Preserve existing development and production configurations.
- Do not change deployment settings without task-related justification and authorization.
- Never assume production credentials or infrastructure are available.

---

## 10. Communication & Progress Tracking

Communicate progress clearly and honestly.

For substantial tasks:

1. Explain the implementation approach.
2. Identify important architectural decisions.
3. Report completed work.
4. Report any blockers or unexpected issues.
5. Document testing results.
6. Identify remaining work.

### Project Progress

If `PROJECT_PROGRESS.md` exists:

- Read it before starting substantial work.
- Keep it updated when completing meaningful milestones.
- Record completed features, outstanding tasks, known issues, and relevant decisions.
- Do not mark unfinished work as completed.

Do not create progress updates for trivial changes unless the project requires them.

---

## 11. Pull Request Standards

Every Pull Request should contain:

### Summary

A short explanation of what changed and why.

### Changes

The main implementation details.

### Testing

The checks performed and their actual results.

### Documentation

Any relevant documentation updates.

### Additional Notes

Known limitations, breaking changes, migration requirements, or follow-up work.

Keep Pull Requests focused and reasonably sized.

Do not include unrelated changes in the same Pull Request.

---

## 12. Definition of Done

A task is considered complete only when:

- [ ] The requested functionality has been implemented.
- [ ] Existing architecture and project conventions are respected.
- [ ] Relevant documentation has been reviewed and updated if necessary.
- [ ] Documentation is clear, natural, and technically accurate.
- [ ] No unrelated files or functionality were modified.
- [ ] No installed packages or dependency internals were modified.
- [ ] Relevant tests and validation checks have been executed.
- [ ] No known regressions have been introduced.
- [ ] The final Git diff has been reviewed.
- [ ] Changes are committed on the appropriate branch.
- [ ] A Pull Request is prepared when required.
- [ ] Remaining limitations or unfinished work are communicated.

---

## 13. Final Rule

**The repository belongs to its maintainers, not the coding agent.**

Your responsibility is to make the requested changes safely, respect existing decisions, preserve user work, and leave the codebase in a better and verifiable state.

When uncertain, inspect the documentation, examine the existing implementation, and ask before making destructive, architectural, dependency, or security-related changes.

Never sacrifice repository integrity for speed.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
