// src/lib/isMSWEnabled.ts

export function isMSWEnabled(): boolean {
  return (
    // 개발환경 (<-> 배포환경) && MSW로 API 모킹을 명시적으로 표현 -> true
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
  );
}
