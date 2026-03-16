export const PREDICTION_LIMITS = {
  edad: { min: 14, max: 61, default: 20 },
  diagIng1: { min: 1, max: 20, default: 1 },
  diagIng2: { min: 39, max: 173, default: 60 },
  diagEgr2: { min: 18, max: 40, default: 30 },
  apache: { min: 18, max: 40, default: 30 },
  tiempoVam: { min: 18, max: 40, default: 30 },
} as const;

export const PREDICTION_FEATURE_NAMES = [
  "Edad",
  "Diag.Ing1",
  "Diag.Ing2",
  "Diag.Egr2",
  "APACHE",
  "TiempoVAM",
] as const;

export type ExplanationMethod =
  | "LIME"
  | "SHAP"
  | "Gradientes Integrados"
  | "Mapas de Saliencia";

export const EXPLANATION_METHODS: ExplanationMethod[] = [
  "LIME",
  "SHAP",
  "Gradientes Integrados",
  "Mapas de Saliencia",
];

export interface PredictionRequest {
  edad: number;
  diag_ing1: number;
  diag_ing2: number;
  diag_egr2: number;
  apache: number;
  tiempo_vam: number;
}

export interface PredictionResponse {
  probability: number;
}

export interface ExplicacionRequest extends PredictionRequest {
  method: ExplanationMethod;
}

export interface ExplicacionResponse {
  feature_names: string[];
  importances: number[];
}

export async function runPrediction(
  data: PredictionRequest,
): Promise<PredictionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch("/api/prediction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(
        `Error en la predicción: ${response.status} ${response.statusText}`,
      );
    }
    return response.json() as Promise<PredictionResponse>;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(
        "La solicitud de predicción ha excedido el tiempo de espera.",
      );
    }
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function runExplicacion(
  data: ExplicacionRequest,
): Promise<ExplicacionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch("/api/prediction/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(
        `Error generando explicación: ${response.status} ${response.statusText}`,
      );
    }
    return response.json() as Promise<ExplicacionResponse>;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(
        "La solicitud de explicación ha excedido el tiempo de espera.",
      );
    }
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  } finally {
    clearTimeout(timeoutId);
  }
}
