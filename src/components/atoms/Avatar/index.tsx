import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  xs: "size-6 text-xs",
  sm: "size-8 text-sm",
  md: "size-9 text-sm",
  lg: "size-11 text-base",
  xl: "size-14 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700",
          sizeClass,
          className,
        )}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "bg-indigo-100 font-semibold text-indigo-700",
        "dark:bg-indigo-900/40 dark:text-indigo-300",
        sizeClass,
        className,
      )}
      aria-label={alt || name}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
