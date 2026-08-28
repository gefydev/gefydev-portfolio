export interface TechItem {
  name: string;
  category: 'web-core' | 'languages' | 'ecosystem' | 'tools' | 'databases' | 'systems';
  roleBadge: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  tags: string[];
  icon: string;
  color: string;
  bg: string;
  border: string;
}

export const techStack: TechItem[] = [
  // ROW 1: PRIMARY WEB CORE
  {
    name: 'TypeScript',
    category: 'web-core',
    roleBadge: {
      es: 'Lenguaje Principal // Fullstack',
      en: 'Primary Language // Fullstack',
    },
    description: {
      es: 'Tipado estático riguroso, interfaces robustas y seguridad de tipos de extremo a extremo para aplicaciones web escalables y mantenibles.',
      en: 'Rigorous static typing, robust interfaces, and end-to-end type safety for scalable and maintainable web applications.',
    },
    tags: ['Strict Mode', 'Generics', 'Type Safety', 'ESNext'],
    icon: 'typescript',
    color: '#3178c6',
    bg: 'rgba(49, 120, 198, 0.08)',
    border: 'rgba(49, 120, 198, 0.25)',
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'web-core',
    roleBadge: {
      es: 'Motor Web // Runtimes & APIs',
      en: 'Web Engine // Runtimes & APIs',
    },
    description: {
      es: 'Dominio del motor JS, flujo asíncrono, event loop, manipulación directa del DOM y APIs web de alto rendimiento.',
      en: 'Deep mastery of the JS engine, asynchronous event loop, direct DOM manipulation, and high-performance Web APIs.',
    },
    tags: ['Async / Await', 'DOM APIs', 'Event Loop', 'Modern Web'],
    icon: 'javascript',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.08)',
    border: 'rgba(234, 179, 8, 0.25)',
  },
  {
    name: 'React / Preact',
    category: 'web-core',
    roleBadge: {
      es: 'Ingeniería de UI // Componentes',
      en: 'UI Engineering // Components',
    },
    description: {
      es: 'Desarrollo de interfaces reactivas, custom hooks, control de estado y micro-interacciones fluidas optimizadas para 60fps.',
      en: 'Component-driven UI engineering, custom hooks, optimized state architecture, and smooth 60fps micro-interactions.',
    },
    tags: ['Hooks', 'State Management', 'Virtual DOM', 'Clean Components'],
    icon: 'react',
    color: '#22d3ee',
    bg: 'rgba(34, 211, 238, 0.08)',
    border: 'rgba(34, 211, 238, 0.25)',
  },
  {
    name: 'Astro',
    category: 'web-core',
    roleBadge: {
      es: 'Framework Web // SSR & Islands',
      en: 'Web Framework // SSR & Islands',
    },
    description: {
      es: 'Arquitectura web ultrarrápida con Server-Side Rendering, hidratación parcial por islas y rendimiento impecable sin JS innecesario.',
      en: 'Blazing fast web architecture with Server-Side Rendering, partial island hydration, and zero unnecessary client JavaScript.',
    },
    tags: ['SSR', 'Islands Architecture', 'View Transitions', 'Content Collections'],
    icon: 'astro',
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.08)',
    border: 'rgba(251, 146, 60, 0.25)',
  },

  // ROW 2: LOW-LEVEL & CS FOUNDATIONS
  {
    name: 'Rust',
    category: 'languages',
    roleBadge: {
      es: 'Sistemas & CLI // Exploración',
      en: 'Systems & CLI // Exploration',
    },
    description: {
      es: 'Ecosistema de sistemas y bajo nivel para desarrollo de herramientas CLI/TUI, clientes nativos ligeros y exploración de concurrencia segura.',
      en: 'Systems and low-level ecosystem for crafting CLI/TUI utilities, lightweight native clients, and safe concurrency exploration.',
    },
    tags: ['Iced GUI', 'Tokio Async', 'Memory Safety', 'TUI / CLI'],
    icon: 'rust',
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.08)',
    border: 'rgba(234, 88, 12, 0.25)',
  },
  {
    name: 'C',
    category: 'languages',
    roleBadge: {
      es: 'Fundamentos & Memoria // Exactas UBA',
      en: 'Foundations & Memory // UBA Exactas',
    },
    description: {
      es: 'Comprensión profunda de la gestión manual de memoria, punteros, llamadas al sistema POSIX y algoritmos a nivel de máquina.',
      en: 'Deep understanding of manual memory management, pointers, POSIX system calls, and machine-level algorithms.',
    },
    tags: ['Pointers', 'Memory Layout', 'POSIX', 'CS Foundations'],
    icon: 'c',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.25)',
  },
  {
    name: 'C++',
    category: 'languages',
    roleBadge: {
      es: 'Estructuras de Datos // Exactas UBA',
      en: 'Data Structures // UBA Exactas',
    },
    description: {
      es: 'Diseño de estructuras de datos complejas, plantillas, programación orientada a objetos y algoritmos eficientes en el ámbito académico.',
      en: 'Complex data structures design, templates, object-oriented programming, and efficient algorithmic implementations.',
    },
    tags: ['STL', 'OOP', 'Data Structures', 'Algorithms'],
    icon: 'cpp',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  {
    name: 'Python',
    category: 'languages',
    roleBadge: {
      es: 'Scripting & Algoritmia',
      en: 'Scripting & Algorithms',
    },
    description: {
      es: 'Automatización de tareas, análisis de datos, prototipado rápido de algoritmos y herramientas auxiliares de desarrollo.',
      en: 'Task automation, data analysis, rapid algorithmic prototyping, and auxiliary developer tooling.',
    },
    tags: ['Automation', 'Data Analysis', 'Scripting', 'Prototyping'],
    icon: 'python',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
  },

  // ROW 3: WEB ECOSYSTEM, RUNTIMES & TOOLS
  {
    name: 'Tailwind CSS',
    category: 'ecosystem',
    roleBadge: {
      es: 'Design Tokens & Layout',
      en: 'Design Tokens & Layout',
    },
    description: {
      es: 'Sistemas de diseño basados en tokens, maquetación fluida y responsiva, y micro-interacciones visuales aceleradas por hardware.',
      en: 'Token-based design systems, responsive fluid layouts, and hardware-accelerated visual micro-interactions.',
    },
    tags: ['Tailwind v4', 'Design Tokens', 'Fluid UI', 'Responsive'],
    icon: 'tailwind',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  {
    name: 'Bun & Node.js',
    category: 'ecosystem',
    roleBadge: {
      es: 'Runtimes JavaScript',
      en: 'JavaScript Runtimes',
    },
    description: {
      es: 'Desarrollo de scripts, empaquetado ultrarrápido con Bun, servidores backend ligeros y gestión avanzada de paquetes npm.',
      en: 'Fast scripting, ultrafast bundling with Bun, lightweight backend servers, and advanced npm package management.',
    },
    tags: ['Fast Bundling', 'HTTP Servers', 'CLI Tooling', 'npm / bun'],
    icon: 'bun',
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.08)',
    border: 'rgba(244, 114, 182, 0.25)',
  },
  {
    name: 'Vite',
    category: 'ecosystem',
    roleBadge: {
      es: 'Tooling & Bundler Moderno',
      en: 'Modern Tooling & Bundler',
    },
    description: {
      es: 'Entornos de desarrollo instantáneos basados en ESM, Hot Module Replacement (HMR) y pipelines optimizados de compilación.',
      en: 'Instant ESM-based dev environments, lightning fast HMR, and optimized production build pipelines.',
    },
    tags: ['Hot Reload', 'ESM Bundler', 'Plugins', 'Rollup Engine'],
    icon: 'vite',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.08)',
    border: 'rgba(168, 85, 247, 0.25)',
  },

  // ROW 4: DEVOPS, DATA & SYSTEMS
  {
    name: 'Linux & Shell Scripting',
    category: 'systems',
    roleBadge: {
      es: 'Entorno de Desarrollo & OS',
      en: 'Development OS & Scripting',
    },
    description: {
      es: 'Entorno principal de desarrollo, scripting en Bash/Zsh, configuración de servidores, gestión de procesos y herramientas POSIX.',
      en: 'Primary development OS, Bash/Zsh automation scripting, server configuration, process management, and POSIX utilities.',
    },
    tags: ['Bash / Zsh', 'POSIX Tools', 'Process Management', 'CLI'],
    icon: 'linux',
    color: '#facc15',
    bg: 'rgba(250, 204, 21, 0.08)',
    border: 'rgba(250, 204, 21, 0.25)',
  },
  {
    name: 'PostgreSQL & SQLite',
    category: 'databases',
    roleBadge: {
      es: 'Bases de Datos & SQL',
      en: 'Databases & SQL',
    },
    description: {
      es: 'Modelado relacional, consultas SQL optimizadas, integridad de datos y bases de datos embebidas para aplicaciones locales.',
      en: 'Relational data modeling, optimized SQL queries, data integrity, and embedded databases for local applications.',
    },
    tags: ['Relational Data', 'Query Tuning', 'Embedded DB', 'ACID'],
    icon: 'database',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.25)',
  },
  {
    name: 'Git & GitHub Actions',
    category: 'tools',
    roleBadge: {
      es: 'Control de Versiones & CI/CD',
      en: 'Version Control & CI/CD',
    },
    description: {
      es: 'Flujos de trabajo con Git, pipelines automatizados de Continuous Integration (CI), auditoría de calidad y despliegues automáticos.',
      en: 'Git branching workflows, automated Continuous Integration (CI) pipelines, quality linting, and automated deployments.',
    },
    tags: ['Branching', 'GitHub Actions', 'Automated CI', 'Releases'],
    icon: 'git',
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.08)',
    border: 'rgba(249, 115, 22, 0.25)',
  },
  {
    name: 'Android Debug Bridge (ADB)',
    category: 'tools',
    roleBadge: {
      es: 'Automatización Móvil & CLI',
      en: 'Mobile Automation & CLI',
    },
    description: {
      es: 'Control por comandos, automatización de dispositivos Android, debloating asistido y puente de depuración (utilizado en GenaCleaner).',
      en: 'Command-line control, Android device automation, assisted debloating, and bridge debugging (featured in GenaCleaner).',
    },
    tags: ['Shell Automation', 'Device Management', 'Bridge Protocol'],
    icon: 'adb',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.08)',
    border: 'rgba(52, 211, 153, 0.25)',
  },
];
