import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import { SIDEBAR_LOGOUT, SIDEBAR_USER_STATUS } from "@/constants/constants";
import { routes } from "@/lib/routes";
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
    <div
      data-slot="sidebar-user-panel"
      className="mt-auto flex h-16 shrink-0 items-center border-t border-slate-200/80 bg-white/70 px-3 backdrop-blur-sm"
    >
      <div
        className={cn(
          "flex min-w-0 w-full items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-3 py-2 shadow-sm",
          collapsed && "justify-center px-2",
        )}
      >
        <Link
          href={routes.settings}
          className={cn(
            "group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-0.5 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 no-underline",
            collapsed && "flex-none justify-center",
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
            <div className="flex-1 min-w-0">
              <Text
                as="p"
                size="sm"
                weight="semibold"
                className="truncate text-slate-900 group-hover:text-primary-700"
              >
                {userName}
              </Text>
              <Text as="p" size="xs" className="truncate text-slate-500">
                {userRole || SIDEBAR_USER_STATUS}
              </Text>
            </div>
          )}
        </Link>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center transition-colors border border-transparent rounded-full size-8 shrink-0 text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
