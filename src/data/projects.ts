export interface Project {
  id: string;
  name: string;
  category: 'astro' | 'fullstack' | 'tools';
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  featured: boolean;
  homepageUrl?: string;
  githubUrl: string;
  tech: string[];
  stars: number;
  badge?: string;
  accentColor: string;
  placeholderPattern: 'crypto' | 'maps' | 'stream' | 'game' | 'terminal' | 'notes';
}

export const projects: Project[] = [
  {
    id: 'comidolar',
    name: 'ComiDolar',
    category: 'astro',
    featured: true,
    title: {
      es: 'ComiDolar — Monitor de Divisas Argentinas',
      en: 'ComiDolar — Argentine Currency Exchange Monitor',
    },
    description: {
      es: 'Plataforma web en tiempo real para consultar las cotizaciones de todos los tipos de cambio de dólar en Argentina (Blue, Oficial, MEP, CCL, Cripto). Desarrollada con Astro, TypeScript y la API de Argentina Datos, con builds automatizadas vía GitHub Actions cada 30 minutos.',
      en: 'Real-time online exchange intelligence platform tracking all circulating Argentine dollar denominations (Blue, Official, MEP, CCL, Crypto). Built with Astro, TypeScript, Argentina Datos API, and automated GitHub Actions CI builds every 30 mins.',
    },
    homepageUrl: 'https://comidolar.com.ar',
    githubUrl: 'https://github.com/GenaDeev/ComiDolar',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'GitHub Actions', 'REST API'],
    stars: 2,
    badge: 'Producción',
    accentColor: '#38bdf8',
    placeholderPattern: 'crypto',
  },
  {
    id: 'blackmaps',
    name: 'BlackMaps',
    category: 'tools',
    featured: true,
    title: {
      es: 'BlackMaps Website — Cartografía & Visualización',
      en: 'BlackMaps Website — Cartography & Data Storytelling',
    },
    description: {
      es: 'Sitio web interactivo y catálogo visual para la cuenta de X @BlackMaps. Visualizaciones geográficas de alta definición, datos culturales, explorador de mapas interactivos y diseño minimalista.',
      en: 'Interactive web platform and visual archive for the viral X cartography channel @BlackMaps. High-resolution geographic data storytelling, interactive maps browser, and sleek dark UI.',
    },
    homepageUrl: 'https://blackmaps.com.ar',
    githubUrl: 'https://github.com/GenaDeev/BlackMaps-Website',
    tech: ['JavaScript', 'HTML5/CSS3', 'Leaflet', 'Tailwind CSS', 'Vercel'],
    stars: 1,
    badge: 'Producción',
    accentColor: '#818cf8',
    placeholderPattern: 'maps',
  },
  {
    id: '412',
    name: '412 Stream',
    category: 'astro',
    featured: true,
    title: {
      es: '412 — Plataforma Web de Streaming',
      en: '412 — Sports & Entertainment Streaming Web Hub',
    },
    description: {
      es: 'Sitio web moderno con estética cyber/editorial para el programa de streaming de debate de fútbol conducido por referentes como Davo Xeneize y La Cobra. Integra horarios, panel interactivo y enlaces en vivo.',
      en: 'Dynamic, high-performance web experience for the prime football and entertainment streaming show in LATAM. Features live schedule tracking, interactive panels, and instant stream gateways.',
    },
    homepageUrl: 'https://cuatrodoce.vercel.app',
    githubUrl: 'https://github.com/GenaDeev/412',
    tech: ['Astro', 'TypeScript', 'Tailwind CSS', 'CSS Grid', 'Vercel'],
    stars: 0,
    badge: 'Live',
    accentColor: '#fbbf24',
    placeholderPattern: 'stream',
  },
  {
    id: 'rockpaperchiappa',
    name: 'RockPaperChiappa',
    category: 'tools',
    featured: false,
    title: {
      es: 'RockPaperChiappa — Mini-Juego Arcade Interactivo',
      en: 'RockPaperChiappa — Interactive Arcade Web Game',
    },
    description: {
      es: 'Juego interactivo de Piedra, Papel o Tijera con humor y animaciones fluidas, enfrentando a un profesor querido del CNBA. Desarrollado con Preact, TypeScript y Vite para lograr un bundle diminuto y 60 FPS constantes.',
      en: 'Custom arcade rock-paper-scissors web game with CNBA humor and silky 60fps animations. Built with Preact, TypeScript, and Vite for an ultra-lightweight client bundle.',
    },
    homepageUrl: 'https://rockpaperchiappa.vercel.app',
    githubUrl: 'https://github.com/GenaDeev/RockPaperChiappa',
    tech: ['Preact', 'TypeScript', 'Vite', 'CSS Animations'],
    stars: 0,
    accentColor: '#f43f5e',
    placeholderPattern: 'game',
  },
  {
    id: 'yourprofiles',
    name: 'YourProfiles',
    category: 'fullstack',
    featured: false,
    title: {
      es: 'YourProfiles — Muro Colaborativo de Perfiles',
      en: 'YourProfiles — Collaborative Social Wall',
    },
    description: {
      es: 'Plataforma web comunitaria donde los usuarios pueden registrar perfiles con fotografía, biografía y datos personalizados, quedando inmortalizados en una cuadrícula interactiva.',
      en: 'Community platform allowing visitors to publish persistent profiles with custom descriptions and visual avatars on an interactive digital wall.',
    },
    homepageUrl: 'https://yourprofiles.vercel.app',
    githubUrl: 'https://github.com/GenaDeev/yourProfiles',
    tech: ['JavaScript', 'Node.js', 'Express', 'HTML5/CSS3'],
    stars: 0,
    accentColor: '#34d399',
    placeholderPattern: 'terminal',
  },
  {
    id: 'macsplash',
    name: 'macsplash',
    category: 'tools',
    featured: false,
    title: {
      es: 'macsplash — Splash Screen para KDE Plasma',
      en: 'macsplash — macOS Splash Theme for KDE Plasma',
    },
    description: {
      es: 'Tema y script de animación para el arranque de sistemas Linux con entorno de escritorio KDE Plasma, recreando con fidelidad la estética y elegancia de macOS.',
      en: 'Linux desktop customization package providing a faithful, fluid macOS-styled boot splash animation for the KDE Plasma desktop environment.',
    },
    githubUrl: 'https://github.com/GenaDeev/macsplash',
    tech: ['Shell', 'Linux', 'KDE Plasma', 'QML'],
    stars: 0,
    accentColor: '#a855f7',
    placeholderPattern: 'terminal',
  },
  {
    id: 'hojasdiarias',
    name: 'HojasDiarias',
    category: 'fullstack',
    featured: false,
    title: {
      es: 'HojasDiarias — Gestor de Notas y Diarios Digitales',
      en: 'HojasDiarias — Digital Journal & Daily Notes',
    },
    description: {
      es: 'Aplicación web para la toma de apuntes rápidos y diario personal, con arquitectura desacoplada frontend en TypeScript y backend dedicado.',
      en: 'Minimalist daily notes and personal journaling web application built with a decoupled TypeScript frontend and robust API backend.',
    },
    homepageUrl: 'https://hojasdiarias.vercel.app',
    githubUrl: 'https://github.com/GenaDeev/hojasdiarias',
    tech: ['TypeScript', 'React', 'Node.js', 'REST API'],
    stars: 0,
    accentColor: '#06b6d4',
    placeholderPattern: 'notes',
  },
  {
    id: 'cnbaauth',
    name: 'CNBA Auth & Ecosystem',
    category: 'fullstack',
    featured: false,
    title: {
      es: 'CNBA Auth & Herramientas Estudiantiles',
      en: 'CNBA Auth & Student Community Tools',
    },
    description: {
      es: 'Herramientas y experimentos de autenticación e integración creados para simplificar la vida digital de la comunidad del Colegio Nacional de Buenos Aires.',
      en: 'Authentication prototypes and developer tools created to serve the student community of the Colegio Nacional de Buenos Aires.',
    },
    githubUrl: 'https://github.com/GenaDeev/cnbaauth',
    tech: ['TypeScript', 'Express', 'Node.js', 'Security'],
    stars: 0,
    accentColor: '#6366f1',
    placeholderPattern: 'terminal',
  },
];
