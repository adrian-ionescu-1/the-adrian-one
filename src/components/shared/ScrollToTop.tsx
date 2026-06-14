'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY.current;
      const pastThreshold = currentY > 400;
      setVisible((prev) => {
        const next = scrollingUp && pastThreshold;
        return prev === next ? prev : next;
      });
      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.55, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.55, y: 14 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          whileHover={{ scale: 1.12, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
        >
          {/* Breathing glow */}
          <motion.div
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.25, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 rounded-full bg-primary/50 blur-md"
            aria-hidden
          />

          {/* Button face */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-linear-to-br from-primary to-violet-500/90 text-primary-foreground shadow-lg shadow-primary/40 flex items-center justify-center">
            {/* Shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/25 to-transparent"
              aria-hidden
            />
            {/* Idle arrow bounce */}
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="relative"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
