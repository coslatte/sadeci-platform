import "../../setup";
import { render, within, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PredictionForm } from "@/app/prediction/components/PredictionForm";
import { PREDICTION_LIMITS } from "@/lib/prediction";
import {
  PREDICTION_PATIENT_SECTION_TITLE,
  PREDICTION_EDAD_LABEL,
  PREDICTION_DIAG_ING1_LABEL,
  PREDICTION_DIAG_ING2_LABEL,
  PREDICTION_DIAG_EGR2_LABEL,
  PREDICTION_APACHE_LABEL,
  PREDICTION_TIEMPO_VAM_LABEL,
  PREDICTION_PREDICT_BUTTON,
  PREDICTION_PREDICTING_BUTTON,
} from "@/constants/constants";

const DEFAULT_PROPS = {
  edad: PREDICTION_LIMITS.edad.default,
  setEdad: () => {},
  diagIng1: PREDICTION_LIMITS.diagIng1.default,
  setDiagIng1: () => {},
  diagIng2: PREDICTION_LIMITS.diagIng2.default,
  setDiagIng2: () => {},
  diagEgr2: PREDICTION_LIMITS.diagEgr2.default,
  setDiagEgr2: () => {},
  apache: PREDICTION_LIMITS.apache.default,
  setApache: () => {},
  tiempoVam: PREDICTION_LIMITS.tiempoVam.default,
  setTiempoVam: () => {},
  loading: false,
  onPredict: () => {},
};

describe("PredictionForm", () => {
  it("renders all 6 input labels", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICTION_EDAD_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_ING1_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_ING2_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_EGR2_LABEL),
    ).toBeTruthy();
    expect(within(container).getByText(PREDICTION_APACHE_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_TIEMPO_VAM_LABEL),
    ).toBeTruthy();
  });

  it("renders section header", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(
      within(container).getByText(PREDICTION_PATIENT_SECTION_TITLE),
    ).toBeTruthy();
  });

  it("renders predict button with default label", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICTION_PREDICT_BUTTON)).toBeTruthy();
  });

  it("renders predicting label when loading", () => {
    const { container } = render(
      <PredictionForm {...DEFAULT_PROPS} loading={true} />,
    );
    expect(
      within(container).getByText(PREDICTION_PREDICTING_BUTTON),
    ).toBeTruthy();
  });

  it("button is disabled when loading", () => {
    const { container } = render(
      <PredictionForm {...DEFAULT_PROPS} loading={true} />,
    );
    const btn = within(container).getByRole("button");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("calls onPredict when button is clicked", () => {
    let called = false;
    const { container } = render(
      <PredictionForm
        {...DEFAULT_PROPS}
        onPredict={() => {
          called = true;
        }}
      />,
    );
    fireEvent.click(within(container).getByRole("button"));
    expect(called).toBe(true);
  });

  it("displays default value for edad input", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    expect(input).toBeTruthy();
  });

  it("input min/max constraints match PREDICTION_LIMITS for edad", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    expect(input.getAttribute("min")).toBe(String(PREDICTION_LIMITS.edad.min));
    expect(input.getAttribute("max")).toBe(String(PREDICTION_LIMITS.edad.max));
  });

  it("calls setEdad with the new numeric value on change", () => {
    let updated = 0;
    const { container } = render(
      <PredictionForm
        {...DEFAULT_PROPS}
        setEdad={(v) => {
          updated = v;
        }}
      />,
    );
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    fireEvent.input(input, { target: { value: "35" } });
    expect(updated).toBe(35);
  });

  it("renders integrated into the page without card shadow", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(container.querySelector(".shadow-sm")).toBeNull();
  });
});
