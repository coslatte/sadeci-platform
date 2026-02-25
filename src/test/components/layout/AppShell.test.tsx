import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

describe("AppShell", () => {
  it("renders global chrome and marks active route", async () => {
    mock.module("next/navigation", () => ({
      usePathname: () => "/simulacion",
      useRouter: () => ({
        replace: () => {},
        push: () => {},
        prefetch: () => {},
      }),
    }));

    // Mock sileo toaster to avoid rendering issues during tests
    mock.module("sileo", () => ({
      Toaster: () => null as any,
      sileo: {
        success: () => {},
        error: () => {},
      },
    }));

    // Provide a mocked authenticated user so AppShell renders normally
    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test", email: "t@test", role: "Admin" },
        isAuthenticated: true,
        login: async () => {},
        logout: () => {},
      }),
    }));

    const { AppShell } = await import("@/components/layout/AppShell");

    const { getAllByText, getByText, getByRole } = render(
      <AppShell>
        <h1>Contenido de prueba</h1>
      </AppShell>,
    );

    // "Sadeci" appears in both sidebar logo and navbar breadcrumb
    expect(getAllByText("Sadeci").length).toBeGreaterThanOrEqual(1);
    expect(getByText("Dashboard")).toBeTruthy();
    // "Simulación" appears in both sidebar nav and navbar breadcrumb
    expect(getAllByText("Simulación").length).toBeGreaterThanOrEqual(1);
    expect(getByText("Contenido de prueba")).toBeTruthy();
    // Footer is rendered as a <footer> element (role=contentinfo)
    expect(getByRole("contentinfo")).toBeTruthy();

    // The sidebar nav link should have aria-current="page"
    const activeLink = getAllByText("Simulación").find(
      (el) => el.closest("a")?.getAttribute("aria-current") === "page",
    );
    expect(activeLink).toBeTruthy();
  });
});
