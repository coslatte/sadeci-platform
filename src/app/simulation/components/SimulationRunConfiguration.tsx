import type React from "react";
import { FiPlay } from "react-icons/fi";
import { Button } from "@/components/atoms/Buttons";
import { NumberInputField } from "@/components/molecules/NumberInputField";
import {
  HELP_SIM_RUNS,
  RUNS_LABEL,
  SIMULATE_BUTTON,
  SIMULATION_CONFIG_TITLE,
  runsRangeText,
} from "@/constants/constants";
import { SIMULATION_LIMITS } from "@/lib/simulation";

interface SimulationRunConfigurationProps {
  simRuns: number;
  setSimRuns: (value: number) => void;
  loading?: boolean;
  onSimulate: () => void;
}

/**
 * Captures run count configuration and triggers simulation execution.
 * Used in X case: final action panel before starting a simulation batch.
 */
export function SimulationRunConfiguration({
  simRuns,
  setSimRuns,
  loading = false,
  onSimulate,
}: SimulationRunConfigurationProps) {
  return (
    <section className="flex flex-col gap-6 p-5 bg-white border rounded-2xl border-slate-200">
      <h2 className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-700">
        {SIMULATION_CONFIG_TITLE}
      </h2>

      <div className="flex flex-col items-center justify-between gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-1.5">
          <NumberInputField
            id="sim-runs"
            label={RUNS_LABEL}
            min={SIMULATION_LIMITS.simRuns.min}
            max={SIMULATION_LIMITS.simRuns.max}
            step={SIMULATION_LIMITS.simRuns.step}
            value={simRuns}
            onChange={setSimRuns}
            help={HELP_SIM_RUNS}
            labelClassName="text-center md:text-left"
            fullWidth
          />
          <p className="text-(length:--font-size-xs) text-slate-700 text-center md:text-left">
            {runsRangeText(
              SIMULATION_LIMITS.simRuns.min,
              SIMULATION_LIMITS.simRuns.max,
            )}
          </p>
        </div>

        <Button
          onClick={onSimulate}
          loading={loading}
          size="lg"
          aria-label="Realizar simulación"
          className="w-full md:w-1/3"
          variant="glass"
        >
          <FiPlay className="size-4" />
          {SIMULATE_BUTTON}
        </Button>
      </div>
    </section>
  );
}
