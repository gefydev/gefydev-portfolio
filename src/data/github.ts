// Lectura del snapshot que deja scripts/github-data.mjs antes de compilar.
import snapshot from './github-snapshot.json';

const stars = snapshot.stars as Record<string, { value: number; fetchedAt: string }>;
const prs = snapshot.prs as Record<string, { total: number; merged: number; fetchedAt: string }>;

export const starsOf = (repo: string): number => stars[repo]?.value ?? 0;
export const mergedPrsOf = (repo: string): number => prs[repo]?.merged ?? 0;
export const githubFetchedAt: string | null = snapshot.fetchedAt;
export const githubDate = (lang: 'es' | 'en'): string =>
  githubFetchedAt ? new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', { dateStyle: 'medium', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date(githubFetchedAt)) : '';
