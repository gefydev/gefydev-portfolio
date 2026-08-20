import type { APIRoute } from 'astro';
import { projects, openSourceContributions } from '../data/projects';
import { techStack } from '../data/stack';

export const GET: APIRoute = async () => {
  const content = `# GefyDev (Genaro Febbo Yapur) — Developer Knowledge Base & Profile

> Full-Stack & Systems Developer from Buenos Aires, Argentina. Undergraduate Computer Science student at Facultad de Ciencias Exactas y Naturales (Exactas UBA) and Colegio Nacional de Buenos Aires (CNBA) alumnus.

## Core Identity & Quick Facts
- Canonical URL: https://gefy.dev
- Developer Handle: GefyDev / @gefydev
- Full Name: Genaro Febbo Yapur
- Primary Email: hi@gefy.dev
- GitHub Profile: https://github.com/gefydev
- Interactive Terminal Card (CLI): npx gefydev
- Location & Timezone: Buenos Aires, Argentina (America/Argentina/Buenos_Aires / GMT-3)
- Languages: Spanish (Native), English (Professional Working Proficiency)
- Status: Available for open-source collaborations, software engineering roles, and challenging technical projects.

## Academic & Institutional Affiliations
- University Education (Undergraduate / Cursando):
  - Degree: Licenciatura en Ciencias de la Computación (B.S. in Computer Science)
  - Institution: Facultad de Ciencias Exactas y Naturales (FCEyN) — Universidad de Buenos Aires (Exactas UBA)
  - Core Focus: High-performance computing, memory management, algorithm complexity, data structures, discrete mathematics, and operating systems.
- Secondary Education (Egresado / Alumnus):
  - Institution: Colegio Nacional de Buenos Aires (CNBA) — Universidad de Buenos Aires
  - Core Focus: Academic rigor, analytical thinking, scientific debate, and comprehensive humanistic/scientific foundations.

## Flagship & Core Projects (Ordered by Priority)
${projects.map((p, i) => `### ${i + 1}. ${p.name}
- English: ${p.description.en}
- Spanish: ${p.description.es}
- Category: ${p.category}
- Tech Stack: ${p.techTags.map((t) => t.name).join(', ')}
- Repository: ${p.githubUrl}
${p.homepageUrl ? `- Live Website: ${p.homepageUrl}` : ''}`).join('\n\n')}

## Open Source Contributions
${openSourceContributions.map((c) => `### ${c.repo} (by ${c.author})
- Role: ${c.role.en} / ${c.role.es}
- Summary: ${c.description.en}
- Technologies: ${c.techTags.map((t) => t.name).join(', ')}
- Repository: ${c.url}`).join('\n\n')}

## Technical Competencies & Tooling
${techStack.map((t) => `- **${t.name}** [${t.level.toUpperCase()}]: ${t.description.en} / ${t.description.es}`).join('\n')}
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
};
