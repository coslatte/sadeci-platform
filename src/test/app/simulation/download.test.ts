import "../../setup";
import { describe, expect, it } from "bun:test";
import { downloadSimulationCSV } from "@/app/simulation/helpers/download";
import type { SimulationResponse } from "@/lib/simulation";

const simulationResponse: SimulationResponse = {
  simulation: {
    pre_vam: { mean: 10.5, std: 2.1, ci_lower: 8.4, ci_upper: 12.6 },
    vam: { mean: 100.2, std: 15.3, ci_lower: 84.9, ci_upper: 115.5 },
    post_vam: { mean: 50.1, std: 8.2, ci_lower: 41.9, ci_upper: 58.3 },
    uci: { mean: 200.5, std: 25.1, ci_lower: 175.4, ci_upper: 225.6 },
    post_uci: { mean: 30.2, std: 5.1, ci_lower: 25.1, ci_upper: 35.3 },
  },
  prediction: { class: 0, probability: 0.25 },
};

describe("downloadSimulationCSV", () => {
  it("generates UTF-8 CSV with BOM and Spanish accents", async () => {
    let capturedBlob: Blob | null = null;

    const previousCreateObjectURL = URL.createObjectURL;
    const previousRevokeObjectURL = URL.revokeObjectURL;
    const previousClick = HTMLAnchorElement.prototype.click;

    URL.createObjectURL = ((blob: Blob) => {
      capturedBlob = blob;
      return "blob:mock-url";
    }) as typeof URL.createObjectURL;

    URL.revokeObjectURL = (() => {
      return undefined;
    }) as typeof URL.revokeObjectURL;

    HTMLAnchorElement.prototype.click = () => {
      return undefined;
    };

    try {
      downloadSimulationCSV(simulationResponse, "PAC/001");

      expect(capturedBlob).toBeTruthy();
      const csvText = await capturedBlob!.text();

      expect(csvText.startsWith("\uFEFF")).toBe(true);
      expect(csvText).toContain("sep=,");
      expect(csvText).toContain("Estadístico");
      expect(csvText).toContain("Desviación Estándar");
      expect(csvText).toContain("Estadía UCI");
    } finally {
      URL.createObjectURL = previousCreateObjectURL;
      URL.revokeObjectURL = previousRevokeObjectURL;
      HTMLAnchorElement.prototype.click = previousClick;
    }
  });
});
