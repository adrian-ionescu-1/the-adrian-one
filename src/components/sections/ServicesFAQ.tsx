'use client';

import { useState, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const FAQ_COUNT = 8;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function ServicesFAQ() {
  const t = useTranslations('servicesPage.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`q${i + 1}` as Parameters<typeof t>[0]),
    a: t(`a${i + 1}` as Parameters<typeof t>[0]),
  }));

  function toggle(i: number) {
    startTransition(() => {
      setOpenIndex((prev) => (prev === i ? null : i));
    });
  }

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-card/8" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
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
            {...inView(0.14)}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          {...inView(0.2)}
          className="flex flex-col divide-y divide-border/40 rounded-2xl border border-border/50 bg-card/25 backdrop-blur-sm overflow-hidden"
        >
          {items.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-primary/4"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                    strokeWidth={2}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-1 text-base text-muted-foreground leading-relaxed border-t border-border/30">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
