import type { SkillCategory } from "@/types";

// Skill groups exactly as supplied. Categories are filterable in the UI.
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    icon: "code-2",
    skills: ["Golang", "Python", "JavaScript", "TypeScript"],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: "server",
    skills: [
      "REST APIs",
      "GraphQL",
      "gRPC",
      "WebSockets",
      "Go routines",
      "Channels",
      "Wait Groups",
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "MongoDB", "SQL Server", "Redis"],
  },
  {
    id: "system-design",
    name: "System Design",
    icon: "network",
    skills: [
      "Microservices",
      "Event-Driven Architecture",
      "Distributed Systems",
      "High Availability",
      "Scalability",
    ],
  },
  {
    id: "messaging",
    name: "Messaging & Streaming",
    icon: "radio-tower",
    skills: ["Kafka", "RabbitMQ", "SQS"],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "CloudFront",
      "ECS",
      "Auto Scaling",
      "CloudWatch",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "wrench",
    skills: [
      "Caching",
      "Performance Optimization",
      "Fault Tolerance",
      "Monitoring",
      "Observability",
    ],
  },
];
