import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'The Adrian One — Full-Stack Web Developer';

export function generateStaticParams() {
  return [{ locale: 'ro' }, { locale: 'en' }];
}

const taglines: Record<string, string> = {
  ro: 'Dezvoltare web Frontend, Backend și Full-Stack — rapid, curat, scalabil.',
  en: 'Frontend, Backend & Full-Stack web development — fast, clean, built to scale.',
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = taglines[locale] ?? taglines.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background:
            'radial-gradient(120% 120% at 0% 0%, #9b37eb 0%, #7B2CBF 28%, #1e0f42 60%, #030008 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 30,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#d9c5ff',
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: '#c9a8ff',
              boxShadow: '0 0 24px #b07cff',
            }}
          />
          The Adrian One
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 920,
          }}
        >
          Full-Stack Web Developer
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            lineHeight: 1.35,
            color: '#cbb8ee',
            maxWidth: 880,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
