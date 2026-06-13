'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'partners', href: '/partners' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hasBg = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hasBg
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-base font-bold tracking-tight text-foreground sm:text-lg"
        >
          The Adrian One
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="px-3 py-2 text-sm text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: language switcher + hamburger */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Închide meniu' : 'Deschide meniu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          mobileOpen ? 'max-h-96 border-t border-border' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-3 gap-0.5">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="block px-3 py-3 text-sm text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent active:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
