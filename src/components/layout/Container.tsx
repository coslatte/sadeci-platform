import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  className,
  size = "lg",
  disabled,
  ...props
}: ContainerProps & { disabled?: boolean }) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[96rem]",
    full: "max-w-full",
  };

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "mx-auto w-full px-8 sm:px-12 lg:px-16",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
