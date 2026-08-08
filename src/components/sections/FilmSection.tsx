import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import { media } from '@/content';
import { film } from '@/content/media';
import { Container, Section } from '@/components/ui/Layout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Reveal } from '@/components/motion/Reveal';

/* =========================================================================
   FILM SECTION
   -------------------------------------------------------------------------
   The agency's own film: a piece to camera from the office on Jam Street.

   IT IS A PORTRAIT 9:16 CLIP, shot on a phone, and it is presented as one.
   Dropping vertical footage into a 16:9 player would letterbox it with
   black bars down two thirds of the frame — the single clearest way to
   make a video look like an afterthought. Instead it sits in a phone-shaped
   player beside the text, which is both honest about what it is and, on a
   wide screen, a better composition than a letterboxed rectangle.

   Why click-to-play rather than autoplay:
     • The film has a voice in it. Autoplay must be muted or browsers block
       it, so autoplaying would throw away the entire point.
     • `preload="none"` — nothing downloads until someone presses play,
       which matters on mobile data.
     • Once playing it has native controls: pause, scrub, volume.

   The poster is a real frame from the film, so the section is never an
   empty grey box.
   ========================================================================= */

export function FilmSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!film.mp4 && !film.webm) return null;

  const sources = [
    film.webm ? { src: film.webm, type: 'video/webm' } : null,
    film.mp4 ? { src: film.mp4, type: 'video/mp4' } : null,
  ].filter((source): source is { src: string; type: string } => source !== null);

  const start = () => {
    setPlaying(true);
    // The <video> mounts this tick; play on the next one.
    window.requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {
        /* Blocked — native controls are showing, so the viewer can start it. */
      });
    });
  };

  return (
    <Section tone="night" className="grain">
      <Container width="wide" className="relative z-10">
        {/* The player column needs a DEFINITE width. With `auto`, the
            `w-full` player inside it resolves against an indefinite track
            and collapses to nothing — the section rendered as text beside
            an empty space. minmax() gives the track real bounds. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(18rem,23rem)] lg:gap-20">
          {/* Text ------------------------------------------------------- */}
          <Reveal className="max-w-xl">
            <p className="eyebrow mb-5 flex items-center gap-3 text-aegean-300">
              <span aria-hidden="true" className="h-px w-8 bg-aegean-300/60" />
              {film.eyebrow}
            </p>
            <h2 className="font-display-tight text-display-md text-balance text-porcelain-50">
              {film.heading}
            </h2>
            <p className="mt-5 text-lead text-porcelain-100/88">{film.body}</p>
          </Reveal>

          {/* Player ----------------------------------------------------- */}
          <Reveal className="w-full">
            <div
              className={cn(
                'relative mx-auto overflow-hidden rounded-[6px] border border-white/12',
                // Phone-shaped, and capped so it never dominates the band.
                'aspect-[9/16] w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-none',
                'shadow-float',
              )}
            >
              {playing ? (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  preload="metadata"
                  poster={media.homeFilm.src ?? undefined}
                  className="absolute inset-0 size-full bg-ink-950 object-cover"
                >
                  {sources.map((source) => (
                    <source key={source.src} src={source.src} type={source.type} />
                  ))}
                  {film.captions && (
                    <track kind="captions" src={film.captions} srcLang="en" label="English" default />
                  )}
                  Your browser cannot play this video.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={start}
                  aria-label={`Play the film: ${film.heading}`}
                  className="group absolute inset-0 block w-full cursor-pointer"
                >
                  <EditorialImage
                    image={media.homeFilm}
                    aspect="9/16"
                    overlay="bottom"
                    sizes="(min-width: 1024px) 23rem, 21rem"
                    className="size-full"
                  />

                  <span className="absolute inset-0 z-20 grid place-items-center">
                    <span
                      className={cn(
                        'grid size-16 place-items-center rounded-full border border-white/40 bg-white/10',
                        'text-porcelain-50 backdrop-blur-[2px] transition-[transform,background-color,border-color]',
                        'duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        'group-hover:scale-105 group-hover:border-white/70 group-hover:bg-white/20',
                        'motion-reduce:group-hover:scale-100 sm:size-20',
                      )}
                    >
                      <Play
                        className="ml-0.5 size-6 sm:size-7"
                        strokeWidth={1.25}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
