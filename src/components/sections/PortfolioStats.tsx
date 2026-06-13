'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TrendingUp, Gauge, Zap, Clock } from 'lucide-react';

const ICONS = [TrendingUp, Gauge, Zap, Clock];

const ACCENT_COLORS = [
  'text-violet-600 dark:text-violet-400',
  'text-blue-600 dark:text-blue-400',
  'text-emerald-600 dark:text-emerald-400',
  'text-amber-600 dark:text-amber-400',
];

const BG_COLORS = [
  'bg-violet-500/10 border-violet-500/20',
  'bg-blue-500/10 border-blue-500/20',
  'bg-emerald-500/10 border-emerald-500/20',
  'bg-amber-500/10 border-amber-500/20',
];

type StatCardProps = {
  index: number;
  value: string;
  label: string;
  description: string;
};

function StatCard({ index, value, label, description }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = ICONS[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }}
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden"
    >
      {/* Top glow line on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        aria-hidden
      />

      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${BG_COLORS[index]} transition-transform duration-200 group-hover:scale-110`}
      >
        <Icon size={20} className={ACCENT_COLORS[index]} />
      </div>

      {/* Value */}
      <div>
        <p
          className={`text-4xl sm:text-5xl font-bold tabular-nums leading-none mb-2 ${ACCENT_COLORS[index]}`}
        >
          {value}
        </p>
        <p className="text-base font-semibold text-foreground mb-1">{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function PortfolioStats() {
  const t = useTranslations('portfolioPage.stats');

  const stats = [
    { value: t('s1Value'), label: t('s1Label'), description: t('s1Desc') },
    { value: t('s2Value'), label: t('s2Label'), description: t('s2Desc') },
    { value: t('s3Value'), label: t('s3Label'), description: t('s3Desc') },
    { value: t('s4Value'), label: t('s4Label'), description: t('s4Desc') },
  ];

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
          >
            {t('badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.14 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} index={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
