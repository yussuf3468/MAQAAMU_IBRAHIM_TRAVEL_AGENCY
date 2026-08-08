import { MessageCircle, Phone } from 'lucide-react';
import { CONTENT_MODE, copy, findLiveChannel, isDraftMode, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { PendingChip } from '@/components/ui/Pending';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactChannels } from '@/components/sections/ContactChannels';
import { OfficeMap } from '@/components/sections/OfficeMap';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/* =========================================================================
   CONTACT
   -------------------------------------------------------------------------
   Uses the plain page header rather than a photograph: someone who has
   navigated here wants a phone number, not a picture of an aeroplane.

   Channels come first, on the assumption that most visitors would rather
   call or message than fill in a form. The form is offered underneath for
   people who prefer to write, and for anyone arriving outside office hours.
   ========================================================================= */

export default function Contact() {
  const route = findRoute('/contact', CONTENT_MODE);
  const address = resolved.address;
  const hours = resolved.openingHours;

  const hasAddress =
    address?.status === 'confirmed' &&
    Boolean(address.streetAddress || address.locality || address.country);

  const whatsapp = findLiveChannel('whatsapp');
  const phone = findLiveChannel('phone');

  // The address lines themselves are rendered by <OfficeMap>, which owns
  // both the written address and the map beside it.
  const confirmedHours = hours.filter((entry) => entry.status === 'confirmed');

  useSeo({
    title: route?.title ?? 'Contact',
    description: route?.description ?? '',
    path: '/contact',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        eyebrow={copy.contact.eyebrow}
        title={copy.contact.heading}
        intro={copy.contact.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      >
        {/* The two actions people actually came for, above the fold, before
            any of the page below has to be read. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {whatsapp?.href && (
            <Button
              href={whatsapp.href}
              size="lg"
              variant="primary"
              leading={<MessageCircle className="size-4" strokeWidth={1.5} />}
            >
              Message on WhatsApp
            </Button>
          )}
          {phone?.href && (
            <Button
              href={phone.href}
              size="lg"
              variant="secondary"
              leading={<Phone className="size-4" strokeWidth={1.5} />}
            >
              {phone.value}
            </Button>
          )}
        </div>
      </PageHeader>

      <Section size="sm">
        <Container width="wide">
          <ContactChannels columns={3} />
        </Container>
      </Section>

      <Section size="sm" tone="sunk">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Visit ------------------------------------------------------- */}
            <Reveal className="flex flex-col gap-6">
              <h2 className="font-display-tight text-display-sm text-ink-900">
                {copy.contact.visitHeading}
              </h2>

              {hasAddress ? (
                <OfficeMap />
              ) : (
                <div className="flex flex-col gap-3">
                  <PendingChip>Office address</PendingChip>
                  {isDraftMode && (
                    <p className="max-w-md text-small leading-relaxed text-ink-600">
                      Add the office address and the Google Maps link in
                      <span className="font-mono"> src/content/contact.ts</span>. Nothing is shown
                      here — and no address appears in the structured data — until it is confirmed.
                    </p>
                  )}
                </div>
              )}
            </Reveal>

            {/* Hours ------------------------------------------------------- */}
            <Reveal className="flex flex-col gap-6">
              <h2 className="font-display-tight text-display-sm text-ink-900">
                {copy.contact.hoursHeading}
              </h2>

              {confirmedHours.length > 0 ? (
                <dl className="flex flex-col divide-y divide-line border-y border-line">
                  {confirmedHours.map((entry) => (
                    <div
                      key={entry.label}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <dt className="text-[0.9375rem] text-ink-700">{entry.label}</dt>
                      <dd className="text-[0.9375rem] tabular-nums text-ink-900">
                        {entry.closed || !entry.opens || !entry.closes
                          ? 'Closed'
                          : `${entry.opens} – ${entry.closes}`}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="flex flex-col gap-3">
                  <PendingChip>Opening hours</PendingChip>
                  {isDraftMode && (
                    <p className="max-w-md text-small leading-relaxed text-ink-600">
                      Add the agency’s hours in
                      <span className="font-mono"> src/content/contact.ts</span>. They feed both
                      this table and the opening-hours structured data.
                    </p>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Enquiry ------------------------------------------------------------ */}
      <Section>
        <Container width="content">
          <Reveal>
            <SectionHeading
              eyebrow="Or write to us"
              heading="Send an enquiry"
              intro="If it is easier to write than to call, this reaches the same people."
            />
          </Reveal>
          <EnquiryForm className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
