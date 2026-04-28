"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SidebarSection } from "@/components/organisms/sidebar/SidebarSection";
import {
  APP_NAVIGATION_SECTIONS,
  resolveSidebarSections,
  type NavigationSectionConfig,
} from "@/lib/navigation";
import {
  SIDEBAR_COLLAPSE_COLLAPSE,
  SIDEBAR_COLLAPSE_EXPAND,
} from "@/constants/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  sections?: NavigationSectionConfig[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

/**
 * Sidebar
 *
 * Primary application sidebar that renders brand, navigation sections and a
 * collapse control.
 * Used in X case: main authenticated app shell layout.
 */
export function Sidebar({
  sections: sectionConfigs = APP_NAVIGATION_SECTIONS,
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const sections = resolveSidebarSections(pathname, sectionConfigs);

  // Support uncontrolled usage: if parent doesn't provide an onToggleCollapse
  // handler, manage collapsed state internally so the toggle button is
  // interactive by default.
  const [internalCollapsed, setInternalCollapsed] =
    useState<boolean>(collapsed);

  const isControlled = typeof onToggleCollapse === "function";
  const effectiveCollapsed = isControlled ? collapsed : internalCollapsed;
  const suppressLayoutAnimations = effectiveCollapsed;

  function handleToggle() {
    if (isControlled) {
      onToggleCollapse?.();
    } else {
      setInternalCollapsed((s) => !s);
    }
  }

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col bg-slate-50/90 transition-[width] duration-300 ease-out",
        effectiveCollapsed
          ? "w-0 overflow-visible border-r-0"
          : "w-72 border-r border-slate-200/80",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex-1 overflow-x-hidden overflow-y-auto px-3 py-8 no-underline transition-opacity duration-300 ease-out",
          effectiveCollapsed && "opacity-0 pointer-events-none",
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-50 flex h-10 w-4 items-center justify-center rounded-r-md border border-l-0 border-slate-200 bg-slate-50 text-slate-400 transition-all duration-200 hover:border-primary-500 hover:text-primary-500 hover:shadow-primary-500/20 hover:shadow-sm focus:outline-none",
            !effectiveCollapsed && "bg-primary-500/10 hover:bg-primary-500/20",
          )}
          aria-label={
            effectiveCollapsed
              ? SIDEBAR_COLLAPSE_EXPAND
              : SIDEBAR_COLLAPSE_COLLAPSE
          }
        >
          {effectiveCollapsed ? (
            <FiChevronRight className="size-3" />
          ) : (
            <FiChevronLeft className="size-3" />
          )}
        </button>

        <nav className="pl-3" aria-label="Sidebar navigation">
          <div className="flex flex-col gap-6">
            {sections.map((section) => (
              <SidebarSection
                key={section.title}
                title={section.title}
                items={section.items}
                collapsed={effectiveCollapsed}
                suppressLayoutAnimations={suppressLayoutAnimations}
              />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
