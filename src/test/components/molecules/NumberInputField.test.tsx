import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { NumberInputField } from "@/components/molecules/NumberInputField";

describe("NumberInputField", () => {
  it("renders truncated dark label and shared inline help button", () => {
    const { getByText, container } = render(
      <NumberInputField
        id="age"
        label="Edad del paciente en años con descripción extensa"
        value={30}
        min={14}
        max={100}
        help="Ayuda de ejemplo"
        onChange={() => {}}
      />,
    );

    const label = getByText(
      "Edad del paciente en años con descripción extensa",
    );
    expect(label.className.includes("truncate")).toBe(true);
    expect(label.className.includes("text-zinc-800")).toBe(true);

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    ) as HTMLButtonElement;
    expect(helpButton).toBeTruthy();
  });

  it("does not focus input when label is clicked by default", () => {
    const { container } = render(
      <NumberInputField
        id="apache"
        label="APACHE"
        value={12}
        min={0}
        max={36}
        onChange={() => {}}
      />,
    );

    const input = container.querySelector("#apache");
    if (!input) throw new Error("apache input not found");
    const label = within(container).getByText("APACHE");

    fireEvent.click(label);

    expect(document.activeElement === input).toBe(false);
  });

  it("forwards numeric value on input change", () => {
    let received = 0;
    const { container } = render(
      <NumberInputField
        id="runs"
        label="Número de corridas"
        value={200}
        min={50}
        max={100000}
        onChange={(value) => {
          received = value;
        }}
      />,
    );

    const input = container.querySelector("#runs");
    if (!input) throw new Error("runs input not found");
    fireEvent.input(input, { target: { value: "450" } });

    expect(received).toBe(450);
  });
});
