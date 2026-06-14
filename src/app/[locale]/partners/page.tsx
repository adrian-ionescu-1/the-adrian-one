import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PartnersHero } from '@/components/sections/PartnersHero';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { PartnersTypes } from '@/components/sections/PartnersTypes';
import { PartnersBenefits } from '@/components/sections/PartnersBenefits';
import { PartnersCTA } from '@/components/sections/PartnersCTA';
import { OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partnersPage.hero' });
  const description = t('subheading');

  return {
    title: 'Partners',
    description,
    alternates: pageAlternates(locale, 'partners'),
    openGraph: {
      title: 'Partners | The Adrian One',
      description,
      url: `/${locale}/partners`,
      type: 'website',
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Partners | The Adrian One',
      description,
      images: [OG_IMAGE.url],
    },
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
