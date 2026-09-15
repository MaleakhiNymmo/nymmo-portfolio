/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · macrostructure: Tactile Editorial Marquee · component: Motion GPU Continuous Tech Stack */

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, wrap } from 'motion/react';

export interface TechItem {
  id: string;
  name: string;
  brandColor: string;
  iconFile: string;
}

// ROW 1: Data Engineering, Backend & AI (Directly from Maleakhi's production projects)
const ROW_1: TechItem[] = [
  { id: 'docker', name: 'Docker', brandColor: '#2496ED', iconFile: 'docker.svg' },
  { id: 'python', name: 'Python', brandColor: '#3776AB', iconFile: 'python.svg' },
  { id: 'postgresql', name: 'PostgreSQL', brandColor: '#336791', iconFile: 'postgresql.svg' },
  { id: 'airflow', name: 'Apache Airflow', brandColor: '#017CEE', iconFile: 'airflow.svg' },
  { id: 'dbt', name: 'dbt Core', brandColor: '#FF694B', iconFile: 'dbt.svg' },
  { id: 'fastapi', name: 'FastAPI', brandColor: '#009688', iconFile: 'fastapi.svg' },
  { id: 'pytorch', name: 'PyTorch', brandColor: '#EE4C2C', iconFile: 'pytorch.svg' },
  { id: 'mongodb', name: 'MongoDB', brandColor: '#00ED64', iconFile: 'mongodb.svg' }
];

// ROW 2: Frontend, Mobile, Systems & Cloud (Directly from Maleakhi's production projects & Figma Frame 1)
const ROW_2: TechItem[] = [
  { id: 'github', name: 'GitHub', brandColor: '#FFFFFF', iconFile: 'github.svg' },
  { id: 'laravel', name: 'Laravel', brandColor: '#FF2D20', iconFile: 'laravel.svg' },
  { id: 'react', name: 'React', brandColor: '#61DAFB', iconFile: 'react.svg' },
  { id: 'react-native', name: 'React Native', brandColor: '#61DAFB', iconFile: 'react-native.svg' },
  { id: 'typescript', name: 'TypeScript', brandColor: '#3178C6', iconFile: 'typescript.svg' },
  { id: 'tailwind', name: 'Tailwind CSS', brandColor: '#06B6D4', iconFile: 'tailwind.svg' },
  { id: 'opencv', name: 'OpenCV', brandColor: '#ED1C24', iconFile: 'opencv.svg' },
  { id: 'mysql', name: 'MySQL', brandColor: '#4479A1', iconFile: 'mysql.svg' },
  { id: 'php', name: 'PHP', brandColor: '#777BB4', iconFile: 'php.svg' }
];

interface MarqueeRowProps {
  items: TechItem[];
  speed: number;
  isPaused: boolean;
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
  theme: 'paper' | 'dark';
  rowId: string;
}

function MarqueeRow({
  items,
  speed,
  isPaused,
  hoveredKey,
  setHoveredKey,
  theme,
  rowId
}: MarqueeRowProps) {
  const x = useMotionValue(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState<number>(0);

  // Synchronously measure trackWidth before browser paint
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

    // Fallback timer for delayed vector loading
    const timer = setTimeout(measure, 150);

    let ro: ResizeObserver | null = null;
    if (measureRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(measureRef.current);
    }

    return () => {
      clearTimeout(timer);
      ro?.disconnect();
    };
  }, [items]);

  // Continuous 120fps hardware-accelerated loop using Motion's mathematical wrap
  useAnimationFrame((time, delta) => {
    if (isPaused || trackWidth <= 0) return;
    // Clamp delta to prevent sudden spikes during tab switches
    const clampedDelta = Math.min(delta, 64);
    const moveBy = (speed * clampedDelta) / 1000;
    const current = x.get() - moveBy;
    x.set(wrap(-trackWidth, 0, current));
  });

  // Render 5 repetitions to comfortably exceed 4K viewport widths
  const repetitions = [0, 1, 2, 3, 4];

  return (
    <div className="w-full overflow-hidden flex select-none py-6 sm:py-8">
      <motion.div style={{ x }} className="flex shrink-0 items-center flex-nowrap">
        {repetitions.map((repIndex) => (
          <div
            key={`rep-${repIndex}`}
            ref={repIndex === 0 ? measureRef : undefined}
            className="flex shrink-0 items-center flex-nowrap"
            aria-hidden={repIndex > 0 ? 'true' : undefined}
          >
            {items.map((tech, itemIdx) => {
              const uniqueKey = `${rowId}-${repIndex}-${tech.id}-${itemIdx}`;
              const isHovered = hoveredKey === uniqueKey;

              return (
                <div
                  key={uniqueKey}
                  onMouseEnter={() => setHoveredKey(uniqueKey)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className="relative shrink-0 cursor-pointer select-none px-6 sm:px-8 md:px-10 py-6 sm:py-8 flex items-center justify-center transition-transform duration-300"
                >
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.22 : 1,
                      y: isHovered ? -6 : 0,
                      opacity: isHovered ? 1 : 0.45
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 24
                    }}
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 14px 28px ${tech.brandColor}55) drop-shadow(0 0 20px ${tech.brandColor}35) grayscale(0%)`
                        : (theme === 'dark'
                            ? 'grayscale(100%) brightness(1.2)'
                            : 'grayscale(100%) brightness(0.6)')
                    }}
                  >
                    <img
                      src={`/icon/${tech.iconFile}`}
                      alt={tech.name}
                      loading="eager"
                      draggable={false}
                      className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain pointer-events-none transition-all duration-300 ${
                        tech.id === 'github' && theme === 'paper' ? 'invert' : ''
                      }`}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface TechStackRollerProps {
  theme?: 'paper' | 'dark';
}

export default function TechStackRoller({ theme = 'dark' }: TechStackRollerProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Synchronized pause: hovering any icon in either row pauses both rows simultaneously
  const isPaused = hoveredKey !== null;

  // Stagger Row 2 items so logos form an organic diagonal zigzag relative to Row 1
  const shiftedRow2 = [...ROW_2.slice(4), ...ROW_2.slice(0, 4)];

  return (
    <div className="w-full select-none overflow-hidden py-2">
      {/* 2-Row Staggered Zigzag Seamless Continuous Infinite Marquee */}
      <div className="relative w-full overflow-hidden py-2 flex flex-col gap-1 sm:gap-3">
        {/* Left & Right Smooth Edge Fade Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 md:w-56 bg-gradient-to-r from-[var(--bg-canvas)] via-[var(--bg-canvas)]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 md:w-56 bg-gradient-to-l from-[var(--bg-canvas)] via-[var(--bg-canvas)]/90 to-transparent z-10" />

        {/* --- ROW 1: Data, AI & Backend (Continuous GPU Wrap) --- */}
        <MarqueeRow
          items={ROW_1}
          speed={56}
          isPaused={isPaused}
          hoveredKey={hoveredKey}
          setHoveredKey={setHoveredKey}
          theme={theme}
          rowId="r1"
        />

        {/* --- ROW 2: Frontend, Mobile, Systems & Cloud (Zigzag Phase Shift, Continuous GPU Wrap) --- */}
        <MarqueeRow
          items={shiftedRow2}
          speed={50}
          isPaused={isPaused}
          hoveredKey={hoveredKey}
          setHoveredKey={setHoveredKey}
          theme={theme}
          rowId="r2"
        />
      </div>
    </div>
  );
}
