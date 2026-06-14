'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export function FooterLogo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
    >
      <Image src="/images/logo-light.svg" alt="The Adrian One logo" width={32} height={32} loading="lazy" className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105 block dark:hidden" />
      <Image src="/images/logo-dark.svg"  alt="The Adrian One logo" width={32} height={32} loading="lazy" className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105 hidden dark:block" />
      {label}
    </Link>
  );
}
