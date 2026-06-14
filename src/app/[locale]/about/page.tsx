import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStory } from '@/components/sections/about/AboutStory';
import { AboutSkills } from '@/components/sections/about/AboutSkills';
import { AboutValues } from '@/components/sections/about/AboutValues';
import { AboutCTA } from '@/components/sections/about/AboutCTA';
import { SITE_URL, OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Adrian Ionescu',
    jobTitle: 'Full-Stack Web Developer',
    description: '5+ years of full-stack development across Europe — fast, clean, and built to last.',
    url: `${SITE_URL}/ro/about`,
    image: `${SITE_URL}/images/avatar_adrian.jpg`,
    address: { '@type': 'PostalAddress', addressCountry: 'RO' },
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Node.js',
      'PostgreSQL', 'REST APIs', 'Web Performance', 'UI/UX',
    ],
    sameAs: ['https://github.com/adrian-ionescu-1'],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.hero' });
  const description = t('subheading');

  return {
    title: 'About',
    description,
    alternates: pageAlternates(locale, 'about'),
    openGraph: {
      title: 'About | The Adrian One',
      description,
      url: `/${locale}/about`,
      type: 'profile',
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About | The Adrian One',
      description,
      images: [OG_IMAGE.url],
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutHero />
      <AboutStory />
      <AboutSkills />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
