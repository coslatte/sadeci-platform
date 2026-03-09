import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";

/**
 * Props for `NavItem`.
 */
interface NavItemProps {
  href?: string;
  label: string;
  icon?: React.ReactNode;
  /** Whether this item represents the active route */
  active?: boolean;
  /** Whether this item exactly matches the current route */
  current?: boolean;
  /** When true render the compact/collapsed variant (icons only) */
  collapsed?: boolean;
  variant?: "default" | "nested";
  trailingContent?: React.ReactNode;
  onClick?: () => void;
  expanded?: boolean;
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
}

/**
 * NavItem
 *
 * Navigation link used in the sidebar. Supports an `active` state and a
 * collapsed compact variant which hides the label and centers the icon.
 */
export function NavItem({
  href,
  label,
  icon,
  active = false,
  current = false,
  collapsed = false,
  variant = "default",
  trailingContent,
  onClick,
  expanded,
  className,
  labelClassName,
  iconClassName,
  disabled,
}: NavItemProps) {
  const isNested = variant === "nested";
  const sharedClassName = cn(
    isNested
      ? "group flex w-full items-center gap-2.5 rounded-xl border border-transparent px-3 py-2 text-sm font-medium transition-all duration-200"
      : "group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-(length:--font-size-sm) font-medium transition-all duration-200",
    isNested
      ? current
        ? "border-primary-200 bg-primary-50 text-primary-700 shadow-sm"
        : active
          ? "border-slate-200 bg-white text-slate-800"
          : "text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-800"
      : current
        ? "border-primary-200 bg-primary-50 text-primary-700 shadow-sm"
        : active
          ? "border-slate-200 bg-white text-slate-800 shadow-sm"
          : "text-zinc-600 hover:border-slate-200 hover:bg-white hover:text-zinc-900",
    collapsed && !isNested && "justify-center px-2",
    "no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    className,
  );

  const content = (
    <>
      {icon && (
        <span
          className={cn(
            isNested
              ? "flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-slate-200 group-hover:text-slate-700"
              : "flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-current shadow-sm ring-1 ring-slate-200/80",
            iconClassName,
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {!collapsed && (
        <span
          className={cn("min-w-0 flex-1 truncate no-underline", labelClassName)}
        >
          {label}
        </span>
      )}
      {!collapsed && trailingContent}
    </>
  );

  if (onClick || !href) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...dataDisabledProps(disabled)}
        className={sharedClassName}
        aria-current={current ? "page" : undefined}
        aria-expanded={typeof expanded === "boolean" ? expanded : undefined}
        title={collapsed ? label : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      {...dataDisabledProps(disabled)}
      className={sharedClassName}
      aria-current={current ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      {content}
    </Link>
  );
}
