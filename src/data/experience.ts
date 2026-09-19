import type { ExperienceItem } from "@/types";

// Professional experience — resume-supported only.
export const experience: ExperienceItem[] = [
  {
    company: "SMC Global Securities Limited",
    title: "Member Technical Staff – II (Backend)",
    period: "Mar 2023 – Present",
    location: "Delhi, India",
    achievements: [
      "Led a team of 4 engineers.",
      "Built high-throughput distributed systems.",
      "Worked on systems processing millions of financial transactions daily.",
      "Designed event-driven pipelines using Golang, Kafka and Redis.",
      "Built real-time stock broadcasting using WebSockets, goroutines and channels.",
      "Reduced API latency by 30% through Redis caching, query optimization and asynchronous processing.",
      "Achieved approximately 99% availability using fault-tolerant design and AWS Auto Scaling.",
    ],
    stack: ["Golang", "Kafka", "Redis", "WebSockets", "PostgreSQL", "AWS"],
    architecture: {
      title: "Real-Time Broadcasting Pipeline",
      nodes: [
        {
          id: "market",
          label: "Market Data",
          role: "Ingest raw market feeds.",
          dataFlow: "Streams incoming ticks and order-book updates into the pipeline.",
        },
        {
          id: "kafka",
          label: "Kafka",
          role: "Durable event backbone.",
          why: "Decouples producers from consumers and absorbs bursty market traffic.",
          scaling: "Partitioned topics with consumer groups scale horizontally.",
        },
        {
          id: "processing",
          label: "Processing",
          role: "Transform and enrich events.",
          dataFlow: "Goroutines fan out work across channels for concurrent processing.",
        },
        {
          id: "redis",
          label: "Redis",
          role: "Low-latency cache and fan-out layer.",
          why: "Serves hot data and reduces database load.",
          scaling: "Reduces API latency by ~30%.",
        },
        {
          id: "websocket",
          label: "WebSocket",
          role: "Push updates to clients in real time.",
          dataFlow: "Maintains persistent connections for live price streams.",
        },
        {
          id: "clients",
          label: "Clients",
          role: "Trading UIs consuming live data.",
        },
      ],
    },
  },
  {
    company: "Indian Railway & Laxmi Industrial Corporation",
    title: "Full Stack Developer — Contract",
    period: "Oct 2022 – Mar 2023",
    type: "Contract",
    achievements: [
      "Built real-time train telemetry capturing speed, vibration and GPS.",
      "Implemented Kafka ingestion for high-volume telemetry streams.",
      "Streamed live data to dashboards over WebSockets.",
      "Supported 50+ concurrent train runs.",
      "Enabled predictive maintenance and safety analytics.",
    ],
    stack: ["Node.js", "Kafka", "WebSocket", "React", "Electron"],
  },
  {
    company: "Synapsica Healthcare Limited",
    title: "Software Developer",
    period: "May 2022 – Oct 2022",
    achievements: [
      "Built a scalable multi-channel notification system.",
      "Achieved approximately 99% availability.",
      "Implemented retries and fault tolerance.",
      "Added monitoring for delivery reliability.",
    ],
    stack: ["Golang", "Kafka", "RabbitMQ", "Redis", "MongoDB"],
  },
  {
    company: "DLT LABS",
    title: "Full Stack Developer",
    period: "Nov 2021 – Apr 2022",
    achievements: [
      "Developed backend APIs.",
      "Built internal enterprise tools.",
      "Delivered feature development and bug fixes.",
      "Contributed performance improvements.",
    ],
    stack: ["Backend APIs", "Enterprise Tools"],
  },
];
