"use client";

import { useEffect, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  disabled?: boolean;
}

export function Footer({ className, disabled }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const notifications = [
    {
      id: 1,
      title: "Nueva tarea asignada",
      body: "Tienes una nueva tarea.",
      read: false,
    },
    {
      id: 2,
      title: "Informe listo",
      body: "El informe semanal está disponible.",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <footer
      className={cn(
        "flex h-12 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-8 transition-colors",
        disabled && "opacity-50 grayscale pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-6">
        <p className="text-(length:--font-size-xs) font-medium text-slate-400">
          &copy; {currentYear} Sadeci Platform
        </p>
      </div>

      <div className="flex items-center gap-4" ref={ref}>
        <div className="relative">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            title="Notificaciones"
          >
            <FiBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>

          <div
            className={cn(
              "absolute right-0 bottom-full mb-2 w-80 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/30 shadow-lg z-20 transform-gpu transition duration-150 origin-bottom-right",
              open
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-1 scale-95 pointer-events-none",
            )}
            role="dialog"
            aria-hidden={!open}
          >
            <div className="p-3 border-b border-slate-100/30">
              <h4 className="text-sm font-semibold text-slate-800">
                Notificaciones
              </h4>
            </div>
            <div className="max-h-60 overflow-auto divide-y divide-slate-100/30">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "px-4 py-3 hover:bg-slate-50/60",
                      n.read ? "bg-transparent" : "bg-slate-50/60",
                    )}
                  >
                    <div className="text-sm font-medium text-slate-900">
                      {n.title}
                    </div>
                    <div className="text-sm text-slate-600">{n.body}</div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-slate-500">
                  <div className="mx-auto mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100/50 text-slate-600">
                    <FiBell className="h-4 w-4" />
                  </div>
                  No hay notificaciones
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
