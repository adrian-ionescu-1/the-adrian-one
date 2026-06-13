'use client';

import Image from 'next/image';
import { useTheme } from '@/components/shared/ThemeProvider';
import { Link } from '@/i18n/navigation';

export function FooterLogo({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
    >
      <Image
        src={theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
        alt="The Adrian One logo"
        width={32}
        height={32}
        className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
        unoptimized
      />
      {label}
    </Link>
  );
}
