'use client';

import { useState, startTransition } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { container, blurUp, fadeUp, fadeLeft, fadeRight, scaleIn, viewport } from '@/lib/motion';
import { useTheme } from '@/components/shared/ThemeProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'webapp' | 'ecommerce' | 'landing' | 'api';

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  description: string;
  tech: string[];
  metric: string;
  gradient: string;
  year: string;
  liveUrl: string;
  image?: { light: string; dark: string };
};

type FeaturedProject = Project & {
  challenge: string;
  metrics: { value: string; label: string }[];
};

// ─── Static config ────────────────────────────────────────────────────────────

const FEATURED_CONFIG = {
  id: 'techstart' as const,
  category: 'webapp' as Category,
  tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Tailwind CSS'],
  metricValues: ['8 wk', '99.9%', '50+'],
  gradient: 'from-violet-600 via-purple-600 to-indigo-700',
  year: '2024',
  liveUrl: '#',
};

const PROJECTS_CONFIG: {
  id: string;
  category: Category;
  tech: string[];
  gradient: string;
  year: string;
  liveUrl: string;
  image?: { light: string; dark: string };
}[] = [
  { id: 'foodie',     category: 'landing',   tech: ['Next.js 16', 'Framer Motion', 'Tailwind CSS v4', 'next-intl', 'Schema.org JSON-LD'], gradient: 'from-amber-500 via-orange-500 to-red-500', year: '2025', liveUrl: 'https://foodie-brasov.vercel.app', image: { light: '/images/projects/foodie-brasov-light.jpg', dark: '/images/projects/foodie-brasov-dark.jpg' } },
  { id: 'nordshop',   category: 'ecommerce', tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],             gradient: 'from-blue-500 via-cyan-500 to-teal-600',     year: '2024', liveUrl: '#' },
  { id: 'buildflow',  category: 'webapp',    tech: ['React', 'Node.js', 'GraphQL', 'Redis', 'Docker'],        gradient: 'from-emerald-500 via-green-500 to-teal-600',  year: '2023', liveUrl: '#' },
  { id: 'medconnect', category: 'api',       tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],     gradient: 'from-rose-500 via-pink-500 to-red-600',       year: '2023', liveUrl: '#' },
  { id: 'greenmarket',category: 'ecommerce', tech: ['Next.js', 'Sanity', 'Stripe', 'Tailwind CSS'],           gradient: 'from-lime-500 via-green-500 to-emerald-600',  year: '2024', liveUrl: '#' },
];

const CATEGORY_LABELS: Record<Category, string> = {
  webapp: 'Web App',
  ecommerce: 'E-commerce',
  landing: 'Landing Page',
  api: 'API',
};

// ─── Browser Mockup ───────────────────────────────────────────────────────────

function BrowserMockup({ gradient, image, priority = false }: { gradient: string; image?: { light: string; dark: string }; priority?: boolean }) {
  const { theme } = useTheme();
  const src = image ? image[theme] : null;
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border/40 shadow-lg">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border-b border-black/8 dark:border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
        <div className="ml-2 flex-1 h-5 rounded-md bg-black/8 dark:bg-white/10 flex items-center gap-2 px-2.5">
          <div className="w-3 h-3 rounded-full border border-black/15 dark:border-white/20 shrink-0" />
          <div className="h-1.5 w-24 rounded-full bg-black/15 dark:bg-white/20" />
        </div>
      </div>
      {src ? (
        <div className="aspect-video relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image src={src} alt="" fill priority={priority} className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        </div>
      ) : (
        <div className={`aspect-video bg-linear-to-br ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 p-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="h-5 w-14 rounded-md bg-white/25" />
              <div className="flex gap-1.5 ml-1">
                <div className="h-2.5 w-7 rounded-sm bg-white/15" />
                <div className="h-2.5 w-7 rounded-sm bg-white/15" />
                <div className="h-2.5 w-7 rounded-sm bg-white/15" />
              </div>
              <div className="ml-auto h-6 w-14 rounded-lg bg-white/25" />
            </div>
            <div className="mt-1.5 space-y-2">
              <div className="h-5 w-44 rounded-md bg-white/22" />
              <div className="h-3 w-56 rounded-sm bg-white/15" />
              <div className="h-3 w-48 rounded-sm bg-white/12" />
              <div className="mt-1 flex gap-2">
                <div className="h-7 w-20 rounded-lg bg-white/25" />
                <div className="h-7 w-16 rounded-lg bg-white/15" />
              </div>
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg bg-white/18" />
              <div className="h-10 rounded-lg bg-white/12" />
              <div className="h-10 rounded-lg bg-white/18" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────

type FeaturedLabels = { featuredBadge: string; challenge: string; techUsed: string; viewLive: string };

const pillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
};

function FeaturedCard({ project, labels }: { project: FeaturedProject; labels: FeaturedLabels }) {
  return (
    <div className="group relative mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-7 sm:p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-primary/30 hover:shadow-glow-sm">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent" aria-hidden />

      {/* Left: info */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative flex flex-col gap-5 justify-center order-2 lg:order-1"
      >
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide shadow-sm shadow-primary/30">
            {labels.featuredBadge}
          </span>
          <span className="text-xs text-muted-foreground/70 font-medium">
            {CATEGORY_LABELS[project.category]} · {project.year}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-primary mb-1.5">{project.tagline}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">{project.title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        {/* Challenge box */}
        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-xs font-bold text-primary/80 uppercase tracking-[0.13em]">{labels.challenge}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.13em] mb-2">{labels.techUsed}</p>
          <motion.div variants={container(0.05, 0.1)} className="flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <motion.span key={item} variants={pillVariant} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-border/50 bg-primary/6 text-foreground/80">
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div variants={container(0.08, 0.15)} className="grid grid-cols-3 gap-3">
          {project.metrics.map(({ value, label }) => (
            <motion.div key={label} variants={scaleIn} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border/40 bg-card/50 text-center">
              <span className="text-xl font-bold text-primary tabular-nums">{value}</span>
              <span className="text-xs text-muted-foreground leading-snug">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            {labels.viewLive}
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>

      {/* Right: browser mockup */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative flex items-center order-1 lg:order-2"
      >
        <div className={`pointer-events-none absolute -inset-4 rounded-2xl bg-linear-to-br ${project.gradient} opacity-15 blur-2xl`} aria-hidden />
        <motion.div
          whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="relative w-full"
        >
          <BrowserMockup gradient={project.gradient} image={project.image} priority />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Regular Project Card ─────────────────────────────────────────────────────

function ProjectCard({ project, viewLiveLabel }: { project: Project; viewLiveLabel: string }) {
  return (
    <motion.article
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group flex flex-col rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-primary/30 hover:shadow-glow-sm"
    >
      {/* Mockup area */}
      <div className="relative overflow-hidden">
        <BrowserMockup gradient={project.gradient} image={project.image} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/25 transition-all hover:shadow-glow hover:-translate-y-px"
          >
            {viewLiveLabel}
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 p-5 flex-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border/60 bg-muted/20 text-xs font-semibold text-muted-foreground">
            {CATEGORY_LABELS[project.category]}
          </span>
          <span className="text-xs text-muted-foreground/50 font-medium">{project.year}</span>
        </div>

        <div>
          <p className="text-xs font-semibold text-primary/80 mb-0.5">{project.tagline}</p>
          <h3 className="text-lg font-bold text-foreground mb-1.5">{project.title}</h3>
          <div className="h-[4.5rem] overflow-hidden">
            <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto overflow-hidden h-[2.875rem] content-start">
          {project.tech.slice(0, 4).map((item) => (
            <span key={item} className="px-2 py-0.5 text-xs font-medium rounded-md border border-border/40 bg-primary/5 text-foreground/70">
              {item}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md border border-border/40 text-muted-foreground/60">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {project.metric}
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {viewLiveLabel}
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Filter ───────────────────────────────────────────────────────────────────

type FilterKey = 'all' | Category;
const FILTER_KEYS: FilterKey[] = ['all', 'landing', 'webapp', 'ecommerce', 'api'];
const FILTER_LABEL_KEYS = ['filterAll', 'filterLanding', 'filterWebapp', 'filterEcommerce', 'filterApi'] as const;

// ─── Main ─────────────────────────────────────────────────────────────────────

export function PortfolioGrid() {
  const t = useTranslations('portfolioPage.grid');
  const tp = useTranslations('portfolioPage.projects');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const featured: FeaturedProject = {
    ...FEATURED_CONFIG,
    title: tp('techstart.title'),
    tagline: tp('techstart.tagline'),
    description: tp('techstart.description'),
    challenge: tp('techstart.challenge'),
    metric: tp('techstart.metric'),
    metrics: [
      { value: FEATURED_CONFIG.metricValues[0], label: tp('techstart.m1Label') },
      { value: FEATURED_CONFIG.metricValues[1], label: tp('techstart.m2Label') },
      { value: FEATURED_CONFIG.metricValues[2], label: tp('techstart.m3Label') },
    ],
  };

  const allProjects: Project[] = PROJECTS_CONFIG.map((config) => ({
    ...config,
    title: tp(`${config.id}.title` as Parameters<typeof tp>[0]),
    tagline: tp(`${config.id}.tagline` as Parameters<typeof tp>[0]),
    description: tp(`${config.id}.description` as Parameters<typeof tp>[0]),
    metric: tp(`${config.id}.metric` as Parameters<typeof tp>[0]),
  }));

  const filtered = activeFilter === 'all' ? allProjects : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Section header */}
        <motion.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-14"
        >
          <motion.span variants={blurUp} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('subheading')}
          </motion.p>
        </motion.div>

        {/* Featured */}
        <FeaturedCard
          project={featured}
          labels={{ featuredBadge: t('featuredBadge'), challenge: t('challenge'), techUsed: t('techUsed'), viewLive: t('viewLive') }}
        />

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-lg font-bold text-foreground">
            {t('otherHeading')}
          </motion.p>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-wrap gap-1 p-1 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
          >
            {FILTER_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => startTransition(() => setActiveFilter(key))}
                className={`relative px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                  activeFilter === key ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeFilter === key && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-lg bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
                )}
                <span className="relative z-10">{t(FILTER_LABEL_KEYS[i])}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} viewLiveLabel={t('viewLive')} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex justify-center py-16 text-muted-foreground text-base"
            >
              No projects in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
