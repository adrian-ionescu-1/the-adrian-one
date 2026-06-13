'use client';

import { useState, startTransition } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export function About() {
  const t = useTranslations('about');
  const [imgErr, setImgErr] = useState(false);

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  const skills = [
    t('skill1'), t('skill2'), t('skill3'),
    t('skill4'), t('skill5'), t('skill6'),
  ];

  return (
    <section className="relative py-24 md:py-32 border-t border-border/30">
      {/* Faint bg tint */}
      <div className="pointer-events-none absolute inset-0 bg-card/8" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <motion.span
              {...inView(0)}
              className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
            >
              {t('badge')}
            </motion.span>

            <motion.h2
              {...inView(0.08)}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            >
              {t('heading')}
            </motion.h2>

            <motion.p {...inView(0.16)} className="text-lg text-muted-foreground leading-relaxed">
              {t('body1')}
            </motion.p>

            <motion.p {...inView(0.22)} className="text-base text-muted-foreground leading-relaxed">
              {t('body2')}
            </motion.p>

            <motion.div {...inView(0.28)} className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/400736556174"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-base font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
              >
                <WhatsAppIcon size={17} />
                {t('cta')}
              </a>
              <a
                href="https://www.linkedin.com/in/george-adrian-ionescu-005234286"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card/40 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card/60"
              >
                <LinkedInIcon size={16} />
                LinkedIn
                <ExternalLink size={12} className="text-muted-foreground/50" />
              </a>
            </motion.div>
          </div>

          {/* Right — profile card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-3xl bg-primary/6 blur-[60px]"
              aria-hidden
            />

            <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-8 flex flex-col gap-8 shadow-glow-sm">

              {/* Avatar + name + LinkedIn */}
              <div className="flex items-center gap-4">
                {/* Avatar — imagine sau fallback initiale */}
                <div className="relative shrink-0 w-16 h-16">
                  {!imgErr ? (
                    <img
                      src="/images/avatar_adrian.jpg"
                      alt="Adrian Ionescu"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-border shadow-md"
                      onError={() => startTransition(() => setImgErr(true))}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold shadow-md shadow-primary/30">
                      A
                    </div>
                  )}
                  {/* Online indicator */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-lg font-bold text-foreground">Adrian Ionescu</span>
                  <span className="text-sm text-muted-foreground">Full-Stack Developer</span>
                  <span className="text-xs text-primary font-medium">Romania 🇷🇴</span>
                </div>
              </div>

              {/* LinkedIn button */}
              <a
                href="https://www.linkedin.com/in/george-adrian-ionescu-005234286"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-background/30 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card/60 hover:shadow-glow-sm"
              >
                <LinkedInIcon size={15} />
                View LinkedIn profile
                <ExternalLink size={12} className="text-muted-foreground/50 ml-auto" />
              </a>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/40 bg-background/30 px-2 py-4 divide-x divide-border/40">
                {stats.map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5 text-center px-1">
                    <span className="text-xl font-bold text-primary tabular-nums">{value}</span>
                    <span className="text-xs text-muted-foreground text-center leading-snug">{label}</span>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.14em]">
                  Core skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border/50 bg-primary/6 text-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/70" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
