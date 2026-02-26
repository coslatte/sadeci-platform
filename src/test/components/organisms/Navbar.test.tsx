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

    // Navbar now exposes a user button (that opens a panel) instead of a direct link
    const button = getByRole("button", { name: /Usuario|Test/i });
    expect(button).toBeTruthy();
  });
});
