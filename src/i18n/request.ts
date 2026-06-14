import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const [shared, home, services, portfolio, partners, about, contact] = await Promise.all([
    import(`../../messages/${locale}/shared.json`),
    import(`../../messages/${locale}/home.json`),
    import(`../../messages/${locale}/services.json`),
    import(`../../messages/${locale}/portfolio.json`),
    import(`../../messages/${locale}/partners.json`),
    import(`../../messages/${locale}/about.json`),
    import(`../../messages/${locale}/contact.json`),
  ]);

  return {
    locale,
    messages: {
      ...shared.default,
      ...home.default,
      ...services.default,
      ...portfolio.default,
      ...partners.default,
      ...about.default,
      ...contact.default,
    },
  };
});
