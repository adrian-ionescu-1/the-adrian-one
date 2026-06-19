'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Globe, ShoppingBag, Server, Layers, Zap, Shield,
  CheckCircle2, Clock, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { container, blurUp, fadeUp, fadeLeft, fadeRight, viewport } from '@/lib/motion';

type ServiceKey = 'web' | 'ecommerce' | 'backend' | 'design' | 'performance' | 'support';

const SERVICES: {
  Icon: LucideIcon;
  key: ServiceKey;
  tech: string[];
  timeline: string;
  featured: boolean;
  cardAccent: string;
  iconAccent: string;
}[] = [
  { Icon: Globe,       key: 'web',         tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],           timeline: '4–8 weeks',  featured: true,  cardAccent: 'from-primary/8 via-transparent to-transparent',      iconAccent: 'bg-primary/10 text-primary group-hover:bg-primary/20' },
  { Icon: ShoppingBag, key: 'ecommerce',   tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Vercel'],                timeline: '6–12 weeks', featured: false, cardAccent: 'from-emerald-500/8 via-transparent to-transparent',  iconAccent: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' },
  { Icon: Server,      key: 'backend',     tech: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis'],               timeline: '3–8 weeks',  featured: false, cardAccent: 'from-blue-500/8 via-transparent to-transparent',     iconAccent: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' },
  { Icon: Layers,      key: 'design',      tech: ['Figma', 'Framer', 'Adobe XD'],                                        timeline: '2–4 weeks',  featured: false, cardAccent: 'from-pink-500/8 via-transparent to-transparent',     iconAccent: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20' },
  { Icon: Zap,         key: 'performance', tech: ['Lighthouse', 'GA4', 'Search Console', 'Next.js'],                     timeline: '2–4 weeks',  featured: false, cardAccent: 'from-amber-500/8 via-transparent to-transparent',    iconAccent: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20' },
  { Icon: Shield,      key: 'support',     tech: ['GitHub Actions', 'Docker', 'Vercel', 'Uptime Robot'],                 timeline: 'Monthly',    featured: false, cardAccent: 'from-indigo-500/8 via-transparent to-transparent',   iconAccent: 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20' },
];

const iconVariant = {
  hidden: { opacity: 0, scale: 0.5, rotate: -12 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.12 } },
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
};

export function ServicesDetail() {
  const t = useTranslations('servicesPage');
  const ts = useTranslations('services');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Section header */}
        <m.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-16"
        >
          <m.span variants={blurUp} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide">
            {t('detail.badge')}
          </m.span>
          <m.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('detail.heading')}
          </m.h2>
          <m.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('detail.subheading')}
          </m.p>
        </m.div>

        {/* Cards grid — alternate left/right entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map(({ Icon, key, tech, timeline, featured, cardAccent, iconAccent }, i) => (
            <m.article
              key={key}
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group relative flex flex-col gap-6 p-7 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-primary/30 hover:shadow-glow-sm"
            >
              {/* Hover gradient overlay */}
              <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br ${cardAccent} opacity-0 transition-opacity duration-400 group-hover:opacity-100`} aria-hidden />
              {/* Top glow line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              {/* Shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />

              {/* Top row: icon + badge */}
              <div className="relative flex items-start justify-between gap-3">
                <m.span
                  variants={iconVariant}
                  className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${iconAccent} group-hover:scale-105 group-hover:shadow-glow-sm`}
                >
                  <Icon size={24} strokeWidth={1.7} />
                </m.span>

                <m.span
                  variants={pillVariant}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                    featured
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                      : 'border border-border/60 bg-muted/20 text-muted-foreground'
                  }`}
                >
                  {t(`${key}.badge` as Parameters<typeof t>[0])}
                </m.span>
              </div>

              {/* Title + description */}
              <div className="relative flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground">{ts(`${key}.title` as Parameters<typeof ts>[0])}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{ts(`${key}.description` as Parameters<typeof ts>[0])}</p>
              </div>

              {/* Feature list */}
              <m.div
                variants={container(0.06, 0.1)}
                className="relative flex flex-col gap-3"
              >
                <p className="text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.13em]">{t('detail.featuresTitle')}</p>
                <ul className="space-y-2.5">
                  {([1, 2, 3, 4, 5] as const).map((n) => (
                    <m.li key={n} variants={fadeUp} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-primary" strokeWidth={2} />
                      {t(`${key}.f${n}` as Parameters<typeof t>[0])}
                    </m.li>
                  ))}
                </ul>
              </m.div>

              {/* Footer: tech + timeline + CTA */}
              <div className="relative mt-auto flex flex-col gap-4 pt-5 border-t border-border/30">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.13em]">{t('detail.techTitle')}</p>
                  <m.div variants={container(0.05, 0.15)} className="flex flex-wrap gap-1.5">
                    {tech.map((item) => (
                      <m.span key={item} variants={pillVariant} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-border/50 bg-primary/6 text-foreground/80">
                        {item}
                      </m.span>
                    ))}
                  </m.div>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock size={13} className="text-primary/60" strokeWidth={2} />
                    <span className="text-foreground/60 font-medium">{t('detail.timelineTitle')}:</span>
                    <span className="font-semibold text-foreground/80">{timeline}</span>
                  </span>
                  <a
                    href="https://wa.me/40736556174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:shadow-glow-sm hover:-translate-y-px active:translate-y-0"
                  >
                    {t('detail.cta')}
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
