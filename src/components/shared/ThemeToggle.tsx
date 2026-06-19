'use client';

import { useEffect, useState, startTransition } from 'react';
import { Sun, Moon } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { startTransition(() => setMounted(true)); }, []);

  if (!mounted) return <span className="w-9 h-9 rounded-lg" />;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.15 }}
          className="block"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
