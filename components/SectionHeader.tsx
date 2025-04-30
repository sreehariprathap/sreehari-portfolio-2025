"use client";

import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  number: string;
}

export default function SectionHeader({ title, number }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline mb-12 relative">
      <motion.h2
        className="text-5xl font-bold relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      <motion.span
        className="text-lg text-neutral-500 dark:text-neutral-400 ml-4 opacity-70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {number}
      </motion.span>
      
      <motion.div
        className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        whileInView={{ width: "4rem" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </div>
  );
}