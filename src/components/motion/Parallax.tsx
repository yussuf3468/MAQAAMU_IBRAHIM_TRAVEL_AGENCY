import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/* =========================================================================
   PARALLAX
   -------------------------------------------------------------------------
   Used on two things only: the hero image and one full-bleed editorial
   image mid-page. The displacement is small — a large offset makes a page
   feel unstable and forces the browser to repaint a big layer on every
   frame.

   Transforms are GPU-composited (translateY on a scaled child), never
   top/margin, so scrolling stays at 60fps. Disabled outright for visitors
   who prefer reduced motion.
   ========================================================================= */

interface ParallaxProps {
  children: ReactNode;
  /** Total travel in pixels across the element's full scroll pass. */
  distance?: number;
  className?: string;
}

export function Parallax({ children, distance = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  if (reduced) {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y }}
        // Over-scale so the parallax travel never exposes an edge.
        className="size-full will-change-transform [&>*]:size-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
