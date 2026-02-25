"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  disabled?: boolean;
}

export function Footer({ className, disabled }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const utilityLinks = [
    { label: "Soporte", href: "/soporte" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
    { label: "Documentación", href: "/docs" },
  ];

  return (
    <footer
      className={cn(
        "flex h-12 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-8 transition-colors",
        disabled && "opacity-50 grayscale pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-6">
        <p className="text-[length:var(--font-size-xs)] font-medium text-slate-400">
          &copy; {currentYear} Sadeci Platform
        </p>
        <div className="h-4 w-px bg-slate-100" />
        <nav>
          <ul className="flex items-center gap-4">
            {utilityLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="text-[length:var(--font-size-xs)] font-medium text-slate-500 transition-colors hover:text-primary-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[length:var(--font-size-xs)] font-medium text-slate-500">
            Sistema Operativo
          </span>
        </div>
      </div>
    </footer>
  );
}
