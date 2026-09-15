/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · macrostructure: Kinetic Editorial Headline · component: Giant Interactive Text Marquee (Mriya Studio Inspired) */

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, wrap } from 'motion/react';

interface GiantTextMarqueeProps {
  theme?: 'paper' | 'dark';
}

export default function GiantTextMarquee({
  theme = 'dark'
}: GiantTextMarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [trackWidth, setTrackWidth] = useState<number>(0);

  const measureRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Direction & Speed Physics (Flywheel kinetics)
  // targetDirection: -1 = moving left (scrolling down / default), 1 = moving right (scrolling up)
  const targetDirection = useRef<-1 | 1>(-1);
  const currentDirection = useRef<number>(-1);
  const lastScrollY = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Measure track width synchronously and dynamically via ResizeObserver
  useLayoutEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        const width = measureRef.current.offsetWidth;
        if (width > 0) {
          setTrackWidth(width);
        }
      }
    };

    measure();

    const timer = setTimeout(measure, 100);

    let ro: ResizeObserver | null = null;
    if (measureRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(measureRef.current);
    }

    return () => {
      clearTimeout(timer);
      ro?.disconnect();
    };
  }, []);

  // Monitor scroll direction and velocity with smooth recovery
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Only update direction if scroll movement is meaningful
      if (Math.abs(diff) > 2) {
        // Scrolling down -> moves left (-1)
        // Scrolling up -> moves right (1)
        targetDirection.current = diff > 0 ? -1 : 1;
      }

      lastScrollY.current = currentY;

      // Optional auto-restore to left flow after scroll stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        // Keeps the active direction until next user scroll gesture
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // 120fps Kinetic Loop with Smooth Direction Interpolation & Hover Deceleration
  useAnimationFrame((time, delta) => {
    if (trackWidth <= 0) return;

    const clampedDelta = Math.min(delta, 64);

    // Smoothly interpolate currentDirection towards targetDirection (kinetics)
    currentDirection.current += (targetDirection.current - currentDirection.current) * 0.08;

    // Brisk kinetic cruise speed (pixels per second)
    const baseSpeed = 175;
    // Decelerate smoothly to near-zero when hovered
    const speedFactor = isHovered ? 0.06 : 1.0;

    const moveBy = baseSpeed * speedFactor * currentDirection.current * (clampedDelta / 1000);
    const current = x.get() + moveBy;

    // Mathematical zero-snap wrapping
    x.set(wrap(-trackWidth, 0, current));
  });

  // Repetitions to ensure continuous coverage on ultra-wide / 4K displays
  const repetitions = [0, 1, 2, 3];

  const MARQUEE_ITEMS = [
    { text: "Let's Work Together", dot: "⋅" },
    { text: "Initiate Collaboration", dot: "⋅" },
    { text: "Open For Opportunities", dot: "⋅" }
  ];

  return (
    <section className="relative z-10 w-full select-none overflow-hidden bg-[var(--bg-canvas)] py-6 sm:py-10 md:py-14 transition-colors duration-300">
      {/* Left & Right Smooth Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-[var(--bg-canvas)] via-[var(--bg-canvas)]/90 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-[var(--bg-canvas)] via-[var(--bg-canvas)]/90 to-transparent z-20" />

      {/* Kinetic Marquee Track */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full overflow-hidden flex select-none group py-8 sm:py-10 md:py-12"
      >
        <motion.div style={{ x }} className="flex shrink-0 items-center flex-nowrap">
          {repetitions.map((repIndex) => (
            <div
              key={`giant-rep-${repIndex}`}
              ref={repIndex === 0 ? measureRef : undefined}
              className="flex shrink-0 items-center flex-nowrap"
              aria-hidden={repIndex > 0 ? 'true' : undefined}
            >
              {MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={`item-${repIndex}-${idx}`}
                  className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14"
                >
                  {/* Giant Editorial Statement Text */}
                  <span
                    className={`font-display font-semibold sm:font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[124px] tracking-tight leading-none whitespace-nowrap transition-colors duration-300 py-2 ${theme === 'dark'
                        ? (isHovered
                          ? 'text-[#C9F805] drop-shadow-[0_0_35px_rgba(201,248,5,0.4)]'
                          : 'text-[var(--color-ink)] group-hover:text-[#C9F805]')
                        : (isHovered
                          ? 'text-[#78350F]'
                          : 'text-[var(--color-ink)] group-hover:text-[#78350F]')
                      }`}
                  >
                    {item.text}
                  </span>

                  {/* Elegant Editorial Separator */}
                  <span
                    className={`font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-[90px] select-none transition-colors duration-300 ${theme === 'dark'
                        ? 'text-zinc-600 group-hover:text-[#C9F805]/70'
                        : 'text-zinc-400 group-hover:text-[#78350F]/70'
                      }`}
                  >
                    {item.dot}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
