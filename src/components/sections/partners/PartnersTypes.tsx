'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Gift, Building2, Cpu, ArrowRight } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn, viewport } from '@/lib/motion';

// ─── Config ───────────────────────────────────────────────────────────────────

type Tier = {
  key: 'referral' | 'agency' | 'technology';
  icon: React.ReactNode;
  accent: string;
  border: string;
  glow: string;
  iconBg: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    key: 'referral',
    icon: <Gift size={22} />,
    accent: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/40',
    glow: 'from-violet-500/10',
    iconBg: 'bg-violet-500/12 border-violet-500/25',
    featured: true,
  },
  {
    key: 'agency',
    icon: <Building2 size={22} />,
    accent: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/40',
    glow: 'from-blue-500/10',
    iconBg: 'bg-blue-500/12 border-blue-500/25',
    featured: false,
  },
  {
    key: 'technology',
    icon: <Cpu size={22} />,
    accent: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/40',
    glow: 'from-emerald-500/10',
    iconBg: 'bg-emerald-500/12 border-emerald-500/25',
    featured: false,
  },
];

const BENEFIT_KEYS = ['b1', 'b2', 'b3', 'b4', 'b5'] as const;

const iconVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 20 } },
};

const benefitVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnersTypes() {
  const t = useTranslations('partnersPage');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-175 h-64 rounded-full bg-primary/6 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <m.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-16"
        >
          <m.span variants={blurUp} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide">
            {t('types.badge')}
          </m.span>
          <m.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('types.heading')}
          </m.h2>
          <m.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('types.subheading')}
          </m.p>
        </m.div>

        {/* Tier cards */}
        <m.div
          variants={container(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TIERS.map((tier) => (
            <m.div
              key={tier.key}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`group relative flex flex-col rounded-2xl border ${tier.border} bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-glow-sm ${
                tier.featured ? 'ring-1 ring-primary/30' : ''
              }`}
            >
              {/* Top gradient line */}
              <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${tier.glow.replace('from-', 'via-')} to-transparent`} aria-hidden />
              {/* Hover glow overlay */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-b ${tier.glow} via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100`} aria-hidden />
              {/* Shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />

              <div className="relative flex flex-col gap-6 p-7 flex-1">
                {/* Top row: icon + badge */}
                <div className="flex items-start justify-between gap-3">
                  <m.div
                    variants={iconVariant}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${tier.iconBg} ${tier.accent} transition-transform duration-200 group-hover:scale-110 shrink-0`}
                  >
                    {tier.icon}
                  </m.div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-border/50 bg-muted/20 text-xs font-semibold text-muted-foreground">
                    {t(`types.${tier.key}.badge` as Parameters<typeof t>[0])}
                  </span>
                </div>

                {/* Title + tagline */}
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.13em] mb-1.5 ${tier.accent}`}>
                    {t(`types.${tier.key}.tagline` as Parameters<typeof t>[0])}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(`types.${tier.key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`types.${tier.key}.description` as Parameters<typeof t>[0])}
                  </p>
                </div>

                {/* Benefits list — stagger */}
                <m.ul
                  variants={container(0.06, 0.1)}
                  className="flex flex-col gap-2.5"
                >
                  {BENEFIT_KEYS.map((bk) => (
                    <m.li key={bk} variants={benefitVariant} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${tier.accent}`} />
                      <span className="text-sm text-muted-foreground leading-snug">
                        {t(`types.${tier.key}.${bk}` as Parameters<typeof t>[0])}
                      </span>
                    </m.li>
                  ))}
                </m.ul>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  {tier.featured ? (
                    <div className="relative">
                      <m.div
                        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute inset-0 rounded-xl bg-primary/40 blur-sm"
                        aria-hidden
                      />
                      <a
                        href="https://wa.me/40736556174"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground border border-primary font-semibold text-sm shadow-md shadow-primary/25 transition-all duration-300 hover:shadow-glow hover:-translate-y-px"
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
                        {t(`types.${tier.key}.cta` as Parameters<typeof t>[0])}
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  ) : (
                    <a
                      href="https://wa.me/40736556174"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/40 text-foreground/80 font-semibold text-sm transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:bg-card/60 hover:-translate-y-px"
                    >
                      {t(`types.${tier.key}.cta` as Parameters<typeof t>[0])}
                      <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
