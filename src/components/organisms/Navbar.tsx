"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NAV_BRAND_SHORT, ROUTE_NAMES_MAP } from "@/constants/constants";
import { Avatar } from "@/components/atoms/Avatar";
import { Popover } from "@/components/molecules/Popover";
import { NotificationsPanel } from "@/components/molecules/NotificationsPanel";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "@/context/notifications";

/**
 * Props for the `Navbar` component.
 *
 * The navbar renders the brand, a breadcrumb for the current route and the
 * user controls (avatar + menu). It also exposes a notifications bell that
 * reads from the `Notifications` context when available.
 */
interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  disabled?: boolean;
  pathname?: string;
  onLogout?: () => void;
}

/**
 * Navbar
 *
 * Top-level application navigation header. Shows brand, current route name and
 * user controls. When used inside the app shell it will read pathname from
 * `next/navigation` if a `pathname` prop is not provided.
 *
 * @param props - NavbarProps
 */
export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  disabled,
  pathname,
  onLogout,
}: NavbarProps) {
  const detectedPath = pathname ?? usePathname?.() ?? "/";
  const currentPage = ROUTE_NAMES_MAP[detectedPath] ?? NAV_BRAND_SHORT;

  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  function toggleUserMenu() {
    setUserMenuOpen((s) => !s);
  }

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-(length:--font-size-sm) text-slate-500">
        <span className="cursor-pointer hover:text-slate-800">
          {NAV_BRAND_SHORT}
        </span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-primary-700">{currentPage}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="relative">
            <Popover
              align="right"
              trigger={
                <button
                  type="button"
                  className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  title="Notificaciones"
                  aria-label="Notificaciones"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
              }
            >
              <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            </Popover>
          </div>

          <button
            type="button"
            onClick={toggleUserMenu}
            className="flex items-center gap-3 px-3 py-2 no-underline transition-shadow duration-150 bg-white border rounded-lg shadow-sm border-slate-200 hover:shadow-md hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
            aria-label={`Usuario ${userName}`}
            title={userName}
          >
            <Avatar src={userAvatar} name={userName} size="xs" />
            <div className="flex-col hidden leading-none lg:flex">
              <span className="text-(length:--font-size-sm) font-medium text-slate-900">
                {userName}
              </span>
              <span className="text-(length:--font-size-xs) text-slate-500">
                {userRole}
              </span>
            </div>
          </button>

          {/* Simple user panel dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg top-full">
              <ul className="flex flex-col p-2">
                <li>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 text-sm border border-transparent rounded text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Ajustes
                  </Link>
                </li>
                {onLogout && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3 py-2 text-sm text-left border border-transparent rounded text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
