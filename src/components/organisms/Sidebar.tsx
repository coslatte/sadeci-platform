"use client";

import { usePathname } from "next/navigation";
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

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-slate-200/80 bg-slate-50/90 transition-all duration-300 ease-in-out",
        collapsed ? "w-24" : "w-72",
        className,
      )}
    >
      <SidebarBrand collapsed={collapsed} />

      <nav
        className="flex-1 p-3 overflow-x-hidden overflow-y-auto"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              items={section.items}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      <SidebarUserPanel
        collapsed={collapsed}
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        onLogout={onLogout}
      />

      <SidebarCollapseToggle
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
      />
    </aside>
  );
}
