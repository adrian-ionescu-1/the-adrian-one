'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, Server, Layers, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn, viewport } from '@/lib/motion';

const CATEGORIES: {
  Icon: LucideIcon;
  labelKey: string;
  color: string;
  border: string;
  bg: string;
  pillBg: string;
  items: string[];
}[] = [
  { Icon: Globe,    labelKey: 'cat1', color: 'text-violet-600 dark:text-violet-400',  border: 'border-violet-500/25',  bg: 'bg-violet-500/8',  pillBg: 'bg-violet-500/10 border-violet-500/25 text-violet-700 dark:text-violet-300',  items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'] },
  { Icon: Server,   labelKey: 'cat2', color: 'text-blue-600 dark:text-blue-400',      border: 'border-blue-500/25',    bg: 'bg-blue-500/8',    pillBg: 'bg-blue-500/10 border-blue-500/25 text-blue-700 dark:text-blue-300',          items: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'tRPC'] },
  { Icon: Layers,   labelKey: 'cat3', color: 'text-emerald-600 dark:text-emerald-400',border: 'border-emerald-500/25', bg: 'bg-emerald-500/8', pillBg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-300',items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Drizzle'] },
  { Icon: Settings, labelKey: 'cat4', color: 'text-amber-600 dark:text-amber-400',    border: 'border-amber-500/25',  bg: 'bg-amber-500/8',   pillBg: 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300',      items: ['Git & GitHub', 'Docker', 'GitHub Actions', 'Vercel', 'Figma'] },
];

const iconVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 20, delay: 0.08 } },
};

const pillVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export function TechShowcase() {
  const t = useTranslations('servicesPage.tech');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-16"
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

        {/* 4-column category grid */}
        <motion.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CATEGORIES.map(({ Icon, labelKey, color, border, bg, pillBg, items }) => (
            <motion.div
              key={labelKey}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`group flex flex-col gap-4 p-6 rounded-2xl border ${border} ${bg} backdrop-blur-sm transition-shadow duration-300 hover:shadow-glow-sm`}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5">
                <motion.span variants={iconVariant} className={`flex items-center justify-center w-9 h-9 rounded-lg ${bg} ${color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={18} strokeWidth={1.8} />
                </motion.span>
                <span className={`text-sm font-bold uppercase tracking-[0.12em] ${color}`}>
                  {t(labelKey as Parameters<typeof t>[0])}
                </span>
              </div>

              {/* Tech pills — stagger */}
              <motion.div variants={container(0.07, 0.1)} className="flex flex-col gap-2">
                {items.map((item) => (
                  <motion.span
                    key={item}
                    variants={pillVariant}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border ${pillBg}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
