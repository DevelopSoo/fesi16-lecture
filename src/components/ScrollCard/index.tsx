// src/components/ScrollCard/index.tsx

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref, // ref로 감싸져있는 스크롤 진행율을 감지한다.
    // start end: 타겟의 시작점(start)이 뷰포트 아래(end)를 지나는 순간이 스크롤 진행률이 0이다.
    offset: ["start end", "end start"],
  });

  // 스크롤 진행률에 따라 opacity를 변경 0 => 1
  const opacity = useTransform(
    scrollYProgress, // scrollYProgress를 어떻게 바꾸겠다.
    [0, 0.3, 0.7, 1], // 스크롤 진행도
    [0.3, 1, 1, 0.3], // 반환할 값
  );

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, -200]);

  const scale = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0.2 -> 0.4 -> 0.6 -> 0.8일 때
    // scale이 0.8 -> 1 -> 1 -> 0.8이 되도록 설정
    [0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity, // 스크롤 진행도가 0일 때: 0.3, //
        y,
        scale,
      }}
      className="h-64 rounded-xl bg-gray-400 p-6"
    >
      {children}
    </motion.div>
  );
}
