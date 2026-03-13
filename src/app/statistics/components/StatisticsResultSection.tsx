import { Alert } from "@/components/molecules/Alert";
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
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-(length:--font-size-sm)"
        aria-label={STATS_RESULTS_TITLE}
      >
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="py-2 pr-4 text-left text-(length:--font-size-sm) font-medium text-zinc-500">
              {STATS_TABLE_METRIC_HEADER}
            </th>
            <th className="py-2 pl-4 text-right text-(length:--font-size-sm) font-medium text-zinc-700">
              {STATS_TABLE_VALUE_HEADER}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-100">
            <td className="py-2 pr-4 text-left text-(length:--font-size-sm) font-medium text-zinc-500">
              {STATS_STATISTIC_LABEL}
            </td>
            <td className="py-2 pl-4 text-right text-(length:--font-size-sm) font-semibold tabular-nums text-zinc-900">
              {result.statistic.toFixed(4)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-4 text-left text-(length:--font-size-sm) font-medium text-zinc-500">
              {STATS_P_VALUE_LABEL}
            </td>
            <td className="py-2 pl-4 text-right text-(length:--font-size-sm) font-semibold tabular-nums text-zinc-900">
              {result.p_value.toFixed(4)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
