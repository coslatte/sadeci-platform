import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  space?: "sm" | "md" | "lg" | "xl";
}

export function Stack({
  className,
  space = "md",
  disabled,
  ...props
}: StackProps & { disabled?: boolean }) {
  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex flex-col",
        space === "sm" && "gap-2",
        space === "md" && "gap-4",
        space === "lg" && "gap-6",
        space === "xl" && "gap-8",
        className,
      )}
      {...props}
    />
  );
}
