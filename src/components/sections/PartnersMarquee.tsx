'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// ─── Tech data ────────────────────────────────────────────────────────────────

type TechItem = { name: string; color: string; bg: string };

const ROW_ONE: TechItem[] = [
  { name: 'Next.js',       color: 'text-foreground',            bg: 'bg-foreground/8' },
  { name: 'React',         color: 'text-sky-600 dark:text-sky-400',   bg: 'bg-sky-500/10' },
  { name: 'TypeScript',    color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Node.js',       color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'PostgreSQL',    color: 'text-cyan-600 dark:text-cyan-400',  bg: 'bg-cyan-500/10' },
  { name: 'Redis',         color: 'text-red-600 dark:text-red-400',    bg: 'bg-red-500/10' },
  { name: 'Stripe',        color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10' },
  { name: 'Vercel',        color: 'text-foreground',            bg: 'bg-foreground/8' },
  { name: 'Docker',        color: 'text-blue-600 dark:text-blue-400',  bg: 'bg-blue-500/10' },
  { name: 'Prisma',        color: 'text-teal-600 dark:text-teal-400',  bg: 'bg-teal-500/10' },
  { name: 'AWS',           color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'GraphQL',       color: 'text-pink-600 dark:text-pink-400',  bg: 'bg-pink-500/10' },
];

const ROW_TWO: TechItem[] = [
  { name: 'Tailwind CSS',  color: 'text-cyan-600 dark:text-cyan-400',  bg: 'bg-cyan-500/10' },
  { name: 'Framer Motion', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10' },
  { name: 'Sanity',        color: 'text-red-600 dark:text-red-400',    bg: 'bg-red-500/10' },
  { name: 'Figma',         color: 'text-pink-600 dark:text-pink-400',  bg: 'bg-pink-500/10' },
  { name: 'GitHub',        color: 'text-foreground',            bg: 'bg-foreground/8' },
  { name: 'Zod',           color: 'text-blue-600 dark:text-blue-400',  bg: 'bg-blue-500/10' },
  { name: 'tRPC',          color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
  { name: 'Clerk',         color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10' },
  { name: 'Contentful',    color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10' },
  { name: 'Turborepo',     color: 'text-foreground',            bg: 'bg-foreground/8' },
  { name: 'pnpm',          color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Playwright',    color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
];

function TechPill({ item }: { item: TechItem }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/40 ${item.bg} whitespace-nowrap`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${item.color.replace('text-', 'bg-')}`} />
      <span className={`text-sm font-semibold ${item.color}`}>{item.name}</span>
    </span>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: TechItem[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-background to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-background to-transparent" aria-hidden />

      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-slide ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((item, i) => (
          <TechPill key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function PartnersMarquee() {
  const t = useTranslations('partnersPage.ecosystem');

  return (
    <section className="relative border-t border-border/30 py-20 md:py-28 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full bg-primary/8 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.span
            {...inView(0)}
            className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
          >
            {t('badge')}
          </motion.span>
          <motion.h2
            {...inView(0.08)}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            {...inView(0.14)}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
        </div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="flex flex-col gap-3.5">
        <MarqueeRow items={ROW_ONE} duration={32} />
        <MarqueeRow items={ROW_TWO} duration={40} reverse />
      </div>
    </section>
  );
}
