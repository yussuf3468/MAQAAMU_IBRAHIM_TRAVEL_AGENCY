import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { contactChannels, isDraftMode, liveContactChannels } from '@/content';
import type { ContactChannelKind } from '@/content';
import { PendingChip } from '@/components/ui/Pending';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   CONTACT CHANNELS
   -------------------------------------------------------------------------
   Shared by the contact page and the enquiry page.

   A channel is rendered as a working link only when it is confirmed AND
   carries an href. Anything else shows as a marked, non-interactive slot
   in draft mode and is omitted entirely in production — because a "Call
   us" tile that does nothing when tapped costs more trust than a missing
   tile ever would.

   Each tile is a full-width tap target on mobile, well above the 44px
   minimum, with the value in a size that is readable at arm's length.
   ========================================================================= */

const icons: Record<ContactChannelKind, LucideIcon> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  address: MapPin,
  social: MapPin,
};

interface ContactChannelsProps {
  onDark?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

export function ContactChannels({
  onDark = false,
  className,
  columns = 3,
}: ContactChannelsProps) {
  // In draft mode show every declared channel so the layout can be reviewed;
  // in production show only the ones that actually work.
  const shown = isDraftMode ? contactChannels : liveContactChannels;
  if (shown.length === 0) return null;

  const grid =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <RevealGroup className={cn('grid gap-4', grid, className)}>
      {shown.map((channel) => {
        const Glyph = icons[channel.kind];
        const isLive = Boolean(channel.href) && channel.status === 'confirmed';

        const inner = (
          <>
            <span
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                onDark
                  ? 'border-white/15 bg-white/[0.04] text-aegean-300 group-hover:border-white/30'
                  : 'border-line bg-white text-aegean-700 group-hover:border-aegean-500/40',
              )}
            >
              <Glyph className="size-[1.0625rem]" strokeWidth={1.5} aria-hidden="true" />
            </span>

            <span className="flex min-w-0 flex-col gap-1">
              <span
                className={cn(
                  'eyebrow',
                  onDark ? 'text-porcelain-200/72' : 'text-ink-500',
                )}
              >
                {channel.label}
              </span>

              {isLive ? (
                <span
                  className={cn(
                    // The agency's email is 38 characters. It wraps rather
                    // than truncating — half an email address is useless,
                    // and `wrap-break-word` keeps it inside the tile at 320px.
                    'text-[1.0625rem] font-medium wrap-break-word',
                    onDark ? 'text-porcelain-50' : 'text-ink-900',
                  )}
                >
                  {channel.value}
                </span>
              ) : (
                <PendingChip onDark={onDark} className="mt-0.5 self-start" />
              )}

              {channel.note && isLive && (
                <span className={cn('text-small', onDark ? 'text-porcelain-200/72' : 'text-ink-600')}>
                  {channel.note}
                </span>
              )}
            </span>
          </>
        );

        const shell = cn(
          'group flex items-start gap-4 rounded-[3px] border p-5 transition-[border-color,background-color] duration-300',
          onDark
            ? 'border-white/10 bg-white/[0.02] hover:border-white/25'
            : 'border-line bg-surface-raised hover:border-line-strong',
          !isLive && 'opacity-90',
        );

        if (!isLive) {
          return (
            <RevealItem
              key={`${channel.kind}-${channel.label}`}
              // The email address is 38 characters. On its own it wraps to
              // two lines mid-word in a third-of-a-row tile, so it takes a
              // wider cell instead — phones on one row, email beneath.
              className={cn('min-w-0', channel.kind === 'email' && columns === 3 && 'sm:col-span-2')}
            >
              <div className={shell}>{inner}</div>
            </RevealItem>
          );
        }

        return (
          <RevealItem
            key={`${channel.kind}-${channel.label}`}
            className={cn('min-w-0', channel.kind === 'email' && columns === 3 && 'sm:col-span-2')}
          >
            <a
              href={channel.href as string}
              {...(channel.kind === 'whatsapp'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={shell}
            >
              {inner}
            </a>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
