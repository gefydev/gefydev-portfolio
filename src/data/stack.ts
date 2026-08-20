export interface TechItem {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'databases' | 'systems';
  level: 'core' | 'proficient' | 'exploring';
  description: {
    es: string;
    en: string;
  };
  highlight?: boolean;
}

export const techStack: TechItem[] = [
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'core',
    description: {
      es: 'Mi lenguaje diario principal. Tipado estricto, interfaces sólidas y DX impecable.',
      en: 'My daily primary driver. Strict typing, robust interfaces, and stellar developer experience.',
    },
    highlight: true,
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'languages',
    level: 'core',
    description: {
      es: 'Dominio profundo del motor JS, asincronía, Event Loop y APIs nativas del navegador.',
      en: 'Deep mastery of the V8/JS engine, async patterns, event loop, and web platform APIs.',
    },
    highlight: true,
  },
  {
    name: 'Astro',
    category: 'frameworks',
    level: 'core',
    description: {
      es: 'Framework de cabecera para webs ultra veloces con arquitectura de islas y SSR.',
      en: 'Go-to framework for blazing fast websites with island architecture and zero-JS footprint.',
    },
    highlight: true,
  },
  {
    name: 'React / Preact',
    category: 'frameworks',
    level: 'core',
    description: {
      es: 'Construcción de interfaces interactivas complejas, hooks y gestión de estado modular.',
      en: 'Crafting interactive component architectures, custom hooks, and reactive UI patterns.',
    },
    highlight: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frameworks',
    level: 'core',
    description: {
      es: 'Diseño moderno basado en tokens, micro-animaciones, container queries y diseño responsivo.',
      en: 'Design-system token driven styling, micro-animations, container queries, and responsive layouts.',
    },
    highlight: true,
  },
  {
    name: 'Node.js & Express',
    category: 'databases',
    level: 'core',
    description: {
      es: 'Desarrollo de APIs RESTful, middlewares seguros, workers y servicios backend.',
      en: 'Architecting RESTful APIs, robust middlewares, background workers, and microservices.',
    },
    highlight: true,
  },
  {
    name: 'Bun',
    category: 'tools',
    level: 'core',
    description: {
      es: 'Package manager y runtime por defecto para desarrollo veloz y scripts eficientes.',
      en: 'Default package manager and ultra-fast runtime for seamless developer workflows.',
    },
    highlight: true,
  },
  {
    name: 'Rust',
    category: 'languages',
    level: 'exploring',
    description: {
      es: 'Explorando activamente gestión de memoria, seguridad de hilos y CLI tools de alto rendimiento.',
      en: 'Actively exploring memory safety, concurrency, systems programming, and high-performance CLIs.',
    },
    highlight: true,
  },
  {
    name: 'Linux & Bash Shell',
    category: 'systems',
    level: 'proficient',
    description: {
      es: 'Sistema operativo diario. Automatización mediante scripts de shell y configuración avanzada.',
      en: 'Daily driver OS. Shell automation scripting, terminal workflows, and system customization.',
    },
    highlight: true,
  },
  {
    name: 'Git & GitHub CLI',
    category: 'tools',
    level: 'core',
    description: {
      es: 'Control de versiones riguroso, automatizaciones con gh CLI y flujos de trabajo limpios.',
      en: 'Rigorous version control, CLI automation, branch strategies, and clean atomic commits.',
    },
  },
  {
    name: 'GitHub Actions / CI',
    category: 'systems',
    level: 'proficient',
    description: {
      es: 'Pipelines automatizados de testing, build programado (ej. ComiDolar cada 30m) y deploy.',
      en: 'Automated CI/CD pipelines, scheduled builds (e.g. ComiDolar every 30m), and deployment flows.',
    },
  },
  {
    name: 'Vite',
    category: 'tools',
    level: 'proficient',
    description: {
      es: 'Bundling ultrarrápido con ESM nativo, optimización de assets y configuración limpia.',
      en: 'Fast ESM bundling, tree-shaking, asset optimization, and lightning-fast HMR.',
    },
  },
  {
    name: 'PostgreSQL & SQLite',
    category: 'databases',
    level: 'proficient',
    description: {
      es: 'Modelado relacional, consultas estructuradas e integración eficiente con ORMs y drivers.',
      en: 'Relational data modeling, structured SQL queries, and lightweight local storage.',
    },
  },
  {
    name: 'Vercel / Cloudflare',
    category: 'systems',
    level: 'proficient',
    description: {
      es: 'Despliegues en el edge, serverless functions y optimización de entrega global.',
      en: 'Edge computing deployments, serverless functions, and global CDN delivery optimization.',
    },
  },
];
