"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "./AppShell";
import { useAuth } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ShellController({ children }: Props) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  // For the login page we don't want the shell at all
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // while redirecting, render nothing
  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <AppShell
      userName={user?.name}
      userRole={user?.role}
      userAvatar={user?.avatar}
      onLogout={handleLogout}
    >
      {children}
    </AppShell>
  );
}
