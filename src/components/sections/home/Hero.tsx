'use client';

import { useState, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn } from '@/lib/motion';

const TECH = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'] as const;

const ORBS = [
  { className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(640px,100vw)] h-90', blur: 130, opacity: [0.08, 0.18, 0.08] as number[], duration: 5 },
  { className: 'top-1/4 left-1/4 w-72 h-72', blur: 100, opacity: [0.04, 0.1, 0.04] as number[], duration: 7 },
  { className: 'bottom-1/4 right-1/4 w-64 h-64', blur: 90, opacity: [0.03, 0.09, 0.03] as number[], duration: 9 },
];

export function Hero() {
  const t = useTranslations('hero');
  const accentWords = [t('headlineAccent1'), t('headlineAccent2'), t('headlineAccent3')];
  const [accentIndex, setAccentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      startTransition(() => setAccentIndex((i) => (i + 1) % 3));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-24 overflow-hidden">

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(123,44,191,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Pulsing glow orbs */}
      {ORBS.map(({ className, blur, opacity, duration }, i) => (
        <motion.div
          key={i}
          animate={{ opacity }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
          className={`pointer-events-none absolute rounded-full bg-primary ${className}`}
          style={{ filter: `blur(${blur}px)` }}
          aria-hidden
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">

        {/* Badge */}
        <motion.span
          variants={blurUp}
          initial="hidden"
          animate="visible"
          className="mb-7 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {t('badge')}
        </motion.span>

        {/* Headline with rotating accent */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.12] mb-6"
        >
          {t('headlinePre')}{' '}
          <span className="inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={accentIndex}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                className="bg-linear-to-r from-primary via-violet-400 to-primary/60 bg-clip-text text-transparent"
              >
                {accentWords[accentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br className="hidden sm:block" />
          {' '}{t('headlinePost')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-base font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            {t('ctaPrimary')}
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <ArrowRight size={15} />
            </motion.span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/40 text-foreground text-base font-medium backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card/60"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>

        {/* Tech pills — stagger individual */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-muted-foreground/45 uppercase tracking-[0.18em]">
            {t('techLabel')}
          </span>
          <motion.div
            variants={container(0.07, 0.5)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-2"
          >
            {TECH.map((tech) => (
              <motion.span
                key={tech}
                variants={scaleIn}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border/50 bg-card/30 text-muted-foreground backdrop-blur-sm"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/35"
        aria-hidden
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
