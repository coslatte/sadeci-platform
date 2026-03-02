"use client";

import React from "react";
import { FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";

// Presentational className constants to make future token extraction easier
const PANEL_BASE =
  "w-80 rounded-xl bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg z-20 transform-gpu transition duration-150 origin-top-right";
const HEADER_BASE =
  "p-3 border-b border-slate-100/30 flex items-center justify-between";
const MARK_ALL_BTN = "text-sm text-slate-500 hover:text-slate-700";
const LIST_BASE = "max-h-60 overflow-auto divide-y divide-slate-100/30";
const ITEM_BASE =
  "px-4 py-3 hover:bg-slate-50/60 flex justify-between items-start";
const ITEM_UNREAD = "bg-slate-50/60";
const ITEM_READ = "bg-transparent";
const ACTION_BTN = "text-sm text-primary-600 hover:underline";
const EMPTY_BASE = "p-6 text-center text-sm text-slate-500";
const EMPTY_ICON =
  "mx-auto mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100/50 text-slate-600";

export interface NotificationItem {
  id: number | string;
  title: string;
  body?: string;
  read?: boolean;
}

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  className?: string;
}

/**
 * NotificationsPanel
 *
 * Renders a small dialog-style list of notifications. This component is
 * intentionally presentation-focused and exposes optional callbacks used by
 * the surrounding container or context to update notification state.
 *
 * Accessibility: the panel uses `role="dialog"` and is intended to be
 * opened from an accessible trigger (aria-haspopup on the trigger).
 *
 * @param notifications - array of notifications to render
 * @param className - optional className to merge into the root
 * @param onMarkAsRead - optional callback invoked with the notification id when the user marks a notification as read
 * @param onMarkAllAsRead - optional callback invoked when the user clicks "Marcar todo"
 */
export function NotificationsPanel({
  notifications,
  className,
  // optional callbacks
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsPanelProps & {
  onMarkAsRead?: (id: NotificationItem["id"]) => void;
  onMarkAllAsRead?: () => void;
}) {
  return (
    <div className={cn(PANEL_BASE, className)} role="dialog">
      <div className="flex items-center justify-between p-3 border-b border-slate-100/30">
        <h4 className="text-sm font-semibold text-slate-800">Notificaciones</h4>
        <div className="flex items-center gap-2">
          {onMarkAllAsRead && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className={MARK_ALL_BTN}
            >
              Marcar todo
            </button>
          )}
        </div>
      </div>
      <div className={LIST_BASE}>
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn(ITEM_BASE, n.read ? ITEM_READ : ITEM_UNREAD)}
            >
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {n.title}
                </div>
                {n.body && (
                  <div className="text-sm text-slate-600">{n.body}</div>
                )}
              </div>
              <div className="pl-3">
                {!n.read && onMarkAsRead && (
                  <button
                    type="button"
                    onClick={() => onMarkAsRead(n.id)}
                    className={ACTION_BTN}
                  >
                    Marcar leída
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={EMPTY_BASE}>
            <div className={EMPTY_ICON}>
              <FiBell className="w-4 h-4" />
            </div>
            <div>No hay notificaciones</div>
            <div className="mt-2 text-[12px] text-slate-400">
              No hay notificaciones recientes. Te avisaremos cuando haya novedades.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
