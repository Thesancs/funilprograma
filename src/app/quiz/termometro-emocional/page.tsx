"use client";

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import TermometroEmocional, { getBackgroundColor } from '@/components/funnel/TermometroEmocional';

function TermometroEmocionalContent() {
    const searchParams = useSearchParams();
    const initialPontos = parseInt(searchParams.get('pontos') || '0', 10);
    const [pontos, setPontos] = useState(initialPontos);
    const [nivelMedo, setNivelMedo] = useState(0);

    const bgColor = getBackgroundColor(nivelMedo);

    return (
        <main className={cn(
            "flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden",
            bgColor
        )}>
           <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                <TermometroEmocional 
                    pontos={pontos} 
                    setPontos={setPontos}
                    nivelMedo={nivelMedo}
                    setNivelMedo={setNivelMedo} 
                />
            </div>
        </main>
    );
}

export default function TermometroEmocionalPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <TermometroEmocionalContent />
        </Suspense>
    );
}
