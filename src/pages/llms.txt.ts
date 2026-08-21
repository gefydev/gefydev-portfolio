import type { APIRoute } from 'astro';
import { projects, openSourceContributions } from '../data/projects';
import { techStack } from '../data/stack';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://gefy.dev';

  const content = `# GefyDev (Genaro Febbo Yapur)

> Full-Stack & Systems Developer from Buenos Aires, Argentina. Undergraduate Computer Science student at Faculty of Exact and Natural Sciences — University of Buenos Aires (FCEyN) and Colegio Nacional de Buenos Aires (CNBA) alumnus.

## Main Pages
- [Inicio en Español](${siteUrl}/es): Portfolio principal de Genaro Febbo Yapur (GefyDev) en Español.
- [English Portfolio](${siteUrl}/en): Primary developer portfolio of Genaro Febbo Yapur (GefyDev) in English.
- [Canonical Site](${siteUrl}/): Root portfolio entrypoint with automatic locale routing.

## Featured Software Projects
${projects.map((p) => `- [${p.name}](${p.homepageUrl || p.githubUrl}): ${p.description.en} (Repository: [GitHub](${p.githubUrl}))`).join('\n')}

## Open Source Contributions
${openSourceContributions.map((c) => `- [${c.author}/${c.repo}](${c.url}): ${c.description.en} (Role: ${c.role.en}, Stars: ${c.stars})`).join('\n')}

## Technical Competencies
${techStack.map((t) => `- **${t.name}** (${t.level.toUpperCase()}): ${t.description.en}`).join('\n')}

## Developer Links & Social
- [GitHub Profile](https://github.com/gefydev): Official open-source repositories and contributions.
- [Email Contact](mailto:hi@gefy.dev): Direct professional communication channel.
- [XML Sitemap](${siteUrl}/sitemap.xml): Complete machine-readable URL index.
- [Robots Directive](${siteUrl}/robots.txt): Web crawler directives and sitemap declaration.
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
};
