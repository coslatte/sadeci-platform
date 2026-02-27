"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export interface NotificationItem {
  id: number | string;
  title: string;
  body?: string;
  read?: boolean;
}

interface NotificationsContextValue {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: NotificationItem["id"]) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<NotificationItem, "id">) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: "Nueva tarea asignada", body: "Tienes una nueva tarea.", read: false },
    { id: 2, title: "Informe listo", body: "El informe semanal está disponible.", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAsRead(id: NotificationItem["id"]) {
    setNotifications((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((p) => ({ ...p, read: true })));
  }

  function addNotification(n: Omit<NotificationItem, "id">) {
    setNotifications((prev) => [
      { id: prev.length ? Math.max(...prev.map((p) => Number(p.id))) + 1 : 1, ...n },
      ...prev,
    ]);
  }

  const value = useMemo(
    () => ({ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }),
    [notifications, unreadCount],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    return {
      notifications: [] as NotificationItem[],
      unreadCount: 0,
      markAsRead: () => {},
      markAllAsRead: () => {},
      addNotification: () => {},
    };
  }
  return ctx;
}
