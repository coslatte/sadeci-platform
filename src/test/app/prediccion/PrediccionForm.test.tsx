import "../../setup";
import { render, within, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PrediccionForm } from "@/app/prediccion/components/PrediccionForm";
import { PREDICCION_LIMITS } from "@/lib/prediccion";
import {
  PREDICCION_PATIENT_SECTION_TITLE,
  PREDICCION_EDAD_LABEL,
  PREDICCION_DIAG_ING1_LABEL,
  PREDICCION_DIAG_ING2_LABEL,
  PREDICCION_DIAG_EGR2_LABEL,
  PREDICCION_APACHE_LABEL,
  PREDICCION_TIEMPO_VAM_LABEL,
  PREDICCION_PREDICT_BUTTON,
  PREDICCION_PREDICTING_BUTTON,
} from "@/constants/constants";

const DEFAULT_PROPS = {
  edad: PREDICCION_LIMITS.edad.default,
  setEdad: () => {},
  diagIng1: PREDICCION_LIMITS.diagIng1.default,
  setDiagIng1: () => {},
  diagIng2: PREDICCION_LIMITS.diagIng2.default,
  setDiagIng2: () => {},
  diagEgr2: PREDICCION_LIMITS.diagEgr2.default,
  setDiagEgr2: () => {},
  apache: PREDICCION_LIMITS.apache.default,
  setApache: () => {},
  tiempoVam: PREDICCION_LIMITS.tiempoVam.default,
  setTiempoVam: () => {},
  loading: false,
  onPredict: () => {},
};

describe("PrediccionForm", () => {
  it("renders all 6 input labels", () => {
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICCION_EDAD_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICCION_DIAG_ING1_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICCION_DIAG_ING2_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICCION_DIAG_EGR2_LABEL),
    ).toBeTruthy();
    expect(within(container).getByText(PREDICCION_APACHE_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICCION_TIEMPO_VAM_LABEL),
    ).toBeTruthy();
  });

  it("renders section header", () => {
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    expect(
      within(container).getByText(PREDICCION_PATIENT_SECTION_TITLE),
    ).toBeTruthy();
  });

  it("renders predict button with default label", () => {
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICCION_PREDICT_BUTTON)).toBeTruthy();
  });

  it("renders predicting label when loading", () => {
    const { container } = render(
      <PrediccionForm {...DEFAULT_PROPS} loading={true} />,
    );
    expect(
      within(container).getByText(PREDICCION_PREDICTING_BUTTON),
    ).toBeTruthy();
  });

  it("button is disabled when loading", () => {
    const { container } = render(
      <PrediccionForm {...DEFAULT_PROPS} loading={true} />,
    );
    const btn = within(container).getByRole("button");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("calls onPredict when button is clicked", () => {
    let called = false;
    const { container } = render(
      <PrediccionForm
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
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICCION_LIMITS.edad.default),
    );
    expect(input).toBeTruthy();
  });

  it("input min/max constraints match PREDICCION_LIMITS for edad", () => {
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICCION_LIMITS.edad.default),
    );
    expect(input.getAttribute("min")).toBe(String(PREDICCION_LIMITS.edad.min));
    expect(input.getAttribute("max")).toBe(String(PREDICCION_LIMITS.edad.max));
  });

  it("calls setEdad with the new numeric value on change", () => {
    let updated = 0;
    const { container } = render(
      <PrediccionForm
        {...DEFAULT_PROPS}
        setEdad={(v) => {
          updated = v;
        }}
      />,
    );
    const input = within(container).getByDisplayValue(
      String(PREDICCION_LIMITS.edad.default),
    );
    fireEvent.input(input, { target: { value: "35" } });
    expect(updated).toBe(35);
  });

  it("renders integrated into the page without card shadow", () => {
    const { container } = render(<PrediccionForm {...DEFAULT_PROPS} />);
    expect(container.querySelector(".shadow-sm")).toBeNull();
  });
});
