import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
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
    expect(container.textContent?.includes("Dashboard")).toBe(false);
  });

  it("renders section title when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Principal")).toBe(true);
  });

  it("hides section title when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(container.textContent?.includes("Principal")).toBe(false);
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
    expect(navScope.queryByText("Pruebas Estadísticas")).toBeNull();

    fireEvent.click(
      navScope.getByRole("button", { name: /expandir sección simulación/i }),
    );

    expect(navScope.getByText("Pruebas Estadísticas")).toBeTruthy();
  });

  it("hides nested children when collapsed", () => {
    const { container } = render(
      <Sidebar sections={nestedSections} collapsed={true} />,
    );
    const sidebarNav = container.querySelector("nav");

    expect(sidebarNav).toBeTruthy();
    if (!sidebarNav) return;

    const navScope = within(sidebarNav);
    expect(navScope.queryByText("Pruebas Estadísticas")).toBeNull();
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
    expect(aside.className.includes("w-24")).toBe(true);
  });

  it("applies full width when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-72")).toBe(true);
  });
});
