import { Download, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="container-page">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-[100px]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something scalable"
                align="left"
              />
              <p className="mt-4 max-w-md text-muted">
                Open to conversations about backend engineering, distributed
                systems and high-scale architecture. The fastest way to reach me
                is email.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${profile.social.email}`}
                  className="flex items-center gap-3 text-fg transition-colors hover:text-accent"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {profile.social.email}
                </a>
                {profile.social.phone ? (
                  <a
                    href={`tel:${profile.social.phone}`}
                    className="flex items-center gap-3 text-fg transition-colors hover:text-accent"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {profile.social.phone}
                  </a>
                ) : null}
              </div>

              <div className="mt-6">
                <SocialLinks />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <Reveal>
                <div className="rounded-xl border border-border bg-surface-2/60 p-6">
                  <p className="font-mono text-sm text-muted">
                    <span className="text-accent">$</span> connect --with vishesh
                  </p>
                  <p className="mt-3 text-lg font-semibold text-fg">
                    {profile.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.social.email}`}
                      className="btn-primary"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Get in touch
                    </a>
                    <a href={profile.resumeUrl} download className="btn-outline">
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download Resume
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
