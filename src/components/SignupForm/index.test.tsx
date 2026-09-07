// src/components/SignupForm.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { SignupForm } from ".";
import userEvent from "@testing-library/user-event";

test("이메일, 비밀번호, 확인 비밀번호 입력 후 제출 이벤트 테스트", async () => {
  const user = userEvent.setup();
  render(<SignupForm />);

  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 이메일 입력 필드 확인
  const emailInput = screen.getByLabelText("이메일");
  await user.type(emailInput, "test@example.com");
  await user.tab();
  await user.tab();

  const passwordInput = screen.getByLabelText("비밀번호");
  expect(passwordInput).toHaveFocus();
  await user.type(passwordInput, "password123");
  await user.tab();
  await user.tab();

  // 확인 비밀번호 입력 필드 확인
  const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");
  expect(confirmPasswordInput).toHaveFocus();
  // 확인 비밀번호 입력
  await user.type(confirmPasswordInput, "password123");
  // 확인 비밀번호 필드에서 탭 키를 눌러 포커스 이동
  await user.tab();
  // X 버튼 부분에 focus 되어 한 번 더 탭 키를 눌러 포커스 이동
  await user.tab();

  const signupButton = screen.getByRole("button", { name: "회원가입" });
  expect(signupButton).toHaveFocus();

  await user.keyboard("{Enter}");
});
