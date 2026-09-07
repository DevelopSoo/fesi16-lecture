import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch 테스트", () => {
  test("API 호출 성공 시 데이터를 data 상태에 적절하게 저장하는지 확인", async () => {
    const mockData = { name: "성구" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetch("https://api.test.com"));

    // 초기 값 (data:null, loading: true, error: null)
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // 시간이 지나면
    // await findBy: API 호출 + state 변경 -> 1000ms 기다림 -> 화면에 나타날떄까지 기다림
    // act: state 변경 빠르게 해줌

    // waitFor
    await waitFor(() => {
      // 데이터가 올바르게 세팅되는지 확인
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(global.fetch).toHaveBeenCalledWith("https://api.test.com");
    });
  });

  test("에러 처리가 의도한대로 처리되는지 확인", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch("https://api.test.com"));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("네트워크 응답이 정상적이지 않습니다");
    });
  });

  test("네트워크 에러 시 error 상태가 업데이트되는지 확인", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() => useFetch("https://api.test.com"));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("네트워크 에러");
    });
  });
});

// fetch 의 오류 처리
// 1. 서버에서 200이 아닌 400번 대 에러, 500번 대 에러 등이 발생 -> fetch 는 성공/ response.ok 는 false
// mockResolvedValue -> ok: false
// 2. 네트워크 (와이파이, 서버 꺼짐) -> fetch 실패 -> 바로 catch
// mockRejectedValue
