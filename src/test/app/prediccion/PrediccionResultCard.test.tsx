import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PrediccionResultCard } from "@/app/prediccion/components/PrediccionResultCard";
import {
  PREDICCION_RESULT_TITLE,
  PREDICCION_PATIENT_DIES,
  PREDICCION_PATIENT_SURVIVES,
} from "@/constants/constants";

describe("PrediccionResultCard", () => {
  it("renders the section title", () => {
    const { container } = render(<PrediccionResultCard probability={0.6} />);
    expect(within(container).getByText(PREDICCION_RESULT_TITLE)).toBeTruthy();
  });

  it("shows dies label when probability >= 0.5", () => {
    const { container } = render(<PrediccionResultCard probability={0.72} />);
    expect(within(container).getByText(PREDICCION_PATIENT_DIES)).toBeTruthy();
  });

  it("shows survives label when probability < 0.5", () => {
    const { container } = render(<PrediccionResultCard probability={0.3} />);
    expect(
      within(container).getByText(PREDICCION_PATIENT_SURVIVES),
    ).toBeTruthy();
  });

  it("shows survives label at exactly 0", () => {
    const { container } = render(<PrediccionResultCard probability={0} />);
    expect(
      within(container).getByText(PREDICCION_PATIENT_SURVIVES),
    ).toBeTruthy();
  });

  it("shows dies label at exactly 0.5", () => {
    const { container } = render(<PrediccionResultCard probability={0.5} />);
    expect(within(container).getByText(PREDICCION_PATIENT_DIES)).toBeTruthy();
  });

  it("displays the probability formatted to 1 decimal percentage", () => {
    const { container } = render(<PrediccionResultCard probability={0.723} />);
    expect(within(container).getByText("72.3%")).toBeTruthy();
  });

  it("displays 0.0% for zero probability", () => {
    const { container } = render(<PrediccionResultCard probability={0} />);
    expect(within(container).getByText("0.0%")).toBeTruthy();
  });

  it("displays 100.0% for probability 1", () => {
    const { container } = render(<PrediccionResultCard probability={1} />);
    expect(within(container).getByText("100.0%")).toBeTruthy();
  });

  it("renders integrated into the page without card shadow", () => {
    const { container } = render(<PrediccionResultCard probability={0.6} />);
    expect(container.querySelector(".shadow-sm")).toBeNull();
  });
});
