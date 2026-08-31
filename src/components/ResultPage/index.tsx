"use client";

import { motion } from "motion/react";

export default function ResultPage({ answers }: { answers: string[] }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="mb-6 text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        테스트 결과
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg bg-white p-6 shadow-lg"
      >
        {answers.map((answer, index) => (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            key={index}
            className="mb-2"
          >
            질문 {index + 1}: {answer}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}
