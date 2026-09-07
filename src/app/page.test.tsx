import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 테스트", () => {
  // test("API 호출 결과가 화면에 잘 렌더링되는지 확인", async () => {
  //   render(<Home />);
  //   const postListItems = await screen.findAllByRole("listitem");

  //   expect(postListItems).toHaveLength(2);

  //   expect(screen.getByText("1: 첫 번째 게시글")).toBeInTheDocument();
  //   expect(screen.getByText("내용 1")).toBeInTheDocument();
  //   expect(screen.getByText("2: 두 번째 게시글")).toBeInTheDocument();
  //   expect(screen.getByText("내용 2")).toBeInTheDocument();
  // });

  test("상세 데이터 모킹 테스트", async () => {
    render(<Home />);
    const postItem = await screen.findByText("1: 첫 번째 게시글");
    expect(postItem).toBeInTheDocument();
  });

  test("네트워크 에러 발생 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.error(); // 와이파이, 서버 닫힘
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });

  test("서버 에러 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.json(null, {
          status: 500,
        });
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });
});
