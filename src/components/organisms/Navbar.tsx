"use client";

import { cn, dataDisabledProps } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { SearchBar } from "@/components/molecules/SearchBar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ROUTE_NAMES: Record<string, string> = {
  "/": "Dashboard",
  "/simulacion": "Simulación",
  "/reportes": "Reportes",
  "/usuarios": "Usuarios",
  "/ajustes": "Ajustes",
};

interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  disabled?: boolean;
  pathname?: string;
}

export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  collapsed = false,
  onToggleCollapse,
  disabled,
  pathname = "/",
}: NavbarProps) {
  const currentPage = ROUTE_NAMES[pathname] ?? "Sadeci";

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="cursor-pointer hover:text-slate-800">Sadeci</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-primary-700">{currentPage}</span>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden md:inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          disabled={disabled}
        >
          {collapsed ? (
            <FiChevronRight className="size-4" />
          ) : (
            <FiChevronLeft className="size-4" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <SearchBar placeholder="Buscar..." disabled={disabled} />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <Avatar src={userAvatar} name={userName} size="xs" />
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-sm font-medium text-slate-900">
              {userName}
            </span>
            <span className="text-xs text-slate-500">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
