import { cn } from "@/lib/utils";

interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({
  header,
  footer,
  children,
  className,
  padded = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white shadow-sm",
        className,
      )}
    >
      {header && (
        <div className="border-b border-zinc-200 px-5 py-4">{header}</div>
      )}
      <div className={cn(padded && "px-5 py-4")}>{children}</div>
      {footer && (
        <div className="border-t border-zinc-200 px-5 py-4">{footer}</div>
      )}
    </div>
  );
}
