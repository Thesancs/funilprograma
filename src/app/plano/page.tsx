
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import DepoimentosPrograma from '@/components/funnel/DepoimentosPrograma';
import Image from 'next/image';

function PlanoContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';

    return (
        <main className="relative min-h-screen w-full">
             <div className="absolute inset-0 z-0 h-full">
                 <Image
                    src="https://placehold.co/1200x1600.png"
                    alt="Mulher gestante feliz em um campo florido"
                    fill
                    className="object-cover object-top"
                    quality={80}
                    priority
                    data-ai-hint="happy pregnant woman"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-pink-300/60 to-white/90"></div>
            </div>
           <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-4 py-8 px-4">
                <div className="w-full flex justify-end items-center sticky top-4 z-20 pr-4">
                    <div className="flex items-center gap-2 text-foreground font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <DepoimentosPrograma nome={nome} pontos={pontos} />
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
