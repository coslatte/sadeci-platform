"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SidebarTooltipProps {
  label: string;
  position: {
    top: number;
    left: number;
  };
}

export function SidebarTooltip({ label, position }: SidebarTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;

    // Trigger CSS transition by toggling classes on next animation frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.remove("opacity-0", "scale-95");
        el.classList.add("opacity-100", "scale-100");
      });
    });
  }, []);

  if (typeof document === "undefined") return null;

  const el = (
    <div
      className="pointer-events-none fixed z-50 -translate-y-1/2"
      style={{ top: position.top, left: position.left }}
    >
      <div
        ref={tooltipRef}
        role="tooltip"
        className="opacity-0 scale-95 transform bg-white/75 backdrop-blur-sm border border-white/30 text-slate-900 rounded-md shadow-lg px-3 py-1 text-sm whitespace-nowrap transition-all duration-150"
      >
        {label}
      </div>
    </div>
  );

  return createPortal(el, document.body);
}

export default SidebarTooltip;
