import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Skeleton(
  props: HTMLAttributes<HTMLDivElement> & { disabled?: boolean },
) {
  const { className, disabled, ...rest } = props;

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn("animate-pulse rounded-md bg-zinc-200/80", className)}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    />
  );
}
