
"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface TermometroEmocionalProps {
  nome: string;
  email: string;
  nivelMedo: number;
  setNivelMedo: React.Dispatch<React.SetStateAction<number>>;
}

const faixas = {
  baixo: {
    emoji: "😌",
    feedback: "Está tudo bem, continue respirando.",
    bgColor: "bg-emerald-100",
    mercúrioColor: "from-emerald-300 to-emerald-500",
    textColor: "text-emerald-900",
  },
  medio: {
    emoji: "😬",
    feedback: "Entendemos; vamos equilibrar juntas.",
    bgColor: "bg-amber-100",
    mercúrioColor: "from-amber-300 to-amber-500",
    textColor: "text-amber-900",
  },
  alto: {
    emoji: "😱",
    feedback: "Você não está sozinha. Vamos te apoiar.",
    bgColor: "bg-rose-100",
    mercúrioColor: "from-rose-400 to-rose-600",
    textColor: "text-rose-900",
  }
};

const getFaixa = (nivel: number) => {
  if (nivel <= 33) return faixas.baixo;
  if (nivel <= 66) return faixas.medio;
  return faixas.alto;
};

export const getBackgroundColor = (nivel: number, returnAll = false) => {
    const faixa = getFaixa(nivel);
    if (returnAll) return faixa;
    return faixa.bgColor;
}

export default function TermometroEmocional({ nome, email, nivelMedo, setNivelMedo }: TermometroEmocionalProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termometroRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { addPoints } = useQuiz();

  const faixaAtual = useMemo(() => getFaixa(nivelMedo), [nivelMedo]);
  const corGradiente = faixaAtual.mercúrioColor;
  const hColuna = nivelMedo; // Mudança: removido o multiplicador 0.82

  const updateNivelFromY = useCallback((y: number) => {
    if (!termometroRef.current) return;
    
    const rect = termometroRef.current.getBoundingClientRect();
    let relativeY = y - rect.top;
    let newNivel = 100 - (relativeY / rect.height) * 100;
    
    setNivelMedo(Math.max(0, Math.min(100, Math.round(newNivel))));
  }, [setNivelMedo]);
  
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!hasInteracted) setHasInteracted(true);
    document.body.classList.add('lock-scroll');
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateNivelFromY(e.clientY);
  }, [hasInteracted, updateNivelFromY]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
      updateNivelFromY(e.clientY);
    }
  }, [updateNivelFromY]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    document.body.classList.remove('lock-scroll');
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);
  
  const handleNext = () => {
    setIsLoading(true);
    const newPoints = addPoints(100);
    console.log(`[TermometroEmocional] New points: ${newPoints}`);

    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
      });
      router.push(`/plano?${params.toString()}`);
    }, 1500);
  };
  
  return (
     <div 
        ref={termometroRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center touch-none select-none"
      >
        <Card className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
            <CardContent className="p-4 pt-6 flex flex-col items-center justify-center">
                <h2 className={cn("text-lg font-semibold mb-2 text-card-foreground")}>
                     Como esta seu medo da gestação hoje
                </h2>

                <div className="flex flex-col items-center justify-center gap-2 w-full my-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={faixaAtual.emoji}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl"
                        >
                            {faixaAtual.emoji}
                        </motion.div>
                    </AnimatePresence>
                    
                     <div className="relative w-12 h-64">
                        {/* === TUBO de VIDRO === */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] border-white/70 shadow-xl bg-white/10 backdrop-blur-lg">
                            {/* Reflexo lateral */}
                            <div className="absolute inset-y-0 left-0 w-[35%] bg-white/30 opacity-30 pointer-events-none" />
                            {/* Coluna de mercúrio */}
                            <motion.div
                                className={cn("absolute bottom-0 left-0 w-full bg-gradient-to-t pointer-events-none", corGradiente)}
                                style={{ height: `${hColuna}%` }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            />
                        </div>

                         {/* === BULBO === */}
                         <div
                            className={cn(
                              "absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-20 h-20 rounded-full border-[6px] border-white/70 shadow-inner bg-gradient-to-br z-10",
                              corGradiente,
                              nivelMedo >= 67 ? 'animate-pulse' : ''
                            )}
                         />
                    </div>
                    
                    <p className={cn("text-sm mt-2 h-10 text-card-foreground")}>
                        {hasInteracted ? faixaAtual.feedback : 'Arraste o termômetro para cima ou para baixo para indicar seu nível de medo'}
                    </p>
                </div>

                <div className="mt-4">
                    <Button 
                        onClick={handleNext} 
                        size="lg" 
                        disabled={!hasInteracted || isLoading}
                        className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Avançar
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
