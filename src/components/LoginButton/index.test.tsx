import { fireEvent, render, screen } from "@testing-library/react";
import { LoginButton } from ".";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { renderWithAuth } from "@/testHelpers/renderWithAuth";

describe("LoginButton 컴포넌트 테스트", () => {
  test("인증되지 않은 경우 로그인 버튼이 올바르게 렌더링되는지 확인", () => {
    renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });

    expect(loginButton).toBeInTheDocument();
  });

  test("인증된 경우 로그아웃 버튼이 렌더링되는지 확인", () => {
    const authenticatedValue = {
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    };
    renderWithAuth(<LoginButton />, authenticatedValue);

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
  });

  test("로그인 버튼 클릭 시 context의 로그인 함수가 호출되는지 확인", () => {
    const authValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };
    renderWithAuth(<LoginButton />, authValue);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    // 로그인 함수가 호출되는지 확인...???
    expect(authValue.login).toHaveBeenCalled();
  });

  test("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되는지 확인", () => {
    renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
  });
});
