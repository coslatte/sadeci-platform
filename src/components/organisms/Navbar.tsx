"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { cn, dataDisabledProps } from "@/lib/utils";
import {
  NAV_BRAND_SHORT,
  NAVBAR_PROFILE_SETTINGS,
  SIDEBAR_LOGOUT,
  SIDEBAR_USER_STATUS,
} from "@/constants/constants";
import { NavBreadcrumb } from "@/components/molecules/NavBreadcrumb";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import { getBreadcrumbSegments, getRouteNameForPath } from "@/lib/navigation";
import { routes } from "@/lib/routes";

/**
 * Props for the `Navbar` component.
 *
 * The navbar renders the brand and a breadcrumb for the current route.
 */
interface NavbarProps {
  className?: string;
  disabled?: boolean;
  pathname?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

/**
 * Navbar
 *
 * Top-level application navigation header. Shows brand and current route name.
 * When used inside the app shell it will read pathname from
 * `next/navigation` if a `pathname` prop is not provided.
 *
 * @param props - NavbarProps
 * Used in X case: top header navigation inside authenticated pages.
 */
export function Navbar({
  className,
  disabled,
  pathname,
  userName,
  userRole,
  userAvatar,
  onLogout,
}: NavbarProps) {
  const pathnameFromHook = usePathname();
  const detectedPath = pathname ?? pathnameFromHook ?? "/";
  const currentPage = getRouteNameForPath(detectedPath) ?? NAV_BRAND_SHORT;
  const breadcrumbSegments = getBreadcrumbSegments(detectedPath);
  const showProfile = typeof userName === "string" && userName.length > 0;
  const roleLabel = (userRole || SIDEBAR_USER_STATUS).toUpperCase();

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 surface-backdrop-medium px-8",
        className,
      )}
    >
      <NavBreadcrumb
        brandName={NAV_BRAND_SHORT}
        currentPage={currentPage}
        segments={breadcrumbSegments}
      />

      {showProfile && (
        <div className="flex items-center min-w-0 gap-3 ml-4">
          <Link
            href={routes.settings}
            aria-label={NAVBAR_PROFILE_SETTINGS}
            className="group flex min-w-0 items-center gap-2 px-1 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
          >
            <Avatar
              src={userAvatar}
              name={userName}
              alt={`Perfil de ${userName}`}
              size="sm"
            />
            <div className="min-w-0 text-left">
              <Text
                as="p"
                size="sm"
                weight="semibold"
                className="truncate text-slate-800 group-hover:text-primary-700"
              >
                {userName}
              </Text>
              <div className="flex items-center gap-1.5">
                <span
                  data-slot="navbar-user-online-indicator"
                  aria-hidden
                  className="size-1.5 rounded-full bg-primary-500"
                />
                <Text as="p" size="xs" className="truncate text-slate-500">
                  {roleLabel}
                </Text>
              </div>
            </div>
          </Link>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center transition-colors rounded-md size-8 text-slate-500 hover:bg-slate-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
              aria-label={SIDEBAR_LOGOUT}
              title={SIDEBAR_LOGOUT}
            >
              <FiLogOut className="size-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
