import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactMain } from '@/components/sections/contact/ContactMain';
import { OG_IMAGE, ogLocale, pageAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage.hero' });
  const description = t('subheading');

  return {
    title: 'Contact',
    description,
    alternates: pageAlternates(locale, 'contact'),
    openGraph: {
      title: 'Contact | The Adrian One',
      description,
      url: `/${locale}/contact`,
      type: 'website',
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact | The Adrian One',
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactMain />
    </>
  );
}
