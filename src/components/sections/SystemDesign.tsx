"use client";

import { useState } from "react";
import { systemDesignScenarios } from "@/data/systemDesign";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/architecture/ArchitectureDiagram";
import { cn } from "@/lib/utils";

export function SystemDesign() {
  const [activeId, setActiveId] = useState(systemDesignScenarios[0].id);
  const active =
    systemDesignScenarios.find((s) => s.id === activeId) ?? systemDesignScenarios[0];

  return (
    <section id="system-design" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="System Design Playground"
          title="Explore backend architectures"
          description="Pick a system, then click any node to see its responsibility, why it exists, data flow, scaling and failure handling."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Scenario selector */}
          <Reveal>
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {systemDesignScenarios.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <li key={s.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActiveId(s.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "w-full rounded-xl border p-4 text-left transition-colors",
                        isActive
                          ? "border-accent bg-accent/10"
                          : "border-border bg-surface hover:border-accent/60",
                      )}
                    >
                      <span
                        className={cn(
                          "block text-sm font-semibold",
                          isActive ? "text-accent" : "text-fg",
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Active scenario */}
          <Reveal delay={0.1}>
            <div className="card p-6">
              <p className="mb-4 text-sm text-muted">{active.summary}</p>
              <ArchitectureDiagram flow={active.architecture} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
