import "../../setup";
import { render, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { useState } from "react";
import { Input } from "@/components/atoms/Input";

describe("Input", () => {
  it("renders an input element", () => {
    const { container } = render(<Input />);
    expect(container.querySelector("input")).toBeTruthy();
  });

  it("applies w-full to both container and input by default (fullWidth=true)", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstElementChild as HTMLElement;
    const input = container.querySelector("input") as HTMLElement;
    expect(wrapper.className.includes("w-full")).toBe(true);
    expect(input.className.includes("w-full")).toBe(true);
  });

  it("does not apply w-full when fullWidth=false", () => {
    const { container } = render(<Input fullWidth={false} />);
    const wrapper = container.firstElementChild as HTMLElement;
    const input = container.querySelector("input") as HTMLElement;
    expect(wrapper.className.includes("w-full")).toBe(false);
    expect(input.className.includes("w-full")).toBe(false);
  });

  it("applies error styles when error=true", () => {
    const { container } = render(<Input error />);
    const input = container.querySelector("input") as HTMLElement;
    expect(input.className.includes("border-red-400")).toBe(true);
  });

  it("does not apply error styles by default", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input") as HTMLElement;
    expect(input.className.includes("border-red-400")).toBe(false);
    expect(input.className.includes("border-zinc-300")).toBe(true);
  });

  it("applies pr-12 padding when number controls are active", () => {
    const { container } = render(<Input type="number" />);
    const input = container.querySelector("input") as HTMLElement;
    expect(input.className.includes("pr-12")).toBe(true);
  });

  it("applies pr-3 padding when no controls or info", () => {
    const { container } = render(<Input type="text" />);
    const input = container.querySelector("input") as HTMLElement;
    expect(input.className.includes("pr-3")).toBe(true);
  });

  it("shows number controls for type=number by default", () => {
    const { container } = render(<Input type="number" />);
    expect(within(container).getByLabelText("Incrementar valor")).toBeTruthy();
    expect(within(container).getByLabelText("Disminuir valor")).toBeTruthy();
  });

  it("hides number controls when showNumberControls=false", () => {
    const { container } = render(
      <Input type="number" showNumberControls={false} />,
    );
    expect(
      container.querySelector('[aria-label="Incrementar valor"]'),
    ).toBeNull();
  });

  it("hides number controls for type=text", () => {
    const { container } = render(<Input type="text" />);
    expect(
      container.querySelector('[aria-label="Incrementar valor"]'),
    ).toBeNull();
  });

  it("hides number controls when disabled", () => {
    const { container } = render(<Input type="number" disabled />);
    expect(
      container.querySelector('[aria-label="Incrementar valor"]'),
    ).toBeNull();
  });

  it("shows info icon button when info prop is provided", () => {
    const { getByLabelText } = render(<Input info="Texto de ayuda" />);
    expect(getByLabelText("Más información")).toBeTruthy();
  });

  it("does not render info icon when info is not provided", () => {
    const { container } = render(<Input />);
    expect(
      container.querySelector('[aria-label="Más información"]'),
    ).toBeNull();
  });

  it("shows help badge when help prop is provided", () => {
    const { container } = render(<Input help="Texto de ayuda del campo" />);
    expect(
      within(container).getByLabelText("Información de ayuda del campo"),
    ).toBeTruthy();
  });

  it("does not render help badge when help is not provided", () => {
    const { container } = render(<Input />);
    expect(
      container.querySelector('[aria-label="Información de ayuda del campo"]'),
    ).toBeNull();
  });

  it("help tooltip contains the provided help text", () => {
    const helpText = "Descripción detallada del campo";
    const { container } = render(<Input help={helpText} />);
    const tooltip = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent?.includes(helpText)).toBe(true);
  });

  it("info tooltip contains the provided info text", () => {
    const infoText = "Info sobre el campo";
    const { container } = render(<Input info={infoText} />);
    const tooltip = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent?.includes(infoText)).toBe(true);
  });

  it("calls onChange when input value changes", () => {
    const onChange = mock(() => {});
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "nuevo valor" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("forwards id prop to input element", () => {
    const { container } = render(<Input id="mi-input" />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.id).toBe("mi-input");
  });

  it("renders as disabled when disabled=true", () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("normalizes leading zeros in controlled number values after retyping", () => {
    function ControlledNumberInput() {
      const [value, setValue] = useState<number>(232);

      return (
        <Input
          type="number"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(event.target.value))
          }
        />
      );
    }

    const { container } = render(<ControlledNumberInput />);
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.input(input, { target: { value: "" } });
    fireEvent.input(input, { target: { value: "0232" } });

    expect(input.value).toBe("232");
  });
});
