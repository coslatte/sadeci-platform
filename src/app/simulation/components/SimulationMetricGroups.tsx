import type React from "react";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import {
  CLINICAL_SCORES_TITLE,
  DEMOGRAPHICS_TITLE,
  SIMULATION_AGE_LABEL,
  SIMULATION_APACHE_LABEL,
  SIMULATION_PREUTI_STAY_LABEL,
  SIMULATION_SIM_PERCENT_LABEL,
  SIMULATION_UTI_STAY_LABEL,
  SIMULATION_VAM_TIME_LABEL,
  VENTILATION_TITLE,
} from "@/constants/constants";
import { SIMULATION_LIMITS } from "@/lib/simulation";

interface SimulationMetricGroupsProps {
  age: number;
  apache: number;
  preutiStay: number;
  vamTime: number;
  utiStay: number;
  simPercent: number;
  setAge: (value: number) => void;
  setApache: (value: number) => void;
  setPreutiStay: (value: number) => void;
  setVamTime: (value: number) => void;
  setUtiStay: (value: number) => void;
  setSimPercent: (value: number) => void;
}

// per current styling guideline, keep classes inline where used

function NumberField({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.target.value))
        }
        fullWidth
      />
    </div>
  );
}

/**
 * Groups numeric simulation inputs by demographics, scores, and ventilation.
 * Used in X case: core metric entry area of the simulation form.
 */
export function SimulationMetricGroups({
  age,
  apache,
  preutiStay,
  vamTime,
  utiStay,
  simPercent,
  setAge,
  setApache,
  setPreutiStay,
  setVamTime,
  setUtiStay,
  setSimPercent,
}: SimulationMetricGroupsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
          {DEMOGRAPHICS_TITLE}
        </p>
        <NumberField
          id="age"
          label={SIMULATION_AGE_LABEL}
          min={SIMULATION_LIMITS.age.min}
          max={SIMULATION_LIMITS.age.max}
          value={age}
          onChange={setAge}
        />
        <NumberField
          id="preuti-stay"
          label={SIMULATION_PREUTI_STAY_LABEL}
          min={SIMULATION_LIMITS.preutiStay.min}
          max={SIMULATION_LIMITS.preutiStay.max}
          value={preutiStay}
          onChange={setPreutiStay}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
          {CLINICAL_SCORES_TITLE}
        </p>
        <NumberField
          id="apache"
          label={SIMULATION_APACHE_LABEL}
          min={SIMULATION_LIMITS.apache.min}
          max={SIMULATION_LIMITS.apache.max}
          value={apache}
          onChange={setApache}
        />
        <NumberField
          id="sim-percent"
          label={SIMULATION_SIM_PERCENT_LABEL}
          min={SIMULATION_LIMITS.simPercent.min}
          max={SIMULATION_LIMITS.simPercent.max}
          value={simPercent}
          onChange={setSimPercent}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
          {VENTILATION_TITLE}
        </p>
        <NumberField
          id="vam-time"
          label={SIMULATION_VAM_TIME_LABEL}
          min={SIMULATION_LIMITS.vamTime.min}
          max={SIMULATION_LIMITS.vamTime.max}
          value={vamTime}
          onChange={setVamTime}
        />
        <NumberField
          id="uti-stay"
          label={SIMULATION_UTI_STAY_LABEL}
          min={SIMULATION_LIMITS.utiStay.min}
          max={SIMULATION_LIMITS.utiStay.max}
          value={utiStay}
          onChange={setUtiStay}
        />
      </div>
    </div>
  );
}
