import type { Metadata } from "next";
import "./globals.css";
import ClientOnly from "@/components/ClientOnly/ClientOnly";
import ShellController from "@/components/layout/ShellController";
import { AuthProvider } from "@/lib/auth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saduci Platform",
  description: "Plataforma de gestión Saduci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased bg-zinc-50 text-zinc-900`}
      >
        <AuthProvider>
          <ClientOnly fallback={<div className="min-h-screen" />}>
            <ShellController>{children}</ShellController>
          </ClientOnly>
        </AuthProvider>
      </body>
    </html>
  );
}
