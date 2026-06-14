import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { ServicesDetail } from '@/components/sections/services/ServicesDetail';
import { WhyChooseMe } from '@/components/sections/services/WhyChooseMe';
import { TechShowcase } from '@/components/sections/services/TechShowcase';
import { ServicesFAQ } from '@/components/sections/services/ServicesFAQ';
import { ServicesCTA } from '@/components/sections/services/ServicesCTA';
import { SITE_URL, OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Full-Stack Web Development',
  provider: {
    '@type': 'Person',
    name: 'Adrian Ionescu',
    url: SITE_URL,
  },
  serviceType: 'Web Development',
  areaServed: { '@type': 'Place', name: 'Europe' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Frontend Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Backend Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Stack Web Apps' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'REST & GraphQL APIs' } },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage.hero' });
  const description = t('subheading');

  return {
    title: 'Services',
    description,
    alternates: pageAlternates(locale, 'services'),
    openGraph: {
      title: 'Services | The Adrian One',
      description,
      url: `/${locale}/services`,
      type: 'website',
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services | The Adrian One',
      description,
      images: [OG_IMAGE.url],
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesHero />
      <ServicesDetail />
      <WhyChooseMe />
      <TechShowcase />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
