import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DataTable } from "@/components/molecules/DataTable";

describe("DataTable", () => {
  it("renders columns and rows", () => {
    const { container } = render(
      <DataTable
        ariaLabel="Tabla de prueba"
        columns={[
          { key: "metric", label: "Métrica" },
          { key: "value", label: "Valor", align: "right" },
        ]}
        rows={[{ metric: "Estadístico", value: "4.1250" }]}
      />,
    );

    expect(within(container).getByText("Métrica")).toBeTruthy();
    expect(within(container).getByText("Valor")).toBeTruthy();
    expect(within(container).getByText("Estadístico")).toBeTruthy();
    expect(within(container).getByText("4.1250")).toBeTruthy();
  });

  it("renders shared help button when help text is provided", () => {
    const { container } = render(
      <DataTable
        ariaLabel="Tabla de resultados"
        help="Interpretación de la tabla"
        columns={[{ key: "metric", label: "Métrica" }]}
        rows={[{ metric: "Media" }]}
      />,
    );

    expect(
      container.querySelector('[aria-label="Información de ayuda del campo"]'),
    ).toBeTruthy();
    expect(
      within(container).getByText("Interpretación de la tabla"),
    ).toBeTruthy();
  });
});
