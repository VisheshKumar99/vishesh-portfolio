import type { Project } from "@/types";

// ---------------------------------------------------------------------------
// Featured projects. IMPORTANT: githubUrl / liveUrl are intentionally EMPTY
// where no real URL was provided. The UI renders these as disabled buttons.
// Fill them in here — this is the single source of truth for project links.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "market-mojo",
    name: "Market Mojo",
    subtitle: "Data Ingestion & Analytics Platform",
    description:
      "Event-driven data ingestion and analytics platform built on Kafka, processing 50M+ events per day with idempotent, retry-safe consumers.",
    technologies: ["Go", "PostgreSQL", "AWS", "Kafka", "Goroutines"],
    highlights: [
      "Kafka event-driven architecture with partitioning and consumer groups",
      "Retry queues and idempotent processing for exactly-once semantics",
      "50M+ daily events",
      "Scheduled data workflows",
      "40–60% performance improvement",
    ],
    impact: "50M+ daily events · 40–60% performance improvement",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    architecture: {
      title: "Ingestion & Analytics Flow",
      nodes: [
        {
          id: "sources",
          label: "Data Sources",
          role: "Origin of raw event streams.",
          dataFlow: "Emits high-volume events into the pipeline.",
        },
        {
          id: "kafka",
          label: "Kafka",
          role: "Durable, ordered event log.",
          why: "Buffers spikes and decouples producers from consumers.",
          scaling: "Topic partitioning enables parallel consumption.",
          failure: "Replayable log allows recovery after consumer failure.",
        },
        {
          id: "partitions",
          label: "Partitions",
          role: "Parallelism unit for throughput.",
          scaling: "More partitions = more concurrent consumers.",
        },
        {
          id: "consumers",
          label: "Consumer Groups",
          role: "Distribute work across workers.",
          dataFlow: "Each partition is owned by one consumer in the group.",
          failure: "Rebalances on consumer loss; offsets committed for at-least-once.",
        },
        {
          id: "processing",
          label: "Processing",
          role: "Transform, validate and enrich events.",
          why: "Idempotent handlers make retries safe.",
        },
        {
          id: "store",
          label: "PostgreSQL / Analytics",
          role: "Durable storage and analytical queries.",
          scaling: "Batched writes and indexing keep queries fast.",
        },
      ],
    },
  },
  {
    id: "smc-trade-online",
    name: "SMCTradeOnline",
    subtitle: "Real-Time Stock Broadcasting",
    description:
      "Real-time stock broadcasting system streaming live market data to connected clients using goroutines, channels, Redis fan-out and WebSockets.",
    technologies: ["Go", "Goroutines", "PostgreSQL", "MongoDB", "WebSockets", "Redis"],
    highlights: [
      "Concurrent processing with goroutines and channels",
      "Redis fan-out for low-latency delivery",
      "WebSocket streaming to connected clients",
      "Fault-tolerant, high-availability design",
    ],
    impact: "Real-time delivery to connected trading clients",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    architecture: {
      title: "Broadcasting Flow",
      nodes: [
        {
          id: "market",
          label: "Market Data",
          role: "Live market feed source.",
          dataFlow: "Streams ticks into the processing layer.",
        },
        {
          id: "processing",
          label: "Processing",
          role: "Concurrent transformation.",
          dataFlow: "Goroutines and channels fan work out safely.",
          scaling: "Worker pools scale with CPU cores.",
        },
        {
          id: "redis",
          label: "Redis",
          role: "Pub/sub fan-out and cache.",
          why: "Delivers updates to many connections with low latency.",
          scaling: "Handles high read fan-out efficiently.",
        },
        {
          id: "websocket",
          label: "WebSocket",
          role: "Persistent client connections.",
          failure: "Reconnect logic and heartbeats keep streams alive.",
        },
        {
          id: "clients",
          label: "Connected Clients",
          role: "Trading applications rendering live data.",
        },
      ],
    },
  },
  {
    id: "indian-railway-oms",
    name: "Indian Railway OMS",
    subtitle: "Real-Time Train Telemetry & Operations",
    description:
      "Operations management system ingesting real-time train telemetry (speed, vibration, GPS) via Kafka and streaming it to an operations dashboard for 50+ concurrent trains.",
    technologies: ["Node.js", "Electron", "React", "WebSocket", "Kafka"],
    highlights: [
      "Real-time telemetry: speed, vibration, GPS",
      "Kafka ingestion for high-volume streams",
      "WebSocket streaming to operations dashboard",
      "50+ concurrent train runs",
    ],
    impact: "50+ concurrent train runs monitored in real time",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    architecture: {
      title: "Telemetry Flow",
      nodes: [
        { id: "train", label: "Train", role: "Source of onboard sensors." },
        {
          id: "telemetry",
          label: "Telemetry",
          role: "Speed, vibration and GPS readings.",
          dataFlow: "Sensors emit continuous measurements.",
        },
        {
          id: "kafka",
          label: "Kafka",
          role: "Ingestion backbone.",
          why: "Absorbs bursty telemetry from many trains.",
          scaling: "Partition per region/train cohort.",
        },
        {
          id: "processing",
          label: "Processing",
          role: "Analytics and safety checks.",
          why: "Feeds predictive maintenance signals.",
        },
        {
          id: "websocket",
          label: "WebSocket",
          role: "Live push to dashboard.",
        },
        {
          id: "dashboard",
          label: "Operations Dashboard",
          role: "Operators monitor fleet status.",
        },
      ],
    },
  },
  {
    id: "notification-system",
    name: "Multi-Channel Notification System",
    subtitle: "Reliable Event-Driven Delivery",
    description:
      "Event-driven, multi-channel notification system using Kafka and RabbitMQ with retry handling and fault tolerance for approximately 99% delivery reliability.",
    technologies: ["Golang", "MongoDB", "Kafka", "RabbitMQ", "Redis"],
    highlights: [
      "Event-driven pipeline over Kafka / RabbitMQ",
      "Retry handling and fault tolerance",
      "Monitoring for delivery reliability",
      "~99% delivery reliability",
    ],
    impact: "~99% delivery reliability",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    architecture: {
      title: "Notification Flow",
      nodes: [
        {
          id: "event",
          label: "Event",
          role: "Trigger for a notification.",
          dataFlow: "Domain events enter the pipeline.",
        },
        {
          id: "queue",
          label: "Kafka / RabbitMQ",
          role: "Message transport.",
          why: "Decouples producers from delivery workers.",
          scaling: "Queues buffer surges without dropping messages.",
        },
        {
          id: "processing",
          label: "Notification Processing",
          role: "Resolve channel, template and recipient.",
        },
        {
          id: "retry",
          label: "Retry",
          role: "Handle transient failures.",
          failure: "Backoff and dead-letter queues prevent message loss.",
        },
        {
          id: "delivery",
          label: "Delivery",
          role: "Send across channels.",
          scaling: "Achieves ~99% delivery reliability.",
        },
      ],
    },
  },
];
