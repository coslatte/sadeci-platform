"use client";

import { FiGithub, FiBox, FiActivity, FiBookOpen } from "react-icons/fi";
import LinkCard from "@/components/molecules/LinkCard";
import { Card } from "@/components/molecules/Card";
import { useAuth } from "@/lib/auth";
import { Container } from "@/components/layout/Container";

const PROJECT_LINKS = [
  {
    label: "Repositorio GitHub",
    href: "https://github.com/coslatte/sadeci-platform",
    icon: <FiGithub className="size-5" />,
    description: "Código fuente y contribuciones",
  },
  {
    label: "Documentación",
    href: "https://github.com/coslatte/sadeci-platform#readme",
    icon: <FiBookOpen className="size-5" />,
    description: "Guía de uso y referencia técnica",
  },
];

export default function Home() {
  const { user } = useAuth();
  const greeting = user ? `Hola, ${user.name.split(" ")[0]}` : "Bienvenido";

  return (
    <Container size="full" className="space-y-8 py-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900 md:text-(length:--font-size-3xl)">
          {greeting}
        </h1>
        <p className="mt-2 text-(length:--font-size-sm) text-slate-500">
          Panel principal de Sadeci Platform — sistema de simulación y análisis
          clínico para Unidades de Cuidados Intensivos.
        </p>
      </div>

      {/* Platform info card */}
      <Card
        header={
          <div className="flex items-center gap-3">
            <FiBox className="size-5 text-primary-600" />
            <h2 className="text-(length:--font-size-lg) font-semibold text-slate-800">
              Acerca de la Plataforma
            </h2>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-(length:--font-size-sm) leading-relaxed text-slate-600">
            <strong>Sadeci Platform</strong> es una herramienta de simulación
            clínica diseñada para modelar la evolución de pacientes en la Unidad
            de Cuidados Intensivos (UCI). Permite ejecutar simulaciones Monte
            Carlo con parámetros clínicos reales y obtener predicciones de
            mortalidad.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-(length:--font-size-xs) font-medium text-primary-700">
              <FiActivity className="size-3.5" /> Simulación Monte Carlo
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-(length:--font-size-xs) font-medium text-secondary-700">
              v0.1.0
            </span>
          </div>
        </div>
      </Card>

      {/* Project links as individual cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECT_LINKS.map((link) => (
          <LinkCard
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            description={link.description}
          />
        ))}
      </div>
    </Container>
  );
}
