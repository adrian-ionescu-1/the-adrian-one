'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Zap } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn } from '@/lib/motion';

function CountUp({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { to: 15, suffix: '+', labelKey: 'hero.stat1Label' },
  { to: 5,  suffix: '+', labelKey: 'hero.stat2Label' },
  { to: 100, suffix: '%', labelKey: 'hero.stat3Label' },
] as const;

export function ServicesHero() {
  const t = useTranslations('servicesPage');

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.16, 0.07] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full bg-primary blur-[130px]"
        aria-hidden
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden
      />

      {/* Top decorative line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        {/* Badge */}
        <motion.span
          variants={blurUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          <Zap size={12} strokeWidth={2.5} />
          {t('hero.badge')}
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          {t('hero.heading')}{' '}
          <span className="bg-linear-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t('hero.headingAccent')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {t('hero.subheading')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {/* Primary — gradient + shimmer */}
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.07, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 rounded-xl bg-primary/50 blur-md"
              aria-hidden
            />
            <a
              href="https://wa.me/40736556174"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground text-base font-semibold shadow-md shadow-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
              {t('cta.primary')}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRight size={15} /></span>
            </a>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card/40 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card/60"
          >
            {t('cta.secondary')}
          </Link>
        </motion.div>

        {/* Stats row — counter animat */}
        <motion.div
          variants={container(0.1, 0.4)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm px-4 py-6 max-w-sm mx-auto sm:max-w-md"
        >
          {STATS.map(({ to, suffix, labelKey }) => (
            <motion.div key={labelKey} variants={scaleIn} className="flex flex-col items-center gap-1 px-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                <CountUp to={to} suffix={suffix} />
              </span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {t(labelKey as Parameters<typeof t>[0])}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
