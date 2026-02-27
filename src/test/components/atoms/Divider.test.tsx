import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Divider } from "@/components/atoms/Divider";

describe("Divider", () => {
  it("renders horizontal separator by default", () => {
    const { getByRole } = render(<Divider data-testid="divider" />);

    const separator = getByRole("separator");
    expect(separator.tagName).toBe("HR");
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
    expect(separator.className.includes("w-full")).toBe(true);
    expect(separator.getAttribute("data-testid")).toBe("divider");
  });

  it("renders vertical separator when orientation is vertical", () => {
    const { getByRole } = render(
      <div className="h-10">
        <Divider orientation="vertical" className="custom-v" />
      </div>,
    );

    const separator = getByRole("separator");
    expect(separator.tagName).toBe("DIV");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator.className.includes("h-full")).toBe(true);
    expect(separator.className.includes("w-px")).toBe(true);
    expect(separator.className.includes("custom-v")).toBe(true);
  });

  it("merges custom className on horizontal variant", () => {
    const { getByRole } = render(<Divider className="my-4" />);
    const separator = getByRole("separator");
    expect(separator.className.includes("my-4")).toBe(true);
    expect(separator.className.includes("w-full")).toBe(true);
  });

  it("sets data-disabled attribute when disabled", () => {
    const { getByRole } = render(<Divider disabled />);
    const separator = getByRole("separator");
    expect(separator.getAttribute("data-disabled")).toBe("true");
  });
});
