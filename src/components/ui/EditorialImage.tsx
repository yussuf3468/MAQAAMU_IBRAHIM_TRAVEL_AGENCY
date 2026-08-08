import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { placeholderArt } from '@/lib/placeholder-art';
import { resolveImage } from '@/lib/image-registry';
import { showPlaceholderMarkers } from '@/content';
import type { ImageRef } from '@/content';

/* =========================================================================
   EDITORIAL IMAGE
   -------------------------------------------------------------------------
   The only way an image reaches the page. It guarantees, for every image
   on the site:

     • a reserved aspect ratio, so nothing shifts as pictures load (CLS)
     • lazy loading and async decoding by default; `priority` opts the LCP
       image out of both
     • a tone-matched backdrop behind the photograph, so it fades in from
       a colour rather than popping against white
     • alt text that is either descriptive or explicitly empty for
       decorative art — never a filename
     • a composed abstract while the client's photography is outstanding,
       clearly marked in draft mode

   Overlays are handled here too, so white text over a picture always has
   the same guaranteed contrast treatment.
   ========================================================================= */

type Overlay = 'none' | 'bottom' | 'full';

interface EditorialImageProps {
  image: ImageRef;
  /** CSS aspect ratio, e.g. '16/9', '4/5'. Use `auto` to fill the parent. */
  aspect?: string | 'auto';
  /** Aspect ratio applied below the `sm` breakpoint, for tall mobile crops. */
  mobileAspect?: string;
  /** The LCP image. Loads eagerly at high priority. Use once per page. */
  priority?: boolean;
  overlay?: Overlay;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  /** Content laid over the image, e.g. a caption or a heading. */
  children?: ReactNode;
  /** Slow zoom on hover, for cards that link somewhere. */
  hoverZoom?: boolean;
  rounded?: boolean;
}

const focalToPosition: Record<NonNullable<ImageRef['focal']>, string> = {
  center: 'center',
  top: 'center top',
  bottom: 'center bottom',
  left: 'left center',
  right: 'right center',
};

export function EditorialImage({
  image,
  aspect = '3/2',
  mobileAspect,
  priority = false,
  overlay = 'none',
  sizes = '100vw',
  className,
  imageClassName,
  children,
  hoverZoom = false,
  rounded = false,
}: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);
  const art = placeholderArt(image.slot, image.tone);

  // An explicit `src` in the content layer wins; otherwise a photograph
  // named after this slot in src/assets/images/ is picked up automatically.
  // See lib/image-registry.ts.
  const source = image.src ?? resolveImage(image.slot);
  const hasPhoto = Boolean(source);

  const style: CSSProperties = {
    backgroundColor: art.backgroundColor,
    ...(hasPhoto ? {} : { backgroundImage: art.backgroundImage }),
    ...(aspect !== 'auto'
      ? ({
          '--aspect-base': aspect,
          ...(mobileAspect ? { '--aspect-mobile': mobileAspect } : {}),
        } as CSSProperties)
      : {}),
  };

  return (
    <figure
      className={cn(
        'group/img relative isolate overflow-hidden grain',
        rounded && 'rounded-[3px]',
        aspect === 'auto' ? 'h-full w-full' : 'aspect-responsive',
        className,
      )}
      style={style}
    >
      {hasPhoto && (
        <img
          src={source ?? undefined}
          srcSet={image.srcSet ?? undefined}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 size-full object-cover',
            'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            loaded ? 'opacity-100' : 'opacity-0',
            hoverZoom && 'group-hover/img:scale-[1.04] motion-reduce:group-hover/img:scale-100',
            imageClassName,
          )}
          style={{ objectPosition: focalToPosition[image.focal ?? 'center'] }}
        />
      )}

      {overlay === 'bottom' && (
        <div aria-hidden="true" className="absolute inset-0 z-10 scrim-bottom" />
      )}
      {overlay === 'full' && (
        <div aria-hidden="true" className="absolute inset-0 z-10 scrim-full" />
      )}

      {!hasPhoto && showPlaceholderMarkers && (
        <span
          className={cn(
            // Bottom-left, not top-left: full-bleed page headers sit under
            // the fixed header, and a top-aligned marker collided with the
            // wordmark on every image-led route.
            'absolute bottom-3 left-3 z-20 rounded-[2px] border border-white/25 bg-black/35 px-2 py-1',
            'font-sans text-[0.625rem] leading-none font-medium tracking-[0.1em] text-white/85 uppercase',
            'backdrop-blur-[2px]',
          )}
        >
          Image slot · {image.slot}
        </span>
      )}

      {children && <div className="absolute inset-0 z-20 flex">{children}</div>}
    </figure>
  );
}
