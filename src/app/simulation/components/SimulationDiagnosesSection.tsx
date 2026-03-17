import AccessibleSelect from "@/components/atoms/AccessibleSelect";
import { Label } from "@/components/atoms/Label";
import {
  DIAGNOSES_TITLE,
  HELP_DIAG_DISCHARGE,
  HELP_DIAG_ING,
  HELP_RESP_INSUF,
  HELP_VENT_TYPE,
  SIMULATION_DIAG_DISCHARGE_LABEL,
  SIMULATION_DIAG_ING_LABEL,
  SIMULATION_RESP_INSUF_LABEL,
  SIMULATION_VENT_TYPE_LABEL,
} from "@/constants/constants";
import { diagData, respInsufData, ventTypeData } from "../helpers";

interface SimulationDiagnosesSectionProps {
  diagIng1: number;
  setDiagIng1: (value: number) => void;
  diagIng2: number;
  setDiagIng2: (value: number) => void;
  diagIng3: number;
  setDiagIng3: (value: number) => void;
  diagIng4: number;
  setDiagIng4: (value: number) => void;
  diagEgreso2: number;
  setDiagEgreso2: (value: number) => void;
  respInsuf: number;
  setRespInsuf: (value: number) => void;
  ventType: number;
  setVentType: (value: number) => void;
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  help,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: Array<{ value: string; label: string }>;
  help: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-zinc-800">
        {label}
      </Label>
      <AccessibleSelect
        id={id}
        value={String(value)}
        onChange={(nextValue) => onChange(Number(nextValue))}
        options={options}
        help={help}
        fullWidth
      />
    </div>
  );
}

/**
 * Collects diagnosis and ventilation categorical variables for simulation.
 * Used in X case: selecting diagnosis codes before running patient simulation.
 */
export function SimulationDiagnosesSection({
  diagIng1,
  setDiagIng1,
  diagIng2,
  setDiagIng2,
  diagIng3,
  setDiagIng3,
  diagIng4,
  setDiagIng4,
  diagEgreso2,
  setDiagEgreso2,
  respInsuf,
  setRespInsuf,
  ventType,
  setVentType,
}: SimulationDiagnosesSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="mb-4 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-700">
        {DIAGNOSES_TITLE}
      </p>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
        <SelectField
          id="diag-ing-1"
          label={SIMULATION_DIAG_ING_LABEL(1)}
          value={diagIng1}
          onChange={setDiagIng1}
          options={diagData()}
          help={HELP_DIAG_ING}
        />
        <SelectField
          id="diag-ing-2"
          label={SIMULATION_DIAG_ING_LABEL(2)}
          value={diagIng2}
          onChange={setDiagIng2}
          options={diagData()}
          help={HELP_DIAG_ING}
        />
        <SelectField
          id="diag-ing-3"
          label={SIMULATION_DIAG_ING_LABEL(3)}
          value={diagIng3}
          onChange={setDiagIng3}
          options={diagData()}
          help={HELP_DIAG_ING}
        />
        <SelectField
          id="diag-ing-4"
          label={SIMULATION_DIAG_ING_LABEL(4)}
          value={diagIng4}
          onChange={setDiagIng4}
          options={diagData()}
          help={HELP_DIAG_ING}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SelectField
          id="resp-insuf"
          label={SIMULATION_RESP_INSUF_LABEL}
          value={respInsuf}
          onChange={setRespInsuf}
          options={respInsufData()}
          help={HELP_RESP_INSUF}
        />
        <SelectField
          id="vent-type"
          label={SIMULATION_VENT_TYPE_LABEL}
          value={ventType}
          onChange={setVentType}
          options={ventTypeData()}
          help={HELP_VENT_TYPE}
        />
        <SelectField
          id="diag-egreso-2"
          label={SIMULATION_DIAG_DISCHARGE_LABEL}
          value={diagEgreso2}
          onChange={setDiagEgreso2}
          options={diagData()}
          help={HELP_DIAG_DISCHARGE}
        />
      </div>
    </section>
  );
}
