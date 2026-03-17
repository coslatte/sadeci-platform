import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { SimulationMetricGroups } from "@/app/simulation/components/SimulationMetricGroups";
import { SimulationDiagnosesSection } from "@/app/simulation/components/SimulationDiagnosesSection";

describe("Simulation field help icons", () => {
  it("renders help icon buttons in numeric metric fields", () => {
    const { getAllByRole } = render(
      <SimulationMetricGroups
        age={40}
        apache={12}
        preutiStay={8}
        vamTime={24}
        utiStay={36}
        simPercent={3}
        setAge={() => {}}
        setApache={() => {}}
        setPreutiStay={() => {}}
        setVamTime={() => {}}
        setUtiStay={() => {}}
        setSimPercent={() => {}}
      />,
    );

    const helpButtons = getAllByRole("button", {
      name: /información de ayuda del campo/i,
    });
    expect(helpButtons.length).toBeGreaterThanOrEqual(6);
  });

  it("renders help icon buttons in diagnosis dropdown fields", () => {
    const { getAllByRole } = render(
      <SimulationDiagnosesSection
        diagIng1={0}
        setDiagIng1={() => {}}
        diagIng2={0}
        setDiagIng2={() => {}}
        diagIng3={0}
        setDiagIng3={() => {}}
        diagIng4={0}
        setDiagIng4={() => {}}
        diagEgreso2={0}
        setDiagEgreso2={() => {}}
        respInsuf={0}
        setRespInsuf={() => {}}
        ventType={0}
        setVentType={() => {}}
      />,
    );

    const helpButtons = getAllByRole("button", {
      name: /información de ayuda del campo/i,
    });
    expect(helpButtons.length).toBeGreaterThanOrEqual(7);
  });
});
