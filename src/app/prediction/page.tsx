"use client";

import { useState } from "react";
import { Alert } from "@/components/molecules/Alert";
import { Text } from "@/components/atoms/Text";
import { Stack } from "@/components/layout/Stack";
import { PredictionForm } from "./components/PredictionForm";
import { PredictionResultCard } from "./components/PredictionResultCard";
import { ExplicacionPanel } from "./components/ExplicacionPanel";
import {
  PREDICTION_LIMITS,
  runPrediction,
  runExplicacion,
  type PredictionResponse,
  type ExplicacionResponse,
  type ExplanationMethod,
  EXPLANATION_METHODS,
} from "@/lib/prediction";
import {
  PREDICTION_PAGE_TITLE,
  PREDICTION_PAGE_SUBTITLE,
  PREDICTION_ERROR_TITLE,
} from "@/constants/constants";

export default function PredictionPage() {
  const [edad, setEdad] = useState<number>(PREDICTION_LIMITS.edad.default);
  const [diagIng1, setDiagIng1] = useState<number>(
    PREDICTION_LIMITS.diagIng1.default,
  );
  const [diagIng2, setDiagIng2] = useState<number>(
    PREDICTION_LIMITS.diagIng2.default,
  );
  const [diagEgr2, setDiagEgr2] = useState<number>(
    PREDICTION_LIMITS.diagEgr2.default,
  );
  const [apache, setApache] = useState<number>(
    PREDICTION_LIMITS.apache.default,
  );
  const [tiempoVam, setTiempoVam] = useState<number>(
    PREDICTION_LIMITS.tiempoVam.default,
  );

  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);
  const [loadingExplain, setLoadingExplain] = useState<boolean>(false);
  const [predictError, setPredictError] = useState<string | null>(null);
  const [explainError, setExplainError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [explicacion, setExplicacion] = useState<ExplicacionResponse | null>(
    null,
  );
  const [method, setMethod] = useState<ExplanationMethod>(
    EXPLANATION_METHODS[0],
  );

  async function handlePredict(): Promise<void> {
    setPredictError(null);
    setPrediction(null);
    setExplicacion(null);
    setLoadingPredict(true);
    try {
      const result = await runPrediction({
        edad,
        diag_ing1: diagIng1,
        diag_ing2: diagIng2,
        diag_egr2: diagEgr2,
        apache,
        tiempo_vam: tiempoVam,
      });
      setPrediction(result);
    } catch (err) {
      setPredictError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingPredict(false);
    }
  }

  async function handleExplain(): Promise<void> {
    if (!prediction) return;
    setExplainError(null);
    setExplicacion(null);
    setLoadingExplain(true);
    try {
      const result = await runExplicacion({
        edad,
        diag_ing1: diagIng1,
        diag_ing2: diagIng2,
        diag_egr2: diagEgr2,
        apache,
        tiempo_vam: tiempoVam,
        method,
      });
      setExplicacion(result);
    } catch (err) {
      setExplainError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingExplain(false);
    }
  }

  return (
    <Stack space="lg">
      <div>
        <Text as="h1" size="xl" weight="bold" className="text-zinc-900">
          {PREDICTION_PAGE_TITLE}
        </Text>
        <Text size="sm" className="mt-1 text-zinc-500">
          {PREDICTION_PAGE_SUBTITLE}
        </Text>
      </div>

      <PredictionForm
        edad={edad}
        setEdad={setEdad}
        diagIng1={diagIng1}
        setDiagIng1={setDiagIng1}
        diagIng2={diagIng2}
        setDiagIng2={setDiagIng2}
        diagEgr2={diagEgr2}
        setDiagEgr2={setDiagEgr2}
        apache={apache}
        setApache={setApache}
        tiempoVam={tiempoVam}
        setTiempoVam={setTiempoVam}
        loading={loadingPredict}
        onPredict={handlePredict}
      />

      {predictError && (
        <Alert variant="danger" title={PREDICTION_ERROR_TITLE}>
          {predictError}
        </Alert>
      )}

      {prediction && (
        <PredictionResultCard probability={prediction.probability} />
      )}

      <ExplicacionPanel
        hasPrediction={prediction !== null}
        method={method}
        setMethod={setMethod}
        loading={loadingExplain}
        onExplain={handleExplain}
        result={explicacion}
        error={explainError}
      />
    </Stack>
  );
}
