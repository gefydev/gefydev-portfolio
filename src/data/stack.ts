export interface TechItem {
  id: string;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'systems' | 'tools';
  roleBadge: {
    es: string;
    en: string;
  };
  color: string;
  bg: string;
  border: string;
  iconName: string;
  description: {
    es: string;
    en: string;
  };
  highlight?: boolean;
  size?: 'large' | 'medium' | 'small';
  tags: string[];
}

export const techStack: TechItem[] = [
  {
    id: 'rust',
    name: 'Rust',
    category: 'core',
    roleBadge: {
      es: 'Lenguaje Principal // Sistemas',
      en: 'Primary Language // Systems',
    },
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.35)',
    iconName: 'rust',
    description: {
      es: 'Ecosistema predilecto para software de máximo rendimiento (Spotifust, GenaCleaner), concurrencia sin carreras de datos y consumo mínimo de memoria.',
      en: 'Preferred ecosystem for high-performance software (Spotifust, GenaCleaner), safe zero-cost concurrency, and minimal memory footprint.',
    },
    highlight: true,
    size: 'large',
    tags: ['Iced GUI', 'Tokio Async', 'Rodio Audio', 'TUI / ADB', 'Zero-Cost'],
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'core',
    roleBadge: {
      es: 'Framework Web // SSR & Islas',
      en: 'Web Framework // SSR & Islands',
    },
    color: '#ff5d01',
    bg: 'rgba(255, 93, 1, 0.12)',
    border: 'rgba(255, 93, 1, 0.35)',
    iconName: 'astro',
    description: {
      es: 'Arquitectura web ultrarrápida con Server-Side Rendering, hidratación parcial de islas interactivas y 0 KB de JavaScript innecesario en el cliente.',
      en: 'Blazing fast web architecture with Server-Side Rendering, partial island hydration, and zero unnecessary client JavaScript.',
    },
    highlight: true,
    size: 'large',
    tags: ['SSR', 'Islands Architecture', 'View Transitions', 'Content Collections'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'core',
    roleBadge: {
      es: 'Tipado Estricto // Fullstack',
      en: 'Strict Typing // Fullstack',
    },
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    iconName: 'typescript',
    description: {
      es: 'Tipado estático riguroso, interfaces robustas y contratos de datos seguros en el desarrollo de aplicaciones completas.',
      en: 'Rigorous static typing, robust interfaces, and end-to-end type safety for scalable application architectures.',
    },
    highlight: true,
    size: 'large',
    tags: ['Strict Mode', 'Generics', 'Type Safety', 'ESNext'],
  },
  {
    id: 'react',
    name: 'React / Preact',
    category: 'frontend',
    roleBadge: {
      es: 'Interfaces Reactivas',
      en: 'Reactive UI Components',
    },
    color: '#0db7b9',
    bg: 'rgba(13, 183, 185, 0.12)',
    border: 'rgba(13, 183, 185, 0.35)',
    iconName: 'react',
    description: {
      es: 'Diseño de componentes modulares, custom hooks y aplicaciones de escritorio (Stremio Enhanced).',
      en: 'Component-driven UI engineering, custom hooks, and desktop clients (Stremio Enhanced).',
    },
    size: 'medium',
    tags: ['Hooks', 'State Management', 'Electron UI'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    roleBadge: {
      es: 'Design Tokens & UI',
      en: 'Design Tokens & Layout',
    },
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.35)',
    iconName: 'tailwind',
    description: {
      es: 'Sistemas de diseño modernos basados en variables, maquetado responsivo y micro-interacciones a 60fps.',
      en: 'Design token systems, responsive fluid layouts, and GPU-accelerated 60fps micro-interactions.',
    },
    size: 'medium',
    tags: ['Tailwind v4', 'Design Tokens', 'Fluid UI'],
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    roleBadge: {
      es: 'Motor JS & Web APIs',
      en: 'Runtime Engine & Web APIs',
    },
    color: '#facc15',
    bg: 'rgba(250, 204, 21, 0.12)',
    border: 'rgba(250, 204, 21, 0.35)',
    iconName: 'javascript',
    description: {
      es: 'Dominio del runtime, asincronía avanzada, Event Loop y manipulación eficiente de la plataforma web.',
      en: 'Mastery of the JS engine, asynchronous event loop, and high-performance Web APIs.',
    },
    size: 'medium',
    tags: ['Async / Await', 'DOM APIs', 'Event Loop'],
  },
  {
    id: 'linux',
    name: 'Linux & Shell Scripting',
    category: 'systems',
    roleBadge: {
      es: 'SO Diario // POSIX',
      en: 'Daily Driver // POSIX',
    },
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.35)',
    iconName: 'linux',
    description: {
      es: 'Sistema operativo diario. Administración de sistemas, automatización de tareas y scripting avanzado en Bash/Zsh.',
      en: 'Daily driver OS. System administration, terminal automation, and advanced Bash/Zsh scripting.',
    },
    size: 'medium',
    tags: ['Bash / Zsh', 'POSIX APIs', 'Kernel & Tools'],
  },
  {
    id: 'bun',
    name: 'Bun & Node.js',
    category: 'backend',
    roleBadge: {
      es: 'Runtimes de Alta Velocidad',
      en: 'High-Speed Runtimes',
    },
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.12)',
    border: 'rgba(244, 114, 182, 0.35)',
    iconName: 'bun',
    description: {
      es: 'Servidores backend, APIs RESTful, gestión de paquetes instantánea y herramientas CLI.',
      en: 'Backend RESTful services, instant package execution, and fast CLI tooling.',
    },
    size: 'medium',
    tags: ['Bun Runtime', 'Node.js', 'REST APIs'],
  },
  {
    id: 'cpp',
    name: 'C / C++ & Algoritmos',
    category: 'systems',
    roleBadge: {
      es: 'Bases de Computación (UBA)',
      en: 'CS Foundations (UBA)',
    },
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.12)',
    border: 'rgba(96, 165, 250, 0.35)',
    iconName: 'cpp',
    description: {
      es: 'Gestión manual de memoria, punteros, estructuras de datos avanzadas y algoritmos de optimización.',
      en: 'Manual memory management, pointers, complex data structures, and algorithmic optimization.',
    },
    size: 'small',
    tags: ['Memory Management', 'Algorithms', 'Data Structures'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'systems',
    roleBadge: {
      es: 'Scripting & Ciencias Exactas',
      en: 'Scripting & Academic CS',
    },
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    iconName: 'python',
    description: {
      es: 'Scripting rápido, prototipado de algoritmos y computación científica en el marco universitario.',
      en: 'Rapid scripting, algorithmic prototyping, and computational science at university.',
    },
    size: 'small',
    tags: ['Prototyping', 'Scientific Computing', 'CS Exactas'],
  },
  {
    id: 'git',
    name: 'Git & GitHub Actions',
    category: 'tools',
    roleBadge: {
      es: 'CI/CD & Version Control',
      en: 'CI/CD & Version Control',
    },
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.12)',
    border: 'rgba(244, 63, 94, 0.35)',
    iconName: 'git',
    description: {
      es: 'Control de versiones atómico, ramas semánticas y pipelines automatizados de build y deploy continuo.',
      en: 'Atomic version control, semantic branching, and automated CI/CD build & deploy pipelines.',
    },
    size: 'small',
    tags: ['GitHub Actions', 'Automated CI/CD', 'Release Automation'],
  },
  {
    id: 'database',
    name: 'Bases de Datos (SQL)',
    category: 'backend',
    roleBadge: {
      es: 'PostgreSQL & SQLite',
      en: 'PostgreSQL & SQLite',
    },
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.35)',
    iconName: 'database',
    description: {
      es: 'Modelado relacional, consultas SQL optimizadas, integridad referencial y almacenamiento embebido.',
      en: 'Relational data modeling, optimized SQL queries, referential integrity, and embedded storage.',
    },
    size: 'small',
    tags: ['PostgreSQL', 'SQLite', 'Relational Models'],
  },
  {
    id: 'adb',
    name: 'Android Debug Bridge (ADB)',
    category: 'tools',
    roleBadge: {
      es: 'Low-Level Android Tools',
      en: 'Low-Level Android Tools',
    },
    color: '#a3e635',
    bg: 'rgba(163, 230, 53, 0.12)',
    border: 'rgba(163, 230, 53, 0.35)',
    iconName: 'adb',
    description: {
      es: 'Optimización de dispositivos Android, gestión de paquetes a bajo nivel y comunicación serial por TUI (GenaCleaner).',
      en: 'Android device optimization, low-level package maintenance, and serial ADB integration via TUI (GenaCleaner).',
    },
    size: 'small',
    tags: ['ADB Protocol', 'Package Debloat', 'Android Low-Level'],
  },
  {
    id: 'vite',
    name: 'Vite & Modern Tooling',
    category: 'tools',
    roleBadge: {
      es: 'Bundling & Dev Server',
      en: 'Bundling & Dev Server',
    },
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.12)',
    border: 'rgba(192, 132, 252, 0.35)',
    iconName: 'vite',
    description: {
      es: 'Empaquetado basado en módulos ESM nativos, Hot Module Replacement instantáneo y optimización de assets.',
      en: 'Native ESM packaging, instant Hot Module Replacement (HMR), and asset optimization.',
    },
    size: 'small',
    tags: ['Native ESM', 'HMR', 'Build Optimization'],
  },
];
