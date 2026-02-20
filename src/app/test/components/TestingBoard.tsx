"use client";

import { ReactNode } from "react";

export interface TestingBoardProps {
  children: ReactNode;
  /**
   * Layout direction of the board. Horizontal is the default.
   */
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function TestingBoard({
  children,
  direction = "horizontal",
  className = "",
}: TestingBoardProps) {
  const flexDir = direction === "vertical" ? "flex-col" : "flex-row";
  // default section styles match the examples used in the test page
  const sectionClasses =
    "space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm";

  return (
    <section className={`${sectionClasses} ${className}`.trim()}>
      <div className={`flex flex-wrap gap-4 ${flexDir}`.trim()}>{children}</div>
    </section>
  );
}
