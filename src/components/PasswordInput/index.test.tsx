// src/components/PasswordInput/index.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { PasswordInput } from ".";

test("초기 상태에서 비밀번호가 숨겨져 있고(type='password'), '보기' 버튼이 보이는지 확인한다.", () => {
  render(<PasswordInput />);

  const input = screen.getByPlaceholderText("비밀번호를 입력하세요.");
  const button = screen.getByRole("button", { name: "보기" });

  expect(input).toHaveAttribute("type", "password");
  expect(button).toBeInTheDocument();
});

test("'보기' 버튼을 클릭하면 비밀번호가 보이고(type='text'), 버튼 텍스트가 '숨기기'로 변경되는지 확인한다.", () => {
  render(<PasswordInput />);

  const button = screen.getByRole("button", { name: "보기" });

  fireEvent.click(button);

  const input = screen.getByPlaceholderText("비밀번호를 입력하세요.");
  expect(input).toHaveAttribute("type", "text");
  expect(button).toHaveTextContent("숨기기");
});

test("'숨기기' 버튼을 클릭하면 다시 비밀번호가 숨겨지고(type='password'), 버튼 텍스트가 '보기'로 변경됩니다.", () => {
  render(<PasswordInput />);

  // '보기' 버튼 클릭 후 '숨기기'로 변경
  const showButton = screen.getByRole("button", { name: "보기" });
  const input = screen.getByPlaceholderText("비밀번호를 입력하세요.");
  fireEvent.click(showButton);

  expect(showButton).toHaveTextContent("숨기기");
  expect(input).toHaveAttribute("type", "text");

  // '숨기기' 버튼 다시 클릭
  fireEvent.click(showButton);

  // 다시 '보기' 버튼이 보이고, 비밀번호가 숨겨지는지 확인
  expect(input).toHaveAttribute("type", "password");
  expect(showButton).toHaveTextContent("보기");
});
