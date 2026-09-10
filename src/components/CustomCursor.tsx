import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');

  // Use motion values for hardware accelerated transforms
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if element or parent has target classes
      const clickable = target.closest('a, button, [role="button"], .hover-target');
      if (clickable) {
        setIsHovered(true);
        const text = clickable.getAttribute('data-cursor-text') || '';
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer dynamic spring circle */}
      <motion.div
        id="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverText ? 80 : 40) : 24,
          height: isHovered ? (hoverText ? 80 : 40) : 24,
          backgroundColor: isHovered ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255, 255, 255, 0.2)',
          borderColor: isHovered ? '#94a3b8' : '#ffffff',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full border border-white pointer-events-none z-50 flex items-center justify-center backdrop-blur-[1px]"
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest uppercase font-mono text-slate-300 whitespace-nowrap"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Small constant follow dot */}
      <motion.div
        id="custom-cursor-inner"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-slate-400 pointer-events-none z-50 mix-blend-difference"
      />
    </>
  );
}
