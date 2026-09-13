import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from './BrandLogo';
import LogoMotion from './LogoMotion';

export const GREETINGS = [
  { word: "Hello", lang: "EN" },
  { word: "Bonjour", lang: "FR" },
  { word: "Ciao", lang: "IT" },
  { word: "やあ", lang: "JP" },
  { word: "Selamat Datang", lang: "ID" }
];

interface PreloaderProps {
  onComplete: () => void;
  theme?: 'paper' | 'dark';
  /**
   * 'logo': Cinematic animated deconstruct-and-draw vector logo motion (Total Zen)
   * 'greeting': Previous multilingual greeting carousel with editorial colophon & hairline bar
   */
  variant?: 'logo' | 'greeting';
}

export default function Preloader({ 
  onComplete, 
  theme = 'dark',
  variant = 'logo' 
}: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const isPaper = theme === 'paper';
  const isLogoMode = variant === 'logo';

  // ============================================================================
  // TIMING CONTROLLER
  // ============================================================================
  useEffect(() => {
    // --------------------------------------------------------------------------
    // MODE 1: LOGO MOTION BUMPER (Cinematic & Deliberate pacing ~3.2s total)
    // --------------------------------------------------------------------------
    if (isLogoMode) {
      // 1.5s assemble + 0.85s hold = 2350ms -> begin exit wipe
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 2350);

      // Finish when trailing curtain slab clears: 2350ms + 120ms + 820ms = 3290ms
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 3300);

      return () => {
        clearTimeout(exitTimeout);
        clearTimeout(completeTimeout);
      };
    }

    // --------------------------------------------------------------------------
    // MODE 2: PRESERVED MULTILINGUAL GREETING BUMPER
    // --------------------------------------------------------------------------
    // When reaching the last greeting ("Selamat Datang"), hold for 950ms then start exit wipe
    if (index === GREETINGS.length - 1) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 950);

      // Finish when the trailing curtain layer has completely exited:
      // 950ms hold + 120ms delay + 820ms duration = 1890ms -> onComplete at 1920ms
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 1920);

      return () => {
        clearTimeout(exitTimeout);
        clearTimeout(completeTimeout);
      };
    }

    // Pacing for earlier greetings (520ms each for comfortable reading)
    const delay = 520;
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, onComplete, isLogoMode]);

  const current = GREETINGS[index];

  // Theme-tailored color values
  const mainBg = isPaper ? 'var(--bg-canvas, #E6E3DC)' : 'var(--bg-canvas, #08080a)';
  const accentSlabBg = isPaper ? 'var(--wipe-slab-1, #FFFFFF)' : 'var(--wipe-slab-1, #3A3A44)';
  const textColor = isPaper ? 'var(--color-ink, #1C1C1C)' : 'var(--color-ink, #f4f4f7)';
  const mutedColor = isPaper ? 'var(--color-ink-muted, #84848A)' : 'var(--color-ink-muted, #71717a)';
  const hairlineTrack = isPaper ? 'rgba(28, 28, 28, 0.12)' : 'rgba(255, 255, 255, 0.12)';
  const hairlineBar = isPaper ? '#1C1C1C' : '#f4f4f7';

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden select-none">
      {/* LAYER 2: Accent Curtain Slab (revealed underneath Layer 1, then follows with staggered delay) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isExiting ? "100%" : "0%" }}
        transition={{
          duration: 0.82,
          delay: isExiting ? 0.12 : 0,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed inset-0 z-[998]"
        style={{ backgroundColor: accentSlabBg }}
      />

      {/* LAYER 1: Main Preloader Screen (leads the wipe to the right) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isExiting ? "100%" : "0%" }}
        transition={{
          duration: 0.82,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed inset-0 z-[999] pointer-events-auto flex flex-col items-center justify-between p-8 md:p-14"
        style={{ backgroundColor: mainBg, color: textColor }}
      >
        {/* ================================================================== */}
        {/* VIEW A: NEW LOGO MOTION BUMPER (Total Zen: Pure Central Emblem)     */}
        {/* ================================================================== */}
        {isLogoMode ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center my-auto">
            <LogoMotion 
              theme={theme} 
              isExiting={isExiting} 
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
            />
          </div>
        ) : (
          /* ================================================================ */
          /* VIEW B: PRESERVED ORIGINAL MULTILINGUAL GREETING BUMPER          */
          /* ================================================================ */
          <>
            {/* Top Minimal Editorial Colophon */}
            <motion.div 
              animate={{ opacity: isExiting ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono tracking-widest uppercase"
              style={{ color: mutedColor }}
            >
              <div className="flex items-center gap-2.5">
                <BrandLogo 
                  theme={theme} 
                  className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" 
                />
                <span className="font-medium tracking-[0.2em]">MALEAKHI NYMMO AUGUSTUS</span>
              </div>
              <span>BANDUNG, ID · 2026</span>
            </motion.div>

            {/* Central Rotating Multilingual Word */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              <motion.div 
                animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -12 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.word}
                    initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center"
                  >
                    <h1 
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight font-display select-none"
                      style={{ color: textColor }}
                    >
                      {current.word}
                    </h1>
                    <span 
                      className="font-mono text-[11px] tracking-[0.3em] uppercase mt-4 font-semibold"
                      style={{ color: mutedColor }}
                    >
                      {current.lang}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom Continuous Hairline Progress Bar */}
            <motion.div 
              animate={{ opacity: isExiting ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-0 left-0 w-full h-[2px]"
              style={{ backgroundColor: hairlineTrack }}
            >
              <motion.div
                className="h-full w-full"
                style={{ 
                  backgroundColor: hairlineBar,
                  transformOrigin: "left"
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 3.03, // (4 * 520ms) + 950ms = 3030ms
                  ease: [0.25, 1, 0.5, 1]
                }}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
