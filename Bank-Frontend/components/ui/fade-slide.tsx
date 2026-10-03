"use client";

import { motion } from "motion/react";

interface FadeSlideProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/**
 * FadeSlide — wraps a single element to animate it in on first page load.
 * Uses a smooth spring + opacity transition.
 * delay: seconds offset before this element starts appearing.
 */
export function FadeSlide({ children, delay = 0, className, y = 16 }: FadeSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1], // gentle deceleration — slow start, graceful settle
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
