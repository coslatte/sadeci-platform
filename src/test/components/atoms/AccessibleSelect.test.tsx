import "../../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import AccessibleSelect from "@/components/atoms/AccessibleSelect";

const OPTIONS = [
  { value: "0", label: "Vacío" },
  { value: "1", label: "Respiratorias" },
  { value: "2", label: "Cardíacas" },
];

describe("AccessibleSelect", () => {
  it("renders button and hidden select", () => {
    const { container } = render(
      <AccessibleSelect value="0" onChange={() => {}} options={OPTIONS} />,
    );

    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();

    const native = container.querySelector("select");
    expect(native).toBeTruthy();
    if (!native) return;
    expect(native.className.includes("sr-only")).toBe(true);
  });

  it("opens list and selects an option via click", () => {
    let val = "0";
    const { container } = render(
      <AccessibleSelect
        value={val}
        onChange={(v) => {
          val = String(v);
        }}
        options={OPTIONS}
      />,
    );

    const btn = container.querySelector("button") as HTMLElement;
    fireEvent.click(btn);

    const list = container.querySelector("ul[role='listbox']") as HTMLElement;
    expect(list).toBeTruthy();
    if (!list) return;
    const items = Array.from(list.querySelectorAll("li"));
    const target = items.find((i) => i.textContent === "Respiratorias");
    expect(target).toBeTruthy();
    if (!target) return;
    fireEvent.click(target);
    expect(val).toBe("1");
  });

  it("navigates with keyboard and confirms with Enter", () => {
    let val = "0";
    const { container } = render(
      <AccessibleSelect
        value={val}
        onChange={(v) => {
          val = String(v);
        }}
        options={OPTIONS}
      />,
    );

    const btn = container.querySelector("button") as HTMLElement;
    // open
    fireEvent.keyDown(btn, { key: "ArrowDown" });
    // press Enter to select highlighted (should move highlight to 1 then select)
    fireEvent.keyDown(btn, { key: "Enter" });
    expect(val).toBe("1");
  });

  it("renders help icon with (?) when help text is provided", () => {
    const { container } = render(
      <AccessibleSelect
        value="0"
        onChange={() => {}}
        options={OPTIONS}
        help="Ayuda del campo"
      />,
    );

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    ) as HTMLButtonElement;
    expect(helpButton).toBeTruthy();
    expect(helpButton.textContent).toBe("?");
  });

  it("shows help tooltip content on hover", () => {
    const { container } = render(
      <AccessibleSelect
        value="0"
        onChange={() => {}}
        options={OPTIONS}
        help="Ayuda del desplegable"
      />,
    );

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    ) as HTMLButtonElement;
    fireEvent.mouseOver(helpButton);

    expect(container.textContent?.includes("Ayuda del desplegable")).toBe(true);
  });
});
