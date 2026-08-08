import { CONTENT_MODE, copy, media, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section } from '@/components/ui/Layout';
import { PackageCard } from '@/components/cards/PackageCard';
import { PendingSection } from '@/components/ui/Pending';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   PACKAGES INDEX
   -------------------------------------------------------------------------
   Designed to work with or without prices — see PackageCard for why that
   matters. If the agency quotes per enquiry rather than selling fixed
   packages, switch the module off in src/content/modules.ts.
   ========================================================================= */

export default function Packages() {
  const route = findRoute('/packages', CONTENT_MODE);
  const items = resolved.packages;

  useSeo({
    title: route?.title ?? 'Travel packages',
    description: route?.description ?? '',
    path: '/packages',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Travel packages', path: '/packages' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        variant="image"
        image={media.packagesHeader}
        eyebrow={copy.packages.eyebrow}
        title={copy.packages.heading}
        intro={copy.packages.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Travel packages' }]}
      />

      <Section>
        <Container width="wide">
          {items.length === 0 ? (
            <>
              <p className="max-w-prose text-lead text-ink-700">{copy.packages.empty}</p>
              <div className="mt-10">
                <PendingSection title="Travel packages" file="src/content/packages.ts">
                  No package has been confirmed, and no price has been invented — priceNote stays
                  null until the agency gives a figure it is happy to publish, and the cards show
                  an enquiry prompt in its place.
                </PendingSection>
              </div>
            </>
          ) : (
            <RevealGroup
              stagger={0.08}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            >
              {items.map((item) => (
                <RevealItem key={item.slug} className="flex">
                  <PackageCard item={item} className="w-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
