import { FiDownload } from "react-icons/fi";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Buttons";
import {
  DOWNLOAD_CSV,
  MODEL_PREDICTION_TITLE,
  PATIENT_DIES,
  PATIENT_SURVIVES,
  PROB_DIE_PREFIX,
  SIMULATION_RESULTS_TITLE,
} from "@/constants/constants";
import type { SimulationResponse } from "@/lib/simulation";
import { SimulationResultTable } from "./SimulationResultTable";

interface SimulationResultsSectionProps {
  result: SimulationResponse;
  onDownload: () => void;
}

export function SimulationResultsSection({
  result,
  onDownload,
}: SimulationResultsSectionProps) {
  const patientSurvives = result.prediction.class === 0;

  return (
    <section className="flex flex-col gap-4 border-t border-slate-100 pt-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h2 className="text-(length:--font-size-lg) font-semibold text-slate-800">
          {SIMULATION_RESULTS_TITLE}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          aria-label="Descargar resultados en CSV"
        >
          <FiDownload className="size-4" />
          {DOWNLOAD_CSV}
        </Button>
      </div>

      <SimulationResultTable result={result.simulation} />

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
          {MODEL_PREDICTION_TITLE}
        </p>
        <div className="flex items-center gap-3">
          <Badge status={patientSurvives ? "success" : "danger"}>
            {patientSurvives ? PATIENT_SURVIVES : PATIENT_DIES}
          </Badge>
          <span className="text-(length:--font-size-sm) text-slate-600">
            {PROB_DIE_PREFIX}
            <strong>{(result.prediction.probability * 100).toFixed(0)}%</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
