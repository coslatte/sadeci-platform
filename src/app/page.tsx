"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Spinner } from "@/components/atoms/Spinner";
import { Card } from "@/components/molecules/Card";
import { FormField } from "@/components/molecules/FormField";
import { IconButton } from "@/components/atoms/Button";
import { Navbar } from "@/components/organisms/Navbar";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Footer } from "@/components/organisms/Footer";
import { FiSend, FiRefreshCw, FiPlus, FiTrash2 } from "react-icons/fi";

const sidebarSections = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/",
        active: true,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        label: "Reportes",
        href: "/reportes",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        label: "Usuarios",
        href: "/usuarios",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
      },
      {
        label: "Ajustes",
        href: "/ajustes",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
      },
    ],
  },
];

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  function triggerLoadingDemo() {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar
        userName="Ana García"
        userRole="Administrador"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
      />

      <div className="flex flex-1">
        <div className="hidden md:flex">
          <Sidebar sections={sidebarSections} collapsed={sidebarCollapsed} />
        </div>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Bienvenido a Sadeci Platform
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Usuarios activos",
                value: "1,284",
                status: "success" as const,
              },
              {
                label: "Solicitudes pendientes",
                value: "42",
                status: "warning" as const,
              },
              {
                label: "Reportes generados",
                value: "318",
                status: "info" as const,
              },
              {
                label: "Alertas críticas",
                value: "3",
                status: "danger" as const,
              },
            ].map((stat) => (
              <Card key={stat.label}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                  <Badge status={stat.status}>{stat.status}</Badge>
                </div>
                <p className="mt-2 text-3xl font-bold text-zinc-900">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          {/* Content row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Team card */}
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">
                    Equipo
                  </h2>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </div>
              }
            >
              <ul className="divide-y divide-zinc-100">
                {[
                  {
                    name: "Ana García",
                    role: "Administrador",
                    status: "success" as const,
                  },
                  {
                    name: "Carlos López",
                    role: "Analista",
                    status: "info" as const,
                  },
                  {
                    name: "María Torres",
                    role: "Editor",
                    status: "warning" as const,
                  },
                ].map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-3 py-3"
                  >
                    <Avatar name={member.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {member.role}
                      </p>
                    </div>
                    <Badge status={member.status}>{member.role}</Badge>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Form card */}
            <Card
              header={
                <h2 className="text-base font-semibold text-zinc-900">
                  Nueva solicitud
                </h2>
              }
              footer={
                <div className="flex justify-end gap-3">
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                  <Button size="sm">Guardar</Button>
                </div>
              }
            >
              <div className="flex flex-col gap-4">
                <FormField
                  id="nombre"
                  label="Nombre completo"
                  required
                  inputProps={{ placeholder: "Ej. Juan Pérez", type: "text" }}
                />
                <FormField
                  id="email"
                  label="Correo electrónico"
                  required
                  inputProps={{
                    placeholder: "correo@ejemplo.com",
                    type: "email",
                  }}
                />
                <FormField
                  id="descripcion"
                  label="Descripción"
                  hint="Máximo 500 caracteres."
                  inputProps={{ placeholder: "Describe la solicitud..." }}
                />
              </div>
            </Card>
          </div>

          {/* Button showcase */}
          <Card
            className="mt-6"
            header={
              <h2 className="text-base font-semibold text-zinc-900">
                Componentes — Atoms
              </h2>
            }
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button
                variant="primary"
                loading={loadingDemo}
                onClick={triggerLoadingDemo}
              >
                Enviar
              </Button>
              <Button variant="primary" disabled>
                Desactivado
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge status="default">Default</Badge>
              <Badge status="info">Info</Badge>
              <Badge status="success">Success</Badge>
              <Badge status="warning">Warning</Badge>
              <Badge status="danger">Danger</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Avatar name="Juan Pérez" size="xs" />
              <Avatar name="Ana García" size="sm" />
              <Avatar name="Carlos López" size="md" />
              <Avatar name="María Torres" size="lg" />
            </div>

            {/* IconButton showcase */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              IconButton — variants &amp; sizes
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton
                variant="primary"
                size="md"
                icon={<FiPlus />}
                aria-label="Agregar"
              />
              <IconButton
                variant="secondary"
                size="md"
                icon={<FiRefreshCw />}
                aria-label="Actualizar"
              />
              <IconButton
                variant="outline"
                size="md"
                icon={<FiSend />}
                aria-label="Enviar"
              />
              <IconButton
                variant="ghost"
                size="md"
                icon={<FiSend />}
                aria-label="Enviar (ghost)"
              />
              <IconButton
                variant="danger"
                size="md"
                icon={<FiTrash2 />}
                aria-label="Eliminar"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <IconButton
                variant="primary"
                size="xs"
                icon={<FiPlus />}
                aria-label="xs"
              />
              <IconButton
                variant="primary"
                size="sm"
                icon={<FiPlus />}
                aria-label="sm"
              />
              <IconButton
                variant="primary"
                size="md"
                icon={<FiPlus />}
                aria-label="md"
              />
              <IconButton
                variant="primary"
                size="lg"
                icon={<FiPlus />}
                aria-label="lg"
              />
              <IconButton
                variant="primary"
                size="xl"
                icon={<FiPlus />}
                aria-label="xl"
              />
            </div>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  );
}
