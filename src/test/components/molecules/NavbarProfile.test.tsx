import "../../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Mock next/link since it's not available in the pure test environment
mock.module("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a"> & {
    href: string;
    children?: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { NavbarProfile } from "@/components/molecules/NavbarProfile";

describe("NavbarProfile", () => {
  it("opens user menu with settings and logout actions", () => {
    const onLogout = mock(() => {});
    const { getByRole } = render(
      <NavbarProfile
        userName="Eva Gómez"
        roleLabel="SESION ACTIVA"
        href="/settings"
        onLogout={onLogout}
      />,
    );

    const trigger = getByRole("button", { name: /ir a ajustes de perfil/i });
    fireEvent.click(trigger);

    const settingsAction = getByRole("link", { name: /configuraciones/i });
    expect(settingsAction).toBeTruthy();
    expect(settingsAction.getAttribute("href")).toBe("/settings");

    const logoutAction = getByRole("button", { name: /cerrar sesión/i });
    fireEvent.click(logoutAction);
    expect(onLogout).toHaveBeenCalledTimes(1);

    expect(getByRole("dialog").textContent).toContain("Eva Gómez");
    expect(getByRole("dialog").textContent).toContain("SESION ACTIVA");
  });
});
