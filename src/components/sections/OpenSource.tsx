import { Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { hasUrl } from "@/lib/utils";

// GitHub / open-source section. Renders purely from static project config —
// no GitHub API is required for the site to work. If NEXT_PUBLIC_GITHUB_USERNAME
// is set you could later enhance this with live stats, kept optional by design.
export function OpenSource() {
  return (
    <section aria-labelledby="opensource-heading" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Open Source"
          title="Explore my code"
          description="Repository links live in a single config file. Fill in each project's githubUrl to activate its button."
        />
        <h2 id="opensource-heading" className="sr-only">
          GitHub repositories
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => {
            const enabled = hasUrl(project.githubUrl);
            return (
              <Reveal key={project.id} delay={(i % 2) * 0.08}>
                <div className="card flex items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-semibold text-fg">{project.name}</h3>
                    <p className="text-sm text-muted">{project.subtitle}</p>
                  </div>
                  <a
                    href={enabled ? project.githubUrl : undefined}
                    aria-disabled={!enabled}
                    tabIndex={enabled ? 0 : -1}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={
                      enabled
                        ? "View repository"
                        : "Repository link not configured yet"
                    }
                    className={`btn-outline shrink-0 text-xs ${
                      enabled ? "" : "pointer-events-none opacity-40"
                    }`}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Repository
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
