// 게시물 관련 모킹 데이터 모아놓는 곳

import { http, HttpResponse } from "msw";

export const postsHandlers = [
  // 메소드: GET
  // API 호출: http://localhost:4000/posts
  // 반환값: json 안에 있는 놈들
  http.get("http://localhost:4000/posts", () => {
    return HttpResponse.json([
      { id: 1, title: "첫 번째 게시글", body: "내용 1" },
      { id: 2, title: "두 번째 게시글", body: "내용 2" },
    ]);
  }),
  http.get("http://localhost:4000/posts/:id", () => {
    return HttpResponse.json({
      id: 1,
      title: "첫 번째 게시글",
      body: "내용 1",
    });
  }),
];
