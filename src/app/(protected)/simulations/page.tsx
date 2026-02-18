import { Suspense } from "react";
import { SimulationsPage } from "@/features/simulations";
import { LoadingSpinner } from "@/shared/components";

export default function Simulations() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner />
        </div>
      }
    >
      <SimulationsPage />
    </Suspense>
  );
}
