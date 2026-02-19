import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  className?: string;
}

export function NavItem({
  href,
  label,
  icon,
  active = false,
  collapsed = false,
  className,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        "transition-colors duration-150",
        active
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
        collapsed && "justify-center px-2",
        className,
      )}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      {icon && (
        <span className="shrink-0 size-5 flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
