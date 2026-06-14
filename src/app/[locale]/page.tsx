import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { About } from '@/components/sections/About';
import { SITE_URL, OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const description = t('subheadline');

  return {
    title: { absolute: 'The Adrian One' },
    description,
    alternates: pageAlternates(locale, ''),
    openGraph: {
      title: 'The Adrian One',
      description,
      url: `/${locale}`,
      type: 'website',
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Adrian One',
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Adrian Ionescu',
  jobTitle: 'Full-Stack Web Developer',
  url: SITE_URL,
  image: `${SITE_URL}/images/avatar_adrian.jpg`,
  address: { '@type': 'PostalAddress', addressCountry: 'RO' },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Full-Stack Development',
    'Web Performance',
  ],
  sameAs: ['https://github.com/adrian-ionescu-1'],
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <About />
    </>
  );
}
