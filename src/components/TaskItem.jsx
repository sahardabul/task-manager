import { useEffect, useRef, useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => setDraft(task.title), [task.title]);
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  function startEdit() {
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraft(task.title);
    setIsEditing(false);
  }

  function saveEdit() {
    const ok = onEdit(task.id, draft);
    if (ok) setIsEditing(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={task.completed ? "סמן כלא הושלמה" : "סמן כהושלמה"}
      />

      {!isEditing ? (
        <div className="title">{task.title}</div>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="עריכת משימה"
        />
      )}

      <div className="task-actions">
        {!isEditing ? (
          <button type="button" onClick={startEdit}>
            ערוך
          </button>
        ) : (
          <>
            <button type="button" className="primary" onClick={saveEdit}>
              שמור
            </button>
            <button type="button" onClick={cancelEdit}>
              בטל
            </button>
          </>
        )}

        <button type="button" className="danger" onClick={() => onDelete(task.id)} aria-label="מחק משימה">
          מחק
        </button>
      </div>
    </div>
  );
}
