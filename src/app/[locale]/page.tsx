import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations('hero');

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-sm font-medium text-indigo-500">{t('badge')}</p>
        <h1 className="text-4xl font-bold tracking-tight">{t('headline')}</h1>
        <p className="text-lg text-muted-foreground">{t('subheadline')}</p>
      </div>
    </main>
  );
}
