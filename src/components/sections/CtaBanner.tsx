import { ArrowUpRight } from 'lucide-react';
import { copy, media } from '@/content';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Reveal } from '@/components/motion/Reveal';

/* =========================================================================
   CLOSING CALL TO ACTION
   -------------------------------------------------------------------------
   Appears at the foot of every page. A visitor who has read to the bottom
   is the most likely to act, and should not have to scroll back up or hunt
   through the footer to do it.

   Two actions, ranked: the enquiry is the ask, contact is the alternative
   for someone who would rather speak to a person first.
   ========================================================================= */

export function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div className="absolute inset-0 -z-10">
        <EditorialImage
          image={media.homeInvitation}
          aspect="auto"
          overlay="full"
          sizes="100vw"
          className="size-full"
        />
      </div>

      <Container width="wide" className="relative z-20 py-section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3 text-aegean-300">
            <span aria-hidden="true" className="h-px w-8 bg-aegean-300/60" />
            {copy.cta.eyebrow}
          </p>

          <h2 className="font-display-tight text-display-lg text-balance text-porcelain-50">
            {copy.cta.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-md text-lead text-porcelain-100/86">{copy.cta.body}</p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              to="/booking"
              size="lg"
              variant="primary"
              onDark
              trailing={<ArrowUpRight className="size-4" strokeWidth={1.75} />}
            >
              {copy.cta.primary}
            </Button>
            <Button to="/contact" size="lg" variant="secondary" onDark>
              {copy.cta.secondary}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
