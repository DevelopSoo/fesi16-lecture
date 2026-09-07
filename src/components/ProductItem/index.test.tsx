import { render, screen } from "@testing-library/react";
import ProductItem from ".";

test("props에 전달된 상품의 title과 description이 제대로 렌더링되는지 확인", () => {
  const title = "테스트 상품명";
  const description = "테스트 상품 설명입니다.";
  render(<ProductItem title={title} description={description} />);

  const titleElement = screen.getByText(title);
  const descriptionElement = screen.getByText(description);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test("증가 버튼, 감소 버튼, 초기 숫자 1이 존재하는지 확인", () => {
  render(
    <ProductItem title="테스트 상품명" description="테스트 상품 설명입니다." />,
  );

  const decreaseButton = screen.getByRole("button", { name: "-" });
  const increaseButton = screen.getByRole("button", { name: "+" });
  const initialNumber = screen.getByText("1");

  expect(decreaseButton).toBeInTheDocument();
  expect(increaseButton).toBeInTheDocument();
  expect(initialNumber).toBeInTheDocument();
});

// 3. 구매하기 버튼이 존재하는지 확인하기
test("구매하기 버튼이 존재하는지 확인", () => {
  render(<ProductItem title="상품명" description="상품 설명" />);

  // 구매하기 버튼 확인
  const purchaseButton = screen.getByRole("button", { name: "구매하기" });
  expect(purchaseButton).toBeInTheDocument();
});

// 4. 상품이 품절 상태일 때 "품절" 텍스트가 렌더링되는지 확인하기
test("상품이 품절 상태일 때 '품절' 텍스트가 렌더링되는지 확인", () => {
  render(
    <ProductItem
      title="품절 상품"
      description="품절된 상품입니다."
      isSoldOut={true}
    />,
  );

  // "품절" 텍스트가 렌더링되는지 확인
  const soldOutText = screen.getByText("품절");
  expect(soldOutText).toBeInTheDocument();
});

// 5. 상품이 품절 상태일 때 버튼이 비활성화되고 CSS 클래스명에 opacity-50과 cursor-not-allowed가 포함되는지 확인하기
test("상품이 품절 상태일 때 버튼이 비활성화되고 CSS 클래스에 opacity-50과 cursor-not-allowed가 포함되는지 확인", () => {
  render(
    <ProductItem
      title="품절 상품"
      description="품절된 상품입니다."
      isSoldOut={true}
    />,
  );

  // 구매하기 버튼 찾기
  const purchaseButton = screen.getByRole("button", { name: "구매하기" });

  // 버튼이 비활성화되어 있는지 확인
  expect(purchaseButton).toBeDisabled();

  // CSS 클래스에 opacity-50이 포함되어 있는지 확인
  expect(purchaseButton).toHaveClass("opacity-50");

  // CSS 클래스에 cursor-not-allowed가 포함되어 있는지 확인
  expect(purchaseButton).toHaveClass("cursor-not-allowed");
});
