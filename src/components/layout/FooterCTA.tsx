'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export function FooterCTA() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const isContact = pathname === '/contact';

  return (
    <div className="group relative mb-12 rounded-2xl border border-border/60 bg-card/40 px-8 py-10 sm:px-12 sm:py-12 overflow-hidden text-center transition-all duration-300 hover:border-primary/35 hover:shadow-glow-sm cursor-default">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-transparent transition-opacity duration-300 group-hover:from-primary/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-[80px] bg-primary/8 transition-opacity duration-300 group-hover:opacity-150"
        aria-hidden
      />
      <p className="relative text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
        {isContact ? t('ctaAlt.heading') : t('cta.heading')}
      </p>
      <p className="relative text-base text-muted-foreground mb-7 max-w-sm mx-auto leading-relaxed">
        {isContact ? t('ctaAlt.subheading') : t('cta.subheading')}
      </p>
      <Link
        href={isContact ? '/services' : '/contact'}
        className="relative inline-flex items-center gap-2 px-6 py-2.5 text-base font-semibold rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
      >
        {isContact ? t('ctaAlt.button') : t('cta.button')}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
