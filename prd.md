# PRD.md – Task Manager (React + Vite)

## 1) Background & Goal
The “Task Manager” app helps users manage a simple personal to-do list quickly and reliably. It supports filtering by status and stores data locally so tasks persist after a page refresh.

## 2) Target Users
- A single end user managing personal tasks in a browser (desktop/mobile).
- No sign-in or multi-user support.

## 3) Scope
### In Scope
- Full CRUD for tasks: add, edit, delete, toggle completed.
- Filtering: All / Active / Completed.
- Persistence using `localStorage`.
- Bulk actions (bonus): Clear completed + Mark all completed.
- Unit tests (at least 2) using Vitest + React Testing Library.

### Out of Scope
- Authentication and user accounts.
- Server/database persistence.
- Sharing tasks or syncing across devices.
- Real-time syncing between browser tabs.

## 4) Functional Requirements
### 4.1 Add Task
- User enters a task title.
- Clicking “Add” creates a new task and shows it in the list.
- Empty/whitespace-only tasks are not allowed.

### 4.2 Display Tasks
Each task item displays:
- Task title
- Status (completed / not completed)
- Actions: toggle, edit, delete

### 4.3 Toggle Completed
- User can toggle a task between completed and active.
- UI updates immediately and affects filtering.

### 4.4 Edit Task
- User can edit an existing task title.
- Saving an empty/whitespace-only value is not allowed.

### 4.5 Delete Task
- User can delete a single task from the list.

### 4.6 Filtering
- User can select one of the filters:
  - All (`all`)
  - Active (`active`)
  - Completed (`completed`)
- Selected filter has a visual/accessibility state (e.g., `aria-pressed`).

### 4.7 Persistence (localStorage)
- On app load: tasks are loaded from `localStorage` (if available).
- On task changes: tasks are saved automatically to `localStorage`.
- Refreshing the page does not remove tasks.

### 4.8 Bulk Actions (Bonus)
- “Mark all completed” sets all tasks to completed.
- “Clear completed” removes all completed tasks.

## 5) Non-Functional Requirements
- Performance: Instant feedback for typical task list sizes.
- Reliability: Safe parsing/loading from `localStorage` (handle invalid JSON).
- Basic accessibility: filter buttons use `aria-pressed`.

## 6) Acceptance Criteria
- User can add a task and it appears in the list.
- Page refresh keeps tasks (loaded from `localStorage`).
- User can toggle completed state and it persists.
- User can edit a task; empty values cannot be saved.
- User can delete tasks.
- Filters correctly show All/Active/Completed tasks.
- Bulk actions work: Mark all completed + Clear completed.
- `npm test` runs at least two passing tests.

## 7) Testing
Unit tests (Vitest + React Testing Library):
- `TaskForm` test: verifies `onAdd` is called and input clears.
- `FilterBar` test: verifies filter change callback + `aria-pressed` state.

## 8) Deliverables
- GitHub repository with full source code.
- `README.md` with description and run instructions.
- `TASK.md` checklist/progress file.
- `PRD.md` (this document).
