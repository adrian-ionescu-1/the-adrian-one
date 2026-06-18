'use client';

import { startTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === 'ro' ? 'en' : 'ro';
    const navigate = () => router.replace(pathname, { locale: nextLocale, scroll: false });

    if (!('startViewTransition' in document)) {
      navigate();
      return;
    }

    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => startTransition(navigate));
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
      aria-label={locale === 'ro' ? 'Switch to English' : 'Schimbă în Română'}
    >
      <span className={locale === 'ro' ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
        RO
      </span>
      <span className="text-muted-foreground/40">|</span>
      <span className={locale === 'en' ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
        EN
      </span>
    </button>
  );
}
