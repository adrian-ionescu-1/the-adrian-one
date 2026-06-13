'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEPS: { num: string; Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { num: '01', Icon: Search,  titleKey: 'step1Title', descKey: 'step1Desc' },
  { num: '02', Icon: PenTool, titleKey: 'step2Title', descKey: 'step2Desc' },
  { num: '03', Icon: Code2,   titleKey: 'step3Title', descKey: 'step3Desc' },
  { num: '04', Icon: Rocket,  titleKey: 'step4Title', descKey: 'step4Desc' },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function Process() {
  const t = useTranslations('process');

  return (
    <section className="relative py-24 md:py-32 border-t border-border/30">
      {/* Faint bg tint */}
      <div className="pointer-events-none absolute inset-0 bg-card/8" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
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
            {...inView(0.16)}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block pointer-events-none absolute top-9 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px"
            aria-hidden
          >
            <div className="w-full h-full bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {STEPS.map(({ num, Icon, titleKey, descKey }, i) => (
            <motion.div
              key={num}
              {...inView(0.1 * i)}
              className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 p-5 sm:p-6 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm"
            >
              {/* Step number circle */}
              <div className="relative shrink-0 flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-primary/30 bg-primary/8">
                <Icon size={22} className="text-primary" strokeWidth={1.8} />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-base lg:text-lg font-bold text-foreground">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
