// src/hooks/useLocalStorage.ts
"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  // 로컬 스토리지가 변하면 callback을 실행할 것
  window.addEventListener("storage", callback);
  // 다른 탭간의만 읽을 수 있다.
  // 컴포넌트가 언마운트되면 storage 이벤트 리스너를 제거할 것
  return () => window.removeEventListener("storage", callback);
}

function useLocalStorage(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null,
  );
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  // 같은 탭에도 "값 바뀌었어!" 하고 직접 알려줍니다
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

export { useLocalStorage, setLocalStorage };
