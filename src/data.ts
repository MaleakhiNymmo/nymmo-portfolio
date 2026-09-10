import { Project, Skill, ContactLink } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'basoin',
    title: 'BasoIn',
    role: 'Lead Full Stack Developer',
    description: 'A Web-based Geographic Information System (Web-GIS) for mapping culinary locations in Bandung.',
    detailedDescription: 'Designed and developed an interactive mapping application that plots authentic local culinary hotspots in Bandung. Features advanced search filters, user review integrations, route optimizations, and a rich, custom-themed interactive geographic dashboard designed to boost local culinary tourism.',
    tags: ['Web-GIS', 'Mapbox API', 'Bandung Culinary', 'Interactive UI'],
    techStack: ['JavaScript', 'Leaflet.js', 'PHP', 'CodeIgniter', 'SQL', 'Tailwind CSS'],
    image: 'basoin',
    year: '2025',
    link: 'https://github.com/maleakhinymmo'
  },
  {
    id: 'ayohiling',
    title: 'ayohiling.com',
    role: 'WordPress Architect & Consultant',
    description: 'A tourism marketplace supporting MSMEs in Pangandaran, built with WordPress.',
    detailedDescription: 'Architected a comprehensive tourism marketplace facilitating local micro, small, and medium enterprises (MSMEs) in Pangandaran. Integrated customized booking flows, digital wallets, vendor management systems, and a fully search-engine-optimized visual storefront supporting local travel agencies and experience guides.',
    tags: ['E-Commerce', 'MSME Marketplace', 'Tourism Booking', 'WordPress'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Tailwind CSS', 'MySQL', 'SEO Optimization'],
    image: 'ayohiling',
    year: '2024',
    link: 'https://ayohiling.com'
  },
  {
    id: 'perumda',
    title: 'Perumda Tirta Raharja',
    role: 'Full Stack Developer Intern',
    description: 'Full Stack Developer Internship focusing on EGRC website optimization and digital workflows.',
    detailedDescription: 'Spearheaded full-stack optimizations on the enterprise portal for Perumda Air Minum Tirta Raharja. Refactored the core EGRC (Enterprise Governance, Risk, and Compliance) workflow system, improving relational queries, accelerating report loading speeds by 42%, and introducing a real-time policy tracking dashboard.',
    tags: ['EGRC Enterprise', 'Workflow Optimization', 'Backend Refactoring', 'Data Security'],
    techStack: ['JavaScript', 'PHP', 'CodeIgniter 4', 'SQL', 'Bootstrap', 'GitLab CI/CD'],
    image: 'perumda',
    year: '2024',
    link: 'https://github.com/maleakhinymmo'
  }
];

export const SKILLS: Skill[] = [
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 92,
    description: 'Architecting interactive client-side components, custom React states, full-stack ES Modules, and real-time DOM renders.',
    iconName: 'Cpu'
  },
  {
    name: 'PHP (CodeIgniter)',
    category: 'backend',
    level: 88,
    description: 'Building secure MVC architectures, optimizing complex queries, and developing RESTful endpoint structures.',
    iconName: 'Server'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 85,
    description: 'Developing automated scraping scripts, data modeling routines, and fast prototyping utilities for cybersecurity tasks.',
    iconName: 'Binary'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 95,
    description: 'Crafting responsive, high-performance web templates utilizing optimized token pools and sleek, custom animations.',
    iconName: 'Palette'
  },
  {
    name: 'Bootstrap',
    category: 'frontend',
    level: 85,
    description: 'Developing rapid web grids, back-office administration interfaces, and clean, standardized enterprise styles.',
    iconName: 'Layout'
  },
  {
    name: 'SQL',
    category: 'backend',
    level: 90,
    description: 'Designing normalized relational databases, tuning indexes, writing subqueries, and securing database access paths.',
    iconName: 'Database'
  }
];

export const SOCIAL_LINKS: ContactLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/maleakhi-augustus',
    label: 'linkedin.com/in/maleakhi-augustus'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/maleakhinymmo',
    label: 'github.com/maleakhinymmo'
  },
  {
    platform: 'Email',
    url: 'mailto:maleakhinymmo013@gmail.com',
    label: 'maleakhinymmo013@gmail.com'
  }
];
