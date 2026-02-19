import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sadeci Platform",
  description: "Plataforma de gestión Sadeci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
