# 🚀 gefydev — Developer Portfolio

> Portfolio personal de **Genaro Febbo Yapur (gefydev)** — Desarrollador Full-Stack & Frontend radicado en Buenos Aires, Argentina.

Construido con **Astro (SSR)**, **TypeScript**, **Tailwind CSS v4** y arquitectura orientada a máximo rendimiento (Lighthouse 100/100), diseño editorial monospace + Geist y soporte completo de internacionalización (Español e Inglés) detectado en servidor.

---

## ⚡ Características Principales

- 🌐 **Astro SSR con Detección Automática de Idioma:** Detección en middleware del header `Accept-Language` y cookies de preferencia para servir Español (`/es`) o Inglés (`/en`) al instante sin saltos ni flash de contenido.
- 🎨 **Diseño Editorial & Cyber Minimal:** Tipografías modernas con Geist Sans y Geist Mono Variable, estética en modo oscuro profundo (Obsidian), paleta de tokens refinada y detalles monospace.
- ⌨️ **Paleta de Comandos Interactiva (`⌘K` / `Ctrl+K`):** Navegación rápida por teclado, copiado directo de email con feedback, selector de idioma, accesos directos y confeti.
- 🕒 **Reloj en Tiempo Real de Buenos Aires (GMT-3):** Indicador de zona horaria con precisión local en vivo en el Navbar y la sección About.
- 📦 **Catálogo de Proyectos Reales:**
  - **ComiDolar** ([comidolar.com.ar](https://comidolar.com.ar)) — Monitor de divisas argentinas en tiempo real con Astro y GitHub Actions.
  - **BlackMaps** ([blackmaps.com.ar](https://blackmaps.com.ar)) — Plataforma interactiva de mapas y cartografía visual.
  - **412** ([cuatrodoce.vercel.app](https://cuatrodoce.vercel.app)) — Web hub para el programa de debate y streaming de fútbol.
  - **RockPaperChiappa** ([rockpaperchiappa.vercel.app](https://rockpaperchiappa.vercel.app)) — Juego interactivo en Preact + TypeScript + Vite.
  - **YourProfiles**, **macsplash**, **HojasDiarias** y herramientas comunitarias del CNBA.
- 💼 **Componente de Experiencia Modular (`src/components/Experience.astro`):** Preparado y listo para ser completado cuando inicies tu primera experiencia laboral formal.
- 🔍 **SEO Integral & Schema.org:** JSON-LD Structured Data (`Person`, `WebSite`, `ProfilePage`, `ItemList`), OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml` dinámico con `hreflang` y endpoint `llms.txt`.
- 🛠️ **35+ Agent Skills Integradas:** Skills de UI, Web Quality (Addy Osmani) y SEO técnico (Claude SEO) configuradas en `.agents/skills`.

---

## 💻 Desarrollo Local

Este proyecto utiliza **`bun`** como runtime y gestor de paquetes.

```bash
# 1. Instalar dependencias
bun install

# 2. Iniciar servidor de desarrollo
bun run dev

# 3. Construir para producción (SSR)
bun run build

# 4. Previsualizar la build de producción
bun run preview
```

---

## 📁 Estructura del Proyecto

```
gefydev-portfolio/
├── .agents/
│   └── skills/           # 37 skills de UI, SEO y Web Quality
├── public/
│   ├── favicon-32.png    # Favicon PNG (32x32)
│   ├── favicon-192.png   # Favicon PNG (192x192)
│   ├── favicon-512.png   # Favicon PNG (512x512)
│   ├── apple-touch-icon.png # Icono para dispositivos Apple (180x180)
│   ├── og-image.png      # Imagen OpenGraph para redes
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── About.astro          # Sobre mí, educación CNBA y reloj BA
│   │   ├── Contact.astro        # Contacto, email directo y redes
│   │   ├── Experience.astro     # Componente modular de experiencia
│   │   ├── Footer.astro         # Pie de página y botón back-to-top
│   │   ├── Hero.astro           # Hero principal, comando npx y avatar
│   │   ├── Navbar.astro         # Navegación, reloj GMT-3 y toggle idioma
│   │   ├── ProjectCard.astro    # Tarjeta de proyecto con preview SVG
│   │   ├── Projects.astro       # Bento Grid y filtros por categoría
│   │   ├── SEO.astro            # Meta tags y schemas JSON-LD
│   │   ├── TechStack.astro      # Matriz de tecnologías y terminal
│   │   └── TerminalModal.astro  # Paleta de comandos (Cmd+K)
│   ├── data/
│   │   ├── projects.ts          # Datos tipados de repositorios públicos
│   │   ├── stack.ts             # Tecnologías y niveles de dominio
│   │   └── translations.ts      # Diccionario ES / EN completo
│   ├── layouts/
│   │   └── Layout.astro         # Layout base con View Transitions
│   ├── pages/
│   │   ├── es/index.astro       # Ruta explícita español
│   │   ├── en/index.astro       # Ruta explícita inglés
│   │   ├── index.astro          # Entrada SSR con detección de idioma
│   │   ├── 404.astro            # Página 404 personalizada
│   │   ├── llms.txt.ts          # Contexto para agentes y LLMs
│   │   ├── robots.txt.ts        # Endpoint robots.txt
│   │   └── sitemap.xml.ts       # Endpoint sitemap.xml con hreflang
│   ├── styles/
│   │   └── global.css           # Tailwind v4, Geist fonts y temas
│   ├── middleware.ts            # Middleware SSR para detección de idioma
│   └── env.d.ts                 # Tipos de TypeScript para Astro Locals
├── astro.config.mjs             # Configuración de Astro SSR + Node + Tailwind
└── package.json
```

---

## 👤 Contacto & Redes

- **Desarrollador:** Genaro Febbo Yapur (gefydev)
- **Email:** [genafeeboyapur@gmail.com](mailto:genafeeboyapur@gmail.com)
- **GitHub:** [@gefydev](https://github.com/gefydev)
- **X (Twitter):** [@gefydev](https://x.com/gefydev)
