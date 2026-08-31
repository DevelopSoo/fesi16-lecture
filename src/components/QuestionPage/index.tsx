"use client";

import { motion } from "motion/react";

interface QuestionPageProps {
  question: {
    question: string;
    options: string[];
  };
  onAnswer: (answer: string) => void;
}

export default function QuestionPage({
  question,
  onAnswer,
}: QuestionPageProps) {
  return (
    <div className="w-full max-w-2xl px-4">
      <motion.h2
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-2xl font-bold"
      >
        {question.question}
      </motion.h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(option)}
            className="w-full rounded-lg bg-white p-4 text-left shadow transition-shadow duration-500 hover:shadow-lg"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
