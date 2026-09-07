import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from ".";

describe("LoginForm 테스트", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  describe("버튼 활성화 여부", () => {
    test("로그인 폼 첫 렌더링 시 로그인 버튼이 비활성화되어 있는지 확인", () => {
      const loginButton = screen.getByRole("button", { name: "로그인" });

      expect(loginButton).toBeDisabled();
    });

    test("이메일, 비밀번호 입력 시 로그인 버튼이 활성화되는지 확인", () => {
      const emailInput = screen.getByPlaceholderText("이메일을 입력하세요");
      const passwordInput =
        screen.getByPlaceholderText("비밀번호를 입력하세요");
      const loginButton = screen.getByRole("button", { name: "로그인" });

      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });

      expect(loginButton).toBeEnabled();
    });
  });

  describe("유효성 검사", () => {
    test("이메일 형식이 잘못된 경우 '올바른 이메일 형식이 아닙니다.'라는 에러 메세지가 표시되는지 확인", () => {
      const emailInput = screen.getByPlaceholderText("이메일을 입력하세요");

      fireEvent.change(emailInput, { target: { value: "test" } });

      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();
    });

    test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.'라는 에러 메시지가 표시되는지 확인", () => {
      const passwordInput = screen.getByLabelText("비밀번호");

      // 잘못된 비밀번호 입력
      fireEvent.change(passwordInput, { target: { value: "12345" } });

      // 에러 메시지 확인
      const errorMessage = screen.getByText(
        "비밀번호는 6자 이상이어야 합니다.",
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("제대로 된 이메일 입력 시 에러 메세지가 사라지는지 확인", () => {
      const emailInput = screen.getByLabelText("이메일");

      // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
      fireEvent.change(emailInput, { target: { value: "test" } });
      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe("로그인 요청", () => {
    test("로그인 버튼 클릭 시 모달창이 올바르게 열리는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true, // 200 번대로 온 경우
        json: jest.fn().mockResolvedValue({ message: "로그인 성공!" }),
      });
      // 이메일과 비밀번호 입력
      const emailInput = screen.getByLabelText("이메일");
      const passwordInput = screen.getByLabelText("비밀번호");
      const loginButton = screen.getByRole("button", { name: "로그인" });

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      // 로그인 버튼 클릭
      fireEvent.click(loginButton);

      // await로 살짝 기다리기
      // state 변경 시
      // setShowModal 실행 -> 컴포넌트 리렌더링 (state 가 변경) ->  화면 적용

      // 로그인 성공 시 모달창이 화면에 나타나는지 확인
      // findBy: 비동기적으로 요소를 찾는 함수, 요소가 DOM에 일정시간(1000ms) 동안 나타날 때까지 기다림
      // getBy: 바로 찾기 -> 없으면 에러
      // queryBy: 바로 찾기 -> 없으면 null 반환
      const modalTitle = await screen.findByText("로그인 성공");
      expect(modalTitle).toBeInTheDocument();
    });
  });
});
