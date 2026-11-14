/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    lang: 'es' | 'en';
  }
}
interface ImportMetaEnv { readonly SITE_LASTMOD: string }
