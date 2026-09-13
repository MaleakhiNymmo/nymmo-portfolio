import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowUpRight, 
  Database, 
  Map, 
  Globe, 
  Layers, 
  Server, 
  CheckCircle2, 
  Sun, 
  Moon,
  ExternalLink,
  Code2,
  Target,
  Workflow,
  ShieldCheck,
  GitBranch,
  MessageSquare,
  Container,
  Boxes,
  Plus
} from 'lucide-react';
import { PROJECTS } from '../data';
import Magnetic from '../components/Magnetic';
import BrandLogo from '../components/BrandLogo';
import { getTechLogo } from '../components/TechLogos';

interface ProjectDetailProps {
  theme: 'paper' | 'dark';
  toggleTheme: () => void;
}

export default function ProjectDetail({ theme, toggleTheme }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find project by id
  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[projectIndex];

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Multiselect expanded tech items (allows multiple tiles to be open at once)
  const [openTechIndices, setOpenTechIndices] = useState<number[]>([0]);

  const toggleTechItem = (index: number) => {
    setOpenTechIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAllTech = () => {
    if (!project?.toolchainMatrix) return;
    setOpenTechIndices(project.toolchainMatrix.map((_, i) => i));
  };

  const collapseAllTech = () => {
    setOpenTechIndices([]);
  };

  const getTechIcon = (tech: string, category: string) => {
    const t = (tech + ' ' + category).toLowerCase();
    if (t.includes('airflow') || t.includes('orchestration')) return <Workflow className="w-5 h-5" />;
    if (t.includes('dbt') || t.includes('transform')) return <Layers className="w-5 h-5" />;
    if (t.includes('postgres') || t.includes('warehouse') || t.includes('sql') || t.includes('database')) return <Database className="w-5 h-5" />;
    if (t.includes('mongo') || t.includes('nosql')) return <Boxes className="w-5 h-5" />;
    if (t.includes('pytest') || t.includes('quality') || t.includes('test')) return <ShieldCheck className="w-5 h-5" />;
    if (t.includes('github') || t.includes('ci/cd')) return <GitBranch className="w-5 h-5" />;
    if (t.includes('slack') || t.includes('alert') || t.includes('incident')) return <MessageSquare className="w-5 h-5" />;
    if (t.includes('docker') || t.includes('container')) return <Container className="w-5 h-5" />;
    if (t.includes('map') || t.includes('gis')) return <Map className="w-5 h-5" />;
    if (t.includes('vision') || t.includes('yolo') || t.includes('archery')) return <Target className="w-5 h-5" />;
    return <Code2 className="w-5 h-5" />;
  };

  const renderTechBadge = (tech: string, category: string, className = 'w-6 h-6', colored = true) => {
    const logo = getTechLogo(tech, className, colored);
    if (logo) return logo;
    return getTechIcon(tech, category);
  };

  if (!project) {
    return (
      <div className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--color-ink)] flex flex-col items-center justify-center p-6 select-none font-sans">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)] mb-3">
          404 • ARCHIVE NOT FOUND
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight mb-6">
          PROJECT UNRESOLVED
        </h1>
        <p className="font-mono text-sm text-[var(--color-ink-2)] mb-8 text-center max-w-md">
          The requested engineering case study does not exist or has been moved.
        </p>
        <Magnetic strength={0.3}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-rule)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-mono text-xs uppercase font-bold tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </Magnetic>
      </div>
    );
  }

  // Previous & Next Navigation
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  return (
    <div className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-ink)] selection:text-[var(--bg-canvas)]">
      
      {/* 1. STICKY EDITORIAL TOP BAR */}
      <header className="sticky top-0 z-40 w-full px-5 sm:px-12 lg:px-20 py-4 sm:py-5 border-b border-[var(--color-rule)] bg-[var(--bg-canvas)]/95 backdrop-blur-md flex items-center justify-between font-mono text-xs tracking-wider select-none">
        
        {/* Brand Mark & Back Link */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center group" data-cursor-text="Home" title="Back to Home">
            <BrandLogo 
              theme={theme} 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>
          <span className="text-[var(--color-rule-light)]">/</span>
          <Magnetic strength={0.25}>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-[var(--color-ink)] hover:text-[var(--color-ink-2)] transition-colors cursor-pointer group"
              data-cursor-text="Back"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-bold uppercase tracking-wider">Back</span>
            </button>
          </Magnetic>
        </div>

        {/* Center Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[var(--color-ink-2)] uppercase">
          <span>ARCHIVE</span>
          <span>/</span>
          <span className="text-[var(--color-ink)] font-semibold">{project.title}</span>
        </div>

        {/* Theme Toggle */}
        <Magnetic strength={0.3}>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] transition-all select-none cursor-pointer"
            data-cursor-text="Theme"
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
      </header>

      {/* 2. MAIN CASE STUDY CONTENT CONTAINER */}
      <main className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-20 pt-12 sm:pt-20 pb-24">
        
        {/* HERO TITLE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="pb-12 border-b border-[var(--color-rule)]"
        >
          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
            <span className="px-3 py-1 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] font-bold">
              {project.year}
            </span>
            <span>•</span>
            <span className="px-3 py-1 rounded-full border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] font-semibold">
              {project.category === 'data-engineering' ? 'DATA ENGINEERING' : 'WEB DEVELOPMENT'}
            </span>
            {project.metrics && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.metrics}
                </span>
              </>
            )}
          </div>

          {/* Massive Display Heading */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-[var(--color-ink)] leading-[0.9] mb-6">
            {project.title}
          </h1>

          {/* Role & Core Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)] block mb-1">
                ROLE & SPECIALIZATION
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl text-[var(--color-ink)] uppercase">
                {project.role}
              </p>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)] font-mono text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                    data-cursor-text="Live"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              )}

              {project.repoUrl && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] hover:border-[var(--color-ink)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                    data-cursor-text="Repo"
                  >
                    <span>View Repository</span>
                    <Code2 className="w-4 h-4" />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </motion.div>

        {/* STATS & IMPACT COUNTERS */}
        {project.stats && project.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-10"
          >
            {project.stats.map((st, sIdx) => (
              <div 
                key={sIdx}
                className="p-5 sm:p-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--color-ink)] transition-colors"
              >
                <span className="font-display font-black text-3xl sm:text-4xl text-[var(--color-ink)] mb-2">
                  {st.value}
                </span>
                <span className="font-mono text-xs text-[var(--color-ink-2)] uppercase tracking-wider">
                  {st.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* 3. SECTION 01: CONTEXT & TECHNICAL CHALLENGE (8:4 SPLIT: FULL COVER + PROBLEM STATEMENT) */}
        <section className="py-14 border-t border-[var(--color-rule)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Full-Size Uncropped Cover Frame (8 Columns ~67% space) */}
            <div className="lg:col-span-8 w-full">
              <div className="relative w-full rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] p-2.5 sm:p-3 overflow-hidden shadow-lg group hover:border-[var(--color-ink)] transition-colors">
                <div className="relative w-full rounded-xl overflow-hidden bg-[var(--bg-canvas)]">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const fb = e.currentTarget.parentElement?.querySelector('.fallback-schematic-detail');
                        if (fb) (fb as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback Schematic if no cover image or if load fails */}
                  <div className={`fallback-schematic-detail ${project.coverImage ? 'hidden' : 'flex'} w-full aspect-[16/9] flex-col items-center justify-center p-8 text-center bg-[var(--bg-canvas)]`}>
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    {project.category === 'data-engineering' ? (
                      <Database className="w-16 h-16 text-[var(--color-ink)] mb-4 transition-transform duration-500 group-hover:scale-110" />
                    ) : project.id === 'smart-archery' ? (
                      <Target className="w-16 h-16 text-[var(--color-ink)] mb-4 transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <Globe className="w-16 h-16 text-[var(--color-ink)] mb-4 transition-transform duration-500 group-hover:scale-110" />
                    )}
                    <span className="font-display font-black text-base uppercase tracking-wider text-[var(--color-ink)]">
                      {project.title}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--color-ink-2)] mt-1">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Problem Statement Narrative & Context (4 Columns ~33% space) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-ink)] text-[var(--bg-canvas)]">
                    01
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
                    CONTEXT & CHALLENGE
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[var(--color-ink)] leading-tight mb-4">
                  Problem Statement
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--color-ink)] font-light mb-6">
                  {project.challenge || project.detailedDescription}
                </p>
              </div>

              {/* Technical Context Callouts Stacked */}
              <div className="space-y-3 pt-5 border-t border-[var(--color-rule)] font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)]">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-2)] block mb-1">
                    PRIMARY OBJECTIVE
                  </span>
                  <span className="font-bold text-[var(--color-ink)] leading-snug block">
                    {project.category === 'data-engineering' ? 'Zero Revenue Loss & Kimball Modeling' : 'High-Performance Architecture & Resilient UX'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)]">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-2)] block mb-1">
                    TARGET DOMAIN
                  </span>
                  <span className="font-bold text-[var(--color-ink)] leading-snug block">
                    {project.category === 'data-engineering' ? 'Enterprise Multi-Source ELT Pipeline' : 'Interactive Fullstack Production Application'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. SECTION 02: ENGINEERING EXECUTION & SOLUTION */}
        <section className="py-14 border-t border-[var(--color-rule)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-ink)] text-[var(--bg-canvas)]">
              02
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
              ENGINEERING EXECUTION & SOLUTION
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[var(--color-ink)] leading-snug mb-3">
            Architectural Approach
          </h3>

          <p className="text-base sm:text-lg leading-relaxed text-[var(--color-ink-2)] font-light max-w-4xl mb-8">
            {project.solution || project.detailedDescription}
          </p>

          {project.solutionPoints && project.solutionPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">
              {project.solutionPoints.map((point, ptIdx) => {
                const colonIdx = point.indexOf(': ');
                const hasColon = colonIdx !== -1;
                const title = hasColon ? point.slice(0, colonIdx) : '';
                const desc = hasColon ? point.slice(colonIdx + 2) : point;

                return (
                  <div
                    key={ptIdx}
                    className="p-5 sm:p-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:border-[var(--color-ink)] transition-colors flex flex-col justify-start"
                  >
                    {hasColon ? (
                      <>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)] shrink-0" />
                          <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-ink)] uppercase tracking-wide">
                            {title}
                          </span>
                        </div>
                        <p className="font-mono text-xs sm:text-sm leading-relaxed text-[var(--color-ink-2)]">
                          {desc}
                        </p>
                      </>
                    ) : (
                      <p className="font-mono text-xs sm:text-sm leading-relaxed text-[var(--color-ink)]">
                        {point}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Architecture Pipeline Flow (Flowchart Node Berurutan / Kotak-kotak) */}
          {(project.pipelineNodes || project.architecture) && (
            <div className="p-5 sm:p-7 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[var(--color-ink)]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] font-bold">
                    PIPELINE ARCHITECTURE FLOW
                  </span>
                </div>
                {project.pipelineNodes && (
                  <span className="font-mono text-[10px] text-[var(--color-ink-2)] uppercase tracking-wider">
                    [{project.pipelineNodes.length} SEQUENTIAL STAGES]
                  </span>
                )}
              </div>

              {project.pipelineNodes && project.pipelineNodes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 items-stretch">
                  {project.pipelineNodes.map((node, nIdx) => (
                    <div
                      key={nIdx}
                      className="relative flex flex-col p-4 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-canvas)] hover:border-[var(--color-ink)] transition-all justify-between group shadow-sm hover:shadow-md"
                    >
                      {/* Node Header: Step & Connector Arrow */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)]">
                          [{node.step}]
                        </span>
                        {nIdx < project.pipelineNodes!.length - 1 && (
                          <div className="text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors">
                            <ArrowRight className="w-3.5 h-3.5 hidden lg:block" />
                            <ArrowRight className="w-3.5 h-3.5 lg:hidden rotate-90 sm:rotate-0" />
                          </div>
                        )}
                      </div>

                      {/* Node Content */}
                      <div>
                        <h5 className="font-mono font-bold text-xs text-[var(--color-ink)] leading-snug mb-1.5">
                          {node.title}
                        </h5>
                        {node.detail && (
                          <p className="font-mono text-[10px] text-[var(--color-ink-2)] leading-relaxed">
                            {node.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-xs sm:text-sm text-[var(--color-ink)] leading-relaxed font-semibold">
                  {project.architecture}
                </p>
              )}
            </div>
          )}
        </section>

        {/* 5. SYSTEM ARTIFACTS & ARCHITECTURAL SCREENSHOTS */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="py-14 border-t border-[var(--color-rule)]">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-ink)] text-[var(--bg-canvas)]">
                03
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
                ARCHITECTURE ARTIFACTS & SCREENSHOTS
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {project.screenshots.map((shot, sIdx) => (
                <div 
                  key={sIdx}
                  className="rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] overflow-hidden group hover:border-[var(--color-ink)] transition-colors p-4 sm:p-8 flex justify-center items-center"
                >
                  <img 
                    src={shot} 
                    alt={`${project.title} Screenshot ${sIdx + 1}`} 
                    className="w-auto max-w-full h-auto max-h-[640px] rounded-xl object-contain mx-auto shadow-lg"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. KEY CAPABILITIES & HIGHLIGHTS */}
        {project.features && project.features.length > 0 && (
          <section className="py-14 border-t border-[var(--color-rule)]">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-ink)] text-[var(--bg-canvas)]">
                {project.screenshots && project.screenshots.length > 0 ? '04' : '03'}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
                CORE CAPABILITIES & HIGHLIGHTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-6 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)] flex items-start gap-4 hover:border-[var(--color-ink)] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-mono text-xs sm:text-sm leading-relaxed text-[var(--color-ink)]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. TOOLCHAIN & TECH STACK GRID */}
        <section className="py-14 border-t border-[var(--color-rule)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-ink)] text-[var(--bg-canvas)]">
                {project.screenshots && project.screenshots.length > 0 ? '05' : '04'}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-2)]">
                VERIFIED TECH STACK & TOOLCHAIN
              </span>
            </div>

            {project.toolchainMatrix && project.toolchainMatrix.length > 0 && (
              <div className="flex items-center gap-3 font-mono text-xs select-none">
                <span className="text-[var(--color-ink-2)] hidden sm:inline">
                  [{project.toolchainMatrix.length} VERIFIED STACKS]
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--color-rule)] bg-[var(--bg-surface)]">
                  <button
                    onClick={expandAllTech}
                    className="px-2.5 py-1 rounded-lg text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--bg-canvas)] transition-all cursor-pointer text-[11px]"
                    title="Buka semua detail teknologi"
                  >
                    Buka Semua
                  </button>
                  <span className="text-[var(--color-rule)]">•</span>
                  <button
                    onClick={collapseAllTech}
                    className="px-2.5 py-1 rounded-lg text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--bg-canvas)] transition-all cursor-pointer text-[11px]"
                    title="Tutup semua detail teknologi"
                  >
                    Tutup Semua
                  </button>
                </div>
              </div>
            )}
          </div>

          {project.toolchainMatrix && project.toolchainMatrix.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 select-none items-start">
              {project.toolchainMatrix.map((item, mIdx) => {
                const isOpen = openTechIndices.includes(mIdx);
                return (
                  <motion.div
                    layout
                    key={item.tech}
                    onClick={() => toggleTechItem(mIdx)}
                    transition={{ layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
                    className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isOpen
                        ? 'border-[var(--color-ink)] bg-[var(--bg-surface)] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-[var(--color-ink)]'
                        : 'border-[var(--color-rule)] bg-[var(--bg-surface)] hover:border-[var(--color-ink)] hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Collapsed Tile View */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[120px] relative">
                      {/* Top Bar: Icon & Expand Toggle Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                            isOpen
                              ? 'border-[var(--color-ink)] bg-[var(--bg-canvas)]'
                              : 'border-[var(--color-rule)] bg-[var(--bg-canvas)]'
                          }`}
                        >
                          {renderTechBadge(item.tech, item.category, "w-6 h-6")}
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                            isOpen
                              ? 'rotate-45 border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--bg-canvas)]'
                              : 'border-[var(--color-rule)] bg-[var(--bg-canvas)] text-[var(--color-ink-2)]'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Tech Name & Teaser Category */}
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-2)] block truncate mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-display font-bold text-sm sm:text-base text-[var(--color-ink)] leading-snug">
                          {item.tech}
                        </h4>
                      </div>
                    </div>

                    {/* Expandable Explanation Drawer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[var(--color-rule)] bg-[var(--bg-canvas)]/50">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-2)] block mb-1 font-semibold">
                              ROLE & EXECUTION:
                            </span>
                            <p className="font-mono text-xs leading-relaxed text-[var(--color-ink)]">
                              {item.role}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs sm:text-sm px-4 py-2 rounded-lg border border-[var(--color-rule)] bg-[var(--bg-surface)] text-[var(--color-ink)] font-semibold hover:border-[var(--color-ink)] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* 7. PREVIOUS & NEXT PROJECT CAROUSEL BAR */}
        <nav className="pt-16 border-t border-[var(--color-rule)] grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
          {/* Previous Project */}
          <Magnetic strength={0.2} className="w-full">
            <Link
              to={`/project/${prevProject.id}`}
              className="p-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:border-[var(--color-ink)] transition-all flex flex-col justify-between group h-full block"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-2)] flex items-center gap-1.5 mb-3">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>PREVIOUS ARCHIVE</span>
              </span>
              <span className="font-display font-black text-xl sm:text-2xl uppercase text-[var(--color-ink)] group-hover:translate-x-1 transition-transform">
                {prevProject.title}
              </span>
            </Link>
          </Magnetic>

          {/* Next Project */}
          <Magnetic strength={0.2} className="w-full">
            <Link
              to={`/project/${nextProject.id}`}
              className="p-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--bg-surface)] hover:border-[var(--color-ink)] transition-all flex flex-col justify-between items-end text-right group h-full block"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-2)] flex items-center gap-1.5 mb-3">
                <span>NEXT ARCHIVE</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <span className="font-display font-black text-xl sm:text-2xl uppercase text-[var(--color-ink)] group-hover:-translate-x-1 transition-transform">
                {nextProject.title}
              </span>
            </Link>
          </Magnetic>
        </nav>

      </main>

      {/* 8. BOTTOM COLOPHON FOOTER */}
      <footer className="w-full px-6 sm:px-12 lg:px-20 py-8 border-t border-[var(--color-rule)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--color-ink-2)]">
        <div className="max-w-[1560px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BrandLogo 
              theme={theme} 
              className="w-4 h-4 opacity-80" 
            />
            <span className="font-bold text-[var(--color-ink)]">Maleakhi Nymmo Augustus © 2026</span>
          </div>
          <span>Case Study Archive • {project.title}</span>
          <span>Full-Bleed Tactile Editorial Portfolio</span>
        </div>
      </footer>

    </div>
  );
}
