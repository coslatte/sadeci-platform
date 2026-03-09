import { FiLogOut } from "react-icons/fi";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import { SIDEBAR_LOGOUT, SIDEBAR_USER_STATUS } from "@/constants/constants";
import { cn } from "@/lib/utils";

interface SidebarUserPanelProps {
  collapsed: boolean;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export function SidebarUserPanel({
  collapsed,
  userName = "Usuario",
  userRole = "",
  userAvatar,
  onLogout,
}: SidebarUserPanelProps) {
  return (
    <div className="mt-auto border-t border-slate-200/80 bg-white/70 p-3 backdrop-blur-sm">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-3 py-3 shadow-sm",
          collapsed && "flex-col px-2 py-2",
        )}
      >
        <div className="relative shrink-0">
          <Avatar
            src={userAvatar}
            name={userName}
            alt={`Perfil de ${userName}`}
            size="sm"
          />
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <Text
              as="p"
              size="sm"
              weight="semibold"
              className="truncate text-slate-900"
            >
              {userName}
            </Text>
            <Text as="p" size="xs" className="truncate text-slate-500">
              {userRole || SIDEBAR_USER_STATUS}
            </Text>
          </div>
        )}

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              collapsed ? "size-9" : "size-10",
            )}
            aria-label={SIDEBAR_LOGOUT}
            title={SIDEBAR_LOGOUT}
          >
            <FiLogOut className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
