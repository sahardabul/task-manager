import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <div className="empty">אין משימות להצגה לפי הפילטר שנבחר.</div>;
  }

  return (
    <div className="list" aria-label="רשימת משימות">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
