'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { container, blurUp, fadeUp, viewport } from '@/lib/motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Milestone = {
  yearKey: string;
  titleKey: string;
  descKey: string;
  accent: string;
  dotColor: string;
  glowColor: string;
};

type MilestoneKey = 'm1Year' | 'm1Title' | 'm1Desc' | 'm2Year' | 'm2Title' | 'm2Desc' | 'm3Year' | 'm3Title' | 'm3Desc' | 'm4Year' | 'm4Title' | 'm4Desc' | 'm5Year' | 'm5Title' | 'm5Desc';

// ─── Config ───────────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  { yearKey: 'm1Year', titleKey: 'm1Title', descKey: 'm1Desc', accent: 'text-violet-600 dark:text-violet-400', dotColor: 'bg-violet-500', glowColor: 'shadow-violet-500/40' },
  { yearKey: 'm2Year', titleKey: 'm2Title', descKey: 'm2Desc', accent: 'text-blue-600 dark:text-blue-400',    dotColor: 'bg-blue-500',   glowColor: 'shadow-blue-500/40' },
  { yearKey: 'm3Year', titleKey: 'm3Title', descKey: 'm3Desc', accent: 'text-emerald-600 dark:text-emerald-400', dotColor: 'bg-emerald-500', glowColor: 'shadow-emerald-500/40' },
  { yearKey: 'm4Year', titleKey: 'm4Title', descKey: 'm4Desc', accent: 'text-amber-600 dark:text-amber-400',  dotColor: 'bg-amber-500',  glowColor: 'shadow-amber-500/40' },
  { yearKey: 'm5Year', titleKey: 'm5Title', descKey: 'm5Desc', accent: 'text-primary',                        dotColor: 'bg-primary',    glowColor: 'shadow-primary/40' },
];

// ─── Milestone Card ───────────────────────────────────────────────────────────

function MilestoneCard({ milestone, index, t }: { milestone: Milestone; index: number; t: (key: MilestoneKey) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isLast = index === MILESTONES.length - 1;

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 350, damping: 22, delay: index * 0.08 }}
          className={`relative z-10 mt-1 w-4 h-4 rounded-full ${milestone.dotColor} ring-4 ring-background shadow-md ${milestone.glowColor} shrink-0`}
        />
        {/* Connector line */}
        {!isLast && (
          <m.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 + 0.2 }}
            style={{ originY: 0 }}
            className="flex-1 w-px bg-linear-to-b from-border/60 to-border/20 mt-2"
          />
        )}
      </div>

      {/* Card */}
      <m.div
        initial={{ opacity: 0, x: 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.05 }}
        whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
        className="group flex-1 pb-10 last:pb-0"
      >
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden">
          {/* Hover glow */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/4 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          {/* Top line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          {/* Shimmer */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />

          <div className="relative flex flex-col gap-2">
            <span className={`self-start text-xs font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-current/20 bg-current/8 ${milestone.accent}`}>
              {t(milestone.yearKey as MilestoneKey)}
            </span>
            <h3 className="text-lg font-bold text-foreground">{t(milestone.titleKey as MilestoneKey)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(milestone.descKey as MilestoneKey)}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutStory() {
  const t = useTranslations('aboutPage.story');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 w-96 h-96 rounded-full bg-primary/6 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute left-0 bottom-1/3 w-64 h-64 rounded-full bg-violet-500/5 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Section header */}
        <m.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-16"
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

        {/* Timeline */}
        <div className="flex flex-col">
          {MILESTONES.map((milestone, i) => (
            <MilestoneCard key={milestone.yearKey} milestone={milestone} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
