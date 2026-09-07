import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter 테스트", () => {
  test("useCounter 훅의 인자가 초기값으로 세팅되는지 확인", () => {
    // 컴포넌트 렌더링
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test("increment 함수가 count 값을 1 증가시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(0));
    // 처음에는 0이고
    expect(result.current.count).toBe(0);

    // state 변경 => 리렌더링 기다릴 때
    act(() => {
      result.current.increment();
    });

    // 1이 된다.
    expect(result.current.count).toBe(1);
  });

  test("decrement 함수가 count 값을 1 감소시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);
    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });

  test("reset 함수가 count 값을 초기값으로 되돌리는지 확인", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(4);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(3);
  });
});
