"use client";

import { metrics } from "@/data/profile";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Metrics() {
  return (
    <section aria-labelledby="metrics-heading" className="py-12">
      <div className="container-page">
        <h2 id="metrics-heading" className="sr-only">
          Engineering metrics
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.05}>
              <div className="card h-full p-5">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon name={metric.icon} className="h-5 w-5" />
                </span>
                <div className="text-2xl font-bold text-fg sm:text-3xl">
                  {metric.displayOverride ? (
                    metric.displayOverride
                  ) : (
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
