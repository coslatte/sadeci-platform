import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types";

interface SpinnerProps {
  // we allow the full range of the generic Size type, including xl
  size?: Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;
  className?: string;
  label?: string;
}

const sizeClasses: Record<string, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10", // extra large spinner
};

export function Spinner({
  size = "md",
  className,
  label = "Loading...",
}: SpinnerProps) {
  return (
    <svg
      className={cn(
        "animate-spin text-primary-600",
        sizeClasses[size],
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
