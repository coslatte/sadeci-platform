import React from "react";

type TestingBoardProps = {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
};

export const TestingBoard = ({
  children,
  direction = "horizontal",
  className = "",
}: TestingBoardProps) => {
  const base =
    `flex flex-wrap ${direction === "vertical" ? "flex-col" : "flex-row"} ${className}`.trim();
  return <div className={base}>{children}</div>;
};

export default TestingBoard;
