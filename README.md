# The Adrian One — Personal Portfolio & Business Website

> **Live site:** [theadrianone.com](https://www.theadrianone.com) *(link will be updated after deployment)*

Full-stack developer portfolio and business website built with Next.js 16, featuring bilingual support (Romanian / English), dark/light theme, premium animations, full SEO, and a working contact form.

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, services overview, process, testimonials, about snapshot |
| `/services` | Services — detailed breakdown, tech stack, FAQ, CTA |
| `/portfolio` | Portfolio — project grid with filters, stats, CTA |
| `/partners` | Partners — referral/agency/technology partnership tiers |
| `/about` | About — story timeline, skills, values, CTA |
| `/contact` | Contact — form with email delivery, direct contact info |

All routes are available in both locales: `/ro/...` and `/en/...`. Default locale is Romanian.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion v12](https://www.framer.com/motion/) |
| i18n | [next-intl v4](https://next-intl-docs.vercel.app/) |
| UI primitives | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Email | [Resend](https://resend.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Font | [Geist](https://vercel.com/font) |

---

## Features

- **Bilingual (RO / EN)** — full translation coverage with per-page message files, locale prefix routing, and language switcher
- **Dark / Light theme** — system-aware with manual toggle, no flash on load
- **SEO optimized** — `generateMetadata` per page, `sitemap.ts`, `robots.ts`, JSON-LD structured data (WebSite, Person, Service, ProfilePage)
- **Premium animations** — shared motion variants, scroll-triggered counters, staggered reveals, Framer Motion throughout
- **Contact form** — validated with Zod, delivered via Resend API with a branded HTML email template
- **Responsive** — mobile-first, tested across all breakpoints
- **Custom favicon** — SVG favicon matching the AO monogram brand

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/               # Localized pages (ro / en)
│   │   ├── layout.tsx          # Locale layout — fonts, theme, navbar, footer
│   │   ├── page.tsx            # Homepage
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── partners/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/contact/route.ts    # Contact form API — Resend email delivery
│   ├── sitemap.ts              # Dynamic sitemap (12 URLs × 2 locales)
│   ├── robots.ts               # robots.txt
│   ├── favicon.ico             # Fallback favicon (legacy browsers)
│   └── icon.svg                # SVG favicon (modern browsers)
│
├── components/
│   ├── layout/                 # Navbar, Footer, FooterCTA, FooterLogo
│   ├── sections/
│   │   ├── home/               # Hero, Services, Process, Testimonials, About
│   │   ├── services/           # ServicesHero, ServicesDetail, WhyChooseMe, TechShowcase, ServicesFAQ, ServicesCTA
│   │   ├── portfolio/          # PortfolioHero, PortfolioGrid, PortfolioStats, PortfolioCTA
│   │   ├── partners/           # PartnersHero, PartnersMarquee, PartnersTypes, PartnersBenefits, PartnersCTA
│   │   ├── about/              # AboutHero, AboutStory, AboutSkills, AboutValues, AboutCTA
│   │   └── contact/            # ContactHero, ContactMain
│   ├── shared/                 # ThemeProvider, ThemeToggle, LanguageSwitcher, ScrollToTop
│   └── ui/                     # shadcn components (Button, Card, Input, Label, Textarea, Badge)
│
├── i18n/
│   ├── routing.ts              # Locale config — locales: ['ro', 'en'], defaultLocale: 'ro'
│   ├── navigation.ts           # Typed Link / redirect / useRouter / usePathname
│   └── request.ts              # Message loader — merges per-page JSON files
│
└── lib/
    ├── motion.ts               # Shared Framer Motion variants (fadeUp, blurUp, scaleIn, container…)
    ├── seo.ts                  # SITE_URL, OG_IMAGE, helpers (ogLocale, pageAlternates)
    └── utils.ts                # cn() utility

messages/
├── en/                         # English translations (split by section)
│   ├── shared.json             # nav + footer
│   ├── home.json               # hero, services, process, testimonials, about
│   ├── services.json
│   ├── portfolio.json
│   ├── partners.json
│   ├── about.json
│   └── contact.json
└── ro/                         # Romanian translations (same structure)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Installation

```bash
git clone https://github.com/adrian-ionescu-1/the-adrian-one.git
cd the-adrian-one
npm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
# Resend API key — required for the contact form to deliver emails
# Get yours at https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

Without `RESEND_API_KEY` the app runs normally but contact form submissions return a 500 error.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/ro` (default locale).

### Build & preview

```bash
npm run build
npm run start
```

---

## Internationalization

Translations live in `messages/{locale}/{page}.json`. Each file covers one page or shared layout:

```
messages/ro/services.json   # all Romanian text for the Services page
messages/en/services.json   # same keys, English text
```

`src/i18n/request.ts` merges all files for the active locale at request time. To add a new language:

1. Add the locale to `src/i18n/routing.ts`
2. Duplicate the `messages/en/` folder for the new locale
3. Translate all JSON files

---

## Deployment

The project is designed for [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo in Vercel
3. Add `RESEND_API_KEY` in **Project Settings → Environment Variables**
4. Deploy — Vercel picks up `next.config.ts` and handles everything else

For custom domains, update `SITE_URL` in `src/lib/seo.ts` before the first production deployment.

---

## License

MIT © [Adrian Ionescu](https://www.theadrianone.com)
