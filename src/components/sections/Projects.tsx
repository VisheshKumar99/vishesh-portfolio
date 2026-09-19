"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

const ALL = "all";

export function Projects() {
  const [filter, setFilter] = useState<string>(ALL);

  // Build a distinct, sorted list of technologies for filtering.
  const techs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const visible =
    filter === ALL
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <section id="projects" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Systems I've built"
          description="Each project ships with an interactive architecture diagram — click the components to explore how the system works."
        />

        {/* Project filtering by technology */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            <FilterChip label="All" active={filter === ALL} onClick={() => setFilter(ALL)} />
            {techs.map((tech) => (
              <FilterChip
                key={tech}
                label={tech}
                active={filter === tech}
                onClick={() => setFilter(tech)}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 text-center text-muted">
            No projects match that technology.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-accent bg-accent/15 text-accent"
          : "border-border bg-surface-2 text-muted hover:border-accent/60 hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
