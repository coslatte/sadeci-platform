"use client";

import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import type { NavItemType } from "@/lib/types";

interface SidebarSection {
  title?: string;
  items: NavItemType[];
}

interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  className?: string;
  disabled?: boolean;
}

export function Sidebar({
  sections,
  collapsed = false,
  className,
  disabled,
}: SidebarProps) {
  return (
    <aside
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex shrink-0 flex-col border-r border-slate-200 bg-white",
        collapsed ? "w-16" : "w-64",
        "transition-[width] duration-200",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-slate-200",
          collapsed ? "justify-center px-4" : "px-6",
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-700 text-lg font-bold text-white shadow-sm">
            S
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sadeci
            </span>
          )}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && !collapsed && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavItem
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      active={item.active}
                      collapsed={collapsed}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
