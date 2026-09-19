import type { Certification } from "@/types";

// Certifications exactly as listed in the resume. URLs are configurable and
// left EMPTY — do not invent certificate IDs or verification links.
export const certifications: Certification[] = [
  {
    id: "go-grpc",
    name: "Go Bootcamp: With gRPC and Protocol Buffers",
    topics: ["Golang", "gRPC", "Protocol Buffers"],
    url: "",
  },
  {
    id: "software-architecture",
    name: "Software Architecture & Technology of Large-Scale Systems",
    topics: ["System Design", "Scalability", "Distributed Systems"],
    url: "",
  },
  {
    id: "aws-saa",
    name: "Ultimate AWS Certified Solutions Architect Associate 2026",
    topics: ["AWS", "Cloud Architecture", "High Availability"],
    url: "",
  },
];
