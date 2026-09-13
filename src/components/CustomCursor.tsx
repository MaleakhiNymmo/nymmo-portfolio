import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on fine-pointer devices (ignore touch/mobile)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update inner dot immediately with zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth 120fps lerp loop for the outer trailing ring
    const render = () => {
      // Lerp smoothing factor (0.22 = fast, silky smooth, responsive)
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], .hover-target, input, textarea');
      if (clickable) {
        const text = clickable.getAttribute('data-cursor-text') || '';
        setHoverText(text);
        setIsHovered(true);
      } else {
        setHoverText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer fluid trailing ring with mix-blend-difference */}
      <div
        ref={ringRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center mix-blend-difference ${
          isHovered
            ? hoverText
              ? 'w-20 h-20 bg-white/20 border-white'
              : 'w-12 h-12 bg-white/15 border-white'
            : 'w-7 h-7 bg-transparent border-white/60'
        }`}
      >
        {hoverText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase text-center px-1 select-none pointer-events-none">
            {hoverText}
          </span>
        )}
      </div>

      {/* Center solid dot that locks instantly to cursor with 0ms delay */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-150 mix-blend-difference ${
          isHovered ? 'w-1 h-1 opacity-0' : 'w-1.5 h-1.5 opacity-100'
        }`}
      />
    </div>
  );
}
