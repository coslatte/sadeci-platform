"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { SearchBar } from "@/components/molecules/SearchBar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  collapsed = false,
  onToggleCollapse,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-200 bg-white px-6",
        className,
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold text-zinc-900"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
          S
        </span>
        <span className="text-base">Sadeci</span>
      </Link>

      {/* Collapse/expand sidebar (desktop) */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden md:inline-flex items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? (
          <FiChevronRight className="size-4" />
        ) : (
          <FiChevronLeft className="size-4" />
        )}
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden sm:block w-56">
          <SearchBar placeholder="Buscar..." />
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Notificaciones"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <Avatar src={userAvatar} name={userName} size="sm" />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-medium text-zinc-900">
              {userName}
            </span>
            <span className="text-xs text-zinc-500">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
