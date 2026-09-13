import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Send, 
  Map, 
  Globe, 
  Database, 
  Plus, 
  X, 
  Sun, 
  Moon, 
  Download,
  Menu,
  Target
} from 'lucide-react';
import Magnetic from '../components/Magnetic';
import BrandLogo from '../components/BrandLogo';
import { PROJECTS } from '../data';

interface StageModule {
  number: string;
  title: string;
  domain: string;
  summary: string;
  details: string;
  techStack: string[];
}

const STAGES: StageModule[] = [
  {
    number: 'STAGE 1',
    title: 'SPATIAL DISCOVERY & WEB-GIS',
    domain: 'Geo-Spatial Analytics',
    summary: 'Designing interactive mapping engines, spatial clustering, and geo-data queries.',
    details: 'Architected the BasoIn Web-GIS culinary navigation platform in Bandung. Integrated custom Mapbox tiles, Leaflet.js rendering, spatial radius filtering, and optimized geo-JSON data pipelines for rapid client-side rendering.',
    techStack: ['Leaflet.js', 'Mapbox API', 'GeoJSON', 'React 19', 'Tailwind CSS']
  },
  {
    number: 'STAGE 2',
    title: 'BACKEND ARCHITECTURE & APIS',
    domain: 'Full-Stack Services',
    summary: 'Developing structured MVC backends, resilient RESTful endpoints, and authentication flows.',
    details: 'Engineered multi-tenant service architectures using PHP (CodeIgniter 4) and Python. Developed standardized JWT auth systems, input sanitization routines, and decoupled business logic for seamless third-party consumption.',
    techStack: ['PHP (CodeIgniter 4)', 'Python', 'Node.js', 'REST APIs', 'JWT']
  },
  {
    number: 'STAGE 3',
    title: 'DATABASE PROFILING & OPTIMIZATION',
    domain: 'Query & Schema Tuning',
    summary: 'Normalizing relational entities, rebuilding query plans, and accelerating report latency.',
    details: 'Spearheaded database refactoring on the Perumda Tirta Raharja enterprise database. Optimized compound indexes, flattened redundant join trees, and reduced heavy report query times by 42% in live production.',
    techStack: ['MySQL', 'PostgreSQL', 'SQL Optimization', 'Index Tuning', 'ETL Automation']
  },
  {
    number: 'STAGE 4',
    title: 'ENTERPRISE EGRC & SYSTEM SECURITY',
    domain: 'Governance & Security',
    summary: 'Implementing Enterprise Governance, Risk, Compliance frameworks, and access controls.',
    details: 'Audited enterprise access matrices and developed automated risk scoring workflows for public utility administrative pipelines, ensuring adherence to strict internal auditing standards and OWASP web hygiene.',
    techStack: ['EGRC Workflows', 'Role-Based Access Control', 'OWASP', 'Linux Scripting']
  }
];

const ROLES_2_LINES = [
  {
    solid: 'FULL-STACK',
    outline: 'DEVELOPER',
    badge: '1+ YR PRODUCTION EXP',
    tag: 'ENTERPRISE SYSTEMS & WEB-GIS PLATFORMS',
    desc: 'Specializing in building high-performance Web-GIS platforms, resilient backend service architectures, and interactive digital interfaces with 1+ years of proven production experience.'
  },
  {
    solid: 'DATA',
    outline: 'ENGINEER',
    badge: 'ACTIVE INTERNSHIP',
    tag: 'DATABASE OPTIMIZATION & PIPELINES',
    desc: 'Executing real-world data engineering workflows: relational normalization, sub-second query plan tuning (reduced report latency by 42%), and automated ETL data processing routines.'
  }
];

const ROLES_3_LINES = [
  {
    line1: 'FULL',
    line2: 'STACK',
    line3: 'DEVELOPER',
    badge: '1+ YR PRODUCTION EXP',
    tag: 'ENTERPRISE SYSTEMS & WEB-GIS PLATFORMS',
    desc: 'Specializing in building high-performance Web-GIS platforms, resilient backend service architectures, and interactive digital interfaces with 1+ years of proven production experience.'
  },
  {
    line1: 'JUNIOR',
    line2: 'DATA',
    line3: 'ENGINEER',
    badge: 'ACTIVE INTERNSHIP',
    tag: 'DATABASE OPTIMIZATION & PIPELINES',
    desc: 'Executing real-world data engineering workflows: relational normalization, sub-second query plan tuning (reduced report latency by 42%), and automated ETL data processing routines.'
  }
];

const ROLES = ROLES_2_LINES;

interface HomeViewProps {
  theme: 'paper' | 'dark';
  toggleTheme: () => void;
  isThemeWiping: boolean;
}

export default function HomeView({ theme, toggleTheme, isThemeWiping }: HomeViewProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole1, setDisplayedRole1] = useState(0);
  const [displayedRole2, setDisplayedRole2] = useState(0);
  const [displayedRole3, setDisplayedRole3] = useState(0);
  const [displayedBadge, setDisplayedBadge] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [wipeKey, setWipeKey] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [openStage, setOpenStage] = useState<string | null>('STAGE 1');
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'data-engineering' | 'web-development' | 'mobile-computer-vision'>('all');
  
  // Trigger Dual/Triple Line Multi-Layer Curtain Wipe transition
  const triggerRoleWipe = useCallback((targetIndex?: number) => {
    if (isWiping) return;
    setIsWiping(true);
    setWipeKey((prev) => prev + 1);

    const nextIndex = targetIndex !== undefined ? targetIndex : (roleIndex === 0 ? 1 : 0);
    setRoleIndex(nextIndex);

    // Cascade Swap for both Desktop (2 lines) and Mobile (3 lines)
    setTimeout(() => {
      setDisplayedRole1(nextIndex);
      setDisplayedBadge(nextIndex);
    }, 500);

    setTimeout(() => {
      setDisplayedRole2(nextIndex);
    }, 700);

    setTimeout(() => {
      setDisplayedRole3(nextIndex);
    }, 860);

    setTimeout(() => {
      setIsWiping(false);
    }, 1460);
  }, [isWiping, roleIndex]);

  // Auto-rotate roles every 6.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      triggerRoleWipe();
    }, 6200);
    return () => clearInterval(interval);
  }, [triggerRoleWipe]);
  
  // Contact Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // References for scrolling
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Mobile Navigation Menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Monitor active scroll section
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY + 250;
      
      const heroOffset = heroRef.current?.offsetTop || 0;
      const aboutOffset = aboutRef.current?.offsetTop || 0;
      const worksOffset = worksRef.current?.offsetTop || 0;
      const contactOffset = contactRef.current?.offsetTop || 0;

      if (scrollPos >= contactOffset) {
        setActiveSection('contact');
      } else if (scrollPos >= worksOffset) {
        setActiveSection('works');
      } else if (scrollPos >= aboutOffset) {
        setActiveSection('about');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('maleakhinymmo013@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1200);
  };

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--color-ink)] font-sans">
      
      {/* Top Bar Header Navigation */}
      <header className="sticky top-0 z-40 w-full px-5 sm:px-12 lg:px-20 py-4 sm:py-5 border-b border-[var(--color-rule)] bg-[var(--bg-canvas)]/95 backdrop-blur-md flex items-center justify-between font-mono text-xs tracking-wider">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo(heroRef)}
          className="flex items-center cursor-pointer group select-none"
          data-cursor-text="Home"
          title="Home"
        >
          <BrandLogo 
            theme={theme} 
            className="w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-110" 
          />
        </div>

        {/* Desktop Middle: Theme Switcher & CV */}
        <div className="hidden md:flex items-center gap-3">
          <Magnetic strength={0.3}>
            <button
              onClick={toggleTheme}
              disabled={isThemeWiping}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] transition-all select-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              data-cursor-text="Switch"
              title="Toggle Warm Paper / Dark Obsidian"
            >
              {theme === 'paper' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-zinc-700" />
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-800">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-200">Paper Mode</span>
                </>
              )}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="mailto:maleakhinymmo013@gmail.com?subject=Resume%20Request%20-%20Maleakhi%20Nymmo"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] transition-all font-mono text-[10px] uppercase"
              data-cursor-text="Email"
            >
              <span>Inquire CV</span>
              <Download className="w-3 h-3" />
            </a>
          </Magnetic>
        </div>

        {/* Desktop Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 sm:gap-8 font-mono text-xs uppercase">
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo(worksRef)}
              className={`hover:text-[var(--color-ink)] transition-colors cursor-pointer ${
                activeSection === 'works' ? 'font-bold underline underline-offset-4' : 'text-[var(--color-ink-2)]'
              }`}
            >
              Works
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo(aboutRef)}
              className={`hover:text-[var(--color-ink)] transition-colors cursor-pointer ${
                activeSection === 'about' ? 'font-bold underline underline-offset-4' : 'text-[var(--color-ink-2)]'
              }`}
            >
              Stages
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo(contactRef)}
              className={`hover:text-[var(--color-ink)] transition-colors cursor-pointer ${
                activeSection === 'contact' ? 'font-bold underline underline-offset-4' : 'text-[var(--color-ink-2)]'
              }`}
            >
              Contact
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Right Controls: Compact Theme Icon + Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            disabled={isThemeWiping}
            className="w-8 h-8 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] flex items-center justify-center transition-all select-none disabled:opacity-60 disabled:cursor-not-allowed"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {theme === 'paper' ? (
              <Moon className="w-4 h-4 text-zinc-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] font-mono text-[10px] font-bold tracking-widest uppercase transition-all select-none"
            aria-label="Open Navigation Menu"
          >
            <span>MENU</span>
            <Menu className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Editorial Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[var(--bg-canvas)] text-[var(--color-ink)] flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
          >
            {/* Drawer Top Row */}
            <div className="flex items-center justify-between pb-5 border-b border-[var(--color-rule)]">
              <div className="flex items-center">
                <BrandLogo 
                  theme={theme} 
                  className="w-9 h-9" 
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)]"
                aria-label="Close Navigation Menu"
              >
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Drawer Center: Big Editorial Navigation List */}
            <div className="py-8 flex flex-col justify-center my-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] mb-4">
                INDEX / DIRECTORY
              </span>
              <nav className="flex flex-col divide-y divide-[var(--color-rule-light)]">
                {[
                  { num: "01", label: "SELECTED WORKS", ref: worksRef, count: "05 PROJECTS" },
                  { num: "02", label: "ENGINEERING STAGES", ref: aboutRef, count: "04 MODULES" },
                  { num: "03", label: "CONTACT ARCHIVE", ref: contactRef, count: "DIRECT LINE" }
                ].map((item) => (
                  <button
                    key={item.num}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => scrollTo(item.ref), 200);
                    }}
                    className="py-5 flex items-center justify-between group text-left transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                        {item.num}
                      </span>
                      <span className="font-display font-black text-2xl uppercase tracking-tight text-[var(--color-ink)] group-hover:translate-x-2 transition-transform duration-200">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-ink-muted)] tracking-widest">
                      {item.count}
                    </span>
                  </button>
                ))}
              </nav>

              <a
                href="mailto:maleakhinymmo013@gmail.com?subject=Resume%20Request%20-%20Maleakhi%20Nymmo"
                className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-mono text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
              >
                <span>INQUIRE RESUME / CV</span>
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Drawer Bottom Info */}
            <div className="pt-5 border-t border-[var(--color-rule)] flex flex-col gap-2 font-mono text-[10px] text-[var(--color-ink-muted)] uppercase tracking-wider">
              <div className="flex items-center justify-between">
                <span>BANDUNG, WEST JAVA, ID</span>
                <span>GMT+7</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN TO FULL-STACK & DATA ROLES</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <main 
        id="hero"
        ref={heroRef}
        className="relative w-full px-6 sm:px-12 lg:px-20 pt-16 sm:pt-24 pb-20 border-b border-[var(--color-rule)] bg-[var(--bg-canvas)] overflow-hidden"
      >
        <div className="max-w-[1560px] mx-auto relative z-10">
          <div className="mb-16 select-none">
            {/* Dynamic Status Tag Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 font-mono text-xs sm:text-sm tracking-widest text-[var(--color-ink-2)] uppercase min-h-[52px] sm:min-h-0">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => triggerRoleWipe()}
                  disabled={isWiping}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-ink)] text-[var(--bg-canvas)] font-bold transition-transform active:scale-95 cursor-pointer hover-target disabled:opacity-80"
                  data-cursor-text="Wipe"
                  title="Click to wipe role focus"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{ROLES[displayedBadge].badge}</span>
                </button>
              </Magnetic>
              <span className="hidden sm:inline">•</span>
              <span className="text-[var(--color-ink)] font-semibold">{ROLES[displayedBadge].tag}</span>
              <span className="hidden sm:inline">•</span>
              <span>2026 FOCUS</span>
            </div>

            {/* ROLE ANIMATION: RESPONSIVE DUAL/TRIPLE LINE WIPE */}
            {/* Mobile View: 3 Lines */}
            <div 
              onClick={() => triggerRoleWipe()}
              className="cursor-pointer group flex sm:hidden flex-col items-start gap-1"
              data-cursor-text="Wipe Role"
              title="Click to wipe role focus"
            >
              {/* Line 1 */}
              <div className="relative inline-flex items-end overflow-hidden py-0.5 pr-4 min-w-[240px] min-[390px]:min-w-[280px] h-[52px] min-[360px]:h-[62px] min-[390px]:h-[70px] min-[420px]:h-[76px]">
                <h1 className="font-display font-black text-[48px] min-[360px]:text-[58px] min-[390px]:text-[66px] min-[420px]:text-[72px] uppercase leading-[0.88] text-[var(--color-ink)] select-none whitespace-nowrap tracking-[-0.03em]">
                  {ROLES_3_LINES[displayedRole1].line1}
                </h1>
                <AnimatePresence>
                  {isWiping && (
                    <>
                      <motion.div
                        key={`curtain-3l1-s1-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-1)] z-20 pointer-events-none shadow-sm"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0 }}
                      />
                      <motion.div
                        key={`curtain-3l1-s2-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-2)] z-30 pointer-events-none"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.10 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Line 2 */}
              <div className="relative inline-flex items-end overflow-hidden py-0.5 pr-4 min-w-[240px] min-[390px]:min-w-[280px] h-[52px] min-[360px]:h-[62px] min-[390px]:h-[70px] min-[420px]:h-[76px]">
                <h1 className="font-display font-black text-[48px] min-[360px]:text-[58px] min-[390px]:text-[66px] min-[420px]:text-[72px] uppercase leading-[0.88] text-[var(--color-ink)] select-none whitespace-nowrap tracking-[-0.03em]">
                  {ROLES_3_LINES[displayedRole2].line2}
                </h1>
                <AnimatePresence>
                  {isWiping && (
                    <>
                      <motion.div
                        key={`curtain-3l2-s1-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-1)] z-20 pointer-events-none shadow-sm"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.18 }}
                      />
                      <motion.div
                        key={`curtain-3l2-s2-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-2)] z-30 pointer-events-none"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.28 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Line 3 */}
              <div className="relative inline-flex items-end overflow-hidden py-0.5 pr-4 min-w-[240px] min-[390px]:min-w-[280px] h-[46px] min-[360px]:h-[54px] min-[390px]:h-[60px] min-[420px]:h-[66px]">
                <h1 className="font-display font-black text-[42px] min-[360px]:text-[50px] min-[390px]:text-[56px] min-[420px]:text-[62px] uppercase leading-[0.88] text-[var(--color-ink)] select-none whitespace-nowrap tracking-[-0.03em]">
                  <span className="text-outline text-outline-thick">{ROLES_3_LINES[displayedRole3].line3}</span>
                </h1>
                <AnimatePresence>
                  {isWiping && (
                    <>
                      <motion.div
                        key={`curtain-3l3-s1-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-1)] z-20 pointer-events-none shadow-sm"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.36 }}
                      />
                      <motion.div
                        key={`curtain-3l3-s2-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-2)] z-30 pointer-events-none"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.46 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop & Tablet View: 2 Lines */}
            <div 
              onClick={() => triggerRoleWipe()}
              className="cursor-pointer group hidden sm:flex flex-col items-start gap-1 sm:gap-2"
              data-cursor-text="Wipe Role"
              title="Click to wipe role focus"
            >
              {/* Line 1 */}
              <div className="relative inline-block items-end overflow-hidden py-1 pr-6 sm:min-w-[540px] md:min-w-[680px] lg:min-w-[820px] xl:min-w-[940px]">
                <h1 className="font-display font-black sm:text-8xl md:text-9xl lg:text-[116px] xl:text-[136px] uppercase leading-[0.88] text-[var(--color-ink)] select-none whitespace-nowrap">
                  {ROLES_2_LINES[displayedRole1].solid}
                </h1>
                <AnimatePresence>
                  {isWiping && (
                    <>
                      <motion.div
                        key={`curtain-2l1-s1-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-1)] z-20 pointer-events-none shadow-sm"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0 }}
                      />
                      <motion.div
                        key={`curtain-2l1-s2-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-2)] z-30 pointer-events-none"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.12 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Line 2 */}
              <div className="relative inline-block items-end overflow-hidden py-1 pr-6 sm:min-w-[580px] md:min-w-[740px] lg:min-w-[880px] xl:min-w-[1020px]">
                <h1 className="font-display font-black sm:text-8xl md:text-9xl lg:text-[116px] xl:text-[136px] uppercase leading-[0.88] text-[var(--color-ink)] select-none whitespace-nowrap">
                  <span className="text-outline text-outline-thick">{ROLES_2_LINES[displayedRole2].outline}</span>
                </h1>
                <AnimatePresence>
                  {isWiping && (
                    <>
                      <motion.div
                        key={`curtain-2l2-s1-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-1)] z-20 pointer-events-none shadow-sm"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.22 }}
                      />
                      <motion.div
                        key={`curtain-2l2-s2-${wipeKey}`}
                        className="absolute inset-0 bg-[var(--wipe-slab-2)] z-30 pointer-events-none"
                        initial={{ x: "-102%" }}
                        animate={{ x: ["-102%", "0%", "102%"] }}
                        transition={{ duration: 0.96, times: [0, 0.48, 1], ease: [0.65, 0.05, 0.36, 1], delay: 0.34 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bio Grid Diptych */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-10 border-t border-[var(--color-rule)]"
          >
            <div className="lg:col-span-5 flex items-center gap-8">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] flex items-center justify-center p-6 overflow-hidden shadow-inner group shrink-0">
                <span className="font-display font-black text-4xl sm:text-6xl text-[var(--color-ink)] tracking-tighter select-none">
                  NIMO.
                </span>
                <div className="absolute inset-0 border border-dashed border-[var(--color-rule)] rounded-xl m-2 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[var(--color-ink-muted)] animate-[spin_24s_linear_infinite] uppercase">
                    • MALEAKHI NYMMO • BANDUNG ID •
                  </span>
                </div>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[var(--color-ink-2)] space-y-1.5">
                <span className="block font-bold text-sm sm:text-base text-[var(--color-ink)]">Maleakhi Nymmo Augustus</span>
                <span>Bandung, West Java, ID • GMT+7</span>
                <span className="block text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  ● Open to Full-Stack & Data Engineering roles
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--color-ink)] font-light max-w-3xl mb-4">
                Hi, my name is <span className="font-medium">Maleakhi Nymmo Augustus</span> (often known as Nymo or August). Computer Engineering student combining software architecture with database performance.
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={ROLES[displayedRole1].desc}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-base leading-relaxed text-[var(--color-ink-2)] max-w-2xl font-normal"
                >
                  {ROLES[displayedRole1].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 2. INFINITE MARQUEE TICKER TAPE */}
      <div className="w-full border-b border-[var(--color-rule)] py-4 overflow-hidden select-none bg-[var(--bg-surface)]">
        <div className="animate-marquee font-display font-bold text-xs sm:text-base tracking-[0.24em] uppercase text-[var(--color-ink)] flex items-center gap-10 sm:gap-14">
          <span>SELECTED ARCHIVES</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>DATA ENGINEERING PIPELINES</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>APACHE AIRFLOW & BIGQUERY</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>SPATIAL SYSTEMS & WEB-GIS</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>DATABASE OPTIMIZATION</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>ENTERPRISE EGRC ARCHITECTURE</span> <span className="text-[var(--color-ink-muted)]">✕</span>
          <span>SELECTED ARCHIVES</span> <span className="text-[var(--color-ink-muted)]">✕</span>
        </div>
      </div>

      {/* 3. SELECTED WORKS (Full-Width Framed Grid with Dynamic Category Filter) */}
      <section 
        id="works"
        ref={worksRef}
        className="w-full border-b border-[var(--color-rule)] bg-[var(--bg-canvas)]"
      >
        {/* Header Bar with Category Filter Tabs */}
        <div className="w-full px-6 sm:px-12 lg:px-20 py-10 border-b border-[var(--color-rule)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-[1560px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)] block mb-1">
                PORTFOLIO ARCHIVES
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[var(--color-ink)]">
                SELECTED <span className="text-outline">PROJECTS</span>
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs select-none">
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-bold'
                      : 'border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  ALL [06]
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => setSelectedCategory('data-engineering')}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === 'data-engineering'
                      ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-bold'
                      : 'border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  DATA ENGINEERING [01]
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => setSelectedCategory('mobile-computer-vision')}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === 'mobile-computer-vision'
                      ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-bold'
                      : 'border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  MOBILE & COMPUTER VISION [01]
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => setSelectedCategory('web-development')}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === 'web-development'
                      ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-bold'
                      : 'border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  WEB DEVELOPMENT [04]
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Dynamic 2-Column Grid */}
        <div className="w-full border-b border-[var(--color-rule)]">
          <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-[var(--color-rule)]">
            {filteredProjects.map((project, idx) => {
              const isLeftColumn = idx % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: (idx % 2) * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className={`p-8 sm:p-12 lg:p-14 flex flex-col justify-between hover:bg-[var(--bg-surface)] transition-all duration-300 group border-b border-[var(--color-rule)] ${
                    isLeftColumn ? 'lg:border-r border-[var(--color-rule)]' : ''
                  }`}
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--color-rule)] bg-[var(--bg-canvas)] uppercase transition-colors duration-200 group-hover:border-[var(--color-ink)]">
                        {project.tags[0]} • {project.tags[1] || (project.category === 'data-engineering' ? 'Pipeline' : 'Web')}
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-[var(--color-ink-2)]">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Title */}
                    <Link to={`/project/${project.id}`} className="block group-hover:underline">
                      <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] uppercase mb-2 transition-transform duration-200 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="font-mono text-xs sm:text-sm text-[var(--color-ink-2)] uppercase mb-8">
                      {project.role}
                    </p>

                    {/* Visual Preview Box */}
                    <Link
                      to={`/project/${project.id}`}
                      className="rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)] mb-8 aspect-video flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[var(--color-ink)] group-hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)] cursor-pointer block text-center"
                      data-cursor-text="Case Study"
                    >
                      {project.coverImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                              const fb = e.currentTarget.parentElement?.querySelector('.fallback-schematic');
                              if (fb) (fb as HTMLElement).style.display = 'flex';
                            }}
                          />
                          {/* Hover Overlay Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
                            <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                              View Case Study ↗
                            </span>
                            <span className="font-mono text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded">
                              {project.year}
                            </span>
                          </div>

                          {/* Fallback Schematic Blueprint (Hidden unless image fails) */}
                          <div className="fallback-schematic hidden w-full h-full absolute inset-0 flex-col items-center justify-center p-8 text-center bg-[var(--bg-surface)]">
                            {project.category === 'data-engineering' ? (
                              <Database className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                            ) : project.id === 'smart-archery' ? (
                              <Target className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                            ) : project.id === 'basoin' ? (
                              <Map className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                            ) : (
                              <Globe className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                            )}
                            <span className="font-display font-bold text-sm sm:text-base text-[var(--color-ink)] uppercase tracking-wider">
                              {project.title} • CASE STUDY
                            </span>
                            <span className="font-mono text-xs text-[var(--color-ink-2)] mt-1.5">
                              {project.metrics || project.techStack.slice(0, 3).join(' • ')}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                          {project.category === 'data-engineering' ? (
                            <Database className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                          ) : project.id === 'smart-archery' ? (
                            <Target className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                          ) : project.id === 'basoin' ? (
                            <Map className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                          ) : (
                            <Globe className="w-14 h-14 text-[var(--color-ink)] mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                          )}
                          <span className="font-display font-bold text-sm sm:text-base text-[var(--color-ink)] uppercase tracking-wider">
                            {project.title} • CASE STUDY
                          </span>
                          <span className="font-mono text-xs text-[var(--color-ink-2)] mt-1.5">
                            {project.metrics || project.techStack.slice(0, 3).join(' • ')}
                          </span>
                        </div>
                      )}
                    </Link>

                    <p className="text-sm sm:text-base text-[var(--color-ink)] font-light leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Links */}
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--color-rule)] font-mono text-xs sm:text-sm">
                    <span className="text-[var(--color-ink-2)] truncate max-w-[160px] sm:max-w-[240px]">
                      {project.techStack.slice(0, 3).join(' • ')}
                    </span>
                    <div className="flex items-center gap-4">
                      {project.repoUrl && (
                        <Magnetic strength={0.25}>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] text-xs uppercase"
                            data-cursor-text="Repo"
                          >
                            Repo ↗
                          </a>
                        </Magnetic>
                      )}
                      <Magnetic strength={0.3}>
                        <Link 
                          to={`/project/${project.id}`}
                          className="inline-flex items-center gap-1.5 font-bold text-[var(--color-ink)] hover:underline uppercase"
                          data-cursor-text="Read"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STAGES OF SYSTEM DEVELOPMENT */}
      <section 
        id="about"
        ref={aboutRef}
        className="w-full px-6 sm:px-12 lg:px-20 py-20 sm:py-28 border-b border-[var(--color-rule)] bg-[var(--bg-canvas)]"
      >
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-5xl mx-auto mb-14 text-center select-none"
        >
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[var(--color-ink)] mb-3">
            STAGES OF SYSTEM <br />
            <span className="text-outline">DEVELOPMENT</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[var(--color-ink-2)] uppercase tracking-widest">
            Technical Execution Blueprint & Architectural Workflow
          </p>
        </motion.div>

        {/* Accordion Component */}
        <div className="max-w-5xl mx-auto divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {STAGES.map((stage, sIdx) => {
            const isOpen = openStage === stage.number;
            return (
              <motion.div 
                key={stage.number} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: sIdx * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className="transition-colors"
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => setOpenStage(isOpen ? null : stage.number)}
                  className="py-6 sm:py-8 flex items-center justify-between cursor-pointer group select-none hover-target"
                  data-cursor-text={isOpen ? 'Close' : 'Open'}
                >
                  <div className="flex items-center gap-6 sm:gap-14">
                    <span className="font-mono text-xs sm:text-sm text-[var(--color-ink-2)] tracking-widest min-w-[70px] group-hover:text-[var(--color-ink)] transition-colors">
                      {stage.number}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-[var(--color-ink)] uppercase tracking-wide group-hover:translate-x-1.5 transition-transform duration-200">
                      {stage.title}
                    </h3>
                  </div>

                  <Magnetic strength={0.35}>
                    <motion.div 
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 24 }}
                      className="p-1.5 rounded-full border border-[var(--color-rule)] text-[var(--color-ink)] group-hover:border-[var(--color-ink)] group-hover:bg-[var(--bg-surface)] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  </Magnetic>
                </div>

                {/* Accordion Expanded Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-0 sm:pl-[126px] pr-4 space-y-4">
                        <motion.p 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                          className="text-sm sm:text-base leading-relaxed text-[var(--color-ink)] font-light max-w-3xl"
                        >
                          {stage.details}
                        </motion.p>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <span className="font-mono text-xs text-[var(--color-ink-2)] uppercase">Toolchain:</span>
                          {stage.techStack.map((tech, i) => (
                            <motion.span 
                              key={tech}
                              initial={{ opacity: 0, scale: 0.9, y: 4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.08 + i * 0.035 }}
                              className="font-mono text-xs px-2.5 py-1 rounded border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. CONTACT ME */}
      <section 
        id="contact"
        ref={contactRef}
        className="w-full px-6 sm:px-12 lg:px-20 py-20 sm:py-28 border-b border-[var(--color-rule)] bg-[var(--bg-canvas)]"
      >
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 select-none"
          >
            <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-[112px] uppercase tracking-tight text-[var(--color-ink)] leading-[0.85] mb-10">
              CONTACT <br />
              <span className="text-outline text-outline-thick">ME</span>
            </h2>

            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-[var(--color-rule)] font-mono text-xs sm:text-sm">
              <div>
                <span className="font-bold uppercase tracking-widest text-[var(--color-ink-2)] block mb-4">SOCIALS</span>
                <ul className="space-y-3">
                  <li>
                    <Magnetic strength={0.25}>
                      <a href="https://linkedin.com/in/maleakhi-augustus" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5 text-[var(--color-ink)]">
                        <span>LinkedIn Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  </li>
                  <li>
                    <Magnetic strength={0.25}>
                      <a href="https://github.com/maleakhinymmo" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5 text-[var(--color-ink)]">
                        <span>GitHub Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-bold uppercase tracking-widest text-[var(--color-ink-2)] block mb-4">DIRECT LINE</span>
                <Magnetic strength={0.2}>
                  <div 
                    onClick={copyEmail}
                    className="cursor-pointer group flex flex-col gap-1.5 text-[var(--color-ink)]"
                    data-cursor-text={copied ? "Copied!" : "Copy"}
                  >
                    <span className="font-medium group-hover:underline break-all">maleakhinymmo013@gmail.com</span>
                    <span className="text-xs text-[var(--color-ink-2)]">
                      {copied ? '✓ Copied to clipboard' : 'Click to copy email'}
                    </span>
                  </div>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          {/* Right Inquiry Message Console */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] p-8 sm:p-12"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)] block mb-2">
              INQUIRY CONSOLE
            </span>
            <h3 className="font-display font-bold text-2xl uppercase text-[var(--color-ink)] mb-8">
              Initiate Technical Dialogue
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase text-[var(--color-ink-2)] mb-2">
                  Your Identity / Company
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hiring Team / Technical Lead"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--bg-canvas)] text-[var(--color-ink)] text-xs sm:text-sm font-mono outline-none focus:border-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-muted)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase text-[var(--color-ink-2)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--bg-canvas)] text-[var(--color-ink)] text-xs sm:text-sm font-mono outline-none focus:border-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-muted)]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase text-[var(--color-ink-2)] mb-2">
                  Project Parameters / Role Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe requirements, goals, or role parameters..."
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--bg-canvas)] text-[var(--color-ink)] text-xs sm:text-sm font-mono outline-none focus:border-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-muted)]"
                />
              </div>

              <Magnetic strength={0.16} className="w-full">
                <button
                  type="submit"
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  className="w-full py-4 rounded-lg border border-[var(--color-rule)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-mono text-xs sm:text-sm uppercase font-bold tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  {formStatus === 'sending' && <span>Transmitting Message...</span>}
                  {formStatus === 'success' && <span>✓ Message Transmitted</span>}
                  {formStatus === 'idle' && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </motion.div>

        </div>
      </section>

      {/* 6. BOTTOM FOOTER COLOPHON */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full px-6 sm:px-12 lg:px-20 py-8 bg-[var(--bg-surface)] font-mono text-xs text-[var(--color-ink-2)]"
      >
        <div className="max-w-[1560px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BrandLogo 
              theme={theme} 
              className="w-4 h-4 opacity-80" 
            />
            <span className="font-bold text-[var(--color-ink)]">Maleakhi Nymmo Augustus © 2026</span>
          </div>
          <span>Bandung, West Java, ID • UTC+7</span>
          <span>Full-Bleed Tactile Editorial Portfolio</span>
        </div>
      </motion.footer>

    </div>
  );
}
