import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Send } from 'lucide-react';
import { cn } from '@/lib/cn';
import { liveContactChannels } from '@/content';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { useScrollDirection, useScrolled } from '@/lib/hooks';

/* =========================================================================
   MOBILE ACTION BAR
   -------------------------------------------------------------------------
   The single most commercially important element on a phone: on this kind
   of site most visitors arrive on mobile, and the ones who are ready to
   act should never have to scroll to find out how.

   Rules it follows:
     • Always within thumb reach, pinned to the bottom edge.
     • Respects the iOS home indicator via env(safe-area-inset-bottom).
     • Appears once the visitor has scrolled past the hero, so it does not
       cover the first impression, and slides away while they scroll up
       to read.
     • Renders ONLY channels that are confirmed and have a working href.
       A dead "Call us" button is worse than no button, so until the client
       supplies their number the bar falls back to the enquiry link — which
       always works.
     • Hidden on /booking, where the page itself is the action.
   ========================================================================= */

export function MobileActionBar() {
  const location = useLocation();
  const scrolled = useScrolled(520);
  const direction = useScrollDirection();

  if (location.pathname === '/booking') return null;

  const phone = liveContactChannels.find((c) => c.kind === 'phone' && c.href);
  const whatsapp = liveContactChannels.find((c) => c.kind === 'whatsapp' && c.href);

  const visible = scrolled && direction !== 'up';

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        'border-t border-line bg-surface/95 backdrop-blur-md pb-safe',
        !visible && 'pointer-events-none',
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-stretch gap-2 px-3 py-3">
        {whatsapp?.href && (
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[2px] border border-line-strong bg-white text-[0.875rem] font-medium text-ink-900 transition-colors duration-200 active:bg-porcelain-100"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            WhatsApp
          </a>
        )}

        {phone?.href && (
          <a
            href={phone.href}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[2px] border border-line-strong bg-white text-[0.875rem] font-medium text-ink-900 transition-colors duration-200 active:bg-porcelain-100"
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Call
          </a>
        )}

        <Link
          to="/booking"
          className={cn(
            'flex h-12 items-center justify-center gap-2 rounded-[2px] bg-ink-950 px-6',
            'text-[0.875rem] font-medium text-porcelain-50 transition-colors duration-200 active:bg-ink-800',
            !phone && !whatsapp && 'flex-1',
          )}
        >
          <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Plan your journey
        </Link>
      </div>
    </motion.div>
  );
}
