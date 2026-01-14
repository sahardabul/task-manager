import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TaskForm from "../components/TaskForm.jsx";

test("TaskForm calls onAdd with the typed value and clears input", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<TaskForm onAdd={onAdd} />);

  const input = screen.getByLabelText("משימה חדשה");
  await user.type(input, "ללמוד React");
  await user.click(screen.getByRole("button", { name: "הוסף" }));

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onAdd).toHaveBeenCalledWith("ללמוד React");
  expect(input).toHaveValue("");
});
