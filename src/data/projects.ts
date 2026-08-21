export interface TechTag {
  name: string;
  color: string;
  bg: string;
  border: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'rust' | 'astro' | 'tools' | 'web';
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
  techTags: TechTag[];
  stars: number;
  badge?: {
    es: string;
    en: string;
  };
  accentColor: string;
  placeholderPattern: 'music' | 'crypto' | 'terminal' | 'stream' | 'maps';
  image: string;
}

export interface OpenSourceContribution {
  repo: string;
  author: string;
  url: string;
  stars: number;
  prsCount?: number;
  role: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  techTags: TechTag[];
}

export const techBadgeStyles: Record<string, TechTag> = {
  Rust: { name: 'Rust', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' },
  TypeScript: { name: 'TypeScript', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  JavaScript: { name: 'JavaScript', color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)', border: 'rgba(250, 204, 21, 0.3)' },
  Astro: { name: 'Astro', color: '#ff5d01', bg: 'rgba(255, 93, 1, 0.12)', border: 'rgba(255, 93, 1, 0.3)' },
  React: { name: 'React', color: '#0db7b9', bg: 'rgba(13, 183, 185, 0.12)', border: 'rgba(13, 183, 185, 0.3)' },
  Tailwind: { name: 'Tailwind CSS', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)' },
  Node: { name: 'Node.js', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)' },
  TUI: { name: 'TUI / Terminal', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)', border: 'rgba(192, 132, 252, 0.3)' },
  ADB: { name: 'ADB / Android', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  Electron: { name: 'Electron', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)' },
  CI: { name: 'GitHub Actions', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)', border: 'rgba(129, 140, 248, 0.3)' },
  API: { name: 'REST API', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)' },
  Leaflet: { name: 'Leaflet Maps', color: '#84cc16', bg: 'rgba(132, 204, 22, 0.12)', border: 'rgba(132, 204, 22, 0.3)' },
};

export const projects: Project[] = [
  {
    id: 'spotifust',
    name: 'Spotifust',
    category: 'rust',
    featured: true,
    title: {
      es: 'Spotifust — Cliente de Spotify Ultraligero en Rust',
      en: 'Spotifust — Ultra-lightweight Spotify Client in Rust',
    },
    description: {
      es: 'Proyecto estrella. Un cliente de Spotify desarrollado desde cero en Rust priorizando velocidad instantánea, mínimo uso de memoria y rendimiento nativo sin la sobrecarga de clientes pesados.',
      en: 'Flagship project. A lightweight Spotify client built from scratch in Rust, engineered for minimal memory footprint, instant startup, and blazing fast audio streaming.',
    },
    homepageUrl: 'https://spotifust.comidolar.com.ar',
    githubUrl: 'https://github.com/gefydev/spotifust',
    techTags: [techBadgeStyles.Rust, techBadgeStyles.TypeScript, techBadgeStyles.Tailwind],
    stars: 2,
    badge: {
      es: '⭐ Proyecto Estrella',
      en: '⭐ Flagship Project',
    },
    accentColor: '#735ed5',
    placeholderPattern: 'music',
    image: '/images/projects/spotifust.webp',
  },
  {
    id: 'comidolar',
    name: 'ComiDólar',
    category: 'astro',
    featured: true,
    title: {
      es: 'ComiDólar — Monitor de Divisas en Tiempo Real',
      en: 'ComiDólar — Real-Time Argentine Currency Exchange',
    },
    description: {
      es: 'Plataforma web en producción que monitorea todas las cotizaciones de dólar en Argentina (Blue, Oficial, MEP, CCL, Cripto). Desarrollada con Astro y TypeScript, consumiendo la API de Argentina Datos con builds automatizadas vía GitHub Actions cada 30 minutos.',
      en: 'Production web application providing real-time tracking of all Argentine dollar denominations. Engineered with Astro, TypeScript, and Argentina Datos API, coupled with automated CI builds every 30 minutes.',
    },
    homepageUrl: 'https://comidolar.com.ar',
    githubUrl: 'https://github.com/gefydev/ComiDolar',
    techTags: [techBadgeStyles.Astro, techBadgeStyles.TypeScript, techBadgeStyles.Tailwind, techBadgeStyles.CI],
    stars: 2,
    badge: {
      es: 'En Producción',
      en: 'In Production',
    },
    accentColor: '#0db7b9',
    placeholderPattern: 'crypto',
    image: '/images/projects/comidolar.webp',
  },
  {
    id: 'genacleaner',
    name: 'GenaCleaner',
    category: 'rust',
    featured: true,
    title: {
      es: 'GenaCleaner — Limpieza Profunda de Android vía ADB en Rust',
      en: 'GenaCleaner — Deep Android Cleaning via ADB & Rust TUI',
    },
    description: {
      es: 'Herramienta de terminal y TUI modular desarrollada en Rust para optimizar y limpiar dispositivos Android a bajo nivel mediante el protocolo ADB, eliminando bloatware y paquetes innecesarios con interfaz visual cuidada.',
      en: 'Modular Rust-powered terminal TUI for deep Android debloating and system maintenance via ADB, delivering high-speed execution and an elegant console interface.',
    },
    githubUrl: 'https://github.com/gefydev/genacleaner',
    techTags: [techBadgeStyles.Rust, techBadgeStyles.TUI, techBadgeStyles.ADB],
    stars: 0,
    badge: {
      es: 'CLI & TUI',
      en: 'CLI & TUI',
    },
    accentColor: '#f97316',
    placeholderPattern: 'terminal',
    image: '/images/projects/genacleaner.webp',
  },
  {
    id: '412',
    name: '412 Stream',
    category: 'astro',
    featured: true,
    title: {
      es: '412 — Web Hub para Streaming de Fútbol',
      en: '412 — Sports & Entertainment Streaming Web Hub',
    },
    description: {
      es: 'Sitio web moderno y veloz para el programa de streaming de debate de fútbol y entretenimiento 412 (Davo Xeneize, La Cobra, Teo D\'Elia). Arquitectura en Astro con navegación fluida y animaciones cuidadas.',
      en: 'High-performance interactive web experience for the prominent football debate streaming show 412. Built with Astro and modern CSS grid architecture for responsive media consumption.',
    },
    homepageUrl: 'https://cuatrodoce.vercel.app',
    githubUrl: 'https://github.com/gefydev/412',
    techTags: [techBadgeStyles.Astro, techBadgeStyles.TypeScript, techBadgeStyles.Tailwind],
    stars: 0,
    accentColor: '#735ed5',
    placeholderPattern: 'stream',
    image: '/images/projects/cuatrodoce.webp',
  },
  {
    id: 'blackmaps',
    name: 'BlackMaps Website',
    category: 'web',
    featured: false,
    title: {
      es: 'BlackMaps — Cartografía & Visualización Geográfica',
      en: 'BlackMaps — Cartography & Geographic Data Visualizer',
    },
    description: {
      es: 'Sitio web interactivo y visor de mapas temáticos para el proyecto de divulgación geográfica BlackMaps. Explorador cartográfico con capas interactivas y visualización de datos culturales y demográficos.',
      en: 'Interactive cartography and geographic storytelling platform for the BlackMaps project, featuring dynamic map layers and visual demographic analysis.',
    },
    githubUrl: 'https://github.com/gefydev/BlackMaps-Website',
    techTags: [techBadgeStyles.JavaScript, techBadgeStyles.Leaflet, techBadgeStyles.Tailwind],
    stars: 1,
    accentColor: '#0db7b9',
    placeholderPattern: 'maps',
    image: '/images/projects/blackmaps.webp',
  },
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    repo: 'stremio-enhanced',
    author: 'REVENGE977',
    url: 'https://github.com/REVENGE977/stremio-enhanced',
    stars: 819,
    prsCount: 8,
    role: {
      es: 'Contribuidor Principal',
      en: 'Core Contributor',
    },
    description: {
      es: 'Importantes contribuciones al cliente de escritorio de Stremio basado en Electron, aportando mejoras en la arquitectura del sistema de plugins, personalización de temas y optimización de rendimiento.',
      en: 'Significant contributions to the community-driven Electron desktop client for Stremio, implementing plugin system enhancements, theme customizations, and performance optimizations.',
    },
    techTags: [techBadgeStyles.TypeScript, techBadgeStyles.Electron, techBadgeStyles.React],
  },
];
