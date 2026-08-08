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
   The agency's own film, on the homepage, in a band of its own.

   Why it is click-to-play rather than an autoplaying background:
     • A promotional film has narration and music. Autoplay must be muted
       or the browser blocks it, so autoplaying would throw the sound away.
     • Nothing downloads until someone presses play — `preload="none"` —
       which matters on mobile data.
     • Once playing it has real controls, so a viewer can pause, scrub and
       adjust the volume like any other video.

   The poster carries the section until then, so this reads as a designed
   band rather than an empty player.

   Accessibility: the play button is a real <button> with a spoken label,
   the video takes native controls, and a captions track is wired up ready
   for the .vtt file.

   THE WHOLE SECTION RETURNS NULL until a film is supplied.
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
    // The element mounts in the same tick; play on the next one.
    window.requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {
        /* Blocked — the native controls are visible, so the viewer can
           still start it themselves. */
      });
    });
  };

  return (
    <Section tone="night" className="grain">
      <Container width="wide" className="relative z-10">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-5 flex items-center justify-center gap-3 text-aegean-300">
            <span aria-hidden="true" className="h-px w-8 bg-aegean-300/60" />
            {film.eyebrow}
          </p>
          <h2 className="font-display-tight text-display-md text-balance text-porcelain-50">
            {film.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lead text-porcelain-100/88">{film.body}</p>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden rounded-[3px] border border-white/10">
            {playing ? (
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                poster={media.homeFilm.src ?? undefined}
                className="block aspect-video w-full bg-ink-950"
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
                className="group relative block w-full cursor-pointer"
              >
                <EditorialImage
                  image={media.homeFilm}
                  aspect="16/9"
                  mobileAspect="4/3"
                  overlay="full"
                  sizes="(min-width: 1024px) 90vw, 100vw"
                />

                <span className="absolute inset-0 z-20 grid place-items-center">
                  <span
                    className={cn(
                      'grid size-20 place-items-center rounded-full border border-white/40 bg-white/10',
                      'text-porcelain-50 backdrop-blur-[2px] transition-[transform,background-color,border-color]',
                      'duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      'group-hover:scale-105 group-hover:border-white/70 group-hover:bg-white/20',
                      'motion-reduce:group-hover:scale-100 sm:size-24',
                    )}
                  >
                    <Play
                      className="ml-1 size-7 sm:size-8"
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
      </Container>
    </Section>
  );
}
