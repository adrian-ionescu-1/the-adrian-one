import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { AboutHero } from '@/components/sections/AboutHero';
import { AboutStory } from '@/components/sections/AboutStory';
import { AboutSkills } from '@/components/sections/AboutSkills';
import { AboutValues } from '@/components/sections/AboutValues';
import { AboutCTA } from '@/components/sections/AboutCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.hero' });
  return {
    title: 'About — The Adrian One',
    description: t('subheading'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutSkills />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
