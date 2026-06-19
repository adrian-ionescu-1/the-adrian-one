'use client';

import { useState, useEffect, startTransition } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Menu, X, ArrowRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { container, fadeUp } from '@/lib/motion';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'partners', href: '/partners' },
  { key: 'about', href: '/about' },
] as const;

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => setMobileOpen(false));
  }, [pathname]);

  const hasBg = scrolled || mobileOpen;

  return (
    <m.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hasBg
          ? scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-primary/20 shadow-glow-sm'
            : 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      {/* Decorative top glow line */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary via-primary/80 to-primary/30 transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo + Available badge */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <m.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center shrink-0"
          >
            <Image src="/images/logo-light.svg" alt="The Adrian One logo" width={32} height={32} loading="eager" className="h-8 w-auto object-contain block dark:hidden" />
            <Image src="/images/logo-dark.svg"  alt="The Adrian One logo" width={32} height={32} loading="eager" className="h-8 w-auto object-contain hidden dark:block" />
          </m.span>
          <div className="hidden xs:flex flex-col leading-none gap-0.5">
            <span className="font-bold tracking-tight text-base sm:text-lg text-foreground">
              The Adrian One
            </span>
            <span className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-500 tracking-wide uppercase">
                {t('available')}
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <m.ul
          variants={container(0.07, 0.25)}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-0.5"
        >
          {NAV_LINKS.map(({ key, href }) => {
            const active = isActive(href, pathname);
            return (
              <m.li key={key} variants={fadeUp}>
                <Link
                  href={href}
                  className={`relative px-3.5 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {/* Active pill background */}
                  <span
                    className={`absolute inset-0 rounded-lg border transition-all duration-300 ${
                      active
                        ? 'bg-primary/10 border-primary/20 opacity-100'
                        : 'bg-transparent border-transparent opacity-0'
                    }`}
                  />
                  {/* Active underline dot */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                      active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                  <span className="relative">{t(key)}</span>
                </Link>
              </m.li>
            );
          })}
        </m.ul>

        {/* Right: CTA + theme + lang + burger */}
        <m.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="relative hidden md:block">
            {/* Idle breathing glow */}
            <m.div
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 rounded-xl bg-primary/50 blur-md"
              aria-hidden
            />
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl overflow-hidden bg-linear-to-r from-primary to-violet-500/90 text-primary-foreground shadow-md shadow-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              {/* Shimmer sweep */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent"
                aria-hidden
              />
              {t('contact')}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={mobileOpen ? 'x' : 'burger'}
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </m.span>
            </AnimatePresence>
          </button>
        </m.div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map(({ key, href }, i) => {
                const active = isActive(href, pathname);
                return (
                  <m.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      className={`relative block pl-6 pr-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                        active
                          ? 'text-primary bg-primary/10 border border-primary/20 font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span
                        className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                          active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}
                      />
                      {t(key)}
                    </Link>
                  </m.li>
                );
              })}
              <m.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.08, duration: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 text-base font-semibold rounded-lg bg-primary text-primary-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('contact')}
                  <ArrowRight size={14} />
                </Link>
              </m.li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
