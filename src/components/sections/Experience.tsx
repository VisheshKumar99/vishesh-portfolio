"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/architecture/ArchitectureDiagram";
import { cn } from "@/lib/utils";

export function Experience() {
  const reduce = useReducedMotion();
  const [openArch, setOpenArch] = useState<number | null>(null);

  return (
    <section id="experience" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Career"
          title="Professional experience"
          description="A timeline of the teams and systems I've built."
        />

        <div className="mt-10">
          <ol className="relative border-l border-border pl-6 sm:pl-8">
            {experience.map((job, i) => (
              <li key={job.company} className="mb-10 last:mb-0">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
                />
                <Reveal>
                  <div className="card p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-fg">
                          {job.title}
                        </h3>
                        <p className="text-accent">{job.company}</p>
                      </div>
                      <div className="shrink-0 text-sm text-muted sm:text-right">
                        <p>{job.period}</p>
                        {job.location ? (
                          <p className="mt-0.5 flex items-center gap-1 sm:justify-end">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.location}
                          </p>
                        ) : null}
                        {job.type ? (
                          <span className="mt-1 inline-block chip">{job.type}</span>
                        ) : null}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {job.achievements.map((a) => (
                        <li
                          key={a}
                          className="flex gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li key={tech} className="chip font-mono">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {job.architecture ? (
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenArch((cur) => (cur === i ? null : i))
                          }
                          aria-expanded={openArch === i}
                          className="btn-outline text-xs"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              openArch === i && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                          Technical Architecture
                        </button>

                        <AnimatePresence initial={false}>
                          {openArch === i ? (
                            <motion.div
                              initial={reduce ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduce ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                <ArchitectureDiagram flow={job.architecture} />
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
