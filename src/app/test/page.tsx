"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Buttons";
import { Badge } from "@/components/atoms/Badge";
import { Spinner } from "@/components/atoms/Spinner";
import { TestingBoard } from "./components/TestingBoard";

export default function TestIndexPage() {
  const [loadingDemo, setLoadingDemo] = useState(false);

  function triggerLoadingDemo() {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl space-y-2">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">Test Dome</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            ipsa illo illum reiciendis in sapiente, aspernatur fuga, ab
            asperiores corporis pariatur repudiandae suscipit veniam
            voluptatibus consectetur ipsum, officiis accusamus assumenda?
          </p>
        </header>

        {/* Testing dome stuff where to drop buttom components */}
        <h2 className="text-lg font-medium text-zinc-900">Buttons</h2>
        <TestingBoard>
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
        </TestingBoard>
        <h3 className="text-lg font-medium text-zinc-900">Vertical example</h3>
        <TestingBoard direction="vertical">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </TestingBoard>

        {/* tarjeta con todos los botones */}
        <h2 className="text-lg font-medium text-zinc-900">
          Variants y estados
        </h2>
        <TestingBoard>
          <Badge status="default">Default</Badge>
          <Badge status="info">Info</Badge>
          <Badge status="success">Success</Badge>
          <Badge status="warning">Warning</Badge>
          <Badge status="danger">Danger</Badge>
        </TestingBoard>

        {/* spinners section - all sizes and fun variations */}
        <h3 className="text-lg font-medium text-zinc-900">Spinners</h3>
        <TestingBoard>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
          {/* color overrides */}
          <Spinner size="lg" className="text-red-500" />
          <Spinner size="lg" className="text-green-500" />
          {/* animation speed variants using duration utility */}
          <Spinner size="lg" className="animate-spin duration-1000" />
          <Spinner size="lg" className="animate-spin duration-200" />
        </TestingBoard>

        {/* circular button examples */}
        <h3 className="text-lg font-medium text-zinc-900">Circular buttons</h3>
        <TestingBoard>
          <Button variant="circle" size="xs">
            A
          </Button>
          <Button variant="circle" size="sm">
            B
          </Button>
          <Button variant="circle" size="md">
            C
          </Button>
          <Button variant="circle" size="lg">
            D
          </Button>
          <Button variant="circle" size="xl">
            E
          </Button>
          {/* icon-style labels */}
          <Button variant="circle" size="md">
            ⚙️
          </Button>
          <Button variant="circle" size="md" loading>
            <span className="sr-only">loading</span>
          </Button>
        </TestingBoard>

        {/* creative combos */}
        <h3 className="text-lg font-medium text-zinc-900">Combos creativos</h3>
        <TestingBoard>
          <Button variant="primary" size="lg" loading>
            Guardar
          </Button>
          <Button variant="danger" size="sm" disabled>
            Eliminar
          </Button>
          <Button
            variant="outline"
            size="md"
            className="bg-linear-to-r from-purple-400 to-pink-500 text-white"
          >
            Gradiente
          </Button>
          <Button variant="ghost" size="xl">
            Fantasma XL
          </Button>
          <Button
            variant="primary"
            loading
            spinner={<Spinner size="sm" className="text-yellow-500" />}
          >
            Custom Spin
          </Button>
        </TestingBoard>
      </div>
    </main>
  );
}
