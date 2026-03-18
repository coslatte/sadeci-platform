import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { FormField } from "@/components/molecules/FormField";

describe("FormField", () => {
  it("renders label and input", () => {
    const { container } = render(
      <FormField
        id="patient-age"
        label="Edad"
        inputProps={{ type: "number" }}
      />,
    );

    expect(within(container).getByLabelText("Edad")).toBeTruthy();
  });

  it("renders shared help button when help is provided", () => {
    const { container } = render(
      <FormField
        id="prediction-age"
        label="Edad"
        help="Edad del paciente en años"
        inputProps={{ type: "number", value: 45, onChange: () => {} }}
      />,
    );

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    );

    expect(helpButton).toBeTruthy();
    expect(container.textContent?.includes("Edad del paciente en años")).toBe(
      true,
    );
  });
});
