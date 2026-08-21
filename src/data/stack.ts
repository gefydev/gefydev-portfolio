export interface TechItem {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'databases' | 'systems';
  level: 'core' | 'proficient' | 'exploring';
  color: string;
  bg: string;
  border: string;
  iconName: 'rust' | 'typescript' | 'javascript' | 'astro' | 'react' | 'tailwind' | 'node' | 'bun' | 'linux' | 'git' | 'ci' | 'vite' | 'database';
  description: {
    es: string;
    en: string;
  };
  highlight?: boolean;
}

export const techStack: TechItem[] = [
  {
    name: 'Rust',
    category: 'languages',
    level: 'core',
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.10)',
    border: 'rgba(249, 115, 22, 0.35)',
    iconName: 'rust',
    description: {
      es: 'Lenguaje de sistemas para proyectos de máxima eficiencia (Spotifust, GenaCleaner), concurrencia segura y bajo consumo de memoria.',
      en: 'Systems language for maximum efficiency (Spotifust, GenaCleaner), safe concurrency, and zero runtime overhead.',
    },
    highlight: true,
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'core',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.10)',
    border: 'rgba(56, 189, 248, 0.35)',
    iconName: 'typescript',
    description: {
      es: 'Tipado estricto, interfaces robustas y diseño de arquitecturas escalables tanto en frontend como en backend.',
      en: 'Strict typing, robust interfaces, and scalable architecture design across frontend and backend applications.',
    },
    highlight: true,
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'languages',
    level: 'core',
    color: '#facc15',
    bg: 'rgba(250, 204, 21, 0.10)',
    border: 'rgba(250, 204, 21, 0.35)',
    iconName: 'javascript',
    description: {
      es: 'Dominio profundo del motor JS, asincronía, Event Loop y manipulación eficiente del DOM.',
      en: 'Deep mastery of the JS runtime engine, asynchronous patterns, event loop, and web platform APIs.',
    },
    highlight: true,
  },
  {
    name: 'Astro',
    category: 'frameworks',
    level: 'core',
    color: '#ff5d01',
    bg: 'rgba(255, 93, 1, 0.10)',
    border: 'rgba(255, 93, 1, 0.35)',
    iconName: 'astro',
    description: {
      es: 'Framework predilecto para desarrollo web con renderizado en servidor (SSR), arquitectura de islas y 0 KB de JS innecesario.',
      en: 'Primary framework for server-side rendered (SSR) web applications, island architecture, and zero unnecessary JS.',
    },
    highlight: true,
  },
  {
    name: 'React / Preact',
    category: 'frameworks',
    level: 'core',
    color: '#0db7b9',
    bg: 'rgba(13, 183, 185, 0.10)',
    border: 'rgba(13, 183, 185, 0.35)',
    iconName: 'react',
    description: {
      es: 'Construcción de interfaces modulares, custom hooks, gestión de estado reactivo y optimización de renderizado.',
      en: 'Component-driven UI engineering, custom hooks, state management, and optimized render cycles.',
    },
    highlight: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frameworks',
    level: 'core',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.10)',
    border: 'rgba(6, 182, 212, 0.35)',
    iconName: 'tailwind',
    description: {
      es: 'Sistemas de diseño basados en tokens, diseño responsivo, container queries y micro-interacciones fluidas.',
      en: 'Design-system tokens, responsive layouts, container queries, and fluid micro-interactions.',
    },
    highlight: true,
  },
  {
    name: 'Node.js & Express',
    category: 'databases',
    level: 'core',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.10)',
    border: 'rgba(34, 197, 94, 0.35)',
    iconName: 'node',
    description: {
      es: 'Creación de APIs RESTful, servidores web, middlewares de seguridad y microservicios.',
      en: 'Building RESTful APIs, web servers, security middlewares, and lightweight backend services.',
    },
    highlight: true,
  },
  {
    name: 'Linux & Bash Shell',
    category: 'systems',
    level: 'core',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.10)',
    border: 'rgba(251, 191, 36, 0.35)',
    iconName: 'linux',
    description: {
      es: 'Sistema operativo diario. Automatización avanzada por línea de comandos y scripting de sistemas.',
      en: 'Daily driver OS. Command-line automation, shell scripting, and system environment customization.',
    },
    highlight: true,
  },
  {
    name: 'Bun',
    category: 'tools',
    level: 'core',
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.10)',
    border: 'rgba(244, 114, 182, 0.35)',
    iconName: 'bun',
    description: {
      es: 'Runtime y gestor de paquetes por defecto para máxima velocidad de ejecución y desarrollo ágil.',
      en: 'Default ultra-fast package manager and JavaScript runtime for streamlined developer workflows.',
    },
  },
  {
    name: 'Git & GitHub CLI',
    category: 'tools',
    level: 'core',
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.10)',
    border: 'rgba(244, 63, 94, 0.35)',
    iconName: 'git',
    description: {
      es: 'Control de versiones riguroso, automatizaciones con gh CLI, ramas y commits atómicos limpios.',
      en: 'Strict version control, gh CLI scripting, atomic commit habits, and collaborative workflows.',
    },
  },
  {
    name: 'GitHub Actions / CI',
    category: 'systems',
    level: 'proficient',
    color: '#818cf8',
    bg: 'rgba(129, 140, 248, 0.10)',
    border: 'rgba(129, 140, 248, 0.35)',
    iconName: 'ci',
    description: {
      es: 'Pipelines automatizados de integración continua, builds programadas y despliegues automáticos.',
      en: 'Automated CI/CD workflows, scheduled cron builds (like ComiDólar every 30m), and automated releases.',
    },
  },
  {
    name: 'Vite',
    category: 'tools',
    level: 'proficient',
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.10)',
    border: 'rgba(167, 139, 250, 0.35)',
    iconName: 'vite',
    description: {
      es: 'Empaquetado moderno basado en ESM nativo con Hot Module Replacement ultrarrápido.',
      en: 'Modern ESM-driven build tooling with lightning-fast Hot Module Replacement (HMR).',
    },
  },
];
