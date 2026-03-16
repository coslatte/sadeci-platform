import "../../setup";
import { render, within, fireEvent } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { EXPLANATION_METHODS } from "@/lib/prediction";
import {
  PREDICCION_EXPLAIN_SECTION_TITLE,
  PREDICCION_METHOD_LABEL,
  PREDICCION_EXPLAIN_BUTTON,
  PREDICCION_WARN_NO_PREDICTION,
  PREDICCION_FEATURE_IMPORTANCE_TITLE,
} from "@/constants/constants";

mock.module("recharts", () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Cell: () => null,
  ReferenceLine: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import { ExplicacionPanel } from "@/app/prediction/components/ExplicacionPanel";

const BASE_PROPS = {
  hasPrediction: true,
  method: EXPLANATION_METHODS[0],
  setMethod: () => {},
  loading: false,
  onExplain: () => {},
  result: null,
  error: null,
};

describe("ExplicacionPanel", () => {
  it("renders section title", () => {
    const { container } = render(<ExplicacionPanel {...BASE_PROPS} />);
    expect(
      within(container).getByText(PREDICCION_EXPLAIN_SECTION_TITLE),
    ).toBeTruthy();
  });

  it("renders method label", () => {
    const { container } = render(<ExplicacionPanel {...BASE_PROPS} />);
    expect(within(container).getByText(PREDICCION_METHOD_LABEL)).toBeTruthy();
  });

  it("renders explain button", () => {
    const { container } = render(<ExplicacionPanel {...BASE_PROPS} />);
    expect(within(container).getByText(PREDICCION_EXPLAIN_BUTTON)).toBeTruthy();
  });

  it("shows warning alert when hasPrediction is false", () => {
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} hasPrediction={false} />,
    );
    expect(
      within(container).getByText(PREDICCION_WARN_NO_PREDICTION),
    ).toBeTruthy();
  });

  it("does not show warning when hasPrediction is true", () => {
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} hasPrediction={true} />,
    );
    const warning = within(container).queryByText(
      PREDICCION_WARN_NO_PREDICTION,
    );
    expect(warning).toBeNull();
  });

  it("explain button is disabled when hasPrediction is false", () => {
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} hasPrediction={false} />,
    );
    const buttons = within(container).getAllByRole("button");
    const explainBtn = buttons[buttons.length - 1];
    expect(explainBtn.hasAttribute("disabled")).toBe(true);
  });

  it("explain button is disabled when loading", () => {
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} loading={true} />,
    );
    const buttons = within(container).getAllByRole("button");
    const explainBtn = buttons[buttons.length - 1];
    expect(explainBtn.hasAttribute("disabled")).toBe(true);
  });

  it("calls onExplain when button is clicked and prediction exists", () => {
    let called = false;
    const { container } = render(
      <ExplicacionPanel
        {...BASE_PROPS}
        onExplain={() => {
          called = true;
        }}
      />,
    );
    const buttons = within(container).getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(called).toBe(true);
  });

  it("renders error alert when error is provided", () => {
    const errorMsg = "Error de conexión al servidor";
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} error={errorMsg} />,
    );
    expect(within(container).getByText(errorMsg)).toBeTruthy();
  });

  it("renders feature importance title and chart when result is provided", () => {
    const result = {
      feature_names: ["Edad", "APACHE", "TiempoVAM"],
      importances: [0.45, -0.3, 0.1],
    };
    const { container } = render(
      <ExplicacionPanel {...BASE_PROPS} result={result} />,
    );
    expect(
      within(container).getByText(PREDICCION_FEATURE_IMPORTANCE_TITLE),
    ).toBeTruthy();
    expect(within(container).getByTestId("bar-chart")).toBeTruthy();
  });

  it("renders integrated into the page without card shadow", () => {
    const { container } = render(<ExplicacionPanel {...BASE_PROPS} />);
    expect(container.querySelector(".shadow-sm")).toBeNull();
  });
});
