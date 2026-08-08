import { Suspense, useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { copy } from '@/content';
import { pageVariants } from '@/lib/motion';
import { useReducedMotion } from '@/lib/hooks';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';

/* =========================================================================
   SITE LAYOUT
   -------------------------------------------------------------------------
   Owns everything that persists across routes: the header, the footer, the
   mobile action bar, scroll restoration, and the page transition.

   The transition is intentionally short (340ms in, 180ms out). A long
   cross-fade on navigation feels expensive for one visit and broken by the
   third — the user is waiting for content, not watching an animation.

   The skip link is the first focusable element on the page, as required for
   keyboard users to bypass the navigation.
   ========================================================================= */

function RouteAnnouncer() {
  const location = useLocation();

  // A single-page app does not announce navigation on its own; without this
  // a screen-reader user gets no signal that the page changed.
  useEffect(() => {
    const node = document.getElementById('route-announcer');
    if (node) node.textContent = document.title;
  }, [location.pathname]);

  return (
    <div
      id="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">{copy.general.loading}</span>
      <span
        aria-hidden="true"
        className="size-1.5 animate-pulse rounded-full bg-aegean-500/60"
      />
    </div>
  );
}

export function SiteLayout() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only-focusable fixed top-4 left-4 z-[80] rounded-[2px] bg-ink-950 px-5 py-3 text-[0.875rem] font-medium text-porcelain-50"
      >
        {copy.general.skipToContent}
      </a>

      <Header />

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={reduced ? undefined : pageVariants}
            initial={reduced ? false : 'initial'}
            animate={reduced ? undefined : 'animate'}
            exit={reduced ? undefined : 'exit'}
          >
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileActionBar />

      <ScrollRestoration
        getKey={(location_) => location_.pathname}
      />
      <RouteAnnouncer />
    </div>
  );
}
