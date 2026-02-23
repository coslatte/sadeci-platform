import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Sidebar } from "@/components/organisms/Sidebar";

const sections = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", href: "/", active: true },
      { label: "Reportes", href: "/reportes" },
    ],
  },
];

describe("Sidebar", () => {
  it("renders section items", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByText("Reportes")).toBeTruthy();
  });

  it("renders the test-page link", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    expect(getByText("Página de pruebas")).toBeTruthy();
  });

  it("test-page link points to /test", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    const link = getByText("Página de pruebas").closest("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("/test");
  });

  it("hides labels when collapsed", () => {
    const { queryByText } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(queryByText("Dashboard")).toBeNull();
    expect(queryByText("Página de pruebas")).toBeNull();
  });

  it("renders section title when not collapsed", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    expect(getByText("Principal")).toBeTruthy();
  });

  it("hides section title when collapsed", () => {
    const { queryByText } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(queryByText("Principal")).toBeNull();
  });
});
