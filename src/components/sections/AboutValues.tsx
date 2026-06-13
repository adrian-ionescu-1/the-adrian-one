'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, MessageSquare, Clock, TrendingUp } from 'lucide-react';

const VALUES = [
  {
    icon: Star,
    accent: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    titleKey: 'v1Title',
    descKey: 'v1Desc',
  },
  {
    icon: MessageSquare,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    titleKey: 'v2Title',
    descKey: 'v2Desc',
  },
  {
    icon: Clock,
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    titleKey: 'v3Title',
    descKey: 'v3Desc',
  },
  {
    icon: TrendingUp,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    titleKey: 'v4Title',
    descKey: 'v4Desc',
  },
] as const;

export function AboutValues() {
  const t = useTranslations('aboutPage.values');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-72 rounded-full bg-primary/6 blur-[110px]" aria-hidden />

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

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, accent, bg, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.09 }}
              className="group relative flex gap-5 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm overflow-hidden"
            >
              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/4 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${bg} ${accent} transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={20} />
              </div>

              {/* Text */}
              <div className="relative flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-foreground">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
