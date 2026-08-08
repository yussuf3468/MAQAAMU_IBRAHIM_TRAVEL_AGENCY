import type { ElementType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/lib/hooks';
import {
  EASE_OUT_EXPO,
  DURATION,
  revealVariants,
  revealVariantsReduced,
  staggerParent,
  viewportOnce,
} from '@/lib/motion';

/* =========================================================================
   SCROLL REVEALS
   -------------------------------------------------------------------------
   Three components cover every reveal on the site:

     <Reveal>       one element rises into place, once
     <RevealGroup>  a parent that releases <RevealItem> children in sequence
     <LineReveal>   a display heading whose lines rise from behind a mask

   All of them collapse to a plain fade — or to nothing — when the visitor
   has asked for reduced motion. Nothing here is decorative-only: if the
   animation were removed the page would still read identically, which is
   the test each of these had to pass.
   ========================================================================= */

interface RevealProps {
  children: ReactNode;
  /** Seconds. Keep under 0.3 — a reveal that waits reads as a slow site. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? revealVariantsReduced : revealVariants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------------- */

interface RevealGroupProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function RevealGroup({
  children,
  stagger = 0.07,
  delay = 0,
  as = 'div',
  className,
}: RevealGroupProps) {
  const MotionTag = motion[as as 'div'] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  as = 'div',
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;
  return (
    <MotionTag className={className} variants={reduced ? revealVariantsReduced : revealVariants}>
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------------- */

interface LineRevealProps {
  /** Each string becomes one masked line. Keeps control of the line breaks. */
  lines: string[];
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Play immediately (hero) rather than waiting for the element to scroll in. */
  immediate?: boolean;
}

export function LineReveal({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: LineRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, index) => (
          <span key={line + index} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const animateProps = immediate
    ? ({ animate: 'visible' } as const)
    : ({ whileInView: 'visible', viewport: viewportOnce } as const);

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        {...animateProps}
        variants={staggerParent(0.09, delay)}
      >
        {lines.map((line, index) => (
          // The outer span is the mask; the inner one does the travelling.
          <span key={line + index} className={cn('block overflow-hidden', lineClassName)}>
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: { y: '105%' },
                visible: {
                  y: '0%',
                  transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
