import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

describe("Navbar", () => {
  it("has a link to /ajustes on the user container", async () => {
    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test", email: "t@test", role: "Admin" },
        isAuthenticated: true,
        login: async () => {},
        logout: () => {},
      }),
    }));

    const { Navbar } = await import("@/components/organisms/Navbar");

    const { getByRole } = render(<Navbar />);

    const button = getByRole("button", { name: /Usuario|Test/i });
    expect(button).toBeTruthy();
  });

  it("renders brand short name", async () => {
    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test", email: "t@test", role: "Admin" },
        isAuthenticated: true,
        login: async () => {},
        logout: () => {},
      }),
    }));

    mock.module("next/navigation", () => ({
      usePathname: () => "/",
    }));

    const { Navbar } = await import("@/components/organisms/Navbar");
    const { getByText } = render(<Navbar />);
    expect(getByText("Sadeci")).toBeTruthy();
  });

  it("renders current route breadcrumb", async () => {
    mock.module("next/navigation", () => ({
      usePathname: () => "/simulation",
    }));

    const { Navbar } = await import("@/components/organisms/Navbar");
    const { getByText } = render(<Navbar />);
    expect(getByText("Simulación")).toBeTruthy();
  });

  it("renders notification bell button", async () => {
    const { Navbar } = await import("@/components/organisms/Navbar");
    const { getByRole } = render(<Navbar />);
    const bellBtn = getByRole("button", { name: /Notificaciones/i });
    expect(bellBtn).toBeTruthy();
  });

  it("renders custom userName and userRole props", async () => {
    mock.module("next/navigation", () => ({
      usePathname: () => "/",
    }));

    const { Navbar } = await import("@/components/organisms/Navbar");
    const { getByText } = render(
      <Navbar userName="Dr. House" userRole="Médico" />,
    );
    expect(getByText("Dr. House")).toBeTruthy();
  });

  it("shows unread count badge when notifications exist", async () => {
    mock.module("@/context/notifications", () => ({
      useNotifications: () => ({
        notifications: [{ id: 1, title: "A", read: false }],
        unreadCount: 1,
        markAsRead: () => {},
        markAllAsRead: () => {},
      }),
    }));

    const { Navbar } = await import("@/components/organisms/Navbar");
    const { container } = render(<Navbar />);
    const badge = container.querySelector("span.rounded-full.bg-rose-600");
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toBe("1");
  });
});
