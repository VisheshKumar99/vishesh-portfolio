import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const focusAreas = [
  "Distributed Systems",
  "Backend Engineering",
  "Event-Driven Architecture",
  "High Availability",
  "Scalability",
  "Performance Optimization",
  "Real-Time Systems",
  "Production Reliability",
  "System Design",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering philosophy"
          align="left"
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                I&apos;m a backend engineer focused on designing systems that stay
                fast and reliable under real production load. My work centers on
                event-driven architecture, high-throughput pipelines and
                real-time delivery — the kind of infrastructure that has to keep
                running while it scales.
              </p>
              <p>
                Over 4+ years I&apos;ve built distributed systems in Go backed by
                Kafka, Redis, PostgreSQL and AWS: from processing 50M+ daily
                events to broadcasting live market data over WebSockets. I care
                about idempotency, fault tolerance and observability — the
                details that separate a demo from a system you can trust.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                Focus areas
              </p>
              <ul className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li key={area} className="chip">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
