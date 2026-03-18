import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationRunConfiguration } from "@/app/simulation/components/SimulationRunConfiguration";
import {
  SIMULATION_CANCEL_BUTTON,
  SIMULATION_CANCEL_COOLDOWN_LABEL,
  SIMULATION_LONG_RUN_WARNING_TITLE,
  SIMULATION_PROGRESS_TITLE,
} from "@/constants/constants";

describe("SimulationRunConfiguration", () => {
  it("shows long-run warning when iterations exceed threshold", () => {
    const { container } = render(
      <SimulationRunConfiguration
        simRuns={15000}
        setSimRuns={() => {}}
        loading={false}
        onSimulate={() => {}}
        onCancel={() => {}}
        showLongRunWarning
        estimatedSeconds={120}
        elapsedSeconds={0}
        estimatedProgressPercent={0}
        cancelOnCooldown={false}
        cancelCooldownSeconds={0}
      />,
    );

    expect(
      within(container).getByText(SIMULATION_LONG_RUN_WARNING_TITLE),
    ).toBeTruthy();
  });

  it("renders progress and cancel action while loading", () => {
    let cancelCalls = 0;

    const { container } = render(
      <SimulationRunConfiguration
        simRuns={8000}
        setSimRuns={() => {}}
        loading
        onSimulate={() => {}}
        onCancel={() => {
          cancelCalls += 1;
        }}
        showLongRunWarning={false}
        estimatedSeconds={40}
        elapsedSeconds={10}
        estimatedProgressPercent={25}
        cancelOnCooldown={false}
        cancelCooldownSeconds={0}
      />,
    );

    expect(within(container).getByText(SIMULATION_PROGRESS_TITLE)).toBeTruthy();

    const cancelButton = within(container).getByRole("button", {
      name: SIMULATION_CANCEL_BUTTON,
    });

    fireEvent.click(cancelButton);
    expect(cancelCalls).toBe(1);
  });

  it("disables cancel button during cooldown", () => {
    const { container } = render(
      <SimulationRunConfiguration
        simRuns={5000}
        setSimRuns={() => {}}
        loading
        onSimulate={() => {}}
        onCancel={() => {}}
        showLongRunWarning={false}
        estimatedSeconds={30}
        elapsedSeconds={11}
        estimatedProgressPercent={33}
        cancelOnCooldown
        cancelCooldownSeconds={1}
      />,
    );

    const cooldownButton = within(container).getByRole("button", {
      name: SIMULATION_CANCEL_BUTTON,
    });

    expect(cooldownButton.hasAttribute("disabled")).toBe(true);
    expect(
      within(cooldownButton).getByText(SIMULATION_CANCEL_COOLDOWN_LABEL(1)),
    ).toBeTruthy();
  });
});
