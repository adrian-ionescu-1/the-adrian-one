import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PortfolioHero } from '@/components/sections/PortfolioHero';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { PortfolioStats } from '@/components/sections/PortfolioStats';
import { PortfolioCTA } from '@/components/sections/PortfolioCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolioPage.hero' });
  return {
    title: 'Portfolio — The Adrian One',
    description: t('subheading'),
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
