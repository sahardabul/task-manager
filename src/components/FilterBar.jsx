const FILTERS = [
  { id: "all", label: "הכל" },
  { id: "active", label: "פעילות" },
  { id: "completed", label: "הושלמו" },
];

export default function FilterBar({ value, onChange }) {
  return (
    <div className="filters" role="group" aria-label="סינון משימות">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className="filter-btn"
          aria-pressed={value === f.id}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
