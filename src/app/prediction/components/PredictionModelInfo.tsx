import type { IconType } from "react-icons";
import { FiActivity, FiBarChart2, FiEye, FiShield } from "react-icons/fi";
import { RiBrain2Line } from "react-icons/ri";
import { cn } from "@/lib/utils";
import {
  PREDICTION_MODEL_INFO_TITLE,
  PREDICTION_MODEL_INFO_SUBTITLE,
  PREDICTION_MODEL_PRIMARY_BADGE,
  PREDICTION_MODEL_PRIMARY_TITLE,
  PREDICTION_MODEL_PRIMARY_DESCRIPTION,
  PREDICTION_MODEL_LIME_BADGE,
  PREDICTION_MODEL_LIME_TITLE,
  PREDICTION_MODEL_LIME_DESCRIPTION,
  PREDICTION_MODEL_SHAP_BADGE,
  PREDICTION_MODEL_SHAP_TITLE,
  PREDICTION_MODEL_SHAP_DESCRIPTION,
  PREDICTION_MODEL_IG_BADGE,
  PREDICTION_MODEL_IG_TITLE,
  PREDICTION_MODEL_IG_DESCRIPTION,
  PREDICTION_MODEL_SALIENCY_BADGE,
  PREDICTION_MODEL_SALIENCY_TITLE,
  PREDICTION_MODEL_SALIENCY_DESCRIPTION,
} from "@/constants/constants";

type ModelCardTone = "primary" | "accent" | "neutral";

interface ModelInfoCard {
  badge: string;
  title: string;
  description: string;
  tone: ModelCardTone;
  Icon: IconType;
}

const MODEL_INFO_CARDS: ModelInfoCard[] = [
  {
    badge: PREDICTION_MODEL_PRIMARY_BADGE,
    title: PREDICTION_MODEL_PRIMARY_TITLE,
    description: PREDICTION_MODEL_PRIMARY_DESCRIPTION,
    tone: "primary",
    Icon: RiBrain2Line,
  },
  {
    badge: PREDICTION_MODEL_LIME_BADGE,
    title: PREDICTION_MODEL_LIME_TITLE,
    description: PREDICTION_MODEL_LIME_DESCRIPTION,
    tone: "accent",
    Icon: FiEye,
  },
  {
    badge: PREDICTION_MODEL_SHAP_BADGE,
    title: PREDICTION_MODEL_SHAP_TITLE,
    description: PREDICTION_MODEL_SHAP_DESCRIPTION,
    tone: "neutral",
    Icon: FiBarChart2,
  },
  {
    badge: PREDICTION_MODEL_IG_BADGE,
    title: PREDICTION_MODEL_IG_TITLE,
    description: PREDICTION_MODEL_IG_DESCRIPTION,
    tone: "accent",
    Icon: FiActivity,
  },
  {
    badge: PREDICTION_MODEL_SALIENCY_BADGE,
    title: PREDICTION_MODEL_SALIENCY_TITLE,
    description: PREDICTION_MODEL_SALIENCY_DESCRIPTION,
    tone: "neutral",
    Icon: FiShield,
  },
];

const TONE_CLASSES: Record<ModelCardTone, string> = {
  primary: "bg-indigo-100 text-indigo-700",
  accent: "bg-emerald-100 text-emerald-700",
  neutral: "bg-slate-100 text-slate-700",
};

/**
 * Shows a compact guide to the prediction model and explanation methods.
 *
 * Props:
 * - None.
 *
 * Example:
 * - <PredictionModelInfo />
 */
export function PredictionModelInfo() {
  return (
    <section
      aria-labelledby="prediction-model-info-title"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="prediction-model-info-title"
          className="font-semibold text-zinc-800"
        >
          {PREDICTION_MODEL_INFO_TITLE}
        </h2>
        <p className="text-sm text-zinc-500">
          {PREDICTION_MODEL_INFO_SUBTITLE}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {MODEL_INFO_CARDS.map(({ badge, title, description, tone, Icon }) => (
          <article
            key={title}
            className="flex flex-col h-full gap-3 p-4 border rounded-lg shadow-sm border-slate-200 bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  TONE_CLASSES[tone],
                )}
              >
                <Icon aria-hidden="true" className="w-5 h-5" />
              </div>
              <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {badge}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-zinc-800">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
