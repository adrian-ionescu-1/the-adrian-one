'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, ShoppingBag, Server, Layers, Zap, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { container, fadeUp, scaleIn, blurUp, viewport } from '@/lib/motion';

const SERVICES: { Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { Icon: Globe,       titleKey: 'web.title',         descKey: 'web.description' },
  { Icon: ShoppingBag, titleKey: 'ecommerce.title',   descKey: 'ecommerce.description' },
  { Icon: Server,      titleKey: 'backend.title',     descKey: 'backend.description' },
  { Icon: Layers,      titleKey: 'design.title',      descKey: 'design.description' },
  { Icon: Zap,         titleKey: 'performance.title', descKey: 'performance.description' },
  { Icon: Shield,      titleKey: 'support.title',     descKey: 'support.description' },
];

const iconVariant = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 22, delay: 0.1 } },
};

export function Services() {
  const t = useTranslations('services');

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      {/* Section header */}
      <m.div
        variants={container(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col items-center text-center mb-16"
      >
        <m.span
          variants={blurUp}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          {t('badge')}
        </m.span>
        <m.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {t('heading')}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          {t('subheading')}
        </m.p>
      </m.div>

      {/* Cards grid */}
      <m.div
        variants={container(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map(({ Icon, titleKey, descKey }) => (
          <m.div
            key={titleKey}
            variants={scaleIn}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group relative flex flex-row sm:flex-col gap-4 p-5 sm:p-7 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm cursor-default transition-colors duration-300 hover:border-primary/35 hover:bg-card/50 hover:shadow-glow-sm overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <div
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-primary/8 to-transparent"
              aria-hidden
            />
            {/* Inner glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />

            {/* Icon */}
            <m.span
              variants={iconVariant}
              className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/18 group-hover:scale-110 group-hover:shadow-glow-sm"
            >
              <Icon size={20} strokeWidth={1.8} />
            </m.span>

            {/* Text */}
            <div className="flex flex-col gap-1.5 sm:gap-0 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-foreground">{t(titleKey as Parameters<typeof t>[0])}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t(descKey as Parameters<typeof t>[0])}</p>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
