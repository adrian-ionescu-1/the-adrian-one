import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ServicesHero } from '@/components/sections/ServicesHero';
import { ServicesDetail } from '@/components/sections/ServicesDetail';
import { WhyChooseMe } from '@/components/sections/WhyChooseMe';
import { TechShowcase } from '@/components/sections/TechShowcase';
import { ServicesFAQ } from '@/components/sections/ServicesFAQ';
import { ServicesCTA } from '@/components/sections/ServicesCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage.hero' });
  return {
    title: 'Services — The Adrian One',
    description: t('subheading'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero />
      <ServicesDetail />
      <WhyChooseMe />
      <TechShowcase />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
