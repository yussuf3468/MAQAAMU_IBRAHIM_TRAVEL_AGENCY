import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { copy, media } from '@/content';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { useReducedMotion } from '@/lib/hooks';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { LineReveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';

/* =========================================================================
   HERO
   -------------------------------------------------------------------------
   The whole first impression, and the element the rest of the site is
   judged against. Decisions worth knowing:

   • ONE headline, ONE primary action, ONE secondary action. Not five
     buttons. The visitor's next step should be obvious without reading.
   • The headline is set from content/copy.ts and makes no promise — no
     superlative, no guarantee, nothing about visas, prices or outcomes.
     Replace the string there with the client-approved line; the layout,
     the line reveal and the responsive scale all continue to work.
   • Height is measured in svh, not vh, so mobile browser chrome cannot
     push the call to action below the fold.
   • The image is the LCP element: it is marked `priority`, so it loads
     eagerly at high fetch priority rather than being lazy-loaded.
   • The parallax travel is small and disabled under reduced motion.
   ========================================================================= */

/** Split so the line breaks are art-directed rather than left to the browser. */
function headlineLines(headline: string): string[] {
  const words = headline.trim().split(/\s+/);
  if (words.length <= 2) return [headline];
  const pivot = Math.ceil(words.length / 2);
  return [words.slice(0, pivot).join(' '), words.slice(pivot).join(' ')];
}

export function Hero() {
  const reduced = useReducedMotion();
  const lines = headlineLines(copy.hero.headline);

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink-950 pt-[4.5rem] lg:min-h-[100svh]">
      {/* Backdrop ---------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <Parallax distance={reduced ? 0 : 70} className="size-full">
          {/* A still, deliberately. The agency's film lives in its own
              section further down the homepage, where it can be watched
              with sound and without competing with the headline. */}
          <EditorialImage
            image={media.homeHero}
            aspect="auto"
            priority
            overlay="full"
            sizes="100vw"
            className="scale-[1.06]"
          />
        </Parallax>
      </div>

      {/* Content ----------------------------------------------------------- */}
      <Container width="wide" className="relative z-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="eyebrow mb-7 flex items-center gap-3 text-aegean-300"
          >
            <span aria-hidden="true" className="h-px w-10 bg-aegean-300/60" />
            {copy.hero.eyebrow}
          </motion.p>

          <LineReveal
            as="h1"
            immediate
            delay={0.2}
            lines={lines}
            className="font-display-tight text-display-xl text-porcelain-50"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT_EXPO }}
            className="mt-7 max-w-xl text-lead text-porcelain-100/88"
          >
            {copy.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              to="/booking"
              size="lg"
              variant="primary"
              onDark
              trailing={<ArrowUpRight className="size-4" strokeWidth={1.75} />}
            >
              {copy.hero.primaryCta}
            </Button>
            <Button to="/services" size="lg" variant="secondary" onDark>
              {copy.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint ------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="pointer-events-none absolute right-gutter bottom-8 z-20 hidden items-center gap-3 lg:flex"
      >
        <span className="eyebrow text-porcelain-200/72">{copy.hero.scrollHint}</span>
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-9 place-items-center rounded-full border border-white/20 text-porcelain-200/76"
        >
          <ArrowDown className="size-3.5" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
