import type { PropsWithChildren } from "react";

interface StatisticsTabPanelProps extends PropsWithChildren {
  panelId: string;
  labelledBy: string;
  hidden: boolean;
}

export function StatisticsTabPanel({
  panelId,
  labelledBy,
  hidden,
  children,
}: StatisticsTabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      hidden={hidden}
    >
      {children}
    </div>
  );
}
