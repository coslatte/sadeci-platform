import { NextRequest, NextResponse } from "next/server";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function resolveCoreApiUrl(): string {
  const raw =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000";

  return raw.replace(/\/+$/, "").replace(/\/api$/, "");
}

const CORE_API_URL = resolveCoreApiUrl();
const CORE_EXPLAIN_PATHS = [
  "/api/predictions/explain",
  "/predictions/explain",
  "/prediccion/explain",
] as const;

type ExplainAttempt = {
  response: Response;
  data: unknown;
  url: string;
};

function getUpstreamErrorMessage(data: unknown): string | null {
  if (typeof data === "string" && data.trim().length > 0) return data;
  if (!data || typeof data !== "object") return null;

  if (
    "error" in data &&
    typeof data.error === "string" &&
    data.error.trim().length > 0
  ) {
    return data.error;
  }

  if (
    "detail" in data &&
    typeof data.detail === "string" &&
    data.detail.trim().length > 0
  ) {
    return data.detail;
  }

  if (
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  ) {
    return data.message;
  }

  return null;
}

export async function handlePredictionExplainRequest(
  req: NextRequest,
  fetchImpl: FetchLike = fetch,
) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la solicitud inválido." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    let lastNotFound: ExplainAttempt | null = null;

    for (const path of CORE_EXPLAIN_PATHS) {
      const url = `${CORE_API_URL}${path}`;
      const response = await fetchImpl(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type") ?? "";
      const data: unknown = contentType.includes("application/json")
        ? await response.json()
        : { error: await response.text() };

      if (response.status === 404) {
        lastNotFound = { response, data, url };
        continue;
      }

      return NextResponse.json(data, { status: response.status });
    }

    if (lastNotFound) {
      return NextResponse.json(
        {
          error:
            "El backend activo no expone el endpoint /prediccion/explain. Verifica que saduci-core esté actualizado y desplegado con la versión compatible para explicabilidad.",
          upstream_status: lastNotFound.response.status,
          upstream_url: lastNotFound.url,
          upstream_error: getUpstreamErrorMessage(lastNotFound.data),
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: "No se pudo conectar con el servidor de explicabilidad.",
      },
      { status: 502 },
    );
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "El servidor de explicabilidad tardó demasiado en responder."
          : "No se pudo conectar con el servidor de explicabilidad.",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  return handlePredictionExplainRequest(req);
}
