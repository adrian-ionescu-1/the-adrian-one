'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Globe2, CalendarCheck, MessageCircle } from 'lucide-react';
import { container, blurUp, fadeUp, scaleIn } from '@/lib/motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type InfoCard = {
  label: string;
  value: string;
  color: string;
  ringColor: string;
  iconBg: string;
  glowColor: string;
  Icon: React.ElementType;
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const iconVariant = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 20 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactHero() {
  const t = useTranslations('contactPage.hero');

  const INFO_CARDS: InfoCard[] = [
    {
      Icon: Clock,
      label: t('info1Label'),
      value: t('info1Value'),
      color: 'text-emerald-600 dark:text-emerald-400',
      ringColor: 'border-emerald-500/25',
      iconBg: 'bg-emerald-500/10',
      glowColor: 'from-emerald-500/8',
    },
    {
      Icon: Globe2,
      label: t('info2Label'),
      value: t('info2Value'),
      color: 'text-blue-600 dark:text-blue-400',
      ringColor: 'border-blue-500/25',
      iconBg: 'bg-blue-500/10',
      glowColor: 'from-blue-500/8',
    },
    {
      Icon: CalendarCheck,
      label: t('info3Label'),
      value: t('info3Value'),
      color: 'text-violet-600 dark:text-violet-400',
      ringColor: 'border-violet-500/25',
      iconBg: 'bg-violet-500/10',
      glowColor: 'from-violet-500/8',
    },
    {
      Icon: MessageCircle,
      label: t('info4Label'),
      value: t('info4Value'),
      color: 'text-amber-600 dark:text-amber-400',
      ringColor: 'border-amber-500/25',
      iconBg: 'bg-amber-500/10',
      glowColor: 'from-amber-500/8',
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Pulsing ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.07, 0.15, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary blur-[140px]"
        aria-hidden
      />
      {/* Secondary glow offset */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 w-72 h-72 rounded-full bg-violet-500/10 blur-[90px]" aria-hidden />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden
      />
      {/* Top rule */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        {/* Badge */}
        <motion.span
          variants={blurUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
        >
          {t('badge')}
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
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
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-14"
        >
          {t('subheading')}
        </motion.p>

        {/* Info cards — stagger */}
        <motion.div
          variants={container(0.1, 0.25)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto"
        >
          {INFO_CARDS.map(({ Icon, label, value, color, ringColor, iconBg, glowColor }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`group relative flex flex-col items-center gap-2.5 sm:gap-3 p-3.5 sm:p-5 rounded-2xl border ${ringColor} bg-card/20 backdrop-blur-sm transition-all duration-300 hover:bg-card/35 hover:shadow-glow-sm overflow-hidden`}
            >
              {/* Accent glow on hover */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-b ${glowColor} via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100`} aria-hidden />
              {/* Shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/6 to-transparent" aria-hidden />

              <motion.div
                variants={iconVariant}
                className={`relative w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon size={18} className={color} />
              </motion.div>
              <div className="relative text-center">
                <p className="text-xs text-muted-foreground/70 leading-tight mb-1">{label}</p>
                <p className={`text-sm font-bold ${color}`}>{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
