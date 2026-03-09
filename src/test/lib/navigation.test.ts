import "../setup";
import { describe, expect, it } from "bun:test";
import {
  getBreadcrumbSegments,
  getRouteNameForPath,
  isRouteActive,
  resolveSidebarSections,
} from "@/lib/navigation";

describe("navigation helpers", () => {
  it("marks nested paths as active", () => {
    expect(isRouteActive("/simulation", "/simulation/resultados")).toBe(true);
    expect(isRouteActive("/statistics", "/simulation/resultados")).toBe(false);
  });

  it("returns the best matching route name for nested paths", () => {
    expect(getRouteNameForPath("/simulation/resultados")).toBe("Simulación");
    expect(getRouteNameForPath("/statistics/detalle")).toBe(
      "Pruebas Estadísticas",
    );
  });

  it("returns breadcrumb segments using closest configured route", () => {
    expect(getBreadcrumbSegments("/statistics/detalle")).toEqual([
      { label: "Simulación", href: "/simulation" },
    ]);
  });

  it("marks ancestors active while only the exact child is current", () => {
    const sections = resolveSidebarSections("/statistics", [
      {
        title: "Principal",
        items: [
          {
            label: "Simulación",
            href: "/simulation",
            children: [
              {
                label: "Pruebas Estadísticas",
                href: "/statistics",
              },
            ],
          },
        ],
      },
    ]);

    const simulationItem = sections[0]?.items[0];
    const statisticsItem = simulationItem?.children?.[0];

    expect(simulationItem?.active).toBe(true);
    expect(simulationItem?.current).toBeUndefined();
    expect(statisticsItem?.active).toBe(true);
    expect(statisticsItem?.current).toBe(true);
  });
});
