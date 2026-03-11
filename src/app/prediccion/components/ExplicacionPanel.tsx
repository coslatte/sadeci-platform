"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/atoms/Buttons";
import { Alert } from "@/components/molecules/Alert";
import { Label } from "@/components/atoms/Label";
import { AccessibleSelect } from "@/components/atoms/AccessibleSelect";
import { Spinner } from "@/components/atoms/Spinner";
import type { ExplanationMethod, ExplicacionResponse } from "@/lib/prediccion";
import { EXPLANATION_METHODS } from "@/lib/prediccion";
import {
  PREDICCION_EXPLAIN_SECTION_TITLE,
  PREDICCION_METHOD_LABEL,
  PREDICCION_EXPLAIN_BUTTON,
  PREDICCION_EXPLAINING_BUTTON,
  PREDICCION_EXPLAIN_TITLE,
  PREDICCION_WARN_NO_PREDICTION,
  PREDICCION_FEATURE_IMPORTANCE_TITLE,
  PREDICCION_POSITIVE,
  PREDICCION_NEGATIVE,
} from "@/constants/constants";

interface ExplicacionPanelProps {
  hasPrediction: boolean;
  method: ExplanationMethod;
  setMethod: (m: ExplanationMethod) => void;
  loading: boolean;
  onExplain: () => void;
  result: ExplicacionResponse | null;
  error: string | null;
}

interface ChartEntry {
  feature: string;
  importance: number;
}

function formatChartValue(
  value: number | string | readonly (number | string)[] | undefined,
) {
  if (typeof value === "number") {
    return value.toFixed(4);
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return value ?? "";
}

export function ExplicacionPanel({
  hasPrediction,
  method,
  setMethod,
  loading,
  onExplain,
  result,
  error,
}: ExplicacionPanelProps) {
  const methodOptions = EXPLANATION_METHODS.map((m) => ({
    value: m,
    label: m,
  }));

  const chartData: ChartEntry[] = result
    ? result.feature_names
        .map((name, i) => ({
          feature: name,
          importance: result.importances[i] ?? 0,
        }))
        .sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance))
    : [];

  return (
    <section
      aria-labelledby="prediccion-explain-section-title"
      className="flex flex-col gap-4"
    >
      <h2
        id="prediccion-explain-section-title"
        className="font-semibold text-zinc-800"
      >
        {PREDICCION_EXPLAIN_SECTION_TITLE}
      </h2>
      <div className="flex flex-col gap-4">
        {!hasPrediction && (
          <Alert variant="warning">{PREDICCION_WARN_NO_PREDICTION}</Alert>
        )}

        <div className="flex flex-col gap-1.5 sm:max-w-xs">
          <Label htmlFor="pred-method">{PREDICCION_METHOD_LABEL}</Label>
          <AccessibleSelect
            id="pred-method"
            value={method}
            onChange={(v) => setMethod(v as ExplanationMethod)}
            options={methodOptions}
            fullWidth
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            disabled={!hasPrediction || loading}
            onClick={onExplain}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" />
                {PREDICCION_EXPLAINING_BUTTON}
              </span>
            ) : (
              PREDICCION_EXPLAIN_BUTTON
            )}
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {result && (
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-zinc-700">
              {PREDICCION_EXPLAIN_TITLE(method)}
            </h3>
            <p className="text-sm font-semibold text-zinc-700">
              {PREDICCION_FEATURE_IMPORTANCE_TITLE}
            </p>
            <div className="flex gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 bg-orange-400 rounded-sm" />
                {PREDICCION_POSITIVE}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm" />
                {PREDICCION_NEGATIVE}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 4, right: 24, left: 80, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v: number) => v.toFixed(2)}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  width={76}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={formatChartValue} />
                <ReferenceLine x={0} stroke="#ef4444" strokeDasharray="4 2" />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.importance >= 0 ? "#f97316" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}
