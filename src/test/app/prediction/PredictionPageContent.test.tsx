import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PredictionPageContent } from "@/app/prediction/components/PredictionPageContent";
import {
  PREDICTION_PAGE_TITLE,
  PREDICTION_PAGE_SUBTITLE,
  PREDICTION_MODEL_INFO_TITLE,
  PREDICTION_PATIENT_SECTION_TITLE,
  PREDICTION_RESULT_EMPTY_STATE,
  PREDICTION_EXPLAIN_SECTION_TITLE,
} from "@/constants/constants";

describe("PredictionPageContent", () => {
  it("renders the main prediction workflow sections", () => {
    const { container } = render(<PredictionPageContent />);

    expect(within(container).getByText(PREDICTION_PAGE_TITLE)).toBeTruthy();
    expect(within(container).getByText(PREDICTION_PAGE_SUBTITLE)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_MODEL_INFO_TITLE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_PATIENT_SECTION_TITLE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_RESULT_EMPTY_STATE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_EXPLAIN_SECTION_TITLE),
    ).toBeTruthy();
  });

  it("renders the prediction form and explanation panel side by side content", () => {
    const { container } = render(<PredictionPageContent />);

    expect(container.querySelector("#pred-edad")).toBeTruthy();
    expect(container.querySelector("#pred-apache")).toBeTruthy();
    expect(container.querySelector("#pred-tiempo-vam")).toBeTruthy();
    expect(container.querySelector("#pred-method")).toBeTruthy();
  });
});
