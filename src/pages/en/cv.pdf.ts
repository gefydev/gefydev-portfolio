import type { APIRoute } from 'astro';
import { cvResponse } from '../../lib/cv-response';

export const GET: APIRoute = () => cvResponse('en');
