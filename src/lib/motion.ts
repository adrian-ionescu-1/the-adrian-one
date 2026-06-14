import type { Variants, Transition } from 'framer-motion';

export const viewport = { once: true, margin: '-80px' as const };

export const easeOut: Transition = { ease: [0.22, 1, 0.36, 1], duration: 0.6 };
export const easeOutFast: Transition = { ease: [0.22, 1, 0.36, 1], duration: 0.4 };
export const spring: Transition = { type: 'spring', stiffness: 280, damping: 26 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: easeOut },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: easeOut },
};

export const container = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
