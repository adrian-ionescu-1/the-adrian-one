'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, Server, Layers, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const CATEGORIES: {
  Icon: LucideIcon;
  labelKey: string;
  color: string;
  border: string;
  bg: string;
  pillBg: string;
  items: string[];
}[] = [
  {
    Icon: Globe,
    labelKey: 'cat1',
    color: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/25',
    bg: 'bg-violet-500/8',
    pillBg: 'bg-violet-500/10 border-violet-500/25 text-violet-700 dark:text-violet-300',
    items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
  },
  {
    Icon: Server,
    labelKey: 'cat2',
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/25',
    bg: 'bg-blue-500/8',
    pillBg: 'bg-blue-500/10 border-blue-500/25 text-blue-700 dark:text-blue-300',
    items: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'tRPC'],
  },
  {
    Icon: Layers,
    labelKey: 'cat3',
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-500/8',
    pillBg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-300',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Drizzle'],
  },
  {
    Icon: Settings,
    labelKey: 'cat4',
    color: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/8',
    pillBg: 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300',
    items: ['Git & GitHub', 'Docker', 'GitHub Actions', 'Vercel', 'Figma'],
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function TechShowcase() {
  const t = useTranslations('servicesPage.tech');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            {...inView(0)}
            className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
          >
            {t('badge')}
          </motion.span>
          <motion.h2
            {...inView(0.08)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
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

        {/* 4-column category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map(({ Icon, labelKey, color, border, bg, pillBg, items }, i) => (
            <motion.div
              key={labelKey}
              {...inView(0.08 * i)}
              className={`flex flex-col gap-4 p-6 rounded-2xl border ${border} ${bg} backdrop-blur-sm`}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5">
                <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${bg} ${color}`}>
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className={`text-sm font-bold uppercase tracking-[0.12em] ${color}`}>
                  {t(labelKey as Parameters<typeof t>[0])}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border ${pillBg}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
