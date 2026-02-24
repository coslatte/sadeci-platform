import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}

export function Divider({
  className,
  orientation = "horizontal",
  disabled,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        {...dataDisabledProps(disabled)}
        className={cn("h-full w-px bg-zinc-200", className)}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }
  return (
    <hr
      {...dataDisabledProps(disabled)}
      className={cn("w-full border-t border-zinc-200", className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
}
