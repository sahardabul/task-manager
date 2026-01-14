import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FilterBar from "../components/FilterBar.jsx";

test("FilterBar calls onChange when clicking a filter and reflects selected state", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<FilterBar value="all" onChange={onChange} />);

  const completedBtn = screen.getByRole("button", { name: "הושלמו" });
  await user.click(completedBtn);

  expect(onChange).toHaveBeenCalledWith("completed");

  expect(screen.getByRole("button", { name: "הכל" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "הושלמו" })).toHaveAttribute("aria-pressed", "false");
});
