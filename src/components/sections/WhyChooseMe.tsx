'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code2, MessageSquare, Clock, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ITEMS: { Icon: LucideIcon; key: string; color: string; bg: string }[] = [
  {
    Icon: Code2,
    key: 'i1',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 group-hover:bg-violet-500/18',
  },
  {
    Icon: MessageSquare,
    key: 'i2',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 group-hover:bg-blue-500/18',
  },
  {
    Icon: Clock,
    key: 'i3',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 group-hover:bg-amber-500/18',
  },
  {
    Icon: Shield,
    key: 'i4',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/18',
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function WhyChooseMe() {
  const t = useTranslations('servicesPage.why');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32">
      {/* Faint bg tint */}
      <div className="pointer-events-none absolute inset-0 bg-card/8" aria-hidden />

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

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ITEMS.map(({ Icon, key, color, bg }, i) => (
            <motion.div
              key={key}
              {...inView(0.1 * i)}
              className="group relative flex gap-5 p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden"
            >
              {/* Hover glow line */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              {/* Icon */}
              <span
                className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${bg} ${color} group-hover:scale-105`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </span>

              {/* Text */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-lg font-bold text-foreground">
                  {t(`${key}Title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(`${key}Desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
