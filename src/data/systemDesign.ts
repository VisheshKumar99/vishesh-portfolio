import type { SystemDesignScenario } from "@/types";

// System Design Playground scenarios. Explanations are concise and grounded in
// the same systems Vishesh built; nodes are clickable in the UI.
export const systemDesignScenarios: SystemDesignScenario[] = [
  {
    id: "stock-broadcasting",
    title: "Real-Time Stock Broadcasting",
    summary:
      "Fan out live market data to thousands of clients with low latency using concurrency and a Redis pub/sub layer.",
    architecture: {
      title: "Real-Time Stock Broadcasting",
      nodes: [
        {
          id: "feed",
          label: "Market Feed",
          role: "Ingest raw ticks.",
          why: "Single ingestion point normalizes upstream feeds.",
          dataFlow: "Publishes normalized ticks downstream.",
          scaling: "Partition by symbol to parallelize.",
          failure: "Buffer and replay on downstream slowdown.",
        },
        {
          id: "workers",
          label: "Concurrent Workers",
          role: "Process ticks concurrently.",
          why: "Goroutines + channels keep throughput high without blocking.",
          dataFlow: "Fan-out work, fan-in results.",
          scaling: "Worker pool sized to CPU cores.",
          failure: "Bounded channels apply backpressure.",
        },
        {
          id: "redis",
          label: "Redis Pub/Sub",
          role: "Fan-out to many subscribers.",
          why: "Decouples processing from connection count.",
          dataFlow: "Publishes per-symbol channels.",
          scaling: "Handles large read fan-out; shard if needed.",
          failure: "Clients resubscribe on reconnect.",
        },
        {
          id: "ws",
          label: "WebSocket Gateway",
          role: "Hold persistent client connections.",
          why: "Push model avoids polling overhead.",
          dataFlow: "Relays Redis messages to subscribed sockets.",
          scaling: "Horizontally scaled behind a load balancer.",
          failure: "Heartbeats + auto-reconnect keep streams alive.",
        },
        {
          id: "clients",
          label: "Clients",
          role: "Render live prices.",
          dataFlow: "Consume the socket stream.",
          scaling: "Client-side throttling for slow devices.",
        },
      ],
    },
  },
  {
    id: "event-pipeline",
    title: "Event-Driven Data Pipeline",
    summary:
      "Process 50M+ daily events with idempotent consumers, retry queues and durable storage.",
    architecture: {
      title: "Event-Driven Data Pipeline",
      nodes: [
        {
          id: "producers",
          label: "Producers",
          role: "Emit domain events.",
          why: "Producers stay decoupled from consumers.",
          dataFlow: "Write to Kafka topics.",
          scaling: "Add producers without touching consumers.",
        },
        {
          id: "kafka",
          label: "Kafka",
          role: "Durable event log.",
          why: "Replayable, ordered, partitioned transport.",
          dataFlow: "Partitions distribute load.",
          scaling: "Add partitions to raise throughput.",
          failure: "Replication + replay tolerate broker/consumer loss.",
        },
        {
          id: "consumers",
          label: "Consumer Groups",
          role: "Parallel, ordered processing.",
          why: "One consumer per partition maximizes parallelism.",
          dataFlow: "Commit offsets after successful handling.",
          scaling: "Scale consumers up to the partition count.",
          failure: "Rebalance on failure; at-least-once delivery.",
        },
        {
          id: "idempotent",
          label: "Idempotent Processing",
          role: "Safe re-processing.",
          why: "De-dupe keys make retries harmless.",
          dataFlow: "Check-then-act on a dedupe store.",
          failure: "Retry queue with backoff; dead-letter after N tries.",
        },
        {
          id: "store",
          label: "PostgreSQL",
          role: "Durable, queryable storage.",
          dataFlow: "Batched, indexed writes.",
          scaling: "Read replicas for analytics.",
        },
      ],
    },
  },
  {
    id: "notification",
    title: "Notification System",
    summary:
      "Multi-channel delivery with retries and dead-letter handling for ~99% reliability.",
    architecture: {
      title: "Notification System",
      nodes: [
        {
          id: "event",
          label: "Event",
          role: "Notification trigger.",
          dataFlow: "Enters the queue.",
        },
        {
          id: "queue",
          label: "Kafka / RabbitMQ",
          role: "Buffer and transport.",
          why: "Absorbs surges without dropping work.",
          scaling: "Queue depth smooths spikes.",
          failure: "Persisted messages survive restarts.",
        },
        {
          id: "processor",
          label: "Processor",
          role: "Resolve channel + template.",
          dataFlow: "Selects email/SMS/push and renders payload.",
          scaling: "Stateless workers scale horizontally.",
        },
        {
          id: "retry",
          label: "Retry / DLQ",
          role: "Handle transient failures.",
          why: "Protects reliability target.",
          failure: "Exponential backoff, then dead-letter.",
        },
        {
          id: "delivery",
          label: "Delivery",
          role: "Send to providers.",
          scaling: "Per-provider rate limiting.",
          failure: "Fallback provider on outage.",
        },
      ],
    },
  },
  {
    id: "train-telemetry",
    title: "Train Telemetry System",
    summary:
      "Ingest speed, vibration and GPS from 50+ trains and stream to an operations dashboard.",
    architecture: {
      title: "Train Telemetry System",
      nodes: [
        {
          id: "sensors",
          label: "Onboard Sensors",
          role: "Emit speed, vibration, GPS.",
          dataFlow: "Continuous measurement stream.",
          scaling: "Batch on-device to cut network chatter.",
        },
        {
          id: "kafka",
          label: "Kafka",
          role: "Telemetry ingestion.",
          why: "Handles bursty, high-volume streams.",
          scaling: "Partition per train cohort/region.",
          failure: "Replay for late or reconnecting devices.",
        },
        {
          id: "processing",
          label: "Processing",
          role: "Safety + predictive analytics.",
          dataFlow: "Windowed aggregation over signals.",
          failure: "Anomaly detection flags degraded assets.",
        },
        {
          id: "ws",
          label: "WebSocket",
          role: "Live push to dashboard.",
          scaling: "Scale gateways with connection count.",
        },
        {
          id: "dashboard",
          label: "Operations Dashboard",
          role: "Operators monitor the fleet.",
          dataFlow: "Renders live fleet status.",
        },
      ],
    },
  },
];
