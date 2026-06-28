'use client';

import { useRef, useState, useEffect, startTransition } from 'react';
import Image from 'next/image';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink, MapPin, Briefcase } from 'lucide-react';
import { container, blurUp, fadeUp, fadeRight, scaleIn } from '@/lib/motion';

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

// ─── Config ───────────────────────────────────────────────────────────────────

const STATS = [
  { to: 10, suffix: '+', labelKey: 'stat1Label' },
  { to: 3,  suffix: '+', labelKey: 'stat2Label' },
  { to: 4,  suffix: '',  labelKey: 'stat3Label' },
] as const;

const SKILLS = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'tRPC', 'PostgreSQL', 'Prisma', 'shadcn/ui'];

const skillVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutHero() {
  const t = useTranslations('aboutPage.hero');
  const [imgErr, setImgErr] = useState(false);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing glow orb */}
      <m.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
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

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* Left: text */}
          <m.div
            variants={container(0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7"
          >
            <m.span
              variants={blurUp}
              className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
            >
              {t('badge')}
            </m.span>

            <m.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              {t('heading')}{' '}
              <span className="bg-linear-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {t('headingAccent')}
              </span>
            </m.h1>

            <m.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              {t('subheading')}
            </m.p>

            {/* Stats with CountUp */}
            <m.div variants={container(0.12, 0.1)} className="grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm px-2 sm:px-4 py-4 sm:py-5 max-w-sm">
              {STATS.map(({ to, suffix, labelKey }) => (
                <m.div key={labelKey} variants={scaleIn} className="flex flex-col items-center gap-0.5 px-2 text-center">
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    <CountUp to={to} suffix={suffix} />
                  </span>
                  <span className="text-xs text-muted-foreground leading-snug">{t(labelKey)}</span>
                </m.div>
              ))}
            </m.div>

            {/* CTAs */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-3">
              {/* Primary — gradient + glow + shimmer */}
              <div className="relative">
                <m.div
                  animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.07, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0 rounded-xl bg-primary/50 blur-md"
                  aria-hidden
                />
                <a
                  href="https://wa.me/40736556174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground font-semibold text-base shadow-md shadow-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
                  <WhatsAppIcon size={17} />
                  {t('cta')}
                </a>
              </div>
              <a
                href="https://www.linkedin.com/in/george-adrian-ionescu-005234286"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm font-medium text-base text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:bg-card/60 hover:-translate-y-px"
              >
                <LinkedInIcon size={15} />
                LinkedIn
                <ExternalLink size={12} className="text-muted-foreground/50" />
              </a>
            </m.div>
          </m.div>

          {/* Right: profile card */}
          <m.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            whileHover={{ rotateY: 2, rotateX: -1, transition: { duration: 0.3 } }}
            style={{ perspective: 900 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-primary/8 blur-[70px]" aria-hidden />

            <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-glow-sm overflow-hidden">
              {/* Top gradient stripe */}
              <div className="h-1 bg-linear-to-r from-primary via-violet-400 to-fuchsia-400" />

              <div className="p-7 flex flex-col gap-6">
                {/* Avatar + meta */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    {!imgErr ? (
                      <Image
                        src="/images/avatar_adrian.jpg"
                        alt="Adrian Ionescu"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20 shadow-md"
                        onError={() => startTransition(() => setImgErr(true))}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground text-3xl font-bold flex items-center justify-center shadow-md shadow-primary/30">
                        A
                      </div>
                    )}
                    <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h2 className="text-xl font-bold text-foreground">Adrian Ionescu</h2>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Briefcase size={12} className="shrink-0" />
                      <span>{t('role')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin size={12} className="shrink-0" />
                      <span>{t('location')}</span>
                    </div>
                    <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {t('available')}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/40" />

                {/* Skills — stagger */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.13em] mb-3">
                    {t('skillsLabel')}
                  </p>
                  <m.div
                    variants={container(0.05)}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-2"
                  >
                    {SKILLS.map((skill) => (
                      <m.span
                        key={skill}
                        variants={skillVariant}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-border/50 bg-primary/6 text-foreground/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        {skill}
                      </m.span>
                    ))}
                  </m.div>
                </div>

                <div className="h-px bg-border/40" />

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/george-adrian-ionescu-005234286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-background/30 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card/60 hover:shadow-glow-sm"
                >
                  <LinkedInIcon size={14} />
                  View LinkedIn profile
                  <ExternalLink size={12} className="text-muted-foreground/50 ml-auto" />
                </a>
              </div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
