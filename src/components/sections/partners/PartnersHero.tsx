'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Handshake } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn } from '@/lib/motion';

// ─── CountUp ──────────────────────────────────────────────────────────────────

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

// ─── Stats config ─────────────────────────────────────────────────────────────

const STATS = [
  { to: 15, suffix: '+', labelKey: 'stat1Label' },
  { to: 8,  suffix: '+', labelKey: 'stat2Label' },
  { to: 3,  suffix: '',  labelKey: 'stat3Label' },
] as const;

// ─── WhatsApp icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnersHero() {
  const t = useTranslations('partnersPage.hero');

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing glow orb */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.06, 0.15, 0.06] }}
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
        <motion.span
          variants={blurUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          <Handshake size={13} strokeWidth={2.2} />
          {t('badge')}
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 }}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          {t('heading')}{' '}
          <span className="bg-linear-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t('headingAccent')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.16 }}
          className="mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {t('subheading')}
        </motion.p>

        {/* CTA — gradient + breathing glow + shimmer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.24 }}
          className="mb-16 flex justify-center"
        >
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
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground text-base font-semibold shadow-md shadow-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
              <WhatsAppIcon size={17} />
              {t('cta')}
            </a>
          </div>
        </motion.div>

        {/* Stats — CountUp + stagger */}
        <motion.div
          variants={container(0.12, 0.35)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm px-2 sm:px-4 py-4 sm:py-6 max-w-sm mx-auto sm:max-w-md"
        >
          {STATS.map(({ to, suffix, labelKey }) => (
            <motion.div key={labelKey} variants={scaleIn} className="flex flex-col items-center gap-1 px-1 sm:px-2">
              <span className="text-xl sm:text-3xl font-bold text-primary tabular-nums">
                <CountUp to={to} suffix={suffix} />
              </span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {t(labelKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
