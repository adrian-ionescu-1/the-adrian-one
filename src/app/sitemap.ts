import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES } from '@/lib/seo';

const routes = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/portfolio', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/partners', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
