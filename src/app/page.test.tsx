import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 테스트", () => {
  test("상세 데이터 모킹 테스트", async () => {
    expect(true).toBe(true);
  });
});
