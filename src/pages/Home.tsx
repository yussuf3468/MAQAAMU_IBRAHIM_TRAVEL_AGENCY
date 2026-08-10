import { CONTENT_MODE } from '@/content';
import { findRoute } from '@/lib/site-map';
import { graphs, organizationJsonLd, useSeo, websiteJsonLd } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
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

     Hero          a travel agency in Nairobi, and the one thing to do next
     Services      ALL NINE, immediately — flights, cargo, visas, hotels,
                   Hajj, Umrah and the rest. A visitor sees the whole range
                   before they scroll.
     Routes        where they actually fly: 16 countries and most of Kenya
     Packages      Umrah 2026 with real prices and dates — the flagship
                   product, given its own band rather than the whole site
     Trust         how they work, without invented numbers
     Destinations  Makkah and Madinah, in a pilgrimage context
     Film          a word from the office
     Testimonials  proof, only when real (empty until the client supplies)
     CTA           the ask, repeated for anyone who read to the bottom

   WHY THIS ORDER. The first version opened with a slow editorial band and
   put three featured services a third of the way down; the agency's
   reaction was that it read as a Hajj and Umrah specialist and did not
   highlight what a travel agency needs to. Breadth now comes first and the
   pilgrimage work is presented as the flagship it is, not as the identity
   of the whole business.

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
      <ServicesPreview />
      <FlightRoutes />
      <PackagesPreview />
      <TrustBand />
      <DestinationsPreview />
      {/* Renders nothing until a film is set in content/media.ts. */}
      <FilmSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
