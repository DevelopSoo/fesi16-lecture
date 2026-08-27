// src/components/Input/index.tsx

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  // 1. clsx
  //    - falsy 값 자동 제거
  //    - 조건부로 묶기
  //    - 문자열 병합
  // 2. twMerge
  //
  return (
    <input
      type={type}
      className={twMerge(
        clsx(
          "w-full rounded-md border border-gray-300 px-3 py-1 shadow-xs",
          className,
        ),
      )}
      {...props}
    />
  );
}
