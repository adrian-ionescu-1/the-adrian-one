import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, OG_IMAGE, ogLocale } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "The Adrian One",
      template: "%s | The Adrian One",
    },
    description:
      "Frontend, Backend and Full-Stack web development — fast, clean, and built to scale.",
    openGraph: {
      type: "website",
      siteName: "The Adrian One",
      locale: ogLocale(locale),
      alternateLocale: locale === "ro" ? ["en_US"] : ["ro_RO"],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Adrian One",
      description:
        "Frontend, Backend and Full-Stack web development — fast, clean, and built to scale.",
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Adrian One",
  url: SITE_URL,
  description:
    "Frontend, Backend and Full-Stack web development — fast, clean, and built to scale.",
  author: {
    "@type": "Person",
    name: "Adrian Ionescu",
    jobTitle: "Full-Stack Web Developer",
    url: SITE_URL,
    image: `${SITE_URL}/images/avatar_adrian.jpg`,
    address: { "@type": "PostalAddress", addressCountry: "RO" },
    sameAs: ["https://github.com/adrian-ionescu-1"],
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>
            <Footer />
            <ScrollToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
