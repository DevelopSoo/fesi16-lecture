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

  test("상세 데이터 모킹 테스트", async () => {});
});
