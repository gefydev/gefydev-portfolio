import type { APIRoute } from 'astro';
import { projects, openSourceContributions } from '../data/projects';
import { techStack } from '../data/stack';

export const GET: APIRoute = async () => {
  const content = `# GefyDev (Genaro Febbo Yapur) — Developer Profile

> Full-Stack & Systems Developer from Buenos Aires, Argentina. Undergraduate Computer Science student at Facultad de Ciencias Exactas y Naturales (Exactas UBA) and Colegio Nacional de Buenos Aires (CNBA) alumnus.

## Profile Summary
- Name: Genaro Febbo Yapur
- Handle: GefyDev
- Location: Buenos Aires, Argentina (GMT-3)
- Education:
  - B.S. in Computer Science (Undergraduate) — Exactas UBA (FCEyN)
  - Secondary School Alumnus — Colegio Nacional de Buenos Aires (CNBA - UBA)
- Primary Stack: Rust, TypeScript, JavaScript, Astro, React, Node.js, Tailwind CSS, Linux
- Contact Email: hi@gefy.dev
- GitHub: https://github.com/gefydev

## Flagship & Core Projects
${projects.map((p) => `- **${p.name}** (${p.homepageUrl || p.githubUrl}): ${p.description.en} [Stack: ${p.techTags.map((t) => t.name).join(', ')}]`).join('\n')}

## Open Source Contributions
${openSourceContributions.map((c) => `- **${c.repo}** by ${c.author} (${c.url}): ${c.description.en}`).join('\n')}

## Technical Stack
${techStack.map((t) => `- **${t.name}** (${t.category}): ${t.description.en}`).join('\n')}
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
