import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "task_manager_tasks_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [hydrated, setHydrated] = useState(false);

  // Load once
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? safeParse(raw) : null;

    if (Array.isArray(data)) {
      const normalized = data
        .filter((t) => t && typeof t === "object")
        .map((t) => ({
          id: typeof t.id === "string" ? t.id : generateId(),
          title: typeof t.title === "string" ? t.title : "",
          completed: Boolean(t.completed),
          createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
        }))
        .filter((t) => t.title.trim().length > 0);

      setTasks(normalized);
    }

    setHydrated(true);
  }, []);

  // Save on change (only after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  function addTask(title) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: generateId(),
        title: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, newTitle) {
    const trimmed = newTitle.trim();
    if (!trimmed) return false;

    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)));
    return true;
  }

  // Bonus: mark all as completed
  function markAllCompleted() {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
  }

  // Optional: clear completed
  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>מנהל משימות</h1>
          <div className="muted">
            סה״כ: {stats.total} | פעילות: {stats.active} | הושלמו: {stats.completed}
          </div>
        </div>

        <TaskForm onAdd={addTask} />
        <FilterBar value={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <div className="footer">
          <div className="row">
            <button
              type="button"
              onClick={markAllCompleted}
              disabled={tasks.length === 0 || stats.completed === stats.total}
            >
              סמן הכל כהושלם
            </button>

            <button
              type="button"
              onClick={clearCompleted}
              disabled={stats.completed === 0}
            >
              נקה משימות שהושלמו
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
