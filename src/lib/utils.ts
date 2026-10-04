/** Join truthy class names. Tiny alternative to `clsx`. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** True when a URL string is present and non-empty. */
export function hasUrl(url: string | undefined | null): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

/**
 * A rotating palette of accent hues used to add color to cards/icons.
 * Each entry pairs an icon chip background/text with a soft top border glow.
 */
export const hues = [
  { chip: "bg-[#7c5cff]/15 text-[#a992ff]", ring: "hover:border-[#7c5cff]/50" },
  { chip: "bg-[#22d3ee]/15 text-[#5fe0f0]", ring: "hover:border-[#22d3ee]/50" },
  { chip: "bg-[#34d399]/15 text-[#6ee7b7]", ring: "hover:border-[#34d399]/50" },
  { chip: "bg-[#f59e0b]/15 text-[#fbbf24]", ring: "hover:border-[#f59e0b]/50" },
  { chip: "bg-[#f472b6]/15 text-[#f9a8d4]", ring: "hover:border-[#f472b6]/50" },
  { chip: "bg-[#60a5fa]/15 text-[#93c5fd]", ring: "hover:border-[#60a5fa]/50" },
  { chip: "bg-[#f87171]/15 text-[#fca5a5]", ring: "hover:border-[#f87171]/50" },
] as const;

/** Pick a hue by index (wraps around). */
export function hueAt(index: number) {
  return hues[index % hues.length];
}
