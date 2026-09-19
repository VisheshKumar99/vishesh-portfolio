"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ArchitectureFlow, ArchNode } from "@/types";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  flow: ArchitectureFlow;
  /** Orientation of the node chain. */
  orientation?: "horizontal" | "vertical";
}

const detailFields: Array<{ key: keyof ArchNode; label: string }> = [
  { key: "role", label: "Responsibility" },
  { key: "why", label: "Why it exists" },
  { key: "dataFlow", label: "Data flow" },
  { key: "scaling", label: "Scaling" },
  { key: "failure", label: "Failure handling" },
];

export function ArchitectureDiagram({
  flow,
  orientation = "horizontal",
}: ArchitectureDiagramProps) {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(flow.nodes[0]?.id ?? "");
  const selected = flow.nodes.find((n) => n.id === selectedId) ?? flow.nodes[0];

  const isHorizontal = orientation === "horizontal";

  return (
    <div className="rounded-xl border border-border bg-surface-2/50 p-4 sm:p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
        {flow.title}
      </p>

      <div
        className={cn(
          "flex gap-2",
          isHorizontal
            ? "flex-wrap items-center"
            : "flex-col items-stretch sm:items-start",
        )}
        role="list"
        aria-label={`${flow.title} components`}
      >
        {flow.nodes.map((node, i) => {
          const isSelected = node.id === selectedId;
          return (
            <div
              key={node.id}
              role="listitem"
              className={cn("flex", isHorizontal ? "items-center" : "flex-col")}
            >
              <button
                type="button"
                onClick={() => setSelectedId(node.id)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isSelected
                    ? "border-accent bg-accent/15 text-fg"
                    : "border-border bg-surface text-muted hover:border-accent/60 hover:text-fg",
                )}
              >
                {node.label}
              </button>

              {i < flow.nodes.length - 1 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-accent/60",
                    isHorizontal ? "mx-1 h-4 w-4" : "my-1 h-4 w-4 rotate-90 self-center sm:self-start sm:ml-4",
                    !reduce && "animate-pulse-line",
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Selected node details */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-lg border border-border bg-surface p-4"
          >
            <p className="mb-2 text-sm font-semibold text-accent">{selected.label}</p>
            <dl className="grid gap-2 sm:grid-cols-2">
              {detailFields.map(({ key, label }) => {
                const val = selected[key];
                if (!val || key === "id" || key === "label") return null;
                return (
                  <div key={String(key)}>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {label}
                    </dt>
                    <dd className="text-sm text-fg">{String(val)}</dd>
                  </div>
                );
              })}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
