import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { techStack } from '../data/stack';

export const GET: APIRoute = async () => {
  const content = `# GenaDeev (Genaro Febbo Yapur) — Developer Profile

> 16-year-old Full-Stack & Frontend Developer from Buenos Aires, Argentina. Student at Colegio Nacional de Buenos Aires (CNBA - UBA).

## Profile Summary
- Name: Genaro Febbo Yapur
- Handle: GenaDeev
- Location: Buenos Aires, Argentina (GMT-3)
- Education: Colegio Nacional de Buenos Aires (CNBA)
- Primary Stack: TypeScript, JavaScript, Astro, React, Node.js, Express, Tailwind CSS, Linux
- Exploring: Rust, Systems Programming

## Core Web Projects
${projects.map((p) => `- **${p.name}** (${p.homepageUrl || p.githubUrl}): ${p.description.en} [Stack: ${p.tech.join(', ')}]`).join('\n')}

## Technical Stack
${techStack.map((t) => `- **${t.name}** (${t.category}): ${t.description.en}`).join('\n')}

## Links & Socials
- GitHub: https://github.com/GenaDeev
- X (Twitter): https://x.com/GenaDeev
- Email: genafeeboyapur@gmail.com
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
