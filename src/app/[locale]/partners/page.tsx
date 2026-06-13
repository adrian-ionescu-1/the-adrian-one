import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PartnersHero } from '@/components/sections/PartnersHero';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { PartnersTypes } from '@/components/sections/PartnersTypes';
import { PartnersBenefits } from '@/components/sections/PartnersBenefits';
import { PartnersCTA } from '@/components/sections/PartnersCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partnersPage.hero' });
  return {
    title: 'Partners — The Adrian One',
    description: t('subheading'),
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PartnersHero />
      <PartnersMarquee />
      <PartnersTypes />
      <PartnersBenefits />
      <PartnersCTA />
    </>
  );
}
