import "../../../../setup";
import { describe, expect, it } from "bun:test";
import { handlePredictionExplainRequest } from "@/app/api/prediction/explain/route";

type FetchHandler = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("prediction explain route handler", () => {
  it("tries the current backend explain endpoint first", async () => {
    const fetchStub: FetchHandler = (input) => {
      expect(String(input)).toContain("/api/predictions/explain");
      return Promise.resolve(
        jsonResponse({ feature_names: ["Edad"], importances: [0.42] }),
      );
    };

    const response = await handlePredictionExplainRequest(
      new Request("http://localhost/api/prediction/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          edad: 20,
          diag_ing1: 5,
          diag_ing2: 60,
          diag_egr2: 30,
          apache: 25,
          tiempo_vam: 24,
          method: "LIME",
        }),
      }) as never,
      fetchStub,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
  });

  it("returns a compatibility error when all explain endpoints are missing", async () => {
    let calls = 0;
    const fetchStub: FetchHandler = () => {
      calls += 1;
      return Promise.resolve(jsonResponse({ detail: "Not Found" }, 404));
    };

    const response = await handlePredictionExplainRequest(
      new Request("http://localhost/api/prediction/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          edad: 20,
          diag_ing1: 5,
          diag_ing2: 60,
          diag_egr2: 30,
          apache: 25,
          tiempo_vam: 24,
          method: "LIME",
        }),
      }) as never,
      fetchStub,
    );

    expect(calls).toBe(3);
    expect(response.status).toBe(502);
    expect(response.headers.get("content-type")).toContain("application/json");
  });
});
