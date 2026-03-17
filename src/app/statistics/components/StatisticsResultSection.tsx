import { Alert } from "@/components/molecules/Alert";
import { DataTable } from "@/components/molecules/DataTable";
import type { StatisticalTestResult } from "@/lib/statistics";
import {
  STATS_INFO_P_VALUE,
  STATS_INFO_STATISTIC,
  STATS_P_VALUE_LABEL,
  STATS_RESULTS_TITLE,
  STATS_STATISTIC_LABEL,
  STATS_TABLE_METRIC_HEADER,
  STATS_TABLE_VALUE_HEADER,
} from "@/constants/constants";

interface StatisticsResultSectionProps {
  result: StatisticalTestResult | null;
  error: string | null;
  warning: string | null;
}

function StatisticsResultTable({ result }: { result: StatisticalTestResult }) {
  const columns = [
    {
      key: "metric",
      label: STATS_TABLE_METRIC_HEADER,
      align: "left" as const,
      headerClassName:
        "pr-4 text-(length:--font-size-sm) text-zinc-500 font-medium",
      cellClassName:
        "pr-4 text-left text-(length:--font-size-sm) font-medium text-zinc-500",
    },
    {
      key: "value",
      label: STATS_TABLE_VALUE_HEADER,
      align: "right" as const,
      headerClassName:
        "pl-4 text-(length:--font-size-sm) text-zinc-700 font-medium",
      cellClassName:
        "pl-4 text-right text-(length:--font-size-sm) font-semibold tabular-nums text-zinc-900",
    },
  ];

  const rows = [
    {
      metric: STATS_STATISTIC_LABEL,
      value: result.statistic.toFixed(4),
    },
    {
      metric: STATS_P_VALUE_LABEL,
      value: result.p_value.toFixed(4),
    },
  ];

  return (
    <DataTable
      ariaLabel={STATS_RESULTS_TITLE}
      columns={columns}
      rows={rows}
      bodyRowClassName={(_, index) => (index === 0 ? "" : "last:border-0")}
    />
  );
}

/**
 * Shows statistical outcomes along with warning and error feedback blocks.
 * Used in X case: displaying computed Wilcoxon or Friedman test results.
 */
export function StatisticsResultSection({
  result,
  error,
  warning,
}: StatisticsResultSectionProps) {
  return (
    <>
      {warning && <Alert variant="warning">{warning}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {result && (
        <section className="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <h3 className="border-b border-slate-200 pb-3 text-(length:--font-size-base) font-semibold text-slate-800">
            {STATS_RESULTS_TITLE}
          </h3>
          <div className="flex flex-col gap-4">
            <StatisticsResultTable result={result} />
            <div className="flex flex-col gap-1 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-(length:--font-size-sm) text-zinc-600">
              <p>{STATS_INFO_STATISTIC}</p>
              <p>{STATS_INFO_P_VALUE}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
