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
      <Card
        className={cn(
          "group flex items-start gap-4 transition-all",
          "hover:border-primary-200 hover:shadow-md",
          className,
        )}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
          {icon}
        </div>

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
