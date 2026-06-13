'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, ShoppingBag, Server, Layers, Zap, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SERVICES: { Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { Icon: Globe,       titleKey: 'web.title',         descKey: 'web.description' },
  { Icon: ShoppingBag, titleKey: 'ecommerce.title',   descKey: 'ecommerce.description' },
  { Icon: Server,      titleKey: 'backend.title',     descKey: 'backend.description' },
  { Icon: Layers,      titleKey: 'design.title',      descKey: 'design.description' },
  { Icon: Zap,         titleKey: 'performance.title', descKey: 'performance.description' },
  { Icon: Shield,      titleKey: 'support.title',     descKey: 'support.description' },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function Services() {
  const t = useTranslations('services');

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
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

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map(({ Icon, titleKey, descKey }, i) => (
          <motion.div
            key={titleKey}
            {...inView(0.06 * i)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group relative flex flex-row sm:flex-col gap-4 p-5 sm:p-7 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm cursor-default transition-all duration-300 hover:border-primary/35 hover:bg-card/50 hover:shadow-glow-sm"
          >
            {/* Subtle inner glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            {/* Icon */}
            <span className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/18 group-hover:scale-110 group-hover:shadow-glow-sm">
              <Icon size={20} strokeWidth={1.8} />
            </span>
            {/* Text */}
            <div className="flex flex-col gap-1.5 sm:gap-0 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-foreground">{t(titleKey as Parameters<typeof t>[0])}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t(descKey as Parameters<typeof t>[0])}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
