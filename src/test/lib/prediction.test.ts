import "../setup";
import { afterEach, describe, expect, it } from "bun:test";
import { runExplicacion, runPrediction } from "@/lib/prediction";

const originalFetch = globalThis.fetch;
type FetchHandler = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function mockFetch(handler: FetchHandler): void {
  globalThis.fetch = Object.assign(
    (input: RequestInfo | URL, init?: RequestInit) => handler(input, init),
    { preconnect: originalFetch.preconnect },
  );
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("prediction client", () => {
  it("returns probability when prediction API succeeds", async () => {
    mockFetch(() => Promise.resolve(jsonResponse({ probability: 0.42 })));

    const result = await runPrediction({
      edad: 20,
      diag_ing1: 5,
      diag_ing2: 60,
      diag_egr2: 30,
      apache: 25,
      tiempo_vam: 24,
    });

    expect(result).toEqual({ probability: 0.42 });
  });

  it("surfaces backend compatibility message on 404", async () => {
    mockFetch(() =>
      Promise.resolve(
        jsonResponse(
          {
            error:
              "El backend activo no expone el endpoint /prediccion. Verifica que saduci-core esté actualizado.",
          },
          404,
        ),
      ),
    );

    await expect(
      runPrediction({
        edad: 20,
        diag_ing1: 5,
        diag_ing2: 60,
        diag_egr2: 30,
        apache: 25,
        tiempo_vam: 24,
      }),
    ).rejects.toThrow(/backend activo no expone el endpoint/i);
  });

  it("surfaces backend detail for explain endpoint errors", async () => {
    mockFetch(() =>
      Promise.resolve(jsonResponse({ detail: "Método inválido" }, 422)),
    );

    await expect(
      runExplicacion({
        edad: 20,
        diag_ing1: 5,
        diag_ing2: 60,
        diag_egr2: 30,
        apache: 25,
        tiempo_vam: 24,
        method: "SHAP",
      }),
    ).rejects.toThrow(/método inválido/i);
  });
});
