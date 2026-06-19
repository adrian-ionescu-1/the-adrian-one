'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Send, Loader2, CheckCircle2, AlertTriangle, ExternalLink,
  ChevronDown, Mail, RefreshCw, Phone,
} from 'lucide-react';
import { container, blurUp, fadeUp, fadeLeft, fadeRight, viewport } from '@/lib/motion';

// ─── Brand icon SVGs ──────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Form schema ──────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1),
  projectType: z.string().min(1),
  message: z.string().min(20),
});

type FormData = z.infer<typeof contactSchema>;

// ─── Data constants ───────────────────────────────────────────────────────────

const BUDGET_OPTIONS = [
  { value: 'Under €1,000', key: 'budget1' as const },
  { value: '€1,000 – €3,000', key: 'budget2' as const },
  { value: '€3,000 – €8,000', key: 'budget3' as const },
  { value: '€8,000 – €20,000', key: 'budget4' as const },
  { value: '€20,000+', key: 'budget5' as const },
];

const PROJECT_TYPE_OPTIONS = [
  { value: 'Web App', key: 'typeWebapp' as const },
  { value: 'E-commerce', key: 'typeEcommerce' as const },
  { value: 'Landing Page', key: 'typeLanding' as const },
  { value: 'API / Backend', key: 'typeApi' as const },
  { value: 'UI/UX Design', key: 'typeDesign' as const },
  { value: 'Other', key: 'typeOther' as const },
];

// ─── Shared input styling ─────────────────────────────────────────────────────

const inputBase =
  'w-full px-4 py-3 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 transition-all duration-200 bg-background/40 backdrop-blur-sm';
const inputDefault = `${inputBase} border-border/50 focus:ring-primary/20 focus:border-primary/40`;
const inputError = `${inputBase} border-red-500/40 focus:ring-red-500/15 focus:border-red-500/40`;

const selectBase =
  'w-full px-4 py-3 rounded-xl border text-sm text-foreground focus:outline-none focus:ring-2 transition-all duration-200 bg-background appearance-none pr-10 cursor-pointer';
const selectDefault = `${selectBase} border-border/50 focus:ring-primary/20 focus:border-primary/40`;
const selectError = `${selectBase} border-red-500/40 focus:ring-red-500/15 focus:border-red-500/40`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground/80 mb-2">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500/80 flex items-center gap-1.5">
      <AlertTriangle size={11} className="shrink-0" />
      {message}
    </p>
  );
}

// ─── Contact link variant ─────────────────────────────────────────────────────

const contactLinkVariant = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

const nextStepVariant = {
  hidden: { opacity: 0, x: 14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactMain() {
  const tf = useTranslations('contactPage.form');
  const ti = useTranslations('contactPage.info');

  type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: '', budget: '', company: '' },
  });

  const selectedType = useWatch({ control, name: 'projectType' });
  const messageVal = useWatch({ control, name: 'message' }) ?? '';

  const onSubmit = async (data: FormData) => {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const handleReset = () => {
    reset();
    setSubmitState('idle');
  };

  // ─── Sidebar data ───────────────────────────────────────────────────────────

  const DIRECT_CONTACTS: Array<{
    href: string;
    Icon: React.ElementType;
    label: string;
    value?: string;
    desc: string;
    color: string;
    bg: string;
    border: string;
  }> = [
    {
      href: 'https://wa.me/40736556174',
      Icon: WhatsAppIcon,
      label: ti('whatsappLabel'),
      desc: ti('whatsappDesc'),
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/8 hover:bg-emerald-500/15',
      border: 'border-emerald-500/20 hover:border-emerald-500/35',
    },
    {
      href: 'tel:+40736556174',
      Icon: Phone,
      label: ti('phoneLabel'),
      value: '+40 736 556 174',
      desc: ti('phoneDesc'),
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/8 hover:bg-amber-500/15',
      border: 'border-amber-500/20 hover:border-amber-500/35',
    },
    {
      href: 'mailto:theadrianone.dev@gmail.com',
      Icon: Mail,
      label: ti('emailLabel'),
      value: 'theadrianone.dev@gmail.com',
      desc: ti('emailDesc'),
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/8 hover:bg-blue-500/15',
      border: 'border-blue-500/20 hover:border-blue-500/35',
    },
    {
      href: 'https://www.linkedin.com/in/george-adrian-ionescu-005234286',
      Icon: LinkedInIcon,
      label: ti('linkedinLabel'),
      desc: ti('linkedinDesc'),
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-500/8 hover:bg-violet-500/15',
      border: 'border-violet-500/20 hover:border-violet-500/35',
    },
  ];

  const NEXT_STEPS = [
    {
      num: '1',
      title: ti('next1Title'),
      desc: ti('next1Desc'),
      accent: 'text-primary',
      border: 'border-primary/25',
      bg: 'bg-primary/8',
    },
    {
      num: '2',
      title: ti('next2Title'),
      desc: ti('next2Desc'),
      accent: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/25',
      bg: 'bg-blue-500/8',
    },
    {
      num: '3',
      title: ti('next3Title'),
      desc: ti('next3Desc'),
      accent: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/25',
      bg: 'bg-emerald-500/8',
    },
  ];

  return (
    <section className="relative border-t border-border/30 py-16 md:py-24 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-0 bottom-0 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-0 w-80 h-80 rounded-full bg-violet-500/5 blur-[90px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">

          {/* ═══ LEFT — Form ════════════════════════════════════════════════════ */}
          <m.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="min-w-0"
          >
            {/* Section header */}
            <m.div
              variants={container(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mb-8"
            >
              <m.span
                variants={blurUp}
                className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary tracking-wide"
              >
                {tf('sectionBadge')}
              </m.span>
              <m.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {tf('heading')}
              </m.h2>
              <m.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-lg">
                {tf('subheading')}
              </m.p>
            </m.div>

            {/* Form card */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-border/50 bg-card/25 backdrop-blur-md overflow-hidden"
            >
              {/* Top gradient stripe */}
              <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* ── SUCCESS STATE ── */}
                  {submitState === 'success' ? (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: 'easeOut' as const }}
                      className="py-12 flex flex-col items-center text-center gap-5"
                    >
                      <div className="relative">
                        <m.div
                          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-125"
                        />
                        <div className="relative w-18 h-18 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                          <CheckCircle2 size={36} className="text-emerald-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{tf('successTitle')}</h3>
                        <p className="text-muted-foreground leading-relaxed max-w-sm">{tf('successDesc')}</p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/50 bg-card/40 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-primary/35 hover:text-foreground hover:bg-card/60"
                      >
                        <RefreshCw size={14} />
                        {tf('successBack')}
                      </button>
                    </m.div>
                  ) : (
                    /* ── FORM STATE ── */
                    <m.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      {/* Row: Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{tf('nameLabel')}</Label>
                          <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder={tf('namePlaceholder')}
                            {...register('name')}
                            className={errors.name ? inputError : inputDefault}
                          />
                          <FieldError message={errors.name ? tf('nameError') : undefined} />
                        </div>
                        <div>
                          <Label htmlFor="email">{tf('emailLabel')}</Label>
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder={tf('emailPlaceholder')}
                            {...register('email')}
                            className={errors.email ? inputError : inputDefault}
                          />
                          <FieldError message={errors.email ? tf('emailError') : undefined} />
                        </div>
                      </div>

                      {/* Row: Phone + Company */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">{tf('phoneLabel')}</Label>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder={tf('phonePlaceholder')}
                            {...register('phone')}
                            className={inputDefault}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">{tf('companyLabel')}</Label>
                          <input
                            id="company"
                            type="text"
                            autoComplete="organization"
                            placeholder={tf('companyPlaceholder')}
                            {...register('company')}
                            className={inputDefault}
                          />
                        </div>
                      </div>

                      {/* Budget select */}
                      <div>
                        <Label htmlFor="budget">{tf('budgetLabel')}</Label>
                        <div className="relative">
                          <select
                            id="budget"
                            {...register('budget')}
                            className={errors.budget ? selectError : selectDefault}
                          >
                            <option value="">{tf('budgetPlaceholder')}</option>
                            {BUDGET_OPTIONS.map((opt) => (
                              <option key={opt.key} value={opt.value}>
                                {tf(opt.key)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        </div>
                        <FieldError message={errors.budget ? tf('budgetError') : undefined} />
                      </div>

                      {/* Project type pills */}
                      <div>
                        <Label htmlFor="projectType">{tf('typeLabel')}</Label>
                        <input type="hidden" {...register('projectType')} />
                        <div className="flex flex-wrap gap-2">
                          {PROJECT_TYPE_OPTIONS.map((opt) => {
                            const isSelected = selectedType === opt.value;
                            return (
                              <m.button
                                key={opt.key}
                                type="button"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setValue('projectType', opt.value, { shouldValidate: true })}
                                className={[
                                  'px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer',
                                  isSelected
                                    ? 'border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/10'
                                    : 'border-border/40 text-muted-foreground hover:border-border/70 hover:text-foreground hover:bg-card/40',
                                ].join(' ')}
                              >
                                {tf(opt.key)}
                              </m.button>
                            );
                          })}
                        </div>
                        <FieldError message={errors.projectType ? tf('typeError') : undefined} />
                      </div>

                      {/* Message */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="message">{tf('messageLabel')}</Label>
                          <span className={`text-xs tabular-nums transition-colors duration-200 ${messageVal.length >= 20 ? 'text-emerald-500/70' : 'text-muted-foreground/40'}`}>
                            {messageVal.length}
                          </span>
                        </div>
                        <textarea
                          id="message"
                          rows={6}
                          placeholder={tf('messagePlaceholder')}
                          {...register('message')}
                          className={`${errors.message ? inputError : inputDefault} resize-none`}
                        />
                        <FieldError message={errors.message ? tf('messageError') : undefined} />
                      </div>

                      {/* Error banner */}
                      <AnimatePresence>
                        {submitState === 'error' && (
                          <m.div
                            initial={{ opacity: 0, y: -8, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -8, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-red-500/25 bg-red-500/6 text-sm text-red-600 dark:text-red-400"
                          >
                            <AlertTriangle size={15} className="shrink-0 mt-px" />
                            <span>{tf('errorBanner')}</span>
                          </m.div>
                        )}
                      </AnimatePresence>

                      {/* Submit button — gradient + breathing glow + shimmer */}
                      <div className="relative">
                        {submitState !== 'submitting' && (
                          <m.div
                            animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.03, 1] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="pointer-events-none absolute inset-0 rounded-xl bg-primary/40 blur-sm"
                            aria-hidden
                          />
                        )}
                        <button
                          type="submit"
                          disabled={submitState === 'submitting'}
                          className="group relative flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground font-semibold text-base shadow-md shadow-primary/25 transition-all duration-300 hover:shadow-glow hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
                        >
                          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
                          {submitState === 'submitting' ? (
                            <>
                              <Loader2 size={17} className="animate-spin" />
                              {tf('submitting')}
                            </>
                          ) : (
                            <>
                              <Send size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                              {tf('submit')}
                            </>
                          )}
                        </button>
                      </div>
                    </m.form>
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          </m.div>

          {/* ═══ RIGHT — Sidebar ════════════════════════════════════════════════ */}
          <m.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:sticky lg:top-8 self-start flex flex-col gap-6"
          >
            {/* Direct contact */}
            <div>
              <m.span
                variants={blurUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/6 text-xs font-semibold text-primary tracking-wide"
              >
                {ti('altBadge')}
              </m.span>
              <m.h3
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="text-lg font-bold text-foreground mb-4"
              >
                {ti('altHeading')}
              </m.h3>

              <m.div
                variants={container(0.07, 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex flex-col gap-2.5"
              >
                {DIRECT_CONTACTS.map(({ href, Icon, label, value, desc, color, bg, border }) => (
                  <m.a
                    key={label}
                    variants={contactLinkVariant}
                    whileHover={{ x: 3, transition: { duration: 0.15 } }}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3.5 p-4 rounded-xl border ${border} ${bg} transition-all duration-200`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color} transition-transform duration-200 group-hover:scale-110`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold ${color}`}>{label}</p>
                      {value && (
                        <p className="text-sm font-mono font-medium text-foreground/85 leading-tight mt-0.5 break-all">{value}</p>
                      )}
                      <p className="text-xs text-muted-foreground/70 leading-tight mt-0.5">{desc}</p>
                    </div>
                    <ExternalLink size={13} className="shrink-0 text-muted-foreground/35 transition-colors duration-200 group-hover:text-muted-foreground/60" />
                  </m.a>
                ))}
              </m.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border/30" />

            {/* What happens next */}
            <div>
              <m.h3
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="text-base font-bold text-foreground mb-4"
              >
                {ti('nextHeading')}
              </m.h3>
              <m.div
                variants={container(0.08, 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex flex-col gap-3"
              >
                {NEXT_STEPS.map(({ num, title, desc, accent, border, bg }) => (
                  <m.div
                    key={num}
                    variants={nextStepVariant}
                    whileHover={{ x: 3, transition: { duration: 0.15 } }}
                    className="flex gap-3.5 p-4 rounded-xl border border-border/40 bg-card/15 backdrop-blur-sm transition-all duration-200 hover:bg-card/30 hover:border-border/60"
                  >
                    <div className={`w-7 h-7 rounded-lg border ${border} ${bg} ${accent} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
                      {num}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-0.5 ${accent}`}>{title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
