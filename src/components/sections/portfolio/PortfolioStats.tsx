'use client';

import { useRef, useState, useEffect } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TrendingUp, Gauge, Zap, Clock } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn, viewport } from '@/lib/motion';

// ─── CountUp ──────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Static config ────────────────────────────────────────────────────────────

const STATS_CONFIG = [
  { Icon: TrendingUp, to: 40,  suffix: '%', color: 'text-violet-600 dark:text-violet-400',  iconBg: 'bg-violet-500/10 border-violet-500/20',  glow: 'from-violet-500/10' },
  { Icon: Gauge,      to: 98,  suffix: '',  color: 'text-blue-600 dark:text-blue-400',      iconBg: 'bg-blue-500/10 border-blue-500/20',      glow: 'from-blue-500/10' },
  { Icon: Zap,        to: 3,   suffix: '×', color: 'text-emerald-600 dark:text-emerald-400',iconBg: 'bg-emerald-500/10 border-emerald-500/20', glow: 'from-emerald-500/10' },
  { Icon: Clock,      to: 100, suffix: '%', color: 'text-amber-600 dark:text-amber-400',    iconBg: 'bg-amber-500/10 border-amber-500/20',    glow: 'from-amber-500/10' },
] as const;

const iconVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 20 } },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

type StatCardProps = {
  index: number;
  label: string;
  description: string;
};

function StatCard({ index, label, description }: StatCardProps) {
  const { Icon, to, suffix, color, iconBg, glow } = STATS_CONFIG[index];

  return (
    <m.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden"
    >
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" aria-hidden />
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />
      {/* Accent glow */}
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${glow} via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100`} aria-hidden />

      {/* Icon */}
      <m.div
        variants={iconVariant}
        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${iconBg} transition-transform duration-200 group-hover:scale-110`}
      >
        <Icon size={20} className={color} />
      </m.div>

      {/* Value */}
      <div>
        <p className={`text-4xl sm:text-5xl font-bold tabular-nums leading-none mb-2 ${color}`}>
          <CountUp to={to} suffix={suffix} />
        </p>
        <p className="text-base font-semibold text-foreground mb-1">{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </m.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function PortfolioStats() {
  const t = useTranslations('portfolioPage.stats');

  const stats = [
    { label: t('s1Label'), description: t('s1Desc') },
    { label: t('s2Label'), description: t('s2Desc') },
    { label: t('s3Label'), description: t('s3Desc') },
    { label: t('s4Label'), description: t('s4Desc') },
  ];

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      {/* Glow orb */}
      <m.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-primary blur-[120px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <m.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-14"
        >
          <m.span variants={blurUp} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide">
            {t('badge')}
          </m.span>
          <m.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('heading')}
          </m.h2>
          <m.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('subheading')}
          </m.p>
        </m.div>

        {/* Stats grid */}
        <m.div
          variants={container(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} index={i} label={stat.label} description={stat.description} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
