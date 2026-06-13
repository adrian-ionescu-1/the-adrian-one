'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Menu, X, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'partners', href: '/partners' },
  { key: 'about', href: '/about' },
] as const;

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

  const hasBg = scrolled || mobileOpen;

  return (
    <header
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
          <motion.span
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30"
          >
            <Zap size={15} strokeWidth={2.5} />
          </motion.span>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-bold tracking-tight text-base sm:text-lg text-foreground">
              The Adrian One
            </span>
            <span className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-500 tracking-wide uppercase">
                Available
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ key, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`relative px-3.5 py-2 text-base font-medium rounded-lg transition-colors duration-200 group ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(key)}
                  {/* Animated underline indicator */}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ease-out ${
                      active
                        ? 'w-[55%] bg-primary opacity-100'
                        : 'w-0 opacity-0 bg-primary/60 group-hover:w-[55%] group-hover:opacity-100'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: CTA + theme + lang + burger */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-base font-semibold rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-glow-sm hover:-translate-y-px active:translate-y-0"
          >
            {t('contact')}
            <ArrowRight size={15} />
          </Link>
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
              <motion.span
                key={mobileOpen ? 'x' : 'burger'}
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05, duration: 0.2 }}
                >
                  <Link
                    href={href}
                    className="block px-3 py-2.5 text-base font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(key)}
                  </Link>
                </motion.li>
              ))}
              <motion.li
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
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
