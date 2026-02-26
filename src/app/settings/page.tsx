"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Buttons";
import { useAuth } from "@/lib/auth";

export default function UserSettingsPage() {
  const { user } = useAuth();

  // Allow using mock data via toggle
  const [useMock, setUseMock] = useState(false);

  const effectiveUser =
    useMock || !user
      ? {
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          role: "Administrador",
        }
      : user;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!newPassword || newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden o son inválidas.");
      return;
    }

    setLoading(true);

    try {
      // Call backend API to change password. If in mock mode, we still call the same endpoint
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, mock: useMock }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Contraseña actualizada correctamente.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Error al actualizar la contraseña.");
      }
    } catch {
      setMessage("Error de red al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Ajustes de usuario</h1>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={useMock}
            onChange={(e) => setUseMock(e.target.checked)}
          />
          Usar datos mock
        </label>
      </div>

      <section className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar name={effectiveUser.name} size="lg" />
            <div>
              <div className="font-medium text-lg">{effectiveUser.name}</div>
              <div className="text-sm text-zinc-500">{effectiveUser.role}</div>
              <div className="text-sm text-zinc-500">{effectiveUser.email}</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Cambiar contraseña</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1">Contraseña actual</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Contraseña actual"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Nueva contraseña</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Confirmar nueva contraseña
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar nueva contraseña"
              />
            </div>

            {message && <div className="text-sm text-zinc-700">{message}</div>}

            <div className="pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
