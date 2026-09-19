"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Github } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { hasUrl } from "@/lib/utils";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const githubEnabled = hasUrl(profile.social.github);

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Subtle radial glow behind hero — restrained, not gaming-style. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Senior Software Engineer
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-accent">Vishesh Kumar</span>
            <span className="mt-2 block text-fg">
              I build scalable distributed systems.
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-3 font-mono text-sm text-muted">
            Node JS · Golang · Python · GenAI · Distributed Systems · AWS
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="btn-primary"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={githubEnabled ? profile.social.github : undefined}
              aria-disabled={!githubEnabled}
              tabIndex={githubEnabled ? 0 : -1}
              target="_blank"
              rel="noopener noreferrer"
              title={githubEnabled ? "View GitHub" : "GitHub link not configured yet"}
              className={`btn-outline ${githubEnabled ? "" : "pointer-events-none opacity-40"}`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View GitHub
            </a>

            <a href={profile.resumeUrl} download className="btn-outline">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
              Technologies I work with
            </p>
            <ul
              className="scroll-strip"
              aria-label="Technologies I work with"
            >
              {profile.heroBadges.map((badge, i) => (
                <motion.li
                  key={badge}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  className="chip font-mono"
                >
                  {badge}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <SocialLinks />
            <span className="text-sm text-muted">{profile.location}</span>
          </motion.div>
        </motion.div>

        {/* Floating code card (mirrors the reference mockup). */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-2 font-mono text-xs text-muted">engineer.go</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-muted">package</span>{" "}
                <span className="text-fg">main</span>
                {"\n\n"}
                <span className="text-muted">type</span>{" "}
                <span className="text-accent">Engineer</span>{" "}
                <span className="text-muted">struct</span> {"{"}
                {"\n"}
                {"  "}Name{"       "}<span className="text-green-400">string</span>
                {"\n"}
                {"  "}Focus{"      "}[]<span className="text-green-400">string</span>
                {"\n"}
                {"  "}Experience <span className="text-green-400">int</span>
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-muted">var</span> vishesh = Engineer{"{"}
                {"\n"}
                {"  "}Name:{"       "}
                <span className="text-yellow-300">&quot;Vishesh Kumar&quot;</span>,
                {"\n"}
                {"  "}Focus:{"      "}[]string{"{"}
                <span className="text-yellow-300">&quot;Kafka&quot;</span>,{" "}
                <span className="text-yellow-300">&quot;Redis&quot;</span>,{" "}
                <span className="text-yellow-300">&quot;AWS&quot;</span>
                {"},"}
                {"\n"}
                {"  "}Experience: <span className="text-accent">4</span>,
                {"\n"}
                {"}"}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
