'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Handshake } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export function PartnersHero() {
  const t = useTranslations('partnersPage.hero');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing glow orb */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full bg-primary blur-[130px]"
        aria-hidden
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />
      {/* Top decorative line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.span
          {...fadeUp(0)}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          <Handshake size={13} strokeWidth={2.2} />
          {t('badge')}
        </motion.span>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.08)}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          {t('heading')}{' '}
          <span className="bg-linear-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t('headingAccent')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.16)}
          className="mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {t('subheading')}
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.22)} className="mb-16">
          <a
            href="https://wa.me/400736556174"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-base font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            <Handshake size={16} strokeWidth={2} />
            {t('cta')}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.3)}
          className="grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm px-4 py-6 max-w-sm mx-auto sm:max-w-md"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                {value}
              </span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
