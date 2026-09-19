// Central site configuration derived from environment variables.
export const siteConfig = {
  name: "Vishesh Kumar",
  title:
    "Vishesh Kumar | Senior Backend Engineer | Golang & Distributed Systems",
  description:
    "Senior Backend Engineer specializing in Golang, distributed systems, Kafka, Redis, AWS, real-time systems and scalable backend architecture.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://vishesh-portfolio.example.com",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "",
  keywords: [
    "Vishesh Kumar",
    "Senior Backend Engineer",
    "Golang",
    "Go",
    "Distributed Systems",
    "Kafka",
    "Redis",
    "AWS",
    "PostgreSQL",
    "Microservices",
    "Event-Driven Architecture",
    "System Design",
    "WebSockets",
  ],
} as const;
