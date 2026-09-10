import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Server, 
  Binary, 
  Palette, 
  Layout, 
  Database, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown, 
  Send, 
  Check, 
  ExternalLink,
  BookOpen,
  Lock,
  Cloud,
  Layers
} from 'lucide-react';
import Spline from '@splinetool/react-spline';
import CustomCursor from './components/CustomCursor';
import MagneticButton from './components/MagneticButton';
import Preloader from './components/Preloader';
import { PROJECTS, SKILLS, SOCIAL_LINKS } from './data';
import { Project, Skill } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(SKILLS[0]);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Contact Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // References for scrolling
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Monitor active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy Email Helper
  const copyEmail = () => {
    navigator.clipboard.writeText('maleakhinymmo013@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulated Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  // Scroll smooth anchor click helper
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to resolve skill icon
  const renderSkillIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Binary': return <Binary className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Layout': return <Layout className={className} />;
      case 'Database': return <Database className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const currentProject = PROJECTS[activeProjectIdx];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Floating Right Social Handles */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <a 
          href="https://linkedin.com/in/maleakhi-augustus" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-slate-400/50 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover-target"
        >
          <Linkedin size={18} />
          <span className="absolute right-[130%] opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-bold tracking-widest text-slate-300 whitespace-nowrap pointer-events-none uppercase">LINKEDIN</span>
        </a>
        
        <a 
          href="https://github.com/maleakhinymmo" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-slate-400/50 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover-target"
        >
          <Github size={18} />
          <span className="absolute right-[130%] opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-bold tracking-widest text-slate-300 whitespace-nowrap pointer-events-none uppercase">GITHUB</span>
        </a>
      </div>

      {/* Ambient Radial Lighting Glows (Awwwards design aesthetic) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0" />
      <div className="absolute top-[40vh] right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20vh] left-0 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Progress Scrollbar on Top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-white/5 z-50 pointer-events-none">
        <motion.div 
          className="h-full bg-white origin-left"
          style={{
            scaleX: typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0) : 0
          }}
        />
      </div>

      {/* 1. HERO SECTION */}
      <main 
        id="hero"
        ref={heroRef}
        className="relative w-full h-screen bg-black overflow-hidden"
      >
        {/* Background Layer (Z-0) */}
        <div className="absolute inset-0 w-full h-full z-0 scale-[1.2] md:scale-[1.8] lg:scale-[2.2]">
          <Spline scene="https://prod.spline.design/7CuSdopiw94O9OhP/scene.splinecode" />
        </div>

        {/* Foreground Layer (Z-10) */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
          
          {/* Floating Navigation Header wrapped inside Foreground Layer */}
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 h-24 z-40 bg-transparent px-6 md:px-12 lg:px-24 flex items-center justify-between pointer-events-auto"
          >
            <div 
              onClick={() => scrollTo(heroRef)}
              className="flex items-center gap-2 cursor-pointer group hover-target" 
              data-cursor-text="Go Top"
            >
              <span className="font-sans font-light text-base tracking-[0.25em] uppercase text-white hover:text-gray-300 transition-colors duration-300">Nimo.</span>
            </div>

            {/* Navigation Elements: Minimal text links and Premium Contact button */}
            <nav className="flex items-center gap-6 md:gap-10">
              {[
                { id: 'hero', label: 'Home', ref: heroRef },
                { id: 'about', label: 'About', ref: aboutRef },
                { id: 'works', label: 'Works', ref: worksRef },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.ref)}
                  className={`relative text-[11px] uppercase font-sans tracking-[0.25em] hover-target py-1 transition-all duration-300 ${
                    activeSection === item.id ? 'text-white font-normal' : 'text-gray-400/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 inset-x-0 h-[1px] bg-white"
                    />
                  )}
                </button>
              ))}

              {/* Premium Contact Button */}
              <button
                onClick={() => scrollTo(contactRef)}
                className="flex items-center gap-1.5 bg-white text-black text-[11px] uppercase font-sans font-medium tracking-[0.15em] rounded-full px-5 py-2 hover:bg-black hover:text-white border border-white hover:border-white/20 transition-all duration-300 scale-100 hover:scale-[1.05] active:scale-95 hover-target"
                data-cursor-text="Let's Talk"
              >
                Contact
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300" />
              </button>
            </nav>
          </motion.header>

          {/* Centered Text Content */}
          <div className="text-center max-w-6xl select-none flex flex-col items-center justify-center pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs md:text-sm uppercase tracking-widest text-white font-light mb-6 pointer-events-auto px-4 py-1.5 rounded-full bg-black/45 border border-white/5 shadow-2xl backdrop-blur-[2px] [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Hi! I'm Nimo
            </motion.p>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-5xl md:text-7xl lg:text-[100px] xl:text-[120px] font-light tracking-tight text-white leading-[0.9] mb-12 pointer-events-auto"
            >
              Full-stack Developer.<br />
              <span className="text-gray-400">Data Engineer.</span>
            </motion.h1>
          </div>

          {/* Bottom indicator: scroll down */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.1, duration: 1 }}
            onClick={() => scrollTo(aboutRef)}
            className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer text-gray-500 hover:text-white transition-colors duration-300 hover-target pointer-events-auto"
            data-cursor-text="Scroll Down"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase">scroll down</span>
            <ArrowDown className="w-3.5 h-3.5 text-gray-500 animate-bounce mt-1" />
          </motion.div>

        </div>
      </main>

      {/* 2. ABOUT SECTION */}
      <section 
        id="about"
        ref={aboutRef}
        className="relative py-24 lg:py-36 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a] bg-[#050505] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Editorial Text Block */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-4 inline-block">01 / Profile</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8 uppercase leading-tight">
              Crafting scaled<br />
              <span className="text-gray-500">digital pathways.</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 italic font-serif border-l border-[#1a1a1a] pl-6">
              "I'm Maleakhi Nymmo Augustus, a Computer Engineering student and developer who crafts fast, scalable, and immersive digital experiences. My core interests lie in Web Development, Cybersecurity, and Cloud Computing."
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-sans font-light">
              I focus on building secure, efficient, and interactive web services, combining database normalization with responsive interface aesthetics for robust enterprise deployments.
            </p>

            {/* Quick Micro-Credentials Panel */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#1a1a1a] pt-8">
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-white">100%</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Dedicated</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-gray-400">24+</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Months Exp</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-gray-500">3+</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Prod Deploy</span>
              </div>
            </div>
          </div>

          {/* Interactive Technology Arsenal Console */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex flex-col">
              <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-2">02 / Technology Arsenal</span>
              <p className="text-xs text-gray-500 font-sans">Select or hover over weapons to inspect deployment calibration parameters.</p>
            </div>

            {/* Grid of Weapons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {SKILLS.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    whileHover={{ y: -2 }}
                    className={`p-5 rounded-none border cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-32 hover-target ${
                      isSelected 
                        ? 'bg-white/[0.02] border-white shadow-[0_0_50px_rgba(255,255,255,0.03)]' 
                        : 'bg-transparent border-[#1a1a1a] hover:bg-white/[0.01] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-none ${
                        isSelected ? 'bg-white/5 text-white' : 'bg-transparent text-gray-500'
                      }`}>
                        {renderSkillIcon(skill.iconName, "w-5 h-5")}
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-gray-500">{skill.level}%</span>
                    </div>

                    <div className="flex flex-col mt-3">
                      <span className="font-display font-medium text-sm tracking-tight text-white uppercase">{skill.name}</span>
                      <span className="font-mono text-[8px] text-gray-600 tracking-wider uppercase mt-1">
                        {skill.category} MODULE
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Telemetry Details Drawer / Card Panel */}
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="p-6 rounded-none bg-[#050505] border border-[#1a1a1a] backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
                    {renderSkillIcon(selectedSkill.iconName, "w-32 h-32")}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-none bg-white/5 border border-white/10 text-white">
                      {renderSkillIcon(selectedSkill.iconName, "w-5 h-5")}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">{selectedSkill.name} Telemetry</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                          {selectedSkill.category} System
                        </span>
                        <span className="font-mono text-[9px] text-gray-600">•</span>
                        <span className="font-mono text-[8px] text-gray-500 uppercase">Status: Active</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 font-light">
                    {selectedSkill.description}
                  </p>

                  {/* Visual Progress bar with numeric value */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                      <span>Proficiency Calibration</span>
                      <span className="text-white font-semibold">{selectedSkill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-none overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-white rounded-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </section>

      {/* 3. WORKS SECTION */}
      <section 
        id="works"
        ref={worksRef}
        className="relative py-24 lg:py-36 border-t border-[#1a1a1a] bg-[#050505] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-4 inline-block">03 / Projects</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none">
              Selected works.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveProjectIdx((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1))}
              className="p-3 rounded-none bg-transparent hover:bg-white/[0.02] border border-[#1a1a1a] hover:border-gray-600 text-gray-400 hover:text-white transition-all hover-target"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] text-gray-500 select-none min-w-[60px] text-center tracking-widest">
              {activeProjectIdx + 1} / {PROJECTS.length}
            </span>
            <button
              onClick={() => setActiveProjectIdx((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1))}
              className="p-3 rounded-none bg-transparent hover:bg-white/[0.02] border border-[#1a1a1a] hover:border-gray-600 text-gray-400 hover:text-white transition-all hover-target"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Highlight Glowing Aura backdrop */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[350px] bg-gradient-to-r from-white/[0.01] via-white/[0.02] to-white/[0.01] blur-[120px] pointer-events-none -z-10" />

        {/* Interactive Projects Slider Canvas */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Project Visual Graphic (Replaces missing images with beautiful bespoke glass HUD structures) */}
              <div className="lg:col-span-6 relative group select-none">
                <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-[#1a1a1a] bg-[#070707] p-1">
                  
                  {/* Subtle dynamic background lines */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0" />
                  
                  {/* Floating abstract glowing blobs inside the frame */}
                  <div className="absolute top-1/4 left-1/4 w-44 h-44 bg-white/[0.01] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-white/[0.02] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Project Graphic Layout */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">
                        {currentProject.id.toUpperCase()}_ENV_CALIBRATED
                      </span>
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-gray-400">
                        {currentProject.year}
                      </span>
                    </div>

                    {/* Central Abstract Symbolic representation of each project */}
                    <div className="flex flex-col items-center justify-center my-auto py-6">
                      {currentProject.id === 'basoin' && (
                        <div className="relative flex items-center justify-center">
                          {/* Circle waves */}
                          <div className="absolute w-32 h-32 rounded-full border border-white/5 animate-ping" />
                          <div className="absolute w-20 h-20 rounded-full border border-white/10" />
                          <div className="p-6 rounded-none bg-white/5 text-gray-300 border border-white/10">
                            <Cpu className="w-12 h-12" />
                          </div>
                        </div>
                      )}

                      {currentProject.id === 'ayohiling' && (
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-28 h-28 rounded-none border border-white/5 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
                          <div className="absolute w-20 h-20 rounded-none border border-white/10 -rotate-12 animate-spin" style={{ animationDuration: '15s' }} />
                          <div className="p-6 rounded-none bg-white/5 text-gray-300 border border-white/10">
                            <Layers className="w-12 h-12" />
                          </div>
                        </div>
                      )}

                      {currentProject.id === 'perumda' && (
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 bg-white/5 filter blur-xl animate-pulse" />
                          <div className="p-6 rounded-none bg-white/5 text-gray-300 border border-white/10 relative">
                            <Database className="w-12 h-12" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-none bg-transparent text-gray-400 border border-[#1a1a1a]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Project Descriptions Panel */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3.5 mb-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em]">{currentProject.role}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] text-gray-500">{currentProject.year}</span>
                </div>

                <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
                  {currentProject.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-light">
                  {currentProject.description}
                </p>

                <div className="p-5 rounded-none bg-transparent border border-[#1a1a1a] mb-8">
                  <span className="font-mono text-[9px] uppercase text-gray-500 tracking-[0.2em] mb-2.5 block">Overview & Impact</span>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                    {currentProject.detailedDescription}
                  </p>
                </div>

                {/* Tech specifications tag cloud */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="font-mono text-[10px] tracking-wider px-3 py-1 bg-transparent border border-[#1a1a1a] text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {currentProject.link && (
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-white text-black hover:bg-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover-target"
                      data-cursor-text="Open Link"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveProjectIdx((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1))}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-transparent hover:bg-white/[0.02] border border-[#1a1a1a] hover:border-gray-500 text-gray-300 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all hover-target"
                  >
                    <span>Next Slide</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. CONTACT SECTION & FOOTER */}
      <section 
        id="contact"
        ref={contactRef}
        className="relative py-24 lg:py-36 border-t border-[#1a1a1a] bg-[#050505] overflow-hidden"
      >
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Contact Editorial Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-4 inline-block">04 / Contact</span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 uppercase">
                  Let's craft something <span className="text-gray-500 font-bold">impactful.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 font-sans font-light max-w-sm">
                  I'm currently looking for full-stack developer roles, cybersecurity analyst roles, or collaborative projects. Drop a line to start our calibration process.
                </p>
              </div>

              {/* Direct email click trigger with magnetic hover effect */}
              <div className="mb-12 lg:mb-0">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">Direct secure line</span>
                <MagneticButton>
                  <div 
                    onClick={copyEmail}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-none bg-transparent border border-[#1a1a1a] hover:border-gray-500 transition-all duration-300 cursor-pointer hover-target"
                    data-cursor-text={copied ? 'Copied!' : 'Click to Copy'}
                  >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs text-gray-300 font-medium group-hover:text-white transition-colors">
                      maleakhinymmo013@gmail.com
                    </span>
                    <div className="ml-2 px-2 py-0.5 rounded-none bg-white/5 text-[8px] font-mono text-gray-500 uppercase tracking-wider">
                      {copied ? 'Copied' : 'Copy'}
                    </div>
                  </div>
                </MagneticButton>
              </div>
            </div>

            {/* Right Contact Form console */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-none bg-transparent border border-[#1a1a1a]">
                <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white mb-6">Inquiry Console</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[9px] uppercase text-gray-500 tracking-[0.2em] mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter identity label"
                      className="w-full px-4 py-3 rounded-none bg-transparent border border-[#1a1a1a] focus:border-gray-500 text-white text-xs outline-none transition-all placeholder:text-gray-600 font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-[9px] uppercase text-gray-500 tracking-[0.2em] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="address@example.com"
                      className="w-full px-4 py-3 rounded-none bg-transparent border border-[#1a1a1a] focus:border-gray-500 text-white text-xs outline-none transition-all placeholder:text-gray-600 font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-mono text-[9px] uppercase text-gray-500 tracking-[0.2em] mb-2">Message Payload</label>
                    <textarea 
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project goals or role parameters..."
                      className="w-full px-4 py-3 rounded-none bg-transparent border border-[#1a1a1a] focus:border-gray-500 text-white text-xs outline-none transition-all placeholder:text-gray-600 font-sans font-light"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={formStatus === 'sending' || formStatus === 'success'}
                      className={`w-full py-3.5 rounded-none font-mono text-[10px] tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 hover-target ${
                        formStatus === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          : formStatus === 'sending'
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-gray-200 shadow-md'
                      }`}
                      data-cursor-text="Transmit"
                    >
                      {formStatus === 'sending' && (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting Payload...</span>
                        </>
                      )}
                      {formStatus === 'success' && (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Payload Received Successfully!</span>
                        </>
                      )}
                      {formStatus === 'idle' && (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

          {/* Credits footer */}
          <div className="mt-24 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="font-display font-medium text-xs tracking-wider uppercase text-white">Maleakhi Nymmo Augustus</span>
              <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mt-1">© 2026 • Built with premium standard React</span>
            </div>
          </div>

        </div>
      </section>
    </div>
    </>
  );
}
