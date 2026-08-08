import { ArrowUpRight } from 'lucide-react';
import { copy, media } from '@/content';
import { Container, Eyebrow, Section } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Reveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';

/* =========================================================================
   INTRO BAND
   -------------------------------------------------------------------------
   The first thing after the hero. Its job is to slow the page down: one
   statement, one picture, one link onward.

   The asymmetric column split and the image that runs past the container
   edge are what stop this reading as a template. Note the deliberate
   restraint — no card, no border, no shadow. Type and photography only.
   ========================================================================= */

export function IntroBand() {
  return (
    <Section className="overflow-hidden">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <Eyebrow>{copy.intro.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display-tight text-display-md text-balance text-ink-900">
              {copy.intro.heading}
            </h2>
            <p className="mt-7 max-w-lg text-lead text-ink-700">{copy.intro.body}</p>
            <Button
              to="/about"
              variant="ghost"
              className="mt-8"
              trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
            >
              {copy.intro.cta}
            </Button>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            {/* Runs to the viewport edge on large screens — the picture is
                the point, so it is not politely contained. */}
            <Parallax distance={44} className="lg:-mr-[max(0px,calc((100vw-var(--container-wide))/2+var(--spacing-gutter)))]">
              <EditorialImage
                image={media.homeIntro}
                aspect="5/4"
                mobileAspect="4/5"
                sizes="(min-width: 1024px) 55vw, 92vw"
                className="scale-105"
              />
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
