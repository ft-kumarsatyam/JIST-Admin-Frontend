---
title: "JIST User Guide"
subtitle: "Khelo Tech — Product, Tech & Testing"
date: "August 2026"
author: Satyam Kumar
---

> Created by Satyam Kumar
> Welcome to JIST, the tool Khelo Tech uses to plan and track work across the Product, Tech, and Testing teams.

This guide is for everyone who uses JIST day to day. If you administer the server, read the Admin Guide instead.

JIST runs on **our own server**. Nothing you write here leaves the company.

---

# 1. Getting in

## Your account is created for you

You cannot sign yourself up. Self-registration is switched off deliberately, so the only people inside JIST are people who work here.

An administrator creates your account and gives you the address and your first password. If you do not have one, ask your team lead — do not look for a "Sign up" link, there isn't one.

## Signing in

1. Open the JIST address in your browser. Chrome, Firefox, Safari, and Edge all work.
2. Enter your **work email** and password.
3. You land on your workspace.

There is no "Sign in with Google" button and no magic-link email. Email and password is the only way in right now. That may change later; the Admin Guide covers how.

## Forgotten password

Our server does not send email yet, which means the "Forgot password" flow cannot reach you. **Ask an administrator to reset it for you.** They can set a new password directly.

## First thing to do

Change the password you were given. Click your avatar in the bottom-left corner, go to **Settings → Profile**, and set something only you know.

While you are there, fill in your display name and upload a photo. Avatars make assignee lists readable at a glance, which matters once a project has thirty people in it.

---

# 2. How JIST is organised

Five layers, from biggest to smallest:

| Layer         | What it is                                    | Example                 |
| ------------- | --------------------------------------------- | ----------------------- |
| **Workspace** | The whole company. One workspace: Khelo Tech. | `Khelo Tech`            |
| **Project**   | A product, service, or area of work.          | `Mobile App`            |
| **Work item** | A single piece of work. The basic unit.       | "Fix crash on checkout" |
| **Cycle**     | A time-boxed sprint inside a project.         | `Sprint 14`             |
| **Module**    | A feature or theme spanning many work items.  | `Payments v2`           |

Only administrators create workspaces and projects. You work inside the ones you have been added to.

If you cannot see a project you need, you have not been added to it. Ask an administrator — the project is not missing, your membership is.

---

# 3. Work items

A work item is a task, bug, feature, or chore. Everything you do in JIST comes back to work items.

## Creating one

Click **New work item** in the project, or open Power K with `Cmd/Ctrl + K` and start typing. You need a title. Everything else can wait.

Write titles someone else can act on. "Login broken" tells a reader nothing — broken how, for whom, on what. "Login fails with 500 error on Android when email contains a plus sign" can be picked up by anyone.

## The fields that matter

**State** — where the item is in its life. Every project starts with five, grouped into categories that JIST uses for progress charts:

| State       | Group       | Meaning                      |
| ----------- | ----------- | ---------------------------- |
| Backlog     | `backlog`   | Captured, not committed to   |
| Todo        | `unstarted` | Committed, not begun         |
| In Progress | `started`   | Someone is working on it now |
| Done        | `completed` | Finished                     |
| Cancelled   | `cancelled` | Deliberately dropped         |

Administrators can add states per project. A testing-heavy project might add "In Review" or "Ready for QA" between In Progress and Done.

**Priority** — Urgent, High, Medium, Low, or None. Default is None.

Be honest here. If everything is Urgent, nothing is, and the priority filter becomes useless to everyone. Reserve Urgent for work that justifies interrupting someone today.

**Assignee** — who is doing it. A work item can have several, but one clear owner beats three vague ones. When everyone owns it, nobody does.

**Labels** — free-form tags for slicing work: `bug`, `regression`, `tech-debt`, `customer-reported`. Agree on a small set per project and stick to it. Twenty near-identical labels are worse than five good ones.

**Start and target date** — when work should begin and finish.

**Estimate** — relative sizing, if your project has estimates enabled.

## Descriptions

The description is a full rich-text editor. You can:

- Format with headings, bold, lists, and tables
- Paste or drag in **images and files** (up to 5 MB each by default)
- Add code blocks with syntax highlighting
- Link to other work items so the relationship is visible from both sides

For a bug, always include: what you did, what you expected, what actually happened, and where (browser, device, environment). A bug report without reproduction steps usually comes straight back to you.

## Sub-items and relations

Break large work into **sub-items**. The parent shows progress across its children.

Link related work with **relations**:

- **Blocking / Blocked by** — real sequencing. Use it; the dependency shows up on both items.
- **Related to** — loose connection, no ordering implied.
- **Duplicate of** — close the copy, keep the original.

## Comments and activity

Discuss the work on the work item, not in chat. A decision made in a direct message is invisible to whoever picks the item up in three months.

Every change is recorded in the activity feed — who changed what, when. Nothing is silently overwritten.

---

# 4. Views and layouts

The same work items can be displayed five ways. Switch freely; you are changing the lens, not the data.

| Layout             | Best for                                   |
| ------------------ | ------------------------------------------ |
| **List**           | Reading quickly, bulk edits                |
| **Board** (kanban) | Daily standups, seeing flow and pile-ups   |
| **Calendar**       | Deadlines and date clashes                 |
| **Spreadsheet**    | Comparing many fields at once, bulk triage |
| **Gantt**          | Sequencing and dependencies over time      |

## Filtering and grouping

Filter by state, priority, assignee, label, cycle, module, or date. Group by any of the same. "Board grouped by assignee, filtered to this cycle" is a standup in one screen.

## Saved views

Built a filter combination you want back tomorrow? Save it as a **View**. Saved views can be private to you or shared with the project, so the whole team opens the same screen.

Views worth creating early:

- **My open work** — assigned to me, state not Done or Cancelled
- **Urgent and High** — priority filter, sorted by target date
- **Unassigned** — nobody owns it yet, so nobody will do it
- **Ready for QA** — whatever state your team uses to hand over to testing

---

# 5. Cycles — how we run sprints

A **Cycle** is a sprint: a fixed window with a set of work items in it.

1. An administrator or project lead creates the cycle with a start and end date.
2. The team pulls work items into it.
3. Progress is tracked with a burn-down chart.
4. At the end, unfinished items are moved to the next cycle or back to the backlog.

Only one cycle is active per project at a time. Work items not in any cycle sit in the backlog.

**The burn-down chart is the honest view of a sprint.** A flat line for four days means the sprint is in trouble regardless of how standup sounded.

---

# 6. Modules — grouping by feature

A **Module** groups work items by feature or theme, cutting across cycles. "Payments v2" might span three sprints and involve all three teams.

Use cycles to answer _when_, and modules to answer _what_. A work item can belong to one cycle and one module at the same time.

Each module has its own progress view, which is what you show when someone asks how a feature is tracking.

---

# 7. Pages — documents inside JIST

**Pages** are collaborative documents living inside a project. Several people can edit one simultaneously and see each other's cursors.

Good uses:

- Meeting notes and decision records
- Specs and requirements
- Runbooks and how-tos
- Retrospectives

You can turn any line of a page into a work item, which makes them useful for turning a planning discussion into tracked work without retyping anything.

---

# 8. Analytics

**Analytics** shows what is actually happening: work items by state, by assignee, by priority, completion over time.

Use it in retros to check whether what the team felt matches what happened. Both are useful, and they are not always the same.

---

# 9. Notifications

The bell icon shows updates on work you are involved in — assignments, mentions, comments, state changes.

**Because our server does not send email yet, the bell is the only place you will see these.** Check it. Nothing will land in your inbox.

Mention someone with `@` in a comment to notify them directly. Subscribe to any work item to follow it without being assigned.

---

# 10. Team conventions

These are ours, not JIST's defaults.

**One workspace.** Everything lives in `Khelo Tech`. Work items can only be linked and moved inside a single workspace, so splitting into several would cut Product off from Tech and Tech off from Testing.

**Every work item has an owner.** Unassigned work does not get done. If you cannot assign it, it belongs in the backlog, not in the cycle.

**Bugs need reproduction steps.** Testing will send it back otherwise, and you will both have wasted a day.

**Discuss on the work item.** Not in chat. Future you will need the reasoning.

**Update state as you go, not at standup.** The board is only useful if it is true right now.

**Close what is done.** An item sitting in In Progress for three weeks tells everyone the board cannot be trusted.

---

# 11. Keyboard shortcuts

**`Cmd + K` on Mac, `Ctrl + K` on Windows** opens Power K, the command palette. Search, jump to a project, or run an action from one box. It is the fastest route to anything in JIST — learn this one first.

With a work item open, single keys edit fields directly without reaching for the mouse:

| Key | Sets     |
| --- | -------- |
| `S` | State    |
| `P` | Priority |
| `A` | Assignee |
| `L` | Labels   |

JIST ships a full, always-current list built into the app: click **Help** at the bottom of the sidebar, then **Keyboard shortcuts**. Shortcuts change between versions, so trust that list over any document, including this one.

---

# 12. Getting help

| Problem                 | What to do                                               |
| ----------------------- | -------------------------------------------------------- |
| Cannot sign in          | Ask an administrator to reset your password              |
| Cannot see a project    | Ask to be added — you are not a member of it             |
| Cannot create a project | Correct; only administrators can                         |
| Upload rejected         | File is over the 5 MB limit                              |
| Something looks broken  | Tell an administrator with a screenshot and the page URL |

**JIST version:** 1.4.0 Community Edition, self-hosted by Khelo Tech.
