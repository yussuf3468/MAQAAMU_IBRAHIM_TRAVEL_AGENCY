import { copy } from '@/content';
import { useSeo } from '@/lib/seo';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { primaryNav } from '@/lib/site-map';
import { CONTENT_MODE } from '@/content';
import { Link } from 'react-router-dom';

/* =========================================================================
   404
   -------------------------------------------------------------------------
   noindex, and it offers a way onward rather than apologising. The route
   list is included so a visitor who followed a broken link — or a stale
   sitemap entry after a slug change — can still find what they came for.
   ========================================================================= */

export default function NotFound() {
  const nav = primaryNav(CONTENT_MODE);

  useSeo({
    title: 'Page not found',
    description: copy.notFound.body,
    path: '/404',
    noIndex: true,
  });

  return (
    <section className="flex min-h-[78svh] items-center bg-surface pt-[4.5rem]">
      <Container width="content">
        <p className="eyebrow flex items-center gap-3 text-aegean-700">
          <span aria-hidden="true" className="h-px w-8 bg-aegean-500/50" />
          Error 404
        </p>

        <h1 className="mt-6 max-w-2xl font-display-tight text-display-lg text-balance text-ink-900">
          {copy.notFound.heading}
        </h1>

        <p className="mt-6 max-w-md text-lead text-ink-700">{copy.notFound.body}</p>

        <div className="mt-10">
          <Button to="/" size="lg">
            {copy.notFound.cta}
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-16 border-t border-line pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-block py-1 text-[0.9375rem] text-ink-700 transition-colors duration-200 hover:text-ink-950"
                >
                  <span className="link-underline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
