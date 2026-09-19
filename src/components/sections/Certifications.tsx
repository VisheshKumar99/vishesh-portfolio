import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { hasUrl } from "@/lib/utils";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Credentials" title="Certifications" />

        <ul
          className="scroll-strip mt-10 snap-x snap-mandatory"
          aria-label="Certifications"
        >
          {certifications.map((cert, i) => {
            const enabled = hasUrl(cert.url);
            return (
              <Reveal
                as="li"
                key={cert.id}
                delay={i * 0.08}
                className="w-72 snap-start sm:w-80"
              >
                <div className="card flex h-full flex-col p-6">
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-fg">{cert.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {cert.topics.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <a
                      href={enabled ? cert.url : undefined}
                      aria-disabled={!enabled}
                      tabIndex={enabled ? 0 : -1}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={
                        enabled
                          ? "View certificate"
                          : "Certificate link not configured yet"
                      }
                      className={`btn-outline w-full text-xs ${
                        enabled ? "" : "pointer-events-none opacity-40"
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      View Certificate
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
