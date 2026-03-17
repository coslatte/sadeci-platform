import { FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Buttons";
import {
  DOWNLOAD_CSV,
  MODEL_PREDICTION_TITLE,
  PATIENT_DIES,
  PATIENT_SURVIVES,
  PROB_DIE_PREFIX,
  SIMULATION_PAGINATION_NEXT,
  SIMULATION_PAGINATION_PREVIOUS,
  SIMULATION_RESULTS_PAGE_SUMMARY,
  SIMULATION_RESULTS_RUN_HISTORY,
  SIMULATION_RESULTS_TITLE,
} from "@/constants/constants";
import type { SimulationResponse } from "@/lib/simulation";
import { SimulationResultTable } from "./SimulationResultTable";

interface SimulationResultsSectionProps {
  results: SimulationResponse[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onDownload: () => void;
}

/**
 * Displays simulation results, prediction badge, and CSV download action.
 * Used in X case: post-run results panel in the simulation workflow.
 */
export function SimulationResultsSection({
  results,
  activeIndex,
  onActiveIndexChange,
  onDownload,
}: SimulationResultsSectionProps) {
  const currentResult = results[activeIndex];
  if (!currentResult) {
    return null;
  }

  const totalRuns = results.length;
  const currentRun = activeIndex + 1;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < totalRuns - 1;

  const patientSurvives = currentResult.prediction.class === 0;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h2 className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-700">
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

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-col">
          <span className="text-(length:--font-size-xs) font-semibold uppercase tracking-wide text-slate-500">
            {SIMULATION_RESULTS_RUN_HISTORY}
          </span>
          <span className="text-(length:--font-size-sm) text-slate-700">
            {SIMULATION_RESULTS_PAGE_SUMMARY(currentRun, totalRuns)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!canGoPrevious}
            onClick={() => onActiveIndexChange(activeIndex - 1)}
            aria-label={SIMULATION_PAGINATION_PREVIOUS}
          >
            <FiChevronLeft className="size-4" />
            {SIMULATION_PAGINATION_PREVIOUS}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!canGoNext}
            onClick={() => onActiveIndexChange(activeIndex + 1)}
            aria-label={SIMULATION_PAGINATION_NEXT}
          >
            {SIMULATION_PAGINATION_NEXT}
            <FiChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <SimulationResultTable result={currentResult.simulation} />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-700">
          {MODEL_PREDICTION_TITLE}
        </p>
        <div className="flex items-center gap-3">
          <Badge status={patientSurvives ? "success" : "danger"}>
            {patientSurvives ? PATIENT_SURVIVES : PATIENT_DIES}
          </Badge>
          <span className="text-(length:--font-size-sm) text-slate-600">
            {PROB_DIE_PREFIX}
            <strong>
              {(currentResult.prediction.probability * 100).toFixed(0)}%
            </strong>
          </span>
        </div>
      </div>
    </section>
  );
}
