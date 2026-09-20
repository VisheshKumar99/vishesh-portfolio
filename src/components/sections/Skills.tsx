"use client";

import { useState } from "react";
import type { SkillCategory } from "@/types";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

const ALL = "all";

export function Skills() {
  const [active, setActive] = useState<string>(ALL);

  const visible =
    active === ALL
      ? skillCategories
      : skillCategories.filter((c) => c.id === active);

  // When showing everything, split into two rows moving opposite directions.
  const showTwoRows = active === ALL;
  const mid = Math.ceil(visible.length / 2);
  const rowOne = showTwoRows ? visible.slice(0, mid) : visible;
  const rowTwo = showTwoRows ? visible.slice(mid) : [];

  return (
    <section id="skills" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="My Skills"
          title="Technologies I work with"
          description="Auto-scrolling by category — hover to pause, or filter to focus on one group."
        />

        {/* Filter chips */}
        <Reveal className="mt-8">
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Skill categories"
          >
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
      </div>

      {/* Infinite sliders (full-bleed for edge fade). */}
      <Reveal className="mt-10 space-y-4">
        <Marquee key={`${active}-1`} durationSec={38} ariaLabel="Skill categories">
          {rowOne.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </Marquee>

        {rowTwo.length > 0 ? (
          <Marquee
            key={`${active}-2`}
            durationSec={44}
            direction="right"
            ariaLabel="More skill categories"
          >
            {rowTwo.map((cat) => (
              <SkillCard key={cat.id} category={cat} />
            ))}
          </Marquee>
        ) : null}
      </Reveal>
    </section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="card h-full w-[300px] p-5 sm:w-[340px]">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
          <Icon name={category.icon} className="h-4 w-4" />
        </span>
        <h3 className="font-semibold text-fg">{category.name}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill} className="chip">
            {skill}
          </li>
        ))}
      </ul>
    </div>
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
