'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: 0.4, opacity: { duration: 0.1 } },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: 0.6, ease: 'linear', opacity: { duration: 0.1 } },
  },
};

export function InstagramIcon() {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          variants={pathVariants}
          animate={controls}
          initial="normal"
          x="2" y="2" width="20" height="20" rx="5" ry="5"
        />
        <motion.circle
          variants={pathVariants}
          animate={controls}
          initial="normal"
          cx="12" cy="12" r="5"
        />
        <motion.line
          variants={pathVariants}
          animate={controls}
          initial="normal"
          x1="17.5" y1="6.5" x2="17.51" y2="6.5"
        />
      </svg>
    </div>
  );
}
