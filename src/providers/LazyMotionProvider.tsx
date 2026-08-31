// src/providers/LazyMotionProvider.tsx

"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("@/lib/feature").then((res) => res.default);

// domAnimation: 기본 애니메이션만 들어가있는 기능
export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
