'use client';

import { LazyMotion, MotionConfig, domMax } from 'framer-motion';

/**
 * Componentele folosesc `m.*` (varianta tree-shakeable a `motion`) împreună cu
 * `LazyMotion`, care încarcă o singură dată setul de feature-uri `domMax`
 * (animații + gesturi + layout) în loc ca fiecare `motion.*` să tragă tot
 * bundle-ul framer-motion. Rezultat: mai puțin JS de hidratat, animații
 * identice. `MotionConfig reducedMotion="user"` respectă prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
