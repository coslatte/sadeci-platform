"use client";

import { usePathname } from "next/navigation";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NAV_BRAND_SHORT } from "@/constants/constants";
import { NavBreadcrumb } from "@/components/molecules/NavBreadcrumb";
import { getBreadcrumbSegments, getRouteNameForPath } from "@/lib/navigation";

/**
 * Props for the `Navbar` component.
 *
 * The navbar renders the brand and a breadcrumb for the current route.
 */
interface NavbarProps {
  className?: string;
  disabled?: boolean;
  pathname?: string;
}

/**
 * Navbar
 *
 * Top-level application navigation header. Shows brand and current route name.
 * When used inside the app shell it will read pathname from
 * `next/navigation` if a `pathname` prop is not provided.
 *
 * @param props - NavbarProps
 */
export function Navbar({ className, disabled, pathname }: NavbarProps) {
  const pathnameFromHook = usePathname();
  const detectedPath = pathname ?? pathnameFromHook ?? "/";
  const currentPage = getRouteNameForPath(detectedPath) ?? NAV_BRAND_SHORT;
  const breadcrumbSegments = getBreadcrumbSegments(detectedPath);

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "z-10 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-8",
        className,
      )}
    >
      <NavBreadcrumb
        brandName={NAV_BRAND_SHORT}
        currentPage={currentPage}
        segments={breadcrumbSegments}
      />
    </header>
  );
}
