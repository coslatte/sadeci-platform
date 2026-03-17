import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DashboardInfoSection } from "@/app/components/DashboardInfoSection";

describe("DashboardInfoSection", () => {
  it("renders title, description and children", () => {
    const { getByText } = render(
      <DashboardInfoSection
        title="Hola, Ana"
        description="Panel principal de Saduci"
      >
        <div>Contenido interno</div>
      </DashboardInfoSection>,
    );

    expect(getByText("Hola, Ana")).toBeTruthy();
    expect(getByText("Panel principal de Saduci")).toBeTruthy();
    expect(getByText("Contenido interno")).toBeTruthy();
  });

  it("applies base visual styles and merges custom className", () => {
    const { container } = render(
      <DashboardInfoSection title="Documentación" className="custom-section" />,
    );

    const section = container.querySelector("section");
    expect(section?.className.includes("py-8")).toBe(true);
    expect(section?.className.includes("bg-transparent")).toBe(true);
    expect(section?.className.includes("custom-section")).toBe(true);
  });
});
