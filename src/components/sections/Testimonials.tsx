'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { container, fadeUp, scaleIn, blurUp, fadeIn, viewport } from '@/lib/motion';

const TESTIMONIALS = [
  { quoteKey: '1quote', nameKey: '1name', roleKey: '1role', initials: 'MC' },
  { quoteKey: '2quote', nameKey: '2name', roleKey: '2role', initials: 'LM' },
  { quoteKey: '3quote', nameKey: '3name', roleKey: '3role', initials: 'SA' },
] as const;

const starVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 20 } },
};

export function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      {/* Section header */}
      <motion.div
        variants={container(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col items-center text-center mb-16"
      >
        <motion.span
          variants={blurUp}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          {t('badge')}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {t('heading')}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          {t('subheading')}
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {TESTIMONIALS.map(({ quoteKey, nameKey, roleKey, initials }) => (
          <motion.div
            key={quoteKey}
            variants={scaleIn}
            whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-card/50 hover:shadow-glow-sm"
          >
            {/* Top glow line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />

            {/* Stars — stagger */}
            <motion.div
              variants={container(0.06, 0.1)}
              className="flex gap-0.5"
            >
              {Array.from({ length: 5 }).map((_, s) => (
                <motion.span key={s} variants={starVariant}>
                  <Star size={14} className="fill-primary text-primary" />
                </motion.span>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeIn}
              className="flex-1 text-base text-foreground/90 leading-relaxed italic"
            >
              &ldquo;{t(quoteKey)}&rdquo;
            </motion.blockquote>

            {/* Divider */}
            <div className="h-px bg-border/50" />

            {/* Author */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 text-primary text-sm font-bold shrink-0">
                {initials}
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-sm font-semibold text-foreground">{t(nameKey)}</span>
                <span className="text-xs text-muted-foreground">{t(roleKey)}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
