import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[];
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/coslatte/sadeci-platform" },
];

export function Footer({ links = defaultLinks, className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("border-t border-zinc-200 bg-white px-6 py-4", className)}
    >
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-zinc-500">© {year} Sadeci Platform.</p>
        <nav className="flex items-center gap-4" aria-label="Footer">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
