import { ArrowUpRight } from 'lucide-react';
import { copy, isModuleEnabled, resolved } from '@/content';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { PackageCard } from '@/components/cards/PackageCard';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   PACKAGES PREVIEW (homepage)
   -------------------------------------------------------------------------
   The agency's Umrah departures are the most concrete thing on the site —
   a real price, real dates and a precise list of what is and is not
   covered — so they belong on the homepage rather than only on /packages.

   All three are shown rather than only the featured two: with a set of
   dated departures, a visitor wants to see the whole set at once and pick
   the one that fits their dates.
   ========================================================================= */

export function PackagesPreview() {
  if (!isModuleEnabled('packages')) return null;

  const items = resolved.packages;
  if (items.length === 0) return null;

  return (
    <Section tone="sunk">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={copy.packages.eyebrow}
            heading={copy.packages.heading}
            intro={copy.packages.intro}
            size="lg"
            aside={
              <Button
                to="/packages"
                variant="ghost"
                trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
              >
                All packages
              </Button>
            }
          />
        </Reveal>

        <RevealGroup
          stagger={0.09}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {items.map((item) => (
            <RevealItem key={item.slug} className="flex">
              <PackageCard item={item} className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Prices and dates are commercial commitments printed on the
            agency's own flyers. This line exists so a visitor reading an
            out-of-date page still calls rather than assuming. */}
        <Reveal>
          <p className="mt-8 text-small text-ink-600">
            Prices are per person. Departures are limited — confirm availability with the office
            before making arrangements.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
