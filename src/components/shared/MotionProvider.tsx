'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Transmite tuturor animațiilor framer-motion să respecte
 * `prefers-reduced-motion`. Când utilizatorul a cerut mai puțină mișcare,
 * tranzițiile de transform/opacity sunt reduse automat.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
