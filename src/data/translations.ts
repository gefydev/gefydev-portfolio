export interface TranslationDict {
  meta: {
    title: string;
    description: string;
    keywords: string;
    role: string;
  };
  nav: {
    projects: string;
    stack: string;
    about: string;
    contact: string;
    commandPalette: string;
    location: string;
  };
  hero: {
    badge: string;
    greeting: string;
    roleTitle: string;
    subtitle: string;
    exploreProjects: string;
    contactMe: string;
    cliCommand: string;
    copied: string;
    availableBadge: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    filterAll: string;
    filterAstro: string;
    filterFullstack: string;
    filterTools: string;
    liveDemo: string;
    viewSource: string;
    stars: string;
    featured: string;
    placeholderImageAlt: string;
  };
  stack: {
    sectionTitle: string;
    sectionSubtitle: string;
    languages: string;
    frameworks: string;
    tools: string;
    databases: string;
    systems: string;
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    statsYears: string;
    statsProjects: string;
    statsCommits: string;
    educationTitle: string;
    educationSchool: string;
    educationDesc: string;
    locationTitle: string;
    locationCity: string;
    localTime: string;
  };
  experience: {
    sectionTitle: string;
    sectionSubtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    openToWorkBadge: string;
  };
  terminal: {
    title: string;
    searchPlaceholder: string;
    navigation: string;
    actions: string;
    close: string;
    goToProjects: string;
    goToStack: string;
    goToAbout: string;
    goToContact: string;
    copyEmail: string;
    switchLanguage: string;
    openGithub: string;
    triggerConfetti: string;
    emailCopiedNotice: string;
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    chatPrompt: string;
    emailLabel: string;
    copyEmailBtn: string;
    emailCopied: string;
    githubLabel: string;
    twitterLabel: string;
    linkedinLabel: string;
    discordLabel: string;
    directMessage: string;
    sendEmailBtn: string;
  };
  footer: {
    builtWith: string;
    locationBadge: string;
    rights: string;
    sourceCode: string;
    backToTop: string;
  };
}

export const translations: Record<'es' | 'en', TranslationDict> = {
  es: {
    meta: {
      title: 'GenaDeev — Desarrollador Full-Stack & Frontend Craftsman',
      description: 'Portfolio de Genaro Febbo Yapur (GenaDeev), desarrollador Full-Stack de 16 años radicado en Buenos Aires, Argentina. Especialista en TypeScript, Astro, React y Node.js.',
      keywords: 'GenaDeev, Genaro Febbo Yapur, Desarrollador Web, Full Stack Developer, Frontend, Astro, TypeScript, Buenos Aires, Argentina, Portfolio',
      role: 'Desarrollador Full-Stack & Frontend',
    },
    nav: {
      projects: 'Proyectos',
      stack: 'Stack',
      about: 'Sobre mí',
      contact: 'Contacto',
      commandPalette: 'Comandos',
      location: 'Buenos Aires, AR',
    },
    hero: {
      badge: '16 años • Estudiante CNBA • Buenos Aires, Argentina',
      greeting: 'Hola, soy',
      roleTitle: 'Desarrollador Full-Stack & Frontend',
      subtitle: 'Creo plataformas modernas, ecosistemas web ultrarrápidos y herramientas comunitarias con foco obsesivo en rendimiento, arquitectura limpia y experiencia de usuario.',
      exploreProjects: 'Ver Proyectos',
      contactMe: 'Hablemos',
      cliCommand: 'npx genadeev',
      copied: '¡Copiado!',
      availableBadge: 'Disponible para proyectos y desafíos',
    },
    projects: {
      sectionTitle: 'Proyectos Destacados',
      sectionSubtitle: 'Una selección de herramientas, plataformas en producción y desarrollos de código abierto.',
      filterAll: 'Todos',
      filterAstro: 'Astro & React',
      filterFullstack: 'Full-Stack & APIs',
      filterTools: 'Herramientas & UI',
      liveDemo: 'Visitar Sitio',
      viewSource: 'Código Fuente',
      stars: 'stars',
      featured: 'Destacado',
      placeholderImageAlt: 'Captura de pantalla de vista previa del proyecto',
    },
    stack: {
      sectionTitle: 'Tecnologías & Herramientas',
      sectionSubtitle: 'Ecosistema de desarrollo moderno que utilizo a diario para construir con máxima velocidad y robustez.',
      languages: 'Lenguajes',
      frameworks: 'Frameworks & Librerías',
      tools: 'Herramientas & Entornos',
      databases: 'Bases de Datos & Backend',
      systems: 'Sistemas & CI/CD',
    },
    about: {
      sectionTitle: 'Sobre Mí & Filosofía',
      sectionSubtitle: 'Apasionado por la ingeniería de software, el aprendizaje profundo y la creación de soluciones útiles.',
      bioParagraph1: 'Soy Genaro Febbo Yapur, conocido como GenaDeev. Tengo 16 años y soy estudiante del prestigioso Colegio Nacional de Buenos Aires (CNBA). Mi viaje en el desarrollo comenzó por la curiosidad de entender cómo funcionan las cosas por dentro y la emoción de dar vida a ideas que aporten valor a la comunidad.',
      bioParagraph2: 'Me especializo en el ecosistema TypeScript/JavaScript, utilizando Astro, React, Node.js y Express como pilares principales, además de experimentar activamente con Rust y herramientas de bajo nivel. Disfruto cada etapa del ciclo de vida del software: desde la arquitectura y el diseño visual con fuentes monospace y modernas, hasta la optimización extrema con Lighthouse y el despliegue automatizado.',
      bioParagraph3: 'No me conformo con hacer que el código funcione: me obsesiona entender el "por qué", optimizar Core Web Vitals, garantizar accesibilidad total y mantener una base de código impecable e idiomática.',
      statsYears: 'Años programando',
      statsProjects: 'Proyectos públicos creados',
      statsCommits: 'Commits y contribuciones',
      educationTitle: 'Formación Académica',
      educationSchool: 'Colegio Nacional de Buenos Aires (UBA)',
      educationDesc: 'Secundario orientado a ciencias exactas y humanidades. Formación analítica, rigurosa y pensamiento crítico.',
      locationTitle: 'Ubicación & Zona Horaria',
      locationCity: 'Buenos Aires, Argentina (GMT-3)',
      localTime: 'Hora local en Buenos Aires',
    },
    experience: {
      sectionTitle: 'Experiencia Laboral',
      sectionSubtitle: 'Trayectoria profesional y colaboraciones.',
      emptyTitle: 'Listo para mi primera oportunidad profesional',
      emptyDesc: 'Actualmente enfocado en proyectos de código abierto, herramientas comunitarias y formación continua. Con ganas de sumarme a equipos innovadores como desarrollador Frontend o Full-Stack.',
      openToWorkBadge: 'Buscando pasantías / roles junior',
    },
    terminal: {
      title: 'Paleta de Comandos',
      searchPlaceholder: 'Escribe un comando o busca una sección...',
      navigation: 'Navegación',
      actions: 'Acciones Rápidas',
      close: 'Cerrar [ESC]',
      goToProjects: 'Ir a sección de Proyectos',
      goToStack: 'Ver Tecnologías y Herramientas',
      goToAbout: 'Leer Sobre Mí y Filosofía',
      goToContact: 'Ir a Contacto y Redes',
      copyEmail: 'Copiar dirección de email',
      switchLanguage: 'Cambiar idioma a Inglés (EN)',
      openGithub: 'Abrir perfil de GitHub (@GenaDeev)',
      triggerConfetti: 'Lanzar confeti 🎉',
      emailCopiedNotice: '¡Email copiado al portapapeles!',
    },
    contact: {
      sectionTitle: 'Contacto & Conexión',
      sectionSubtitle: '¿Tenés una idea, propuesta de proyecto o simplemente querés charlar sobre tecnología?',
      chatPrompt: 'Escribime directamente',
      emailLabel: 'Email Principal',
      copyEmailBtn: 'Copiar Email',
      emailCopied: '¡Copiado!',
      githubLabel: 'GitHub',
      twitterLabel: 'X (Twitter)',
      linkedinLabel: 'LinkedIn',
      discordLabel: 'Discord',
      directMessage: 'Enviame un mensaje directo por cualquiera de estos canales y te respondo a la brevedad.',
      sendEmailBtn: 'Enviar Correo',
    },
    footer: {
      builtWith: 'Construido con Astro SSR, TypeScript y Tailwind CSS.',
      locationBadge: 'Buenos Aires • Argentina',
      rights: 'Todos los derechos reservados.',
      sourceCode: 'Código en GitHub',
      backToTop: 'Volver arriba',
    },
  },
  en: {
    meta: {
      title: 'GenaDeev — Full-Stack Developer & Frontend Craftsman',
      description: 'Portfolio of Genaro Febbo Yapur (GenaDeev), a 16-year-old Full-Stack developer based in Buenos Aires, Argentina. Specialized in TypeScript, Astro, React, and Node.js.',
      keywords: 'GenaDeev, Genaro Febbo Yapur, Web Developer, Full Stack Developer, Frontend, Astro, TypeScript, Buenos Aires, Argentina, Portfolio',
      role: 'Full-Stack & Frontend Developer',
    },
    nav: {
      projects: 'Projects',
      stack: 'Stack',
      about: 'About',
      contact: 'Contact',
      commandPalette: 'Commands',
      location: 'Buenos Aires, AR',
    },
    hero: {
      badge: '16 y/o • CNBA Student • Buenos Aires, Argentina',
      greeting: 'Hi, I am',
      roleTitle: 'Full-Stack & Frontend Developer',
      subtitle: 'I build modern platforms, ultrafast web ecosystems, and community tools with an obsessive focus on performance, clean architecture, and delightful user experience.',
      exploreProjects: 'Explore Projects',
      contactMe: 'Get in Touch',
      cliCommand: 'npx genadeev',
      copied: 'Copied!',
      availableBadge: 'Available for projects & opportunities',
    },
    projects: {
      sectionTitle: 'Featured Projects',
      sectionSubtitle: 'A curated showcase of production tools, web applications, and open-source contributions.',
      filterAll: 'All',
      filterAstro: 'Astro & React',
      filterFullstack: 'Full-Stack & APIs',
      filterTools: 'Tools & UI',
      liveDemo: 'Live Preview',
      viewSource: 'Source Code',
      stars: 'stars',
      featured: 'Featured',
      placeholderImageAlt: 'Project preview screenshot placeholder',
    },
    stack: {
      sectionTitle: 'Tech Stack & Tooling',
      sectionSubtitle: 'The modern technologies and tools I leverage daily to engineer high-velocity, reliable software.',
      languages: 'Languages',
      frameworks: 'Frameworks & Libraries',
      tools: 'Developer Tools',
      databases: 'Databases & Backend',
      systems: 'Systems & CI/CD',
    },
    about: {
      sectionTitle: 'About Me & Philosophy',
      sectionSubtitle: 'Driven by curiosity, deep first-principles learning, and creating impactful web experiences.',
      bioParagraph1: "I'm Genaro Febbo Yapur, known online as GenaDeev. I'm a 16-year-old student at the renowned Colegio Nacional de Buenos Aires (CNBA). My journey into software development sparked from wanting to understand what happens under the hood and crafting products that help real people.",
      bioParagraph2: "I specialize in the TypeScript / JavaScript ecosystem with Astro, React, Node.js, and Express as core pillars, while actively experimenting with Rust and low-level systems. I enjoy every phase of product engineering: from crisp editorial UI design combining monospace aesthetics to Lighthouse 100 optimizations and continuous deployment.",
      bioParagraph3: "I never settle for code that just 'works'—I dig into the 'why', optimize Core Web Vitals, ensure rigorous accessibility, and write clean, idiomatic code.",
      statsYears: 'Years coding',
      statsProjects: 'Public repositories',
      statsCommits: 'Commits & contributions',
      educationTitle: 'Education',
      educationSchool: 'Colegio Nacional de Buenos Aires (UBA)',
      educationDesc: 'Rigorous high school education emphasizing exact sciences, analytical thinking, and humanistic debate.',
      locationTitle: 'Location & Timezone',
      locationCity: 'Buenos Aires, Argentina (GMT-3)',
      localTime: 'Current local time in Buenos Aires',
    },
    experience: {
      sectionTitle: 'Work Experience',
      sectionSubtitle: 'Career milestones and engineering roles.',
      emptyTitle: 'Eager for my first professional software engineering role',
      emptyDesc: 'Currently focused on high-impact open source projects, community tools, and continuous skill advancement. Seeking junior full-stack or frontend opportunities and internships.',
      openToWorkBadge: 'Open for internships / junior roles',
    },
    terminal: {
      title: 'Command Palette',
      searchPlaceholder: 'Type a command or search section...',
      navigation: 'Navigation',
      actions: 'Quick Actions',
      close: 'Close [ESC]',
      goToProjects: 'Jump to Projects section',
      goToStack: 'View Tech Stack & Tools',
      goToAbout: 'Read About Me & Philosophy',
      goToContact: 'Go to Contact & Socials',
      copyEmail: 'Copy email address',
      switchLanguage: 'Switch language to Spanish (ES)',
      openGithub: 'Open GitHub profile (@GenaDeev)',
      triggerConfetti: 'Celebrate with confetti 🎉',
      emailCopiedNotice: 'Email copied to clipboard!',
    },
    contact: {
      sectionTitle: 'Get In Touch',
      sectionSubtitle: 'Have a project idea, opportunity, or just want to chat about tech and web performance?',
      chatPrompt: 'Drop me a message',
      emailLabel: 'Primary Email',
      copyEmailBtn: 'Copy Email',
      emailCopied: 'Copied!',
      githubLabel: 'GitHub',
      twitterLabel: 'X (Twitter)',
      linkedinLabel: 'LinkedIn',
      discordLabel: 'Discord',
      directMessage: 'Feel free to reach out across any of these channels and I will get back to you promptly.',
      sendEmailBtn: 'Send Email',
    },
    footer: {
      builtWith: 'Crafted with Astro SSR, TypeScript, and Tailwind CSS.',
      locationBadge: 'Buenos Aires • Argentina',
      rights: 'All rights reserved.',
      sourceCode: 'Source on GitHub',
      backToTop: 'Back to top',
    },
  },
};
