import "../../setup";
import { render, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, mock, beforeAll, beforeEach } from "bun:test";
import type { FC } from "react";

const mockBack = mock(() => {});

mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ back: mockBack }),
  useSearchParams: () => new URLSearchParams(),
}));

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

  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders brand name and current page", () => {
    const { getByText } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Simulación" />,
    );
    expect(getByText("Saduci")).toBeTruthy();
    expect(getByText("Simulación")).toBeTruthy();
  });

  it("calls router.back() when brand button is clicked", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    if (!nav) throw new Error("Breadcrumb nav not found");
    const btn = within(nav).getByRole("button", { name: /Saduci/ });
    fireEvent.click(btn);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("brand button has descriptive aria-label", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Usuarios" />,
    );
    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    if (!nav) throw new Error("Breadcrumb nav not found");
    const btn = within(nav).getByRole("button", { name: /Saduci/ });
    expect(btn.getAttribute("aria-label")).toContain("Saduci");
  });

  it("current page has aria-current='page'", () => {
    const { getByText } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Ajustes" />,
    );
    expect(getByText("Ajustes").getAttribute("aria-current")).toBe("page");
  });

  it("renders nav landmark with breadcrumb label", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(nav.getAttribute("aria-label")).toBe("Breadcrumb");
  });
});
