import { render } from "@testing-library/react";
import Card from ".";

test("Card 컴포넌트 스냅샷 테스트", () => {
  const { container } = render(
    <Card
      title="제목"
      description="설명"
      imageUrl="https://via.placeholder.com/150"
    />,
  );
  expect(container).toMatchSnapshot();
});
