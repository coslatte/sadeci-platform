import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { StatisticsResultSection } from "@/app/statistics/components/StatisticsResultSection";
import type { StatisticalTestResult } from "@/lib/statistics";

const result: StatisticalTestResult = {
  statistic: 4.125,
  p_value: 0.0312,
};

describe("StatisticsResultSection", () => {
  it("renders warning together with statistical results", () => {
    const { getByText, container } = render(
      <StatisticsResultSection
        result={result}
        warning="Se ajustaron los tamaños de muestra."
        error={null}
      />,
    );

    expect(getByText("Se ajustaron los tamaños de muestra.")).toBeTruthy();
    expect(getByText("Resultados")).toBeTruthy();
    expect(container.textContent?.includes("4.1250")).toBe(true);
    expect(container.textContent?.includes("0.0312")).toBe(true);
  });

  it("renders error message when provided", () => {
    const { getByText } = render(
      <StatisticsResultSection
        result={null}
        warning={null}
        error="Error al procesar los archivos CSV."
      />,
    );

    expect(getByText("Error al procesar los archivos CSV.")).toBeTruthy();
  });
});
