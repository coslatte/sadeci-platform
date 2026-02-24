import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { disabled?: boolean }) {
  // extract disabled if provided in props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { disabled, ...rest } = props as any;

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn("animate-pulse rounded-md bg-zinc-200/80", className)}
      {...rest}
    />
  );
}
