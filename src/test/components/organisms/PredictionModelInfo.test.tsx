import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PredictionModelInfo } from "@/app/prediction/components/PredictionModelInfo";
import {
  PREDICTION_MODEL_INFO_TITLE,
  PREDICTION_MODEL_INFO_SUBTITLE,
  PREDICTION_MODEL_PRIMARY_TITLE,
  PREDICTION_MODEL_LIME_TITLE,
  PREDICTION_MODEL_SHAP_TITLE,
  PREDICTION_MODEL_IG_TITLE,
  PREDICTION_MODEL_SALIENCY_TITLE,
} from "@/constants/constants";

describe("PredictionModelInfo", () => {
  it("renders the model info title and subtitle", () => {
    const { container } = render(<PredictionModelInfo />);
    expect(
      within(container).getByText(PREDICTION_MODEL_INFO_TITLE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_MODEL_INFO_SUBTITLE),
    ).toBeTruthy();
  });

  it("renders each model card title", () => {
    const { container } = render(<PredictionModelInfo />);

    expect(
      within(container).getByText(PREDICTION_MODEL_PRIMARY_TITLE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_MODEL_LIME_TITLE),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_MODEL_SHAP_TITLE),
    ).toBeTruthy();
    expect(within(container).getByText(PREDICTION_MODEL_IG_TITLE)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_MODEL_SALIENCY_TITLE),
    ).toBeTruthy();
  });
});
