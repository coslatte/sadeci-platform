import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/molecules/Card";

interface LinkCardProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  target?: string;
}

const LINKCARD_BASE = "group flex items-start gap-4 transition-all";
const LINKCARD_HOVER = "hover:border-primary-200 hover:shadow-md";
const LINKCARD_ICON =
  "flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600";

/**
 * LinkCard
 *
 * Small card that links to an external or internal resource. Renders an icon
 * slot, a title and optional description. By default links open in a new tab
 * (`target="_blank"`) unless a different `target` is provided.
 *
 * @param label - visible title of the link card
 * @param href - destination URL
 * @param icon - optional icon node displayed in the left slot
 * @param description - optional secondary text shown below the title
 * @param className - extra classes applied to the Card root
 * @param target - anchor target (defaults to `_blank`)
 */
export function LinkCard({
  label,
  href,
  icon,
  description,
  className,
  target = "_blank",
}: LinkCardProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="group"
    >
      <Card className={cn(LINKCARD_BASE, LINKCARD_HOVER, className)}>
        <div className={cn(LINKCARD_ICON)}>{icon}</div>

        <div>
          <p className="text-(length:--font-size-sm) font-semibold text-slate-800 group-hover:text-primary-700">
            {label}
          </p>
          {description && (
            <p className="mt-0.5 text-(length:--font-size-xs) text-slate-500">
              {description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default LinkCard;
