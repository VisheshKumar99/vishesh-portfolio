import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="mx-auto mt-10 max-w-2xl">
          <ol className="relative border-l border-border pl-6 sm:pl-8">
            {education.map((edu) => (
              <li key={edu.institution}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
                />
                <Reveal>
                  <div className="card p-6">
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                        <GraduationCap className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-fg">{edu.institution}</h3>
                        <p className="text-sm text-accent">{edu.degree}</p>
                        <p className="mt-1 text-sm text-muted">{edu.period}</p>
                      </div>
                    </div>
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
