import type { Transition, Variants } from 'framer-motion';

/* =========================================================================
   MOTION SYSTEM
   -------------------------------------------------------------------------
   THE RULES, in order of importance:

   1. Motion explains, it never performs. If an animation does not help the
      eye understand what arrived or what changed, it should not exist.
   2. One easing family. Everything decelerates; nothing bounces, spins or
      overshoots.
   3. Three durations only — fast / base / slow. Nothing on this site
      animates for longer than 0.8s.
   4. Distance is small. 12–24px of travel reads as quality; 80px reads as
      a template.
   5. Reveals fire once. Content does not re-animate when scrolled past
      a second time.
   6. Reduced motion is honoured by falling back to opacity alone, or to
      nothing at all. See `prefersReducedMotion` and the CSS in
      styles/index.css.
   ========================================================================= */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.18,
  base: 0.38,
  slow: 0.72,
} as const;

export const transitions = {
  fast: { duration: DURATION.fast, ease: EASE_OUT_EXPO } satisfies Transition,
  base: { duration: DURATION.base, ease: EASE_OUT_EXPO } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE_OUT_EXPO } satisfies Transition,
} as const;

/** Standard scroll-reveal: a short rise with a fade. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Reduced-motion equivalent — the same choreography, no displacement. */
export const revealVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: 'linear' } },
};

/** Parent that releases its children one after another. */
export const staggerParent = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Word- or line-level reveal for display headings. */
export const lineVariants: Variants = {
  hidden: { opacity: 0, y: '38%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Image scale-back, paired with a clip reveal on the wrapper. */
export const imageRevealVariants: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

/** Route transitions. Deliberately quick — a slow page change feels broken. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: 'easeIn' } },
};

/** Mobile navigation panel. */
export const panelVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
  open: { opacity: 1, transition: { duration: 0.32, ease: EASE_OUT_EXPO } },
};

/** Viewport config shared by every scroll reveal — fires once, slightly early. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;

/** Reads the OS setting outside React, for non-component code paths. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
