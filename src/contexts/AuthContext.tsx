// src/contexts/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// 초기 인증 상태를 세팅하는 용도
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 인증 안됨 <-> 인증
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // props 없이 다른 컴포넌트로 공유하고 싶은 값들
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {/* 컴포넌트 -> useAuth 는 AuthContext.Provider 내부에서만 사용할 수 있어 */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용되어야 합니다.");
  }

  return context;
};
