"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ALL = "all";

export function Skills() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(ALL);

  const visible =
    active === ALL
      ? skillCategories
      : skillCategories.filter((c) => c.id === active);

  return (
    <section id="skills" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="My Skills"
          title="Technologies I work with"
          description="Filter by category to explore the stack behind the systems I build."
        />

        {/* Filter chips */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Skill categories">
            <FilterButton
              label="All"
              active={active === ALL}
              onClick={() => setActive(ALL)}
            />
            {skillCategories.map((cat) => (
              <FilterButton
                key={cat.id}
                label={cat.name}
                iconName={cat.icon}
                active={active === cat.id}
                onClick={() => setActive(cat.id)}
              />
            ))}
          </div>
        </Reveal>

        <motion.div
          layout={!reduce}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => (
              <motion.div
                key={cat.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="card p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Icon name={cat.icon} className="h-4 w-4" />
                  </span>
                  <h3 className="font-semibold text-fg">{cat.name}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FilterButton({
  label,
  iconName,
  active,
  onClick,
}: {
  label: string;
  iconName?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent/15 text-accent"
          : "border-border bg-surface-2 text-muted hover:border-accent/60 hover:text-fg",
      )}
    >
      {iconName ? <Icon name={iconName} className="h-4 w-4" /> : null}
      {label}
    </button>
  );
}
