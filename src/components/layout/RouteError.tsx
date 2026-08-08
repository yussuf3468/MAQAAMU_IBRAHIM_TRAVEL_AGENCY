import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';

/* =========================================================================
   ROUTE ERROR BOUNDARY
   -------------------------------------------------------------------------
   Catches a failed lazy chunk or a thrown render error so a visitor never
   sees a blank white page. It stays inside the brand, offers a way out,
   and shows the underlying message only during development — a production
   visitor gets no stack trace, and no internal detail leaks into the page.
   ========================================================================= */

export function RouteError() {
  const error = useRouteError();

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : null;

  return (
    <section className="flex min-h-dvh items-center bg-surface">
      <Container width="content">
        <p className="eyebrow flex items-center gap-3 text-aegean-700">
          <span aria-hidden="true" className="h-px w-8 bg-aegean-500/50" />
          Something went wrong
        </p>

        <h1 className="mt-6 max-w-2xl font-display-tight text-display-lg text-balance text-ink-900">
          This page could not be loaded.
        </h1>

        <p className="mt-6 max-w-md text-lead text-ink-700">
          Please try again. If it keeps happening, get in touch and we will help you directly.
        </p>

        {import.meta.env.DEV && detail && (
          <pre className="mt-8 max-w-2xl overflow-x-auto border border-line bg-porcelain-100 p-4 font-mono text-[0.8125rem] text-ink-700">
            {detail}
          </pre>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Return home
          </Button>
          <Button to="/contact" size="lg" variant="secondary">
            Contact the agency
          </Button>
        </div>
      </Container>
    </section>
  );
}
