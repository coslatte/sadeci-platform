import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { StatisticsTabs } from "@/app/statistics/components/StatisticsTabs";

describe("StatisticsTabs", () => {
  it("renders both statistical tabs", () => {
    const { container } = render(
      <StatisticsTabs activeTab="wilcoxon" onChange={() => undefined} />,
    );

    expect(
      within(container).getByRole("tab", { name: "Test de Wilcoxon" }),
    ).toBeTruthy();
    expect(
      within(container).getByRole("tab", { name: "Test de Friedman" }),
    ).toBeTruthy();
  });

  it("calls onChange when selecting the Friedman tab", () => {
    const onChange = mock(() => undefined);
    const { container } = render(
      <StatisticsTabs activeTab="wilcoxon" onChange={onChange} />,
    );

    fireEvent.click(
      within(container).getByRole("tab", { name: "Test de Friedman" }),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("friedman");
  });
});
