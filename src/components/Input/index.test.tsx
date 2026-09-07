import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("Input 컴포넌트에 미입력 시 X 버튼이 보이지 않아야 한다.", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  // getBy~~~: 존재하지 않으면 에러가 발생한다.
  // queryBy ~~~: 존재하지 않으면 그냥 null을 반환한다.
  // getBy~~~ 을 쓰면 되지만
  // 없을 수도 있는 상황에서는 queryBy를 쓰는 것이 좋다.
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  expect(input).toHaveValue("");
  // X 버튼이 보이지 않는지 확인
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트에 입력값이 있을 때 X 버튼이 보이는지 확인", () => {
  render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
});

// test("X 버튼 클릭 시 입력값이 지워지는지 확인", () => {
//   render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

//   const input = screen.getByRole("textbox");
//   const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

//   expect(input).toHaveValue("입력값");

//   // x 버튼을 클릭하면 -> 행동
//   fireEvent.click(deleteButton);

//   // 입력값이 지워졌는지
//   expect(input).toHaveValue("");
//   // deleteButton도 없어졌는지 확인
//   expect(deleteButton).not.toBeInTheDocument();
// });

test("X 버튼 클릭 시 onDelete 함수가 호출되는지 확인", () => {
  const onDelete = jest.fn();

  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  fireEvent.click(deleteButton);

  expect(onDelete).toHaveBeenCalled();
});

test("Input 컴포넌트에서 입력값 오류 시 에러 메세지가 보이는지 확인", () => {
  render(
    <Input
      isError={true}
      errorMessage="에러 메세지"
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />,
  );

  const errorMessage = screen.getByText("에러 메세지");

  expect(errorMessage).toBeInTheDocument();
});
