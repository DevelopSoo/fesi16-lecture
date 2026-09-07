import TodoItem from ".";
import { render, screen } from "@testing-library/react";

test("할 일 목록 상태 테스트", () => {
  render(<TodoItem task="낮잠자기" completed={true} />);

  const taskText = screen.getByText("낮잠자기");
  // <span>낮잠자기</span>
  expect(taskText).toHaveTextContent("낮잠자기");

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();
  expect(checkbox).toBeDisabled();

  const editButton = screen.getByRole("button", { name: "수정" });
  expect(editButton).toBeDisabled();

  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
