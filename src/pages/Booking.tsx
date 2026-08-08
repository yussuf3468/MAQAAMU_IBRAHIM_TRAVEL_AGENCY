import { CONTENT_MODE, copy } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section } from '@/components/ui/Layout';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactChannels } from '@/components/sections/ContactChannels';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/* =========================================================================
   PLAN YOUR JOURNEY  (/booking)
   -------------------------------------------------------------------------
   An ENQUIRY, not a booking engine. Nothing is charged, no seat is held
   and no availability is claimed anywhere on this page — the wording says
   so plainly, because a page that implies instant confirmation and then
   sends an email is the fastest way to lose a customer's trust.

   If the agency later wants real-time booking, that is a separate project
   with payment, inventory and cancellation obligations attached. It is not
   built speculatively here.

   The direct channels sit beside the form: someone who would rather just
   call should never be forced through a form to find the number.
   ========================================================================= */

export default function Booking() {
  const route = findRoute('/booking', CONTENT_MODE);

  useSeo({
    title: route?.title ?? 'Plan your journey',
    description: route?.description ?? '',
    path: '/booking',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Plan your journey', path: '/booking' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        eyebrow={copy.booking.eyebrow}
        title={copy.booking.heading}
        intro={copy.booking.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Plan your journey' }]}
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <div>
              <EnquiryForm />
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <h2 className="font-display-tight text-display-sm text-ink-900">
                  Rather speak to someone?
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                  Call or message the office directly — you will reach a person, not a queue.
                </p>
              </Reveal>

              <ContactChannels columns={1} />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
