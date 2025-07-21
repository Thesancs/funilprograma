"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import OfertaFinal from '@/components/funnel/OfertaFinal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


function OfertaContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';

    return <OfertaFinal nome={nome} pontos={pontos} />;
}


export default function OfertaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4">
      <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <OfertaContent />
        </Suspense>
    </main>
  );
}
