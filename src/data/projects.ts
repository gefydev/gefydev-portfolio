import { mergedPrsOf, starsOf } from './github';

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
  githubUrl?: string;
  techTags: TechTag[];
  stars: number;
  badge?: {
    es: string;
    en: string;
  };
  accentColor: string;
  placeholderPattern: 'music' | 'crypto' | 'terminal' | 'stream' | 'maps' | 'web';
  image: string;
  imageFull?: string;
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
  Iced: { name: 'Iced (GUI)', color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.12)', border: 'rgba(34, 211, 238, 0.3)' },
  Rodio: { name: 'Rodio (Audio)', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)' },
};

// Etiquetas sueltas (stack del CENBA): el color no se muestra, solo el nombre.
const tag = (name: string, color = '#a1a1aa'): TechTag => ({ name, color, bg: 'rgba(161, 161, 170, 0.12)', border: 'rgba(161, 161, 170, 0.3)' });

export const projects: Project[] = [
  {
    id: 'xcl',
    name: 'XCL',
    category: 'rust',
    featured: true,
    title: {
      es: 'XCL — Capa de compatibilidad Xbox Series → Windows',
      en: 'XCL — Xbox Series → Windows compatibility layer',
    },
    description: {
      es: 'Capa de compatibilidad open source, escrita en Rust, que corre en Windows juegos de Xbox Series X|S que ya tenés, sin emular la CPU: el código x64 corre nativo y los shaders RDNA2 se recompilan a DXIL sobre Direct3D 12. Aporto como contribuidor.',
      en: 'Open source compatibility layer, written in Rust, that runs Xbox Series X|S games you own on Windows with no CPU emulation: the x64 code runs natively and RDNA2 shaders are recompiled to DXIL on Direct3D 12. I contribute to it.',
    },
    githubUrl: 'https://github.com/xcl-dev/xcl',
    techTags: [techBadgeStyles.Rust, tag('Direct3D 12'), tag('HLSL / DXIL')],
    stars: starsOf('xcl-dev/xcl'),
    badge: {
      es: 'Open Source',
      en: 'Open Source',
    },
    accentColor: '#735ed5',
    placeholderPattern: 'web',
    image: '/images/projects/xcl.webp',
    imageFull: '/images/projects/xcl-full.webp',
  },
  {
    id: 'cenba',
    name: 'CENBA',
    category: 'astro',
    featured: true,
    title: {
      es: 'CENBA — Sitio del Centro de Estudiantes del Colegio Nacional de Buenos Aires',
      en: 'CENBA — Student Union Website of the Colegio Nacional de Buenos Aires',
    },
    description: {
      es: 'Sitio en producción del Centro de Estudiantes del Colegio Nacional de Buenos Aires, el colegio más importante del país: mesa directiva, elecciones desde 2010, estatuto, noticias y memoria, con un panel de edición sin código. Suma su propio backend en Cloudflare Workers: biblioteca de pruebas con visor de PDF y OCR, ¿Hay campo? con notificaciones push que se renuevan solas, registro de notas, fichas de docentes y escrutinio en vivo por WebSocket.',
      en: 'Production website of the Student Union of the Colegio Nacional de Buenos Aires, the most important school in Argentina: board of representatives, elections since 2010, bylaws, news and memorial, with a no-code editing panel. It runs its own backend on Cloudflare Workers: an exam library with a PDF viewer and OCR, ¿Hay campo? with self-renewing push notifications, a grade tracker, teacher profiles and live vote counting over WebSocket.',
    },
    homepageUrl: 'https://cenba.com.ar',
    techTags: [
      techBadgeStyles.Astro,
      techBadgeStyles.React,
      techBadgeStyles.TypeScript,
      techBadgeStyles.Tailwind,
      tag('Keystatic'),
      tag('Vercel'),
      tag('Cloudflare Workers'),
      tag('D1'),
      tag('R2'),
      tag('Durable Objects'),
      tag('Queues'),
      tag('WebSockets'),
      tag('Web Push'),
      tag('Tesseract.js (OCR)'),
      tag('pdf.js'),
      tag('pdf-lib'),
      tag('WebGL2'),
      tag('Python'),
      tag('Supabase'),
      tag('PostHog'),
      techBadgeStyles.CI,
    ],
    stars: 0,
    badge: {
      es: 'En Producción',
      en: 'In Production',
    },
    accentColor: '#0192dd',
    placeholderPattern: 'web',
    image: '/images/projects/cenba.webp',
    imageFull: '/images/projects/cenba-full.webp',
  },
  {
    id: 'spotifust',
    name: 'Spotifust',
    category: 'rust',
    featured: false,
    title: {
      es: 'Spotifust — Cliente de Spotify Ultraligero en Rust',
      en: 'Spotifust — Ultra-lightweight Spotify Client in Rust',
    },
    description: {
      es: 'Un cliente de Spotify desarrollado desde cero en Rust priorizando velocidad instantánea, mínimo uso de memoria y rendimiento nativo sin la sobrecarga de clientes pesados.',
      en: 'A lightweight Spotify client built from scratch in Rust, engineered for minimal memory footprint, instant startup, and blazing fast audio streaming.',
    },
    homepageUrl: 'https://spotifust.gefy.dev',
    githubUrl: 'https://github.com/gefydev/spotifust',
    techTags: [techBadgeStyles.Rust, techBadgeStyles.Iced, techBadgeStyles.Rodio],
    stars: starsOf('gefydev/spotifust'),
    accentColor: '#735ed5',
    placeholderPattern: 'music',
    image: '/images/projects/spotifust.webp',
    imageFull: '/images/projects/spotifust-full.webp',
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
    stars: starsOf('gefydev/ComiDolar'),
    badge: {
      es: 'En Producción',
      en: 'In Production',
    },
    accentColor: '#0db7b9',
    placeholderPattern: 'crypto',
    image: '/images/projects/comidolar.webp',
    imageFull: '/images/projects/comidolar-full.webp',
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
    stars: starsOf('gefydev/genacleaner'),
    badge: {
      es: 'CLI & TUI',
      en: 'CLI & TUI',
    },
    accentColor: '#f97316',
    placeholderPattern: 'terminal',
    image: '/images/projects/genacleaner.webp',
    imageFull: '/images/projects/genacleaner-full.webp',
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
    stars: starsOf('gefydev/412'),
    accentColor: '#735ed5',
    placeholderPattern: 'stream',
    image: '/images/projects/cuatrodoce.webp',
    imageFull: '/images/projects/cuatrodoce-full.webp',
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
    stars: starsOf('gefydev/BlackMaps-Website'),
    accentColor: '#0db7b9',
    placeholderPattern: 'maps',
    image: '/images/projects/blackmaps.webp',
    imageFull: '/images/projects/blackmaps-full.webp',
  },
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    repo: 'xcl',
    author: 'xcl-dev',
    url: 'https://github.com/xcl-dev/xcl',
    stars: starsOf('xcl-dev/xcl'),
    prsCount: mergedPrsOf('xcl-dev/xcl'),
    role: {
      es: 'Contribuidor',
      en: 'Contributor',
    },
    description: {
      es: 'Capa de compatibilidad Xbox Series → Windows. Mis cambios fusionados tocan el recompilador de shaders (RDNA2 → DXIL), los gráficos D3D12.X, el sistema de archivos virtual, las tareas asíncronas y el guardado de partidas, y la configuración de cada título.',
      en: 'Xbox Series → Windows compatibility layer. My merged changes cover the shader recompiler (RDNA2 → DXIL), D3D12.X graphics, the virtual file system, async tasks and game saves, and per-title configuration.',
    },
    techTags: [techBadgeStyles.Rust, tag('Direct3D 12'), tag('HLSL / DXIL')],
  },
  {
    repo: 'stremio-enhanced',
    author: 'REVENGE977',
    url: 'https://github.com/REVENGE977/stremio-enhanced',
    stars: starsOf('REVENGE977/stremio-enhanced'),
    prsCount: mergedPrsOf('REVENGE977/stremio-enhanced'),
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
