import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CONTENT_MODE, copy, liveContactChannels } from '@/content';
import { primaryNav } from '@/lib/site-map';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { useEscapeKey, useFocusTrap, useScrollLock, useScrolled } from '@/lib/hooks';
import { Button } from '@/components/ui/Button';
import { Wordmark } from './Wordmark';

/* =========================================================================
   HEADER
   -------------------------------------------------------------------------
   Behaviour:
     • Transparent over the hero, then settles into a solid bar once the
       page scrolls. On every route except the homepage it starts solid,
       because there is no hero image to sit over.
     • The mobile panel is a full-screen sheet, not a cramped dropdown. It
       traps focus, closes on Escape, closes on navigation, and locks the
       body scroll behind it.
     • One call to action, never a row of competing buttons.

   The navigation is derived from lib/site-map.ts, so a module switched off
   in the content layer disappears from here without an edit.
   ========================================================================= */

/**
 * Routes whose page begins with a full-bleed dark image — the homepage
 * hero, and every <PageHeader variant="image">. The header sits inside
 * that image rather than on a bar above it, so the band reads as one
 * picture. Keep this in step with the `variant` passed in each page.
 */
const DARK_HERO_ROUTES = /^\/(about|services|destinations|packages)(\/|$)/;

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(16);
  const isHome = location.pathname === '/';
  const hasDarkHero = isHome || DARK_HERO_ROUTES.test(location.pathname);
  const nav = primaryNav(CONTENT_MODE);

  const panelRef = useFocusTrap<HTMLDivElement>(open);
  useScrollLock(open);
  useEscapeKey(() => setOpen(false), open);

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const transparent = hasDarkHero && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]',
          'duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-line/80 bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/75',
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[92rem] items-center justify-between px-gutter lg:h-20">
          <Wordmark onDark={transparent} size="md" />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'relative py-1 text-[0.875rem] font-medium tracking-[-0.005em] transition-colors duration-200',
                    transparent
                      ? 'text-porcelain-100/90 hover:text-white'
                      : 'text-ink-700 hover:text-ink-950',
                    isActive && (transparent ? 'text-white' : 'text-ink-950'),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300',
                        'ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                        transparent ? 'bg-aegean-300' : 'bg-aegean-500',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-3">
            {/* The CTA is hidden on the narrowest phones via a WRAPPER rather
                than a `hidden` class on the Button itself. <Button> always
                carries `inline-flex`, and two display utilities on one
                element resolve by stylesheet order, not by the order they
                are written — which had the button rendering at 320px and
                pushing the header 26px past the viewport. */}
            <div className="hidden sm:block">
              <Button
                to="/booking"
                size="sm"
                variant={transparent ? 'secondary' : 'primary'}
                onDark={transparent}
                trailing={<ArrowUpRight className="size-3.5" strokeWidth={1.75} />}
              >
                {copy.hero.primaryCta}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={copy.general.menu}
              aria-expanded={open}
              className={cn(
                'grid size-11 place-items-center rounded-[2px] transition-colors duration-200 lg:hidden',
                transparent ? 'text-porcelain-50 hover:bg-white/10' : 'text-ink-900 hover:bg-ink-950/5',
              )}
            >
              <span className="flex flex-col items-end gap-[5px]" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.general.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950 text-porcelain-50 lg:hidden"
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-gutter">
              <Wordmark onDark size="md" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.general.close}
                className="grid size-11 place-items-center rounded-[2px] text-porcelain-50 transition-colors duration-200 hover:bg-white/10"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Primary"
              className="flex-1 overflow-y-auto overscroll-contain px-gutter pt-6 pb-10"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } } }}
                className="flex flex-col"
              >
                {[{ to: '/', label: 'Home' }, ...nav].map((item) => (
                  <motion.li
                    key={item.to}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="border-b border-white/10"
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between py-5 font-display-tight text-[1.75rem] leading-none',
                          'transition-colors duration-200',
                          isActive ? 'text-aegean-300' : 'text-porcelain-50 hover:text-aegean-200',
                        )
                      }
                    >
                      {item.label}
                      <ArrowUpRight
                        className="size-5 opacity-40"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-9 flex flex-col gap-3">
                <Button to="/booking" size="lg" variant="primary" onDark fullWidth>
                  {copy.hero.primaryCta}
                </Button>

                {liveContactChannels
                  .filter((channel) => channel.primary && channel.href)
                  .map((channel) => (
                    <Button
                      key={channel.kind}
                      href={channel.href as string}
                      size="lg"
                      variant="secondary"
                      onDark
                      fullWidth
                    >
                      {channel.label}
                    </Button>
                  ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
