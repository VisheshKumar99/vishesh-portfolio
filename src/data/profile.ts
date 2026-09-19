import type { Metric, Profile } from "@/types";

// ---------------------------------------------------------------------------
// Core profile. Links that are not present in the resume are left EMPTY on
// purpose — fill them in rather than inventing URLs. Empty links render as
// disabled / configurable placeholders in the UI.
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Vishesh Kumar",
  role: "Senior Backend Engineer · Golang · Distributed Systems · AWS",
  tagline: "Backend engineer who builds scalable distributed systems.",
  intro:
    "Senior Backend Engineer with 5 years of experience building high-scale distributed systems using Node Js, Go, React, Python, Gen AI, Kafka, Redis, PostgreSQL and AWS.",
  location: "Delhi, India",
  yearsExperience: "4+",
  resumeUrl: "/resume/vishesh_go.pdf",
  heroBadges: [
    "Go",
    "Kafka",
    "Redis",
    "AWS",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Microservices",
  ],
  social: {
    email: "visheshmzn99@gmail.com",
    phone: "8954161886",
    // TODO: fill in with the real profile URLs. Left blank on purpose so no
    // fabricated links ship to production.
    github: "https://github.com/VisheshKumar99",
    linkedin: "https://www.linkedin.com/in/visheshkumar99/",
    leetcode: "https://leetcode.com/u/visheshmzn99/",
  },
};

// Metrics — every value is grounded in the resume. Do not add fabricated ones.
export const metrics: Metric[] = [
  { value: 4, suffix: "+", label: "Years Experience", icon: "calendar" },
  { value: 50, suffix: "M+", label: "Daily Events Processed", icon: "activity" },
  {
    value: 0,
    displayOverride: "Millions",
    label: "Daily Financial Transactions",
    icon: "banknote",
  },
  { value: 99, suffix: "%", label: "Availability", prefix: "~", icon: "shield-check" },
  { value: 30, suffix: "%", label: "API Latency Reduction", icon: "gauge" },
  { value: 4, suffix: "", label: "Engineers Led", icon: "users" },
  { value: 50, suffix: "+", label: "Concurrent Train Runs", icon: "train-front" },
];
