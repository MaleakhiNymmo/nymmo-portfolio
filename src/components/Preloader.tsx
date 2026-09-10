import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olá",
  "やあ",
  "Guten Tag",
  "Hallo"
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // Give the final word a moment to settle before triggering exit
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1500 : 300); // Adjusted timing slightly for smoothness
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center h-20 w-full overflow-hidden">
        <AnimatePresence>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="text-black text-4xl font-semibold tracking-wider absolute font-sans"
          >
            {words[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
