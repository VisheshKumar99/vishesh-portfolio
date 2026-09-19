/** Join truthy class names. Tiny alternative to `clsx`. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** True when a URL string is present and non-empty. */
export function hasUrl(url: string | undefined | null): url is string {
  return typeof url === "string" && url.trim().length > 0;
}
