"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarBrand } from "@/components/organisms/sidebar/SidebarBrand";
import { SidebarCollapseToggle } from "@/components/organisms/sidebar/SidebarCollapseToggle";
import { SidebarSection } from "@/components/organisms/sidebar/SidebarSection";
import { SidebarUserPanel } from "@/components/organisms/sidebar/SidebarUserPanel";
import {
  APP_NAVIGATION_SECTIONS,
  resolveSidebarSections,
  type NavigationSectionConfig,
} from "@/lib/navigation";

interface SidebarProps {
  sections?: NavigationSectionConfig[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
  className?: string;
}

/**
 * Sidebar
 *
 * Primary application sidebar that renders brand, navigation sections and a
 * collapse control.
 */

export function Sidebar({
  sections: sectionConfigs = APP_NAVIGATION_SECTIONS,
  collapsed = false,
  onToggleCollapse,
  userName,
  userRole,
  userAvatar,
  onLogout,
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
        "relative flex h-full flex-col border-r border-slate-200/80 bg-slate-50/90 transition-all duration-300 ease-in-out",
        // Use a slightly narrower collapsed width now that item backgrounds are hidden
        effectiveCollapsed ? "w-20" : "w-72",
        className,
      )}
    >
      <SidebarBrand collapsed={effectiveCollapsed} />

      <nav
        className="flex-1 p-3 overflow-x-hidden overflow-y-auto no-underline"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              items={section.items}
              collapsed={effectiveCollapsed}
            />
          ))}
        </div>
      </nav>

      <SidebarUserPanel
        collapsed={effectiveCollapsed}
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        onLogout={onLogout}
      />

      <SidebarCollapseToggle
        collapsed={effectiveCollapsed}
        onToggleCollapse={handleToggle}
      />
    </aside>
  );
}
