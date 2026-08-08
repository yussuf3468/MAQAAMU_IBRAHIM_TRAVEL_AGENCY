import { copy, isDraftMode, isModuleEnabled, resolved } from '@/content';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { PendingMark } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   TESTIMONIALS
   -------------------------------------------------------------------------
   READ src/content/testimonials.ts BEFORE TOUCHING THIS.

   The component is built and finished, and it renders nothing at all until
   a real, permissioned testimonial exists. In draft mode one marked
   skeleton stands in so the section can be reviewed in layout; the publish
   filter removes it in live mode, so a fabricated quote cannot reach
   production even by mistake.

   Attributing words to a traveller who never said them is the one failure
   on this site that would be worth more than the whole project.
   ========================================================================= */

export function Testimonials() {
  if (!isModuleEnabled('testimonials')) return null;

  const items = resolved.testimonials;
  // Nothing real and not in draft → the section does not exist.
  if (items.length === 0) return null;

  return (
    <Section>
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={copy.testimonials.eyebrow}
            heading={copy.testimonials.heading}
            size="md"
          />
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((testimonial, index) => (
            <RevealItem
              key={`${testimonial.author}-${index}`}
              as="figure"
              className="flex flex-col gap-6 border-t border-line pt-8"
            >
              <blockquote className="font-display-text text-[1.125rem] leading-relaxed text-balance text-ink-800">
                <span aria-hidden="true" className="text-aegean-500">
                  “
                </span>
                {testimonial.quote}
                <span aria-hidden="true" className="text-aegean-500">
                  ”
                </span>
              </blockquote>

              <figcaption className="mt-auto flex flex-col gap-1.5">
                <span className="text-[0.9375rem] font-medium text-ink-900">
                  {testimonial.author}
                </span>
                {testimonial.context && (
                  <span className="text-small text-ink-600">{testimonial.context}</span>
                )}
                <PendingMark record={testimonial} className="mt-2 self-start" />
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>

        {isDraftMode && (
          <p className="mt-10 max-w-prose text-small text-ink-600">
            Real testimonials only. Collect them in writing with permission to publish, add them to
            <span className="font-mono"> src/content/testimonials.ts</span>, and mark each one
            confirmed. Until then this section is empty in production.
          </p>
        )}
      </Container>
    </Section>
  );
}
