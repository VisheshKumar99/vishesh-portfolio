import { Github, Linkedin, Mail, Code } from "lucide-react";
import { profile } from "@/data/profile";
import { hasUrl } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md";
}

// LeetCode has no Lucide brand glyph; use the generic Code icon.
const items = [
  { key: "github", label: "GitHub", href: profile.social.github, Icon: Github },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: profile.social.linkedin,
    Icon: Linkedin,
  },
  {
    key: "email",
    label: "Email",
    href: profile.social.email ? `mailto:${profile.social.email}` : "",
    Icon: Mail,
  },
  {
    key: "leetcode",
    label: "LeetCode",
    href: profile.social.leetcode,
    Icon: Code,
  },
];

export function SocialLinks({ className = "", size = "md" }: SocialLinksProps) {
  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {items.map(({ key, label, href, Icon }) => {
        const enabled = hasUrl(href);
        return (
          <li key={key}>
            <a
              href={enabled ? href : undefined}
              aria-disabled={!enabled}
              tabIndex={enabled ? 0 : -1}
              title={enabled ? label : `${label} — link not configured yet`}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
              className={`grid ${dim} place-items-center rounded-lg border border-border text-muted transition-colors ${
                enabled
                  ? "hover:border-accent hover:text-accent"
                  : "cursor-not-allowed opacity-40"
              }`}
            >
              <Icon className={icon} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
