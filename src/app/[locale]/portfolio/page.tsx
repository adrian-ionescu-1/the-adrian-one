import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PortfolioHero } from '@/components/sections/PortfolioHero';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { PortfolioStats } from '@/components/sections/PortfolioStats';
import { PortfolioCTA } from '@/components/sections/PortfolioCTA';
import { OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

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
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Portfolio | The Adrian One',
      description,
      images: [OG_IMAGE.url],
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
