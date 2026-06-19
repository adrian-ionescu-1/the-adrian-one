import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PortfolioHero } from '@/components/sections/portfolio/PortfolioHero';
import { PortfolioGrid } from '@/components/sections/portfolio/PortfolioGrid';
import { PortfolioStats } from '@/components/sections/portfolio/PortfolioStats';
import { PortfolioCTA } from '@/components/sections/portfolio/PortfolioCTA';
import { ogLocale, pageAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolioPage.hero' });
  const description = t('subheading');

  return {
    title: 'Portfolio',
    description,
    alternates: pageAlternates(locale, 'portfolio'),
    openGraph: {
      title: 'Portfolio | The Adrian One',
      description,
      url: `/${locale}/portfolio`,
      type: 'website',
      locale: ogLocale(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Portfolio | The Adrian One',
      description,
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioStats />
      <PortfolioCTA />
    </>
  );
}
