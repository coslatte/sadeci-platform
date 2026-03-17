import type React from "react";
import { NumberInputField } from "@/components/molecules/NumberInputField";
import {
  CLINICAL_SCORES_TITLE,
  DEMOGRAPHICS_TITLE as SIMULATION_DEMOGRAPHICS_TITLE,
  HELP_AGE,
  HELP_APACHE,
  HELP_PREUTI_STAY,
  HELP_SIM_PERCENT,
  HELP_UTI_STAY,
  HELP_VAM_TIME,
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

interface MetricSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Groups related simulation fields under a titled visual section.
 * Used in X case: composing demographics, scores, and ventilation blocks.
 */
function MetricSection({ title, children }: MetricSectionProps) {
  return (
    <section className="flex flex-col h-full gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0">
      <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-700">
        {title}
      </p>
      {children}
    </section>
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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
      <MetricSection title={SIMULATION_DEMOGRAPHICS_TITLE}>
        <NumberInputField
          id="age"
          label={SIMULATION_AGE_LABEL}
          min={SIMULATION_LIMITS.age.min}
          max={SIMULATION_LIMITS.age.max}
          value={age}
          onChange={setAge}
          help={HELP_AGE}
        />
        <NumberInputField
          id="preuti-stay"
          label={SIMULATION_PREUTI_STAY_LABEL}
          min={SIMULATION_LIMITS.preutiStay.min}
          max={SIMULATION_LIMITS.preutiStay.max}
          value={preutiStay}
          onChange={setPreutiStay}
          help={HELP_PREUTI_STAY}
        />
      </MetricSection>

      <MetricSection title={CLINICAL_SCORES_TITLE}>
        <NumberInputField
          id="apache"
          label={SIMULATION_APACHE_LABEL}
          min={SIMULATION_LIMITS.apache.min}
          max={SIMULATION_LIMITS.apache.max}
          value={apache}
          onChange={setApache}
          help={HELP_APACHE}
        />
        <NumberInputField
          id="sim-percent"
          label={SIMULATION_SIM_PERCENT_LABEL}
          min={SIMULATION_LIMITS.simPercent.min}
          max={SIMULATION_LIMITS.simPercent.max}
          value={simPercent}
          onChange={setSimPercent}
          help={HELP_SIM_PERCENT}
        />
      </MetricSection>

      <MetricSection title={VENTILATION_TITLE}>
        <NumberInputField
          id="vam-time"
          label={SIMULATION_VAM_TIME_LABEL}
          min={SIMULATION_LIMITS.vamTime.min}
          max={SIMULATION_LIMITS.vamTime.max}
          value={vamTime}
          onChange={setVamTime}
          help={HELP_VAM_TIME}
        />
        <NumberInputField
          id="uti-stay"
          label={SIMULATION_UTI_STAY_LABEL}
          min={SIMULATION_LIMITS.utiStay.min}
          max={SIMULATION_LIMITS.utiStay.max}
          value={utiStay}
          onChange={setUtiStay}
          help={HELP_UTI_STAY}
        />
      </MetricSection>
    </div>
  );
}
