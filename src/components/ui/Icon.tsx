import {
  Activity,
  Banknote,
  Calendar,
  Cloud,
  Code2,
  Database,
  Gauge,
  Network,
  RadioTower,
  Server,
  ShieldCheck,
  TrainFront,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Map string keys from the data layer to Lucide icon components. Keeps the
// data files free of JSX / component imports.
const registry: Record<string, LucideIcon> = {
  activity: Activity,
  banknote: Banknote,
  calendar: Calendar,
  cloud: Cloud,
  "code-2": Code2,
  database: Database,
  gauge: Gauge,
  network: Network,
  "radio-tower": RadioTower,
  server: Server,
  "shield-check": ShieldCheck,
  "train-front": TrainFront,
  users: Users,
  wrench: Wrench,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Cmp = registry[name] ?? Activity;
  return <Cmp className={className} aria-hidden="true" />;
}
