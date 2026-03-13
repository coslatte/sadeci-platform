import AccessibleSelect from "@/components/atoms/AccessibleSelect";
import { Label } from "@/components/atoms/Label";
import {
  DIAGNOSES_TITLE,
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
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-slate-500">
        {label}
      </Label>
      <AccessibleSelect
        id={id}
        value={String(value)}
        onChange={(nextValue) => onChange(Number(nextValue))}
        options={options}
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
    <div>
      <p className="mb-4 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
        {DIAGNOSES_TITLE}
      </p>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
        <SelectField
          id="diag-ing-1"
          label={SIMULATION_DIAG_ING_LABEL(1)}
          value={diagIng1}
          onChange={setDiagIng1}
          options={diagData()}
        />
        <SelectField
          id="diag-ing-2"
          label={SIMULATION_DIAG_ING_LABEL(2)}
          value={diagIng2}
          onChange={setDiagIng2}
          options={diagData()}
        />
        <SelectField
          id="diag-ing-3"
          label={SIMULATION_DIAG_ING_LABEL(3)}
          value={diagIng3}
          onChange={setDiagIng3}
          options={diagData()}
        />
        <SelectField
          id="diag-ing-4"
          label={SIMULATION_DIAG_ING_LABEL(4)}
          value={diagIng4}
          onChange={setDiagIng4}
          options={diagData()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SelectField
          id="resp-insuf"
          label={SIMULATION_RESP_INSUF_LABEL}
          value={respInsuf}
          onChange={setRespInsuf}
          options={respInsufData()}
        />
        <SelectField
          id="vent-type"
          label={SIMULATION_VENT_TYPE_LABEL}
          value={ventType}
          onChange={setVentType}
          options={ventTypeData()}
        />
        <SelectField
          id="diag-egreso-2"
          label={SIMULATION_DIAG_DISCHARGE_LABEL}
          value={diagEgreso2}
          onChange={setDiagEgreso2}
          options={diagData()}
        />
      </div>
    </div>
  );
}
