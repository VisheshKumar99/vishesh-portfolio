"use client";

import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { hasUrl } from "@/lib/utils";

/**
 * "Beyond Code" — a splash of personality featuring short-form videos from the
 * @8pm-magic YouTube channel. Embeds are click-to-load (thumbnail first) using
 * youtube-nocookie, so nothing from YouTube loads until the user opts in. If no
 * videos are configured, the section renders nothing.
 */
export function BeyondCode() {
  const videos = profile.featuredVideos ?? [];
  const channelEnabled = hasUrl(profile.social.youtube);

  if (videos.length === 0) return null;

  return (
    <section id="beyond-code" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Beyond Code"
          title="A little creativity off the clock"
          description="When I'm not shipping backends, I make short-form videos on my channel @8pm-magic."
        />

        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-8 sm:grid-cols-[auto_1fr]">
          <div className="flex justify-center gap-5">
            {videos.map((video) => (
              <Reveal key={video.id}>
                <ShortEmbed id={video.id} title={video.title} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div>
              <h3 className="text-xl font-bold text-fg">8PM Magic</h3>
              <p className="mt-3 text-muted">
                Short, punchy videos — a creative outlet that keeps the
                problem-solving muscles fresh in a very different medium.
              </p>
              {channelEnabled ? (
                <a
                  href={profile.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 bg-red-600 hover:bg-red-500"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  Visit the channel
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Click-to-load YouTube Short. Shows the poster image until activated. */
function ShortEmbed({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  // 9:16 vertical frame for Shorts.
  const frame = "h-[480px] w-[270px]";

  if (active) {
    return (
      <div
        className={`gradient-ring ${frame}`}
      >
        <iframe
          className="h-full w-full rounded-2xl"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`group relative overflow-hidden rounded-2xl border border-border ${frame}`}
      aria-label={`Play ${title}`}
    >
      {/* YouTube provides a poster image per video id. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
          <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}
