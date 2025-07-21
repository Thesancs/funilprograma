"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfertaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Página de Oferta</CardTitle>
          <CardDescription>
            Esta é a página final onde a oferta do programa será apresentada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Em breve, aqui você encontrará todos os detalhes para continuar sua jornada de bem-estar!
          </p>
          <Link href="/">
            <Button>Voltar para o início</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
