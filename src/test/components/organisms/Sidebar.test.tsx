import "../../setup";
import { act, fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { Sidebar } from "@/components/organisms/Sidebar";
import { SIDEBAR_BRAND_FULL } from "@/constants/constants";

const sections = [
  {
    title: "Principal",
    items: [{ label: "Dashboard", href: "/", active: true }],
  },
];

const nestedSections = [
  {
    title: "Principal",
    items: [
      {
        label: "Simulación",
        href: "/simulation",
        children: [{ label: "Pruebas Estadísticas", href: "/statistics" }],
      },
    ],
  },
];

describe("Sidebar", () => {
  it("renders section items", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Dashboard")).toBe(true);
  });

  it("hides labels when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    // Label stays in DOM for CSS transition — it must be aria-hidden and
    // visually collapsed (w-0 opacity-0).
    const labelSpan = container.querySelector("span[aria-hidden='true']");
    expect(labelSpan).toBeTruthy();
  });

  it("shows the collapsed item tooltip on hover", async () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const collapsedLink = container.querySelector(
      'a[title="Dashboard"]',
    ) as HTMLElement | null;

    expect(collapsedLink).toBeTruthy();
    if (!collapsedLink?.parentElement) return;

    await act(async () => {
      fireEvent.mouseEnter(collapsedLink.parentElement!);
      await new Promise((resolve) => setTimeout(resolve, 250));
    });

    const tooltip = within(document.body).getByRole("tooltip");
    expect(tooltip.textContent?.includes("Dashboard")).toBe(true);
  });

  it("renders section title when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Principal")).toBe(true);
  });

  it("hides section title when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    // Title text stays in the DOM for the collapse animation but is visually
    // hidden via opacity-0 + max-h-0. Verify the wrapper carries those classes.
    const titleWrapper = container.querySelector(".opacity-0.max-h-0");
    expect(titleWrapper).toBeTruthy();
  });

  it("renders brand full name when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes(SIDEBAR_BRAND_FULL)).toBe(true);
  });

  it("marks the active route link with aria-current", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const activeLink = container.querySelector("a[aria-current='page']");
    expect(activeLink).toBeTruthy();
  });

  it("keeps parent hierarchy item as navigation link", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarScope = within(container);

    const parentLink = sidebarScope.getByRole("link", {
      name: /simulación/i,
    });

    expect(parentLink.getAttribute("href")).toBe("/simulation");
  });

  it("expands nested children only when clicking the dedicated toggle button", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarNav = container.querySelector("nav");

    expect(sidebarNav).toBeTruthy();
    if (!sidebarNav) return;

    const navScope = within(sidebarNav);
    expect(navScope.getByText("Simulación")).toBeTruthy();

    // Children are in the DOM but visually hidden (aria-hidden) before expanding.
    const childrenWrapper = sidebarNav.querySelector("[aria-hidden='true']");
    expect(childrenWrapper).toBeTruthy();

    fireEvent.click(
      navScope.getByRole("button", { name: /expandir sección simulación/i }),
    );

    // After expanding the wrapper should no longer be aria-hidden.
    const expandedWrapper =
      sidebarNav.querySelector("[aria-hidden='false']") ??
      sidebarNav.querySelector(".max-h-96");
    expect(expandedWrapper).toBeTruthy();
  });

  it("hides nested children when collapsed", () => {
    const { container } = render(
      <Sidebar sections={nestedSections} collapsed={true} />,
    );
    const sidebarNav = container.querySelector("nav");

    expect(sidebarNav).toBeTruthy();
    if (!sidebarNav) return;

    // Children wrapper stays in DOM but must be aria-hidden + pointer-events-none.
    const hiddenWrapper = sidebarNav.querySelector(
      "[aria-hidden='true'].pointer-events-none",
    );
    expect(hiddenWrapper).toBeTruthy();
  });

  it("calls the collapse toggle callback", () => {
    const onToggleCollapse = mock(() => {});
    const { container } = render(
      <Sidebar sections={sections} onToggleCollapse={onToggleCollapse} />,
    );

    const sidebarScope = within(container);

    fireEvent.click(
      sidebarScope.getByRole("button", { name: /contraer barra lateral/i }),
    );

    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it("renders the user footer and logout action", () => {
    const onLogout = mock(() => {});
    const { container, getByRole } = render(
      <Sidebar
        sections={sections}
        userName="Alex Rodriguez"
        userRole="System Admin"
        onLogout={onLogout}
      />,
    );

    expect(container.textContent?.includes("Alex Rodriguez")).toBe(true);
    expect(container.textContent?.includes("System Admin")).toBe(true);

    fireEvent.click(getByRole("button", { name: /cerrar sesión/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("matches the footer row height with the user panel", () => {
    const { container } = render(
      <Sidebar sections={sections} userName="Alex Rodriguez" />,
    );

    const userPanel = container.querySelector(
      "[data-slot='sidebar-user-panel']",
    );

    expect(userPanel).toBeTruthy();
    if (!userPanel) return;

    expect(userPanel.className.includes("h-16")).toBe(true);
    expect(userPanel.className.includes("shrink-0")).toBe(true);
  });

  it("uses non-underlined button and link labels in the sidebar", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarScope = within(container);

    const parentLink = sidebarScope.getByRole("link", { name: /simulación/i });
    expect(parentLink.className.includes("no-underline")).toBe(true);

    fireEvent.click(
      sidebarScope.getByRole("button", {
        name: /expandir sección simulación/i,
      }),
    );

    const childLink = within(container).getByRole("link", {
      name: /pruebas estadísticas/i,
    });
    expect(childLink.className.includes("no-underline")).toBe(true);
  });

  it("applies narrow width when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-20")).toBe(true);
  });

  it("centers collapsed navigation items with a square hit area", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const collapsedLink = container.querySelector(
      'a[title="Dashboard"]',
    ) as HTMLElement | null;

    expect(collapsedLink).toBeTruthy();
    if (!collapsedLink) return;

    expect(collapsedLink.className.includes("w-11")).toBe(true);
    expect(collapsedLink.className.includes("mx-auto")).toBe(true);
    expect(collapsedLink.className.includes("flex-none")).toBe(true);
  });

  it("applies full width when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-72")).toBe(true);
  });
});
