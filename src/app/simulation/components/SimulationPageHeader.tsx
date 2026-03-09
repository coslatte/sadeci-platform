import {
  SIMULATION_PAGE_TITLE,
  SIMULATION_PAGE_SUBTITLE,
} from "@/constants/constants";

export function SimulationPageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900 md:text-(length:--font-size-3xl)">
        {SIMULATION_PAGE_TITLE}
      </h1>
      <p className="mt-2 text-(length:--font-size-sm) text-slate-500">
        {SIMULATION_PAGE_SUBTITLE}
      </p>
    </div>
  );
}
