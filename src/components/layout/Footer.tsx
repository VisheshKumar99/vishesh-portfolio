
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
