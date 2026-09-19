"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Network } from "lucide-react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/architecture/ArchitectureDiagram";
import { hasUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const [showArch, setShowArch] = useState(false);

  const githubEnabled = hasUrl(project.githubUrl);
  const liveEnabled = hasUrl(project.liveUrl);

  return (
    <article className="card overflow-hidden">
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-sm text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="chip font-mono text-accent">{project.subtitle}</span>
        </div>

        <h3 className="mt-3 text-xl font-bold text-fg">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.impact ? (
          <p className="mt-3 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
            {project.impact}
          </p>
        ) : null}

        {/* Highlights / key engineering challenges */}
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip font-mono">
              {tech}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={githubEnabled ? project.githubUrl : undefined}
            aria-disabled={!githubEnabled}
            tabIndex={githubEnabled ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            title={githubEnabled ? "View source on GitHub" : "GitHub link not configured yet"}
            className={`btn-outline text-xs ${githubEnabled ? "" : "pointer-events-none opacity-40"}`}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={liveEnabled ? project.liveUrl : undefined}
            aria-disabled={!liveEnabled}
            tabIndex={liveEnabled ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            title={liveEnabled ? "Open live demo" : "Live demo link not configured yet"}
            className={`btn-outline text-xs ${liveEnabled ? "" : "pointer-events-none opacity-40"}`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live Demo
          </a>
          <button
            type="button"
            onClick={() => setShowArch((s) => !s)}
            aria-expanded={showArch}
            className="btn-primary text-xs"
          >
            <Network className="h-4 w-4" aria-hidden="true" />
            {showArch ? "Hide Architecture" : "View Architecture"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showArch ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-surface-2/40"
          >
            <div className="p-6 sm:p-7">
              <ArchitectureDiagram flow={project.architecture} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
