import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Buttons";
import { PREDICTION_LIMITS } from "@/lib/prediction";
import {
  PREDICTION_PATIENT_SECTION_TITLE,
  PREDICTION_EDAD_LABEL,
  PREDICTION_DIAG_ING1_LABEL,
  PREDICTION_DIAG_ING2_LABEL,
  PREDICTION_DIAG_EGR2_LABEL,
  PREDICTION_APACHE_LABEL,
  PREDICTION_TIEMPO_VAM_LABEL,
  PREDICTION_PREDICT_BUTTON,
  PREDICTION_PREDICTING_BUTTON,
} from "@/constants/constants";

interface PredictionFormProps {
  edad: number;
  setEdad: (v: number) => void;
  diagIng1: number;
  setDiagIng1: (v: number) => void;
  diagIng2: number;
  setDiagIng2: (v: number) => void;
  diagEgr2: number;
  setDiagEgr2: (v: number) => void;
  apache: number;
  setApache: (v: number) => void;
  tiempoVam: number;
  setTiempoVam: (v: number) => void;
  loading: boolean;
  onPredict: () => void;
}

/**
 * Collects prediction input metrics and triggers the model request action.
 * Used in X case: patient data entry step for mortality prediction.
 */
export function PredictionForm({
  edad,
  setEdad,
  diagIng1,
  setDiagIng1,
  diagIng2,
  setDiagIng2,
  diagEgr2,
  setDiagEgr2,
  apache,
  setApache,
  tiempoVam,
  setTiempoVam,
  loading,
  onPredict,
}: PredictionFormProps) {
  const {
    edad: edadL,
    diagIng1: d1L,
    diagIng2: d2L,
    diagEgr2: d3L,
    apache: apL,
    tiempoVam: tvL,
  } = PREDICTION_LIMITS;

  return (
    <section
      aria-labelledby="prediction-patient-section-title"
      className="flex flex-col gap-5"
    >
      <h2
        id="prediction-patient-section-title"
        className="font-semibold text-zinc-800"
      >
        {PREDICTION_PATIENT_SECTION_TITLE}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <FormField
          id="pred-edad"
          label={PREDICTION_EDAD_LABEL}
          inputProps={{
            type: "number",
            value: edad,
            min: edadL.min,
            max: edadL.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setEdad(Number(e.target.value)),
          }}
        />
        <FormField
          id="pred-diag-ing1"
          label={PREDICTION_DIAG_ING1_LABEL}
          inputProps={{
            type: "number",
            value: diagIng1,
            min: d1L.min,
            max: d1L.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setDiagIng1(Number(e.target.value)),
          }}
        />
        <FormField
          id="pred-diag-ing2"
          label={PREDICTION_DIAG_ING2_LABEL}
          inputProps={{
            type: "number",
            value: diagIng2,
            min: d2L.min,
            max: d2L.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setDiagIng2(Number(e.target.value)),
          }}
        />
        <FormField
          id="pred-diag-egr2"
          label={PREDICTION_DIAG_EGR2_LABEL}
          inputProps={{
            type: "number",
            value: diagEgr2,
            min: d3L.min,
            max: d3L.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setDiagEgr2(Number(e.target.value)),
          }}
        />
        <FormField
          id="pred-apache"
          label={PREDICTION_APACHE_LABEL}
          inputProps={{
            type: "number",
            value: apache,
            min: apL.min,
            max: apL.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setApache(Number(e.target.value)),
          }}
        />
        <FormField
          id="pred-tiempo-vam"
          label={PREDICTION_TIEMPO_VAM_LABEL}
          inputProps={{
            type: "number",
            value: tiempoVam,
            min: tvL.min,
            max: tvL.max,
            step: 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setTiempoVam(Number(e.target.value)),
          }}
        />
      </div>
      <div className="mt-5 flex justify-end">
        <Button variant="primary" disabled={loading} onClick={onPredict}>
          {loading ? PREDICTION_PREDICTING_BUTTON : PREDICTION_PREDICT_BUTTON}
        </Button>
      </div>
    </section>
  );
}
