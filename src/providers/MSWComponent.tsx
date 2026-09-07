// src/providers/MSWComponent.tsx

"use client";

import { useEffect, useState } from "react";

// 서버
// 1. mswReady: 기본값 -> false
// 2. useEffect 무시
// 3. mswReady 값: false -> 화면: null -> 서버에서 null 렌더링
// 4. 다했다 -> 브라우저로 넘겨
// 5. 브라우저: 비어있는 html 만 받는다.
export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  // 브라우저에서 msw 가 준비됐는지 확인하는 state
  // msw는 개발환경에서만 쓰고, 배포환경에서는 쓰지 말자.
  const [mswReady, setMswReady] = useState(
    // 개발환경에서의 렌더링 방식 vs 프로덕션 환경에서의 렌더링 방식
    process.env.NODE_ENV !== "development", // 개발환경 -> false, 배포환경 -> true
  );

  // useEffect는 브라우저에서 실행
  useEffect(() => {
    const init = async () => {
      // msw/browser는 브라우저 전용 -> SSR 평가 방지 + 메인 번들 분리 위해 동적 import
      const { worker } = await import("@/mocks/browser");
      await worker.start({ onUnhandledRequest: "bypass" });
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
