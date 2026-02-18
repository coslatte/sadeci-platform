import { Suspense } from "react";
import { PredictionsPage } from "@/features/predictions";
import { LoadingSpinner } from "@/shared/components";

export default function Predictions() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner />
        </div>
      }
    >
      <PredictionsPage />
    </Suspense>
  );
}
