import { CONTENT_MODE } from '@/content';
import { findRoute } from '@/lib/site-map';
import { graphs, organizationJsonLd, useSeo, websiteJsonLd } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { IntroBand } from '@/components/sections/IntroBand';
import { FilmSection } from '@/components/sections/FilmSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { PackagesPreview } from '@/components/sections/PackagesPreview';
import { TrustBand } from '@/components/sections/TrustBand';
import { DestinationsPreview } from '@/components/sections/DestinationsPreview';
import { FlightRoutes } from '@/components/sections/FlightRoutes';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   HOME
   -------------------------------------------------------------------------
   The order is the argument the page makes:

     Hero          what this is, and the one thing to do next
     Intro         slow down, establish voice
     Services      what the agency actually does
     Packages      the most concrete thing on the site — real prices, real
                   dates, and exactly what each departure covers
     Trust         why this agency, without invented numbers
     Destinations  Makkah and Madinah, the visual payoff
     Routes        where they ticket to, as a scannable list
     Testimonials  proof, only when real (empty until the client supplies)
     CTA           the ask, repeated for anyone who read to the bottom

   Every section removes itself when it has no confirmed content, so this
   page stays coherent at any stage of the content handover.
   ========================================================================= */

export default function Home() {
  const route = findRoute('/', CONTENT_MODE);

  useSeo({
    title: route?.title ?? 'Home',
    description: route?.description ?? '',
    path: '/',
    jsonLd: graphs(organizationJsonLd(), websiteJsonLd()),
  });

  return (
    <>
      <Hero />
      <IntroBand />
      {/* Renders nothing until the client's film is added to content/media.ts. */}
      <FilmSection />
      <ServicesPreview />
      <PackagesPreview />
      <TrustBand />
      <DestinationsPreview />
      <FlightRoutes />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
