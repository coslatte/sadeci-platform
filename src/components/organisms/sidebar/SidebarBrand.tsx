import { Text } from "@/components/atoms/Text";
import { FiGitBranch } from "react-icons/fi";
import { SIDEBAR_BRAND_FULL } from "@/constants/constants";
import { cn } from "@/lib/utils";

interface SidebarBrandProps {
  collapsed: boolean;
}

export function SidebarBrand({ collapsed }: SidebarBrandProps) {
  return (
    <div
      className={cn(
        "flex h-16 shrink-0 items-center border-b border-slate-200/80 px-4",
        collapsed && "justify-center px-0",
      )}
    >
      <div className="flex items-center min-w-0 gap-3 overflow-hidden">
        <div className="flex items-center justify-center size-10 shrink-0 rounded-2xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
          <FiGitBranch className="size-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <Text
              as="span"
              weight="semibold"
              family="secondary"
              tracking="tight"
              className="block truncate text-slate-900"
            >
              {SIDEBAR_BRAND_FULL}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
