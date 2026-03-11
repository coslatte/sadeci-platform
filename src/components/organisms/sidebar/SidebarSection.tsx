"use client";

import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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
  manualExpanded?: Record<string, boolean>;
  onToggleManual?: (href: string) => void;
}

function TreeItem({
  item,
  depth,
  collapsed,
  manualExpanded,
  onToggleManual,
}: TreeItemProps) {
  const hasChildren = !!item.children?.length;
  const isRoot = depth === 0;
  const variant = isRoot ? "default" : "nested";
  const shouldAutoExpand = !!item.active;
  // If parent provides manualExpanded map, prefer that manual override so
  // expanded state persists across navigation. Otherwise fall back to local
  // manual state (for isolated usage).
  const [localManuallySet, setLocalManuallySet] = useState<boolean | null>(
    null,
  );
  const manualValue = manualExpanded ? manualExpanded[item.href] : undefined;
  const manuallySet =
    manualValue !== undefined ? manualValue : localManuallySet;
  const expanded =
    manuallySet !== null && manuallySet !== undefined
      ? manuallySet
      : shouldAutoExpand;

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
            depth > 0 && "min-h-10",
            collapsed && isRoot ? "mx-auto flex-none" : "flex-1",
          )}
          labelClassName={cn(depth > 0 && "text-sm font-medium")}
        />

        {hasChildren && !collapsed && (
          <button
            type="button"
            onClick={() => {
              if (onToggleManual) {
                onToggleManual(item.href);
              } else {
                setLocalManuallySet(!expanded);
              }
            }}
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
            className="inline-flex items-center justify-center transition-colors bg-white border size-10 shrink-0 rounded-xl border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {expanded ? (
              <FiChevronUp className="size-4" aria-hidden="true" />
            ) : (
              <FiChevronDown className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          aria-hidden={!showChildren}
          className={cn(
            "ml-7 mt-1 border-l border-slate-200/80 pl-4 overflow-hidden transition-all duration-300 ease-in-out",
            depth > 0 && "ml-5",
            showChildren
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <ul className="flex flex-col gap-1">
            {item.children!.map((child) => (
              <TreeItem
                key={child.href}
                item={child}
                depth={depth + 1}
                collapsed={collapsed}
                manualExpanded={manualExpanded}
                onToggleManual={onToggleManual}
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
  // Keep a map of manual expanded states keyed by item.href so user's
  // open/closed choices persist when navigating between routes.
  const [manualExpanded, setManualExpanded] = useState<Record<string, boolean>>(
    function initManual() {
      try {
        const raw = sessionStorage.getItem("saduci.sidebar.manualExpanded");
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    },
  );

  // persist to sessionStorage when manualExpanded changes
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "saduci.sidebar.manualExpanded",
        JSON.stringify(manualExpanded),
      );
    } catch {
      // ignore storage errors
    }
  }, [manualExpanded]);

  function handleToggleManual(href: string) {
    setManualExpanded((s) => ({ ...s, [href]: !s[href] }));
  }
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          collapsed ? "max-h-0 opacity-0" : "max-h-8 opacity-100",
        )}
      >
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
      </div>

      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <TreeItem
            key={item.href}
            item={item}
            depth={0}
            collapsed={collapsed}
            manualExpanded={manualExpanded}
            onToggleManual={handleToggleManual}
          />
        ))}
      </ul>
    </div>
  );
}
