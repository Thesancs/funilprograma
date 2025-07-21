"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import DepoimentosPrograma from '@/components/funnel/DepoimentosPrograma';

function PlanoContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);

    return (
        <main className={cn("flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500 overflow-y-auto")}>
           <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                <div className="w-full flex justify-end items-center sticky top-4 z-20 pr-4">
                    <div className="flex items-center gap-2 text-foreground font-semibold bg-card/50 backdrop-blur-sm p-2 rounded-full shadow">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <DepoimentosPrograma />
            </div>
        </main>
    );
}

export default function PlanoPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <PlanoContent />
        </Suspense>
    );
}
