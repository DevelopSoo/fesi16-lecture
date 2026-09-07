import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 테스트", () => {
  test("useInputs 인자로 받은 초기값이 올바르게 세팅되는지 확인", () => {
    const { result } = renderHook(() => useInputs({ email: "", password: "" }));
    expect(result.current.values).toEqual({
      email: "",
      password: "",
    });
  });

  test("handleChange 함수가 값을 올바르게 업데이트하는지 확인", () => {
    const { result } = renderHook(() => useInputs({ email: "", password: "" }));

    const event = {
      target: {
        name: "email",
        value: "abc@naver.com",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values).toEqual({
      email: "abc@naver.com",
      password: "",
    });
  });
});
