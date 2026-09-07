// src/instrumentation.ts

import { isMSWEnabled } from "./lib/isMSWEnabled";

export async function register() {
  // Node 런타임에서만, 그리고 목이 활성화될 때만 실행한다.
  // (Edge Runtime에서는 실행되지 않음)
  if (process.env.NEXT_RUNTIME === "nodejs" && isMSWEnabled()) {
    // msw/node는 Edge로 번들 불가 -> 가드 안 동적 import로 Edge 빌드에서 제거됨
    const { server } = await import("@/mocks/server");
    // onUnhandledRequest: "bypass" -> 처리되지 않은 요청은 실제 네트워크 요청으로 전달
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
