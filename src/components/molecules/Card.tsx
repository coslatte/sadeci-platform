import { cn, dataDisabledProps } from "@/lib/utils";

/**
 * Props for `Card` component.
 */
interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  disabled?: boolean;
}

const CARD_BASE = "rounded-xl border border-zinc-200 bg-white shadow-sm";
const CARD_SECTION = "px-5 py-4 border-zinc-200";

/**
 * Card
 *
 * Generic container that provides a bordered white surface with optional
 * header and footer slots. Use `padded=false` to let the content control
 * spacing.
 */
export function Card({
  header,
  footer,
  children,
  className,
  padded = true,
  disabled,
}: CardProps) {
  return (
    <div {...dataDisabledProps(disabled)} className={cn(CARD_BASE, className)}>
      {header && <div className={cn("border-b", CARD_SECTION)}>{header}</div>}
      <div className={cn(padded && "px-5 py-4")}>{children}</div>
      {footer && <div className={cn("border-t", CARD_SECTION)}>{footer}</div>}
    </div>
  );
}
