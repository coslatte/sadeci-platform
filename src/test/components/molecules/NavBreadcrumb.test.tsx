import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it, beforeAll } from "bun:test";
import type { FC } from "react";

interface NavBreadcrumbProps {
  brandName: string;
  currentPage: string;
  className?: string;
}

describe("NavBreadcrumb", () => {
  let NavBreadcrumb: FC<NavBreadcrumbProps>;

  beforeAll(async () => {
    NavBreadcrumb = (await import("@/components/molecules/NavBreadcrumb"))
      .NavBreadcrumb;
  });

  it("renders brand name as a link to home", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Simulación" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    const brandLink = within(nav).getByRole("link", { name: /Saduci/ });
    expect(brandLink).toBeTruthy();
    expect(brandLink.getAttribute("href")).toBe("/");
  });

  it("brand link has descriptive aria-label", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Usuarios" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    const brandLink = within(nav).getByRole("link", { name: /Saduci/ });
    expect(brandLink.getAttribute("aria-label")).toContain("Saduci");
  });

  it("current page has aria-current='page'", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Ajustes" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(within(nav).getByText("Ajustes").getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("renders nav landmark with breadcrumb label", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(nav.getAttribute("aria-label")).toBe("Breadcrumb");
  });

  it("renders intermediate segment links when segments are provided", () => {
    const segments = [{ label: "Simulación", href: "/simulation" }];
    const { container } = render(
      <NavBreadcrumb
        brandName="Saduci"
        currentPage="Pruebas Estadísticas"
        segments={segments}
      />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    const segLink = within(nav).getByRole("link", { name: "Simulación" });
    expect(segLink).toBeTruthy();
    expect(segLink.getAttribute("href")).toBe("/simulation");
  });
});
