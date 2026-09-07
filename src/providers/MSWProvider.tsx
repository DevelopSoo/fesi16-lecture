// src/app/providers/MSWProvider.tsx
"use client";
import { Suspense, use, type ReactNode } from "react";
import { isMSWEnabled } from "@/lib/isMSWEnabled";

const mockingReady: Promise<unknown> =
  typeof window === "undefined" || !isMSWEnabled()
    ? Promise.resolve() // 서버사이드 & MSW를 끄는 경우 바로 통과
    : import("@/mocks/browser").then(({ worker }) =>
        worker.start({ onUnhandledRequest: "bypass" }),
      );

function MockingGate({ children }: { children: ReactNode }) {
  use(mockingReady); // mockingReady가 완료될 때까지 가장 가까운 Suspense에서 대기 (fallback이 표시)
  return <>{children}</>;
}

export function MSWProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MockingGate>{children}</MockingGate>
    </Suspense>
  );
}
