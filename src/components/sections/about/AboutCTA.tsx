'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { container, blurUp, fadeUp, viewport } from '@/lib/motion';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function AboutCTA() {
  const t = useTranslations('aboutPage.cta');

  return (
    <section className="relative border-t border-border/30 py-24 md:py-32 overflow-hidden">
      <m.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.07, 0.18, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary blur-[140px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" aria-hidden />

      <m.div
        variants={container(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        {/* Badge */}
        <m.div variants={blurUp} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </span>
        </m.div>

        <m.h2 variants={fadeUp} className="mb-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          {t('heading')}
        </m.h2>

        <m.p variants={fadeUp} className="mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          {t('subheading')}
        </m.p>

        {/* CTAs */}
        <m.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — gradient + breathing glow + shimmer */}
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
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground font-semibold text-base shadow-md shadow-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />
              <WhatsAppIcon size={17} />
              {t('primary')}
            </a>
          </div>

          {/* Secondary */}
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm font-semibold text-base text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:bg-card/50 hover:-translate-y-px"
          >
            {t('secondary')}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </m.div>
      </m.div>
    </section>
  );
}
