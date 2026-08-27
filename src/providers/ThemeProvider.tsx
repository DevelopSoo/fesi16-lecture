"use client";

import { useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };
  return (
    // 여기 div에 dark 클래스를 토글해보세요.
    <div className={isDark ? "dark" : ""}>
      <button
        onClick={toggleDarkMode}
        className="rounded-md border border-gray-300 p-2"
      >
        다크모드 버튼
      </button>
      {children}
    </div>
  );
}
