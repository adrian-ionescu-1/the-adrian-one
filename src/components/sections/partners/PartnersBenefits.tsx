'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Banknote,
  ArrowLeftRight,
  CalendarCheck,
  Megaphone,
  MessageSquare,
  Network,
} from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn, viewport } from '@/lib/motion';

// ─── Config ───────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Banknote,
    accent: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    glow: 'from-violet-500/8',
    titleKey: 'b1Title',
    descKey: 'b1Desc',
  },
  {
    icon: ArrowLeftRight,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    glow: 'from-blue-500/8',
    titleKey: 'b2Title',
    descKey: 'b2Desc',
  },
  {
    icon: CalendarCheck,
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    glow: 'from-emerald-500/8',
    titleKey: 'b3Title',
    descKey: 'b3Desc',
  },
  {
    icon: Megaphone,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    glow: 'from-amber-500/8',
    titleKey: 'b4Title',
    descKey: 'b4Desc',
  },
  {
    icon: MessageSquare,
    accent: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    glow: 'from-rose-500/8',
    titleKey: 'b5Title',
    descKey: 'b5Desc',
  },
  {
    icon: Network,
    accent: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    glow: 'from-cyan-500/8',
    titleKey: 'b6Title',
    descKey: 'b6Desc',
  },
] as const;

const iconVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 20 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnersBenefits() {
  const t = useTranslations('partnersPage.benefits');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-72 rounded-full bg-primary/7 blur-[100px]" aria-hidden />

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

        {/* Benefits grid */}
        <m.div
          variants={container(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {BENEFITS.map(({ icon: Icon, accent, bg, glow, titleKey, descKey }) => (
            <m.div
              key={titleKey}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden"
            >
              {/* Top hover line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" aria-hidden />
              {/* Accent glow */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${glow} via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100`} aria-hidden />
              {/* Shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />

              {/* Icon */}
              <m.div
                variants={iconVariant}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${bg} ${accent} transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon size={19} />
              </m.div>

              {/* Text */}
              <div className="relative">
                <h3 className="text-base font-bold text-foreground mb-1.5">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
