export const SITE_URL = 'https://www.theadrianone.com';

export const LOCALES = ['ro', 'en'] as const;
export type SiteLocale = (typeof LOCALES)[number];

export function ogLocale(locale: string): string {
  return locale === 'ro' ? 'ro_RO' : 'en_US';
}

export function pageAlternates(locale: string, path: string) {
  const suffix = path === '' ? '' : `/${path}`;
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ro: `/ro${suffix}`,
      en: `/en${suffix}`,
      'x-default': `/ro${suffix}`,
    },
  };
}
