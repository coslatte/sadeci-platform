import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { NAV_BRAND_SHORT } from "@/constants/constants";

// Provide navigation stubs before the static Navbar import is resolved.
// Without this, NavBreadcrumb's useRouter() would throw in the test env.
mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {} }),
  useSearchParams: () => new URLSearchParams(),
}));

import { Navbar } from "@/components/organisms/Navbar";

describe("Navbar", () => {
  it("renders brand short name", () => {
    const { container } = render(<Navbar pathname="/" />);
    expect(container.textContent?.includes(NAV_BRAND_SHORT)).toBe(true);
  });

  it("renders current route breadcrumb", () => {
    const { container } = render(<Navbar pathname="/simulation" />);
    expect(container.textContent?.includes("Simulación")).toBe(true);
  });

  it("does not render user controls in the navbar", () => {
    const { container } = render(<Navbar pathname="/" />);
    expect(
      container.querySelector("button[aria-haspopup='dialog']"),
    ).toBeNull();
    expect(container.textContent?.includes("Ajustes")).toBe(false);
    expect(container.textContent?.includes("Cerrar sesión")).toBe(false);
  });
});
