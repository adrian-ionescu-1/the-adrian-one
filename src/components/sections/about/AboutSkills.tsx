'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { container, blurUp, fadeUp, scaleIn, viewport } from '@/lib/motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Level = 'expert' | 'advanced' | 'intermediate';
type Skill = { name: string; level: Level };
type Category = {
  catKey: 'cat1' | 'cat2' | 'cat3' | 'cat4';
  accent: string;
  border: string;
  bg: string;
  headerBg: string;
  skills: Skill[];
};

// ─── Config ───────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    catKey: 'cat1',
    accent: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    headerBg: 'bg-blue-500/10',
    skills: [
      { name: 'Next.js', level: 'expert' },
      { name: 'React', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Tailwind CSS', level: 'expert' },
      { name: 'Framer Motion', level: 'advanced' },
      { name: 'HTML & CSS', level: 'expert' },
    ],
  },
  {
    catKey: 'cat2',
    accent: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    headerBg: 'bg-emerald-500/10',
    skills: [
      { name: 'Node.js', level: 'expert' },
      { name: 'REST APIs', level: 'expert' },
      { name: 'Express', level: 'expert' },
      { name: 'GraphQL', level: 'advanced' },
      { name: 'tRPC', level: 'advanced' },
      { name: 'WebSockets', level: 'advanced' },
    ],
  },
  {
    catKey: 'cat3',
    accent: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/5',
    headerBg: 'bg-violet-500/10',
    skills: [
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'Prisma', level: 'expert' },
      { name: 'Redis', level: 'advanced' },
      { name: 'Vercel', level: 'expert' },
      { name: 'Docker', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
    ],
  },
  {
    catKey: 'cat4',
    accent: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    headerBg: 'bg-amber-500/10',
    skills: [
      { name: 'Figma', level: 'advanced' },
      { name: 'Sanity CMS', level: 'advanced' },
      { name: 'Git & GitHub', level: 'expert' },
      { name: 'CI/CD', level: 'advanced' },
      { name: 'Zod', level: 'expert' },
      { name: 'Playwright', level: 'intermediate' },
    ],
  },
];

const LEVEL_DOTS = { expert: 5, advanced: 4, intermediate: 3 };

const LEVEL_COLORS: Record<Level, string> = {
  expert: 'bg-primary',
  advanced: 'bg-blue-500',
  intermediate: 'bg-muted-foreground/40',
};

const LEVEL_BADGE: Record<Level, string> = {
  expert: 'text-primary border-primary/25 bg-primary/8',
  advanced: 'text-blue-600 dark:text-blue-400 border-blue-500/25 bg-blue-500/8',
  intermediate: 'text-muted-foreground border-border/60 bg-muted/20',
};

const skillRowVariant = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutSkills() {
  const t = useTranslations('aboutPage.skills');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-1/3 w-96 h-96 rounded-full bg-primary/6 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <m.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-14"
        >
          <m.span variants={blurUp} className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide">
            {t('badge')}
          </m.span>
          <m.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('heading')}
          </m.h2>
          <m.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('subheading')}
          </m.p>
        </m.div>

        {/* Categories grid */}
        <m.div
          variants={container(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {CATEGORIES.map((cat) => (
            <m.div
              key={cat.catKey}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`group rounded-2xl border ${cat.border} ${cat.bg} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-glow-sm`}
            >
              {/* Category header */}
              <div className={`flex items-center gap-2.5 px-5 py-3.5 ${cat.headerBg} border-b ${cat.border}`}>
                <span className={`text-sm font-bold uppercase tracking-[0.12em] ${cat.accent}`}>
                  {t(cat.catKey)}
                </span>
              </div>

              {/* Skills list — stagger */}
              <m.div
                variants={container(0.05, 0.05)}
                className="p-5 flex flex-col gap-3"
              >
                {cat.skills.map((skill) => (
                  <m.div
                    key={skill.name}
                    variants={skillRowVariant}
                    className="flex items-center justify-between gap-3"
                  >
                    {/* Name + dots */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex gap-1 shrink-0">
                        {Array.from({ length: 5 }).map((_, di) => (
                          <span
                            key={di}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              di < LEVEL_DOTS[skill.level] ? LEVEL_COLORS[skill.level] : 'bg-border/40'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground/85 truncate">{skill.name}</span>
                    </div>

                    {/* Level badge */}
                    <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${LEVEL_BADGE[skill.level]}`}>
                      {t(skill.level)}
                    </span>
                  </m.div>
                ))}
              </m.div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
