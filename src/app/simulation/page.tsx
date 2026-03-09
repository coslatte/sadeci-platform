"use client";

import { useEffect, useState } from "react";
import { Alert } from "@/components/molecules/Alert";
import SimulationInputs from "./components/SimulationInputs";
import { SimulationPageHeader } from "./components/SimulationPageHeader";
import { SimulationResultsSection } from "./components/SimulationResultsSection";
import {
  SIMULATION_LIMITS,
  generatePatientId,
  runSimulation,
  type SimulationRequest,
  type SimulationResponse,
} from "@/lib/simulation";
import {
  validateSimulationInput,
  formatErrorForUser,
  downloadSimulationCSV,
} from "./helpers/index";
import {
  ERROR_SIMULATION_TITLE,
  VALIDATION_MISSING_DIAG,
  VALIDATION_SELECT_RESP,
} from "@/constants/constants";
import { sileo } from "sileo";

export default function SimulacionPage() {
  const [patientId, setPatientId] = useState<string>("");
  const [age, setAge] = useState<number>(SIMULATION_LIMITS.age.default);
  const [apache, setApache] = useState<number>(
    SIMULATION_LIMITS.apache.default,
  );
  const [preutiStay, setPreutiStay] = useState<number>(
    SIMULATION_LIMITS.preutiStay.default,
  );
  const [vamTime, setVamTime] = useState<number>(
    SIMULATION_LIMITS.vamTime.default,
  );
  const [utiStay, setUtiStay] = useState<number>(
    SIMULATION_LIMITS.utiStay.default,
  );
  const [simPercent, setSimPercent] = useState<number>(
    SIMULATION_LIMITS.simPercent.default,
  );
  const [diagIng1, setDiagIng1] = useState<number>(0);
  const [diagIng2, setDiagIng2] = useState<number>(0);
  const [diagIng3, setDiagIng3] = useState<number>(0);
  const [diagIng4, setDiagIng4] = useState<number>(0);
  const [diagEgreso2, setDiagEgreso2] = useState<number>(0);
  const [respInsuf, setRespInsuf] = useState<number>(0);
  const [ventType, setVentType] = useState<number>(0);

  const [simRuns, setSimRuns] = useState<number>(
    SIMULATION_LIMITS.simRuns.default,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResponse | null>(null);

  useEffect(() => {
    setPatientId(generatePatientId());
  }, []);

  function handleNewPatient(): void {
    setPatientId(generatePatientId());
    setResult(null);
    setError(null);
  }

  async function handleSimulate(): Promise<void> {
    setError(null);

    const payload: SimulationRequest = {
      age,
      apache,
      d1: diagIng1,
      d2: diagIng2,
      d3: diagIng3,
      d4: diagIng4,
      diag_egreso2: diagEgreso2,
      artif_vent: ventType,
      vam_time: vamTime,
      uti_stay: utiStay,
      preuti_stay: preutiStay,
      resp_insuf: respInsuf,
      percent: simPercent,
      n_runs: simRuns,
    };

    const validationErrors = validateSimulationInput(payload);
    if ([diagIng1, diagIng2, diagIng3, diagIng4].every((d) => d === 0)) {
      validationErrors.unshift(VALIDATION_MISSING_DIAG);
    }
    if (respInsuf === 0) {
      validationErrors.unshift(VALIDATION_SELECT_RESP);
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(" \n"));
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await runSimulation(payload);
      setResult(data);
    } catch (err) {
      const message = formatErrorForUser(err);
      setError(message);
      // Log error for debugging
      console.error("Simulación fallida:", err);
      // Try to display the error via sileo if available
      try {
        sileo.error({ title: "Error en la simulación", description: message });
      } catch {
        // ignore if sileo is not available
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(): void {
    if (!result) return;
    downloadSimulationCSV(result, patientId);
  }
  return (
    <>
      <SimulationPageHeader />

      <div className="flex flex-col gap-6">
        <SimulationInputs
          patientId={patientId}
          setPatientId={setPatientId}
          handleNewPatient={handleNewPatient}
          age={age}
          setAge={setAge}
          apache={apache}
          setApache={setApache}
          preutiStay={preutiStay}
          setPreutiStay={setPreutiStay}
          vamTime={vamTime}
          setVamTime={setVamTime}
          utiStay={utiStay}
          setUtiStay={setUtiStay}
          simPercent={simPercent}
          setSimPercent={setSimPercent}
          diagIng1={diagIng1}
          setDiagIng1={setDiagIng1}
          diagIng2={diagIng2}
          setDiagIng2={setDiagIng2}
          diagIng3={diagIng3}
          setDiagIng3={setDiagIng3}
          diagIng4={diagIng4}
          setDiagIng4={setDiagIng4}
          diagEgreso2={diagEgreso2}
          setDiagEgreso2={setDiagEgreso2}
          respInsuf={respInsuf}
          setRespInsuf={setRespInsuf}
          ventType={ventType}
          setVentType={setVentType}
          simRuns={simRuns}
          setSimRuns={setSimRuns}
          loading={loading}
          onSimulate={handleSimulate}
        />

        {error && (
          <Alert variant="danger" title={ERROR_SIMULATION_TITLE}>
            {error.split("\n").map((line, i) => (
              <div key={i}>{line.trim()}</div>
            ))}
          </Alert>
        )}

        {result && (
          <SimulationResultsSection
            result={result}
            onDownload={handleDownload}
          />
        )}
      </div>
    </>
  );
}
