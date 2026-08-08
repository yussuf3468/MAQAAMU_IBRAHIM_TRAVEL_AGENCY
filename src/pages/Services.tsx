import { CONTENT_MODE, copy, media, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section } from '@/components/ui/Layout';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PendingSection } from '@/components/ui/Pending';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   SERVICES INDEX
   -------------------------------------------------------------------------
   A numbered editorial list rather than a grid of cards. With an unknown
   number of services — four tonight, nine next month — a list stays
   scannable and never leaves an orphan card on a row of three.
   ========================================================================= */

export default function Services() {
  const route = findRoute('/services', CONTENT_MODE);
  const services = resolved.services;

  useSeo({
    title: route?.title ?? 'Services',
    description: route?.description ?? '',
    path: '/services',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        variant="image"
        image={media.servicesHeader}
        eyebrow={copy.services.eyebrow}
        title={copy.services.heading}
        intro={copy.services.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <Section>
        <Container width="content">
          {services.length === 0 ? (
            <>
              <p className="max-w-prose text-lead text-ink-700">{copy.services.empty}</p>
              <div className="mt-10">
                <PendingSection title="Services" file="src/content/services.ts">
                  Add each service the agency offers, with a summary, what is included, who it is
                  for and how it works. Every service automatically gets its own page, a homepage
                  card, a sitemap entry and an option in the enquiry form.
                </PendingSection>
              </div>
            </>
          ) : (
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {services.map((service, index) => (
                <Reveal key={service.slug}>
                  <ServiceCard service={service} variant="index" index={index} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
