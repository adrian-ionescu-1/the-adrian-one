'use client';

import { useRef, useState, useEffect } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn } from '@/lib/motion';

function CountUp({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { to: 10, suffix: '+', labelKey: 'stat1Label' },
  { to: 5,  suffix: '',  labelKey: 'stat2Label' },
  { to: 4,  suffix: '',  labelKey: 'stat3Label' },
] as const;

export function PortfolioHero() {
  const t = useTranslations('portfolioPage.hero');

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing glow orb */}
      <m.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full bg-primary blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        {/* Badge */}
        <m.span
          variants={blurUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          <Layers size={12} strokeWidth={2.5} />
          {t('badge')}
        </m.span>

        {/* Heading */}
        <m.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          {t('heading')}{' '}
          <span className="bg-linear-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t('headingAccent')}
          </span>
        </m.h1>

        {/* Subheading */}
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-14 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {t('subheading')}
        </m.p>

        {/* Stats — counter animat + stagger */}
        <m.div
          variants={container(0.12, 0.35)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm px-2 sm:px-4 py-4 sm:py-6 max-w-sm mx-auto sm:max-w-md"
        >
          {STATS.map(({ to, suffix, labelKey }) => (
            <m.div key={labelKey} variants={scaleIn} className="flex flex-col items-center gap-1 px-1 sm:px-2">
              <span className="text-xl sm:text-3xl font-bold text-primary tabular-nums">
                <CountUp to={to} suffix={suffix} />
              </span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {t(labelKey)}
              </span>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
