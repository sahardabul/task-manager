import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={submit} className="row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="הכנס משימה חדשה..."
        aria-label="משימה חדשה"
      />
      <button className="primary" type="submit">
        הוסף
      </button>
    </form>
  );
}
