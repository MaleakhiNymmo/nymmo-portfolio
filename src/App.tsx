/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · macrostructure: Full-Bleed Tactile Editorial Grid · theme: dual (warm-paper & dark-obsidian) */

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import HomeView from './pages/HomeView';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'paper' | 'dark'>('paper');
  const [isThemeWiping, setIsThemeWiping] = useState(false);
  const [targetTheme, setTargetTheme] = useState<'paper' | 'dark' | null>(null);
  const [themeWipeKey, setThemeWipeKey] = useState(0);

  // Sync theme attribute to HTML tag and update dynamic favicon
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const faviconEl = document.getElementById('favicon') as HTMLLinkElement | null;
    if (faviconEl) {
      faviconEl.href = theme === 'paper' 
        ? '/logo/icon-lightmode.svg' 
        : '/logo/icon-darkmode.svg';
    }
  }, [theme]);

  const toggleTheme = () => {
    if (isThemeWiping) return;

    const nextTheme = theme === 'paper' ? 'dark' : 'paper';
    setTargetTheme(nextTheme);
    setIsThemeWiping(true);
    setThemeWipeKey((prev) => prev + 1);

    // Swap the DOM and React state at the apex when the curtain fully covers the screen
    setTimeout(() => {
      setTheme(nextTheme);
    }, 440);

    // End wipe state when curtain slab has fully exited the right edge
    setTimeout(() => {
      setIsThemeWiping(false);
      setTargetTheme(null);
    }, 920);
  };

  return (
    <>
      {/* 1. Cinematic Logo Preloader Bumper */}
      {/* Catatan: Ganti variant="greeting" jika ingin kembali menggunakan bumper greeting kata multibahasa */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader 
            theme={theme} 
            variant="logo" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {/* Theme Transition Monolithic Curtain Wipe (Target Background, with Smooth Hold phase) */}
      <AnimatePresence>
        {isThemeWiping && targetTheme && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
            <motion.div
              key={`theme-curtain-${themeWipeKey}`}
              initial={{ x: "-102%" }}
              animate={{ x: ["-102%", "0%", "0%", "102%"] }}
              transition={{
                duration: 0.88,
                times: [0, 0.44, 0.56, 1],
                ease: [0.65, 0.05, 0.36, 1]
              }}
              className="absolute inset-0 z-10 shadow-[0_0_60px_rgba(0,0,0,0.35)]"
              style={{
                backgroundColor: targetTheme === 'dark' ? '#08080a' : '#E6E3DC'
              }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* 2. 120fps Hardware-Accelerated Custom Cursor */}
      <CustomCursor />

      {/* 3. Client Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomeView 
              theme={theme} 
              toggleTheme={toggleTheme} 
              isThemeWiping={isThemeWiping} 
            />
          } 
        />
        <Route 
          path="/project/:id" 
          element={
            <ProjectDetail 
              theme={theme} 
              toggleTheme={toggleTheme} 
            />
          } 
        />
      </Routes>
    </>
  );
}
