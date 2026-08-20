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
    contributions: string;
    contact: string;
    commandPalette: string;
    location: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
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
    filterRust: string;
    filterAstro: string;
    filterWeb: string;
    liveDemo: string;
    viewSource: string;
    stars: string;
    flagship: string;
    contributionsTitle: string;
    contributionsSubtitle: string;
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
    universityTitle: string;
    universityDegree: string;
    universitySchool: string;
    universityStatus: string;
    universityDesc: string;
    highSchoolTitle: string;
    highSchoolSchool: string;
    highSchoolStatus: string;
    highSchoolDesc: string;
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
    goToContributions: string;
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
      title: 'GefyDev (Genaro Febbo Yapur) — Desarrollador Full-Stack & Sistemas',
      description: 'Portfolio de Genaro Febbo Yapur (GefyDev), estudiante de Ciencias de la Computación en Exactas UBA y egresado del CNBA. Especialista en Rust, TypeScript, Astro y React.',
      keywords: 'GefyDev, Genaro Febbo Yapur, Desarrollador Web, Rust, Astro, TypeScript, Ciencias de la Computacion, Exactas UBA, CNBA, Buenos Aires, Portfolio',
      role: 'Desarrollador Full-Stack & Sistemas',
    },
    nav: {
      projects: 'Proyectos',
      contributions: 'Contribuciones',
      stack: 'Stack',
      about: 'Sobre mí',
      contact: 'Contacto',
      commandPalette: 'Comandos',
      location: 'Buenos Aires, AR',
    },
    hero: {
      badge: 'Exactas UBA • Egresado CNBA • Buenos Aires, Argentina',
      greeting: 'Hola, soy',
      name: 'Genaro Febbo Yapur',
      roleTitle: 'Desarrollador Full-Stack & Sistemas',
      subtitle: 'Construyo software de alto rendimiento, clientes de streaming, herramientas de bajo nivel en Rust y plataformas web en Astro. Con foco riguroso en velocidad de ejecución, arquitectura limpia y diseño moderno.',
      exploreProjects: 'Ver Proyectos',
      contactMe: 'Contactar',
      cliCommand: 'npx gefydev',
      copied: '¡Copiado!',
      availableBadge: 'Disponible para proyectos y desafíos',
    },
    projects: {
      sectionTitle: 'Proyectos Principales',
      sectionSubtitle: 'Desarrollos destacados en Rust, Astro y tecnologías web con foco en rendimiento nativo y utilidad comunitaria.',
      filterAll: 'Todos',
      filterRust: 'Rust & CLI',
      filterAstro: 'Astro & React',
      filterWeb: 'Web & APIs',
      liveDemo: 'Visitar Demo',
      viewSource: 'Código en GitHub',
      stars: 'stars',
      flagship: 'Proyecto Estrella',
      contributionsTitle: 'Contribuciones de Código Abierto',
      contributionsSubtitle: 'Participación activa en proyectos de la comunidad de código abierto.',
    },
    stack: {
      sectionTitle: 'Tecnologías & Herramientas',
      sectionSubtitle: 'Herramientas y lenguajes con los que desarrollo software rápido, seguro y escalable.',
      languages: 'Lenguajes de Programación',
      frameworks: 'Frameworks & Librerías',
      tools: 'Herramientas de Desarrollo',
      databases: 'Backend & Bases de Datos',
      systems: 'Sistemas & Automatización',
    },
    about: {
      sectionTitle: 'Sobre Mí & Trayectoria',
      sectionSubtitle: 'Pasión por la ciencia de la computación, el código eficiente y el aprendizaje en profundidad.',
      bioParagraph1: 'Soy Genaro Febbo Yapur, conocido en el entorno de desarrollo como GefyDev. Me apasiona entender el funcionamiento del software a fondo: desde la gestión de memoria y el rendimiento a bajo nivel con Rust, hasta la creación de plataformas web ultrarrápidas con Astro, TypeScript y React.',
      bioParagraph2: 'Actualmente me encuentro cursando la Licenciatura en Ciencias de la Computación en la Facultad de Ciencias Exactas y Naturales de la Universidad de Buenos Aires (Exactas UBA), tras haberme graduado del prestigioso Colegio Nacional de Buenos Aires (CNBA). Esta formación me brinda una sólida base matemática y analítica para abordar problemas complejos con rigor ingenieril.',
      bioParagraph3: 'Disfruto construir herramientas útiles tanto para la comunidad estudiantil como para el ecosistema open source, optimizando cada byte y cuidando la estética visual.',
      universityTitle: 'Educación Universitaria',
      universityDegree: 'Licenciatura en Ciencias de la Computación',
      universitySchool: 'Facultad de Ciencias Exactas y Naturales (FCEyN) — UBA',
      universityStatus: 'En curso (Cursando)',
      universityDesc: 'Formación universitaria de máxima excelencia en algoritmos, estructuras de datos, teoría de la computación, sistemas operativos y fundamentos matemáticos rigurosos.',
      highSchoolTitle: 'Educación Secundaria',
      highSchoolSchool: 'Colegio Nacional de Buenos Aires (CNBA) — UBA',
      highSchoolStatus: 'Egresado',
      highSchoolDesc: 'Histórica institución dependiente de la Universidad de Buenos Aires con formación integral de alta exigencia académica, pensamiento crítico y orientación humanista y científica.',
      locationTitle: 'Ubicación & Horario',
      locationCity: 'Buenos Aires, Argentina (GMT-3)',
      localTime: 'Hora local en Buenos Aires',
    },
    experience: {
      sectionTitle: 'Experiencia Profesional',
      sectionSubtitle: 'Trayectoria laboral y colaboraciones.',
      emptyTitle: 'Listo para mi primera oportunidad profesional',
      emptyDesc: 'Enfocado en proyectos de código abierto, desarrollo en Rust y desarrollo web moderno. Abierto a propuestas de pasantías y posiciones junior de desarrollo.',
      openToWorkBadge: 'Abierto a oportunidades / pasantías',
    },
    terminal: {
      title: 'Paleta de Comandos',
      searchPlaceholder: 'Escribe un comando o busca una sección...',
      navigation: 'Navegación',
      actions: 'Acciones Rápidas',
      close: 'Cerrar [ESC]',
      goToProjects: 'Ir a Proyectos Principales',
      goToContributions: 'Ver Contribuciones Open Source',
      goToStack: 'Ver Tecnologías & Herramientas',
      goToAbout: 'Leer Sobre Mí y Formación',
      goToContact: 'Ir a Contacto',
      copyEmail: 'Copiar email (hi@gefy.dev)',
      switchLanguage: 'Cambiar idioma a Inglés (EN)',
      openGithub: 'Abrir GitHub (@gefydev)',
      triggerConfetti: 'Lanzar confeti 🎉',
      emailCopiedNotice: '¡Email copiado al portapapeles!',
    },
    contact: {
      sectionTitle: 'Contacto',
      sectionSubtitle: '¿Querés conversar sobre un proyecto, oportunidad laboral o desarrollo de software?',
      chatPrompt: 'Escribime directamente',
      emailLabel: 'Correo Electrónico',
      copyEmailBtn: 'Copiar Email',
      emailCopied: '¡Copiado!',
      githubLabel: 'GitHub',
      directMessage: 'Podés contactarme por correo electrónico o consultar mis repositorios en GitHub. Respondo con rapidez.',
      sendEmailBtn: 'Enviar Correo',
    },
    footer: {
      builtWith: 'Desarrollado con Astro SSR, TypeScript y Tailwind CSS.',
      locationBadge: 'Buenos Aires • Argentina',
      rights: 'Todos los derechos reservados.',
      sourceCode: 'Código en GitHub',
      backToTop: 'Volver arriba',
    },
  },
  en: {
    meta: {
      title: 'GefyDev (Genaro Febbo Yapur) — Full-Stack & Systems Developer',
      description: 'Portfolio of Genaro Febbo Yapur (GefyDev), Computer Science undergraduate at Exactas UBA and CNBA alumnus. Specializing in Rust, TypeScript, Astro, and React.',
      keywords: 'GefyDev, Genaro Febbo Yapur, Software Developer, Rust, Astro, TypeScript, Computer Science, Exactas UBA, CNBA, Buenos Aires, Portfolio',
      role: 'Full-Stack & Systems Developer',
    },
    nav: {
      projects: 'Projects',
      contributions: 'Contributions',
      stack: 'Stack',
      about: 'About',
      contact: 'Contact',
      commandPalette: 'Commands',
      location: 'Buenos Aires, AR',
    },
    hero: {
      badge: 'Exactas UBA • CNBA Alumnus • Buenos Aires, Argentina',
      greeting: 'Hi, I am',
      name: 'Genaro Febbo Yapur',
      roleTitle: 'Full-Stack & Systems Developer',
      subtitle: 'I engineer high-performance software, lightweight streaming clients, low-level Rust tooling, and ultrafast Astro web applications with clean architecture and refined design.',
      exploreProjects: 'Explore Projects',
      contactMe: 'Get in Touch',
      cliCommand: 'npx gefydev',
      copied: 'Copied!',
      availableBadge: 'Available for projects & opportunities',
    },
    projects: {
      sectionTitle: 'Core Projects',
      sectionSubtitle: 'Key software systems engineered with Rust, Astro, and modern web technologies.',
      filterAll: 'All',
      filterRust: 'Rust & CLI',
      filterAstro: 'Astro & React',
      filterWeb: 'Web & APIs',
      liveDemo: 'Live Demo',
      viewSource: 'Source on GitHub',
      stars: 'stars',
      flagship: 'Flagship Project',
      contributionsTitle: 'Open Source Contributions',
      contributionsSubtitle: 'Active development and contributions across open-source ecosystems.',
    },
    stack: {
      sectionTitle: 'Technologies & Tools',
      sectionSubtitle: 'Languages and tools I use to engineer reliable, memory-efficient software.',
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Libraries',
      tools: 'Developer Tools',
      databases: 'Backend & Databases',
      systems: 'Systems & CI/CD',
    },
    about: {
      sectionTitle: 'About Me & Education',
      sectionSubtitle: 'Passionate about computer science, algorithm efficiency, and in-depth engineering.',
      bioParagraph1: "I'm Genaro Febbo Yapur, known in the developer community as GefyDev. I'm fascinated by how systems work under the hood: from memory safety and native efficiency in Rust to building lightning-fast server-rendered web platforms with Astro, TypeScript, and React.",
      bioParagraph2: "I am currently pursuing a Bachelor's Degree in Computer Science at the prestigious Faculty of Exact and Natural Sciences (Exactas UBA) of the University of Buenos Aires, following my graduation from the historic Colegio Nacional de Buenos Aires (CNBA). This provides me with a deep mathematical foundation and rigorous analytical problem-solving skills.",
      bioParagraph3: "I enjoy architecting tools that empower communities and open-source ecosystems, optimizing every single byte while crafting enjoyable visual experiences.",
      universityTitle: 'University Education',
      universityDegree: 'B.S. in Computer Science',
      universitySchool: 'Faculty of Exact and Natural Sciences (FCEyN) — UBA',
      universityStatus: 'In Progress (Undergraduate)',
      universityDesc: 'Top-tier academic training in algorithm design, data structures, operating systems, automata theory, and rigorous mathematics.',
      highSchoolTitle: 'Secondary Education',
      highSchoolSchool: 'Colegio Nacional de Buenos Aires (CNBA) — UBA',
      highSchoolStatus: 'Alumnus / Graduate',
      highSchoolDesc: 'Historic preparatory high school affiliated with the University of Buenos Aires, renowned for academic excellence, scientific rigor, and critical debate.',
      locationTitle: 'Location & Timezone',
      locationCity: 'Buenos Aires, Argentina (GMT-3)',
      localTime: 'Current local time in Buenos Aires',
    },
    experience: {
      sectionTitle: 'Work Experience',
      sectionSubtitle: 'Career background and collaborations.',
      emptyTitle: 'Ready for my first professional software engineering role',
      emptyDesc: 'Focused on open source contributions, low-level Rust tooling, and modern web development. Open to internship and junior engineering opportunities.',
      openToWorkBadge: 'Open to internships & junior roles',
    },
    terminal: {
      title: 'Command Palette',
      searchPlaceholder: 'Type a command or search section...',
      navigation: 'Navigation',
      actions: 'Quick Actions',
      close: 'Close [ESC]',
      goToProjects: 'Jump to Core Projects',
      goToContributions: 'View Open Source Contributions',
      goToStack: 'View Tech Stack & Tools',
      goToAbout: 'Read About Me & Education',
      goToContact: 'Go to Contact',
      copyEmail: 'Copy email (hi@gefy.dev)',
      switchLanguage: 'Switch language to Spanish (ES)',
      openGithub: 'Open GitHub (@gefydev)',
      triggerConfetti: 'Celebrate with confetti 🎉',
      emailCopiedNotice: 'Email copied to clipboard!',
    },
    contact: {
      sectionTitle: 'Get In Touch',
      sectionSubtitle: 'Interested in collaborating on a project or discussing software engineering?',
      chatPrompt: 'Reach out directly',
      emailLabel: 'Email Address',
      copyEmailBtn: 'Copy Email',
      emailCopied: 'Copied!',
      githubLabel: 'GitHub',
      directMessage: 'Feel free to send me an email or explore my public repositories on GitHub. I respond promptly.',
      sendEmailBtn: 'Send Email',
    },
    footer: {
      builtWith: 'Engineered with Astro SSR, TypeScript, and Tailwind CSS.',
      locationBadge: 'Buenos Aires • Argentina',
      rights: 'All rights reserved.',
      sourceCode: 'Source on GitHub',
      backToTop: 'Back to top',
    },
  },
};
