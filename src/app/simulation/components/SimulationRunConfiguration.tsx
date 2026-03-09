import type React from "react";
import { FiPlay } from "react-icons/fi";
import { Button } from "@/components/atoms/Buttons";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import {
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

export function SimulationRunConfiguration({
  simRuns,
  setSimRuns,
  loading = false,
  onSimulate,
}: SimulationRunConfigurationProps) {
  return (
    <section className="flex flex-col gap-6 pb-8">
      <h2 className="text-(length:--font-size-lg) font-semibold text-zinc-900">
        {SIMULATION_CONFIG_TITLE}
      </h2>

      <div className="flex flex-col items-center justify-between gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-1.5">
          <Label htmlFor="sim-runs" className="text-center md:text-left">
            {RUNS_LABEL}
          </Label>
          <Input
            id="sim-runs"
            type="number"
            min={SIMULATION_LIMITS.simRuns.min}
            max={SIMULATION_LIMITS.simRuns.max}
            step={SIMULATION_LIMITS.simRuns.step}
            value={simRuns}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSimRuns(Number(event.target.value))
            }
            fullWidth
          />
          <p className="text-(length:--font-size-xs) text-slate-500 text-center md:text-left">
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
        >
          <FiPlay className="size-4" />
          {SIMULATE_BUTTON}
        </Button>
      </div>
    </section>
  );
}
