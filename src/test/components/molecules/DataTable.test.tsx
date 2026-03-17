import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DataTable } from "@/components/molecules/DataTable";

describe("DataTable", () => {
  it("renders columns and rows", () => {
    const { getByText } = render(
      <DataTable
        ariaLabel="Tabla de prueba"
        columns={[
          { key: "metric", label: "Métrica" },
          { key: "value", label: "Valor", align: "right" },
        ]}
        rows={[{ metric: "Estadístico", value: "4.1250" }]}
      />,
    );

    expect(getByText("Métrica")).toBeTruthy();
    expect(getByText("Valor")).toBeTruthy();
    expect(getByText("Estadístico")).toBeTruthy();
    expect(getByText("4.1250")).toBeTruthy();
  });

  it("renders shared help button when help text is provided", () => {
    const { container, getByText } = render(
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
    expect(getByText("Interpretación de la tabla")).toBeTruthy();
  });
});
