import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";

/**
 * Props for `NavItem`.
 */
interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  /** Whether this item represents the active route */
  active?: boolean;
  /** When true render the compact/collapsed variant (icons only) */
  collapsed?: boolean;
  className?: string;
  disabled?: boolean;
}

const NAVITEM_BASE =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-[length:var(--font-size-sm)] font-medium";
const NAVITEM_TRANSITION = "transition-colors duration-150";
const NAVITEM_ACTIVE = "bg-primary-50 text-primary-700";
const NAVITEM_INACTIVE = "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900";

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
  collapsed = false,
  className,
  disabled,
}: NavItemProps) {
  return (
    <Link
      href={href}
      {...dataDisabledProps(disabled)}
      className={cn(
        NAVITEM_BASE,
        NAVITEM_TRANSITION,
        active ? NAVITEM_ACTIVE : NAVITEM_INACTIVE,
        collapsed && "justify-center px-2",
        className,
      )}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      {icon && (
        <span
          className="flex items-center justify-center shrink-0 size-5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
