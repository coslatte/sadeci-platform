import { Text } from "@/components/atoms/Text";
import { FiGitBranch } from "react-icons/fi";
import { SIDEBAR_BRAND_FULL } from "@/constants/constants";

interface SidebarBrandProps {
  collapsed: boolean;
}

export function SidebarBrand({ collapsed }: SidebarBrandProps) {
  return (
    <div className="flex h-16 shrink-0 items-center border-b border-slate-200/80 px-4">
      <div className="flex min-w-0 items-center gap-3 overflow-hidden">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
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
