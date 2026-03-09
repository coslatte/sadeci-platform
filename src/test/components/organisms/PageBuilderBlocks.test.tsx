import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { ButtonBlock } from "@/components/organisms/blocks/ButtonBlock";
import { InputFieldBlock } from "@/components/organisms/blocks/InputFieldBlock";
import { SelectFieldBlock } from "@/components/organisms/blocks/SelectFieldBlock";

describe("ButtonBlock", () => {
  it("renders default button label", () => {
    const { container } = render(<ButtonBlock />);
    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.includes("Bot\u00f3n")).toBe(true);
  });

  it("renders custom label", () => {
    const { container } = render(<ButtonBlock label="Guardar" />);
    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.includes("Guardar")).toBe(true);
  });

  it("renders as anchor when href is provided", () => {
    const { container } = render(
      <ButtonBlock label="Ir" href="https://example.com" />,
    );
    const anchor = container.querySelector("a");
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute("href")).toBe("https://example.com");
    expect(anchor?.getAttribute("target")).toBe("_blank");
  });

  it("does not render an anchor when no href is given", () => {
    const { container } = render(<ButtonBlock label="Click" />);
    expect(container.querySelector("a")).toBeFalsy();
  });
});

describe("InputFieldBlock", () => {
  it("renders label text", () => {
    const { getByText } = render(<InputFieldBlock label="Nombre" />);
    expect(getByText("Nombre")).toBeTruthy();
  });

  it("renders input with placeholder", () => {
    const { container } = render(
      <InputFieldBlock placeholder="Escribe tu nombre" />,
    );
    const input = within(container).getByRole("textbox");
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).placeholder).toBe("Escribe tu nombre");
  });

  it("shows required asterisk when required=true", () => {
    const { container } = render(<InputFieldBlock label="Email" required />);
    const asterisk = container.querySelector("span.text-red-500");
    expect(asterisk).toBeTruthy();
    expect(asterisk?.textContent).toBe("*");
  });

  it("does not show asterisk when required=false", () => {
    const { container } = render(
      <InputFieldBlock label="Email" required={false} />,
    );
    expect(container.querySelector("span.text-red-500")).toBeFalsy();
  });

  it("renders helper text when provided", () => {
    const { container } = render(
      <InputFieldBlock helperText="Texto de ayuda" />,
    );
    const p = container.querySelector("p.mt-1");
    expect(p).toBeTruthy();
    expect(p?.textContent).toBe("Texto de ayuda");
  });

  it("input is disabled (display-only)", () => {
    const { container } = render(<InputFieldBlock />);
    const input = within(container).getByRole("textbox");
    expect((input as HTMLInputElement).disabled).toBe(true);
  });
});

describe("SelectFieldBlock", () => {
  it("renders label", () => {
    const { container } = render(<SelectFieldBlock label="Pais" />);
    const label = container.querySelector("label");
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe("Pais");
  });

  it("renders options from optionsRaw", () => {
    const { container } = render(
      <SelectFieldBlock optionsRaw="Opcion A,Opcion B,Opcion C" />,
    );
    const scopedQueries = within(container);
    expect(
      scopedQueries.getByRole("option", { name: "Opcion A" }),
    ).toBeTruthy();
    expect(
      scopedQueries.getByRole("option", { name: "Opcion B" }),
    ).toBeTruthy();
    expect(
      scopedQueries.getByRole("option", { name: "Opcion C" }),
    ).toBeTruthy();
  });

  it("shows required asterisk when required=true", () => {
    const { container } = render(<SelectFieldBlock label="Tipo" required />);
    const asterisk = container.querySelector("span.text-red-500");
    expect(asterisk).toBeTruthy();
  });

  it("select is disabled (display-only)", () => {
    const { container } = render(<SelectFieldBlock />);
    const select = within(container).getByRole("combobox");
    expect((select as HTMLSelectElement).disabled).toBe(true);
  });

  it("renders helper text when provided", () => {
    const { container } = render(
      <SelectFieldBlock helperText="Texto de ayuda select" />,
    );
    const p = container.querySelector("p.mt-1");
    expect(p).toBeTruthy();
    expect(p?.textContent).toBe("Texto de ayuda select");
  });

  it("handles empty optionsRaw gracefully", () => {
    const { container } = render(<SelectFieldBlock optionsRaw="" />);
    const select = within(container).getByRole("combobox");
    // Only the placeholder option should be present
    expect((select as HTMLSelectElement).options.length).toBe(1);
  });
});
