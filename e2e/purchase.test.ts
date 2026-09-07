// e2e/purchase.test.ts

import { test, expect } from "@playwright/test";

test("로그인 후 구매까지의 시나리오", async ({ page }) => {
  // 1. 로그인 페이지에 접속한다.
  await page.goto("/auth/login");
  // 2. 이메일 입력창에 abc@test.com을 입력한다.
  await page.getByRole("textbox", { name: "이메일" }).fill("abc@test.com");
  // 3. 비밀번호 입력창에 123123을 입력한다.
  await page.getByRole("textbox", { name: "비밀번호" }).fill("123123");
  // 4. 로그인 버튼을 클릭한다. 자동으로 상품 목록 페이지로 이동한다.
  await page.getByRole("button", { name: "로그인" }).click();
  // 5. 상품 페이지에 접속했는지 확인한다.
  await expect(page).toHaveURL("/products");
  // 6. 첫 번째 상품을 찾는다. -> product- 로 시작하는 테스트 아이디를 가진 요소를 찾기
  const firstProduct = page.locator(`[data-testid^="product-"]`).first();
  await expect(firstProduct).toBeVisible();

  // 7. 목록 페이지의 첫 번째 상품을 클릭한다.
  const productId = await firstProduct.getAttribute("data-product-id");
  await firstProduct.click();

  // url 이 맞는지?
  await expect(page).toHaveURL(`/products/${productId}`);

  // 수량 증가 + 버튼 2번 누르고 구매 버튼 누르면 구매 완료 페이지로 이동하는지
  // 10. 수량 증가 버튼을 2번 클릭한다.
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  // 11. 구매 버튼을 클릭한다.
  await page.getByRole("button", { name: "구매" }).click();
  // 12. 구매 완료 페이지에 접속했는지 확인한다.
  await expect(page).toHaveURL("/purchase/complete");
  // 13. 구매 완료 페이지에 구매 완료 메시지가 보이는지 확인한다.
  await expect(page.getByText("구매가 완료되었습니다")).toBeVisible();
});
