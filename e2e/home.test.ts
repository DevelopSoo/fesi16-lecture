import { expect, test } from "@playwright/test";

test("홈페이지가 올바르게 로드되는지 확인", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // 제목이 보이는지 확인
  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(title).toHaveText("게시글 목록");
});
