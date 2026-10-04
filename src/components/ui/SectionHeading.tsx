import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-heading">{title}</h2>
      <span
        aria-hidden="true"
        className={`mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-[#7c5cff] via-[#22d3ee] to-[#34d399] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {description ? (
        <p className="mt-4 text-base text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
