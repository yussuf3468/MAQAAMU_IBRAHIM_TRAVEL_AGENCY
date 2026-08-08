import { Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { copy, getServiceBySlug, isDraftMode, resolved } from '@/content';
import { breadcrumbJsonLd, graphs, serviceJsonLd, useSeo } from '@/lib/seo';
import { clampDescription } from '@/lib/site-map';
import { Container, Section } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PendingMark } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PageHeader } from '@/components/sections/PageHeader';
import { FlightRoutes } from '@/components/sections/FlightRoutes';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   SERVICE DETAIL
   -------------------------------------------------------------------------
   The page a visitor lands on from search. It answers, in order: what is
   this, what do I get, is it for me, what happens next.

   A slug that does not exist — or a service that has not been confirmed in
   live mode — redirects to /services rather than rendering an empty shell.
   That is also what keeps a stale link from an old sitemap from turning
   into a soft 404.
   ========================================================================= */

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const isVisible = service && (isDraftMode || service.status === 'confirmed');

  const related = resolved.services.filter((item) => item.slug !== slug).slice(0, 3);

  useSeo({
    title: service?.title ?? 'Service',
    description: service ? clampDescription(service.summary) : '',
    path: `/services/${slug ?? ''}`,
    noIndex: !isVisible,
    jsonLd: service
      ? graphs(
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        )
      : [],
  });

  if (!isVisible || !service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <PageHeader
        variant="image"
        image={service.image}
        eyebrow={service.eyebrow}
        title={service.title}
        intro={service.summary}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button
            to="/booking"
            variant="primary"
            onDark
            trailing={<ArrowUpRight className="size-4" strokeWidth={1.75} />}
          >
            {copy.hero.primaryCta}
          </Button>
          <PendingMark record={service} onDark />
        </div>
      </PageHeader>

      <Section>
        <Container width="content">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {/* Description ------------------------------------------------ */}
            <Reveal>
              <div className="prose-editorial">
                {service.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {/* Included + audience ---------------------------------------- */}
            <div className="flex flex-col gap-12">
              {service.includes.length > 0 && (
                <Reveal>
                  <h2 className="font-display-tight text-display-sm text-ink-900">
                    {copy.services.detailIncludes}
                  </h2>
                  <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-4">
                        <Check
                          className="mt-1 size-4 shrink-0 text-aegean-700"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {service.audience.length > 0 && (
                <Reveal>
                  <h2 className="font-display-tight text-display-sm text-ink-900">
                    {copy.services.detailAudience}
                  </h2>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.audience.map((item) => (
                      <li
                        key={item}
                        className="rounded-[2px] border border-line bg-surface-raised px-3.5 py-2 text-[0.875rem] text-ink-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process ------------------------------------------------------------ */}
      {service.process.length > 0 && (
        <Section tone="sunk">
          <Container width="content">
            <Reveal>
              <h2 className="font-display-tight text-display-md text-ink-900">
                {copy.services.detailProcess}
              </h2>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {service.process.map((step, index) => (
                <RevealItem key={step.title} className="flex flex-col gap-4 border-t border-line pt-6">
                  <span className="flex items-center gap-3">
                    <span className="font-display-text text-small tabular-nums text-aegean-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon name={service.icon} className="size-4 text-ink-300" />
                  </span>
                  <h3 className="font-display-tight text-[1.25rem] leading-snug text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-700">{step.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* The full route list belongs on the ticketing page and nowhere else —
          it would be noise on the Umrah or cargo pages. */}
      {service.slug === 'air-ticketing' && <FlightRoutes tone="default" />}

      {/* Related ------------------------------------------------------------ */}
      {related.length > 0 && (
        <Section>
          <Container width="wide">
            <Reveal className="flex items-end justify-between gap-6">
              <h2 className="font-display-tight text-display-sm text-ink-900">Other services</h2>
              <Button
                to="/services"
                variant="ghost"
                trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
              >
                {copy.general.backToServices}
              </Button>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <RevealItem key={item.slug}>
                  <ServiceCard service={item} index={index} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
