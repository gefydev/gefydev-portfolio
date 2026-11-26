// Escribe public/deploy.json en cada build: la Action lo usa para saber cuándo producción ya sirve el build nuevo.
import fs from 'node:fs';

fs.writeFileSync(new URL('../public/deploy.json', import.meta.url), `${JSON.stringify({ commit: process.env.VERCEL_GIT_COMMIT_SHA || null, builtAt: new Date().toISOString() })}\n`);
