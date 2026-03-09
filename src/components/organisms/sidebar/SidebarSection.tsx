"use client";

import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavItem } from "@/components/molecules/NavItem";
import { Text } from "@/components/atoms/Text";
import {
  SIDEBAR_SECTION_COLLAPSE,
  SIDEBAR_SECTION_EXPAND,
} from "@/constants/constants";
import { cn } from "@/lib/utils";
import type { NavItemType } from "@/lib/types";

interface SidebarSectionProps {
  title: string;
  items: NavItemType[];
  collapsed: boolean;
}

interface TreeItemProps {
  item: NavItemType;
  depth: number;
  collapsed: boolean;
}

function TreeItem({ item, depth, collapsed }: TreeItemProps) {
  const hasChildren = !!item.children?.length;
  const isRoot = depth === 0;
  const variant = isRoot ? "default" : "nested";
  const shouldAutoExpand = !!item.active;
  const [expanded, setExpanded] = useState(shouldAutoExpand);

  useEffect(() => {
    if (shouldAutoExpand) {
      setExpanded(true);
    }
  }, [shouldAutoExpand]);

  const showChildren = hasChildren && !collapsed && expanded;

  return (
    <li className="relative">
      <div className="flex items-center gap-2">
        <NavItem
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          current={item.current}
          collapsed={collapsed && isRoot}
          variant={variant}
          className={cn(
            "flex-1",
            depth > 0 && "min-h-10",
            collapsed && isRoot && "mx-auto size-12 rounded-2xl px-0",
          )}
          labelClassName={cn(depth > 0 && "text-sm font-medium")}
        />

        {hasChildren && !collapsed && (
          <button
            type="button"
            onClick={() => setExpanded((currentExpanded) => !currentExpanded)}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? SIDEBAR_SECTION_COLLAPSE(item.label)
                : SIDEBAR_SECTION_EXPAND(item.label)
            }
            title={
              expanded
                ? SIDEBAR_SECTION_COLLAPSE(item.label)
                : SIDEBAR_SECTION_EXPAND(item.label)
            }
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {expanded ? (
              <FiChevronDown className="size-4" aria-hidden="true" />
            ) : (
              <FiChevronRight className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {showChildren && (
        <div
          className={cn(
            "ml-7 mt-1 border-l border-slate-200/80 pl-4",
            depth > 0 && "ml-5",
          )}
        >
          <ul className="flex flex-col gap-1">
            {item.children!.map((child) => (
              <TreeItem
                key={child.href}
                item={child}
                depth={depth + 1}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function SidebarSection({
  title,
  items,
  collapsed,
}: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {!collapsed && (
        <Text
          as="p"
          size="xs"
          weight="bold"
          uppercase
          tracking="widest"
          className="px-3 text-slate-400"
        >
          {title}
        </Text>
      )}

      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <TreeItem
            key={item.href}
            item={item}
            depth={0}
            collapsed={collapsed}
          />
        ))}
      </ul>
    </div>
  );
}
