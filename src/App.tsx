import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { modules } from '@/content';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { RouteError } from '@/components/layout/RouteError';
import Home from '@/pages/Home';

/* =========================================================================
   ROUTER
   -------------------------------------------------------------------------
   Home is imported directly — it is the landing page for most visits, and
   putting it behind a lazy boundary would add a round trip to the very
   first paint. Every other route is code-split, so a visitor who only
   reads the homepage never downloads the enquiry form or the FAQ.

   The optional modules are registered conditionally. Turning `destinations`
   off in the content layer does not leave an orphan route behind that
   Google could still index: the route ceases to exist, and the sitemap,
   which is generated from the same source, stops listing it.

   A data router is used so <ScrollRestoration> works — without it a visitor
   who navigates back from a service page lands at the top instead of where
   they were reading.
   ========================================================================= */

const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Destinations = lazy(() => import('@/pages/Destinations'));
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail'));
const Packages = lazy(() => import('@/pages/Packages'));
const PackageDetail = lazy(() => import('@/pages/PackageDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const Booking = lazy(() => import('@/pages/Booking'));
const Faq = lazy(() => import('@/pages/Faq'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const children: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
  { path: 'services', element: <Services /> },
  { path: 'services/:slug', element: <ServiceDetail /> },
];

if (modules.destinations) {
  children.push(
    { path: 'destinations', element: <Destinations /> },
    { path: 'destinations/:slug', element: <DestinationDetail /> },
  );
}

if (modules.packages) {
  children.push(
    { path: 'packages', element: <Packages /> },
    { path: 'packages/:slug', element: <PackageDetail /> },
  );
}

if (modules.faq) {
  children.push({ path: 'faq', element: <Faq /> });
}

if (modules.booking) {
  children.push({ path: 'booking', element: <Booking /> });
}

children.push({ path: 'contact', element: <Contact /> }, { path: '*', element: <NotFound /> });

const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    errorElement: <RouteError />,
    children,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
