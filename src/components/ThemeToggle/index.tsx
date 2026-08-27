"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("system")}
        className="rounded-md border border-gray-300 p-2 dark:text-white"
      >
        시스템
      </button>
      <button
        onClick={() => setTheme("dark")}
        className="rounded-md border border-gray-300 p-2 dark:text-white"
      >
        다크
      </button>
      <button
        onClick={() => setTheme("light")}
        className="rounded-md border border-gray-300 p-2 dark:text-white"
      >
        라이트
      </button>
    </div>
  );
}
