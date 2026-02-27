"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  closeOnSelect?: boolean;
}

export function Popover({
  trigger,
  children,
  align = "right",
  className,
  closeOnSelect = true,
}: PopoverProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    null,
  );

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(target)) return;
      // trigger closing animation
      setExiting(true);
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setExiting(true);
    }

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // If content contains interactive items that should close the popover
  useEffect(() => {
    if (!contentRef.current || !closeOnSelect) return;
    const el = contentRef.current;
    function handler(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // close when clicking a button/link inside content
      if (target.closest("button") || target.closest("a")) {
        setExiting(true);
      }
    }

    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [closeOnSelect]);

  // compute position of popover when open
  useLayoutEffect(() => {
    if (!open || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const width = 320; // w-80
    let left = rect.right - width;
    if (align === "left") left = rect.left;
    if (align === "center") left = rect.left + rect.width / 2 - width / 2;
    setPosition({ top: rect.bottom + scrollY + 8, left });
  }, [open, align]);

  // handle exiting animation timing
  useEffect(() => {
    if (!exiting) return;
    // wait for animation then close
    const t = setTimeout(() => {
      setExiting(false);
      setOpen(false);
    }, 180);
    return () => clearTimeout(t);
  }, [exiting]);

  const content = (
    <div
      id={id}
      ref={contentRef}
      role="dialog"
      aria-modal={false}
      className={cn(
        // use footer-like glassmorphism + softer border and enter/exit animation
        "rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/30 shadow-lg p-3 transform-gpu transition-all duration-150",
        exiting ? "opacity-0 -translate-y-1 scale-95 pointer-events-none" : "opacity-100 translate-y-0 scale-100",
        "w-80",
      )}
      style={position ? { position: "absolute", top: position.top, left: position.left } : undefined}
    >
      <div className="flex justify-end mb-2">
        <button
          aria-label="Cerrar"
          className="text-gray-500 hover:text-gray-700 p-1 rounded"
          onClick={() => setExiting(true)}
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      <div className="text-sm text-zinc-900">{children}</div>
    </div>
  );

  return (
    <div className={cn("relative inline-block", className)} ref={wrapperRef}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (open) setExiting(true);
          else setOpen(true);
        }}
        className="inline-flex items-center"
      >
        {trigger}
      </button>

      {(open || exiting) && createPortal(content, document.body)}
    </div>
  );
}

export default Popover;
