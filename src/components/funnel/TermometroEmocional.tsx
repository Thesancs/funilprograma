
"use client";

import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface TermometroEmocionalProps {
  nome: string;
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
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

export default function TermometroEmocional({ nome, pontos, setPontos, nivelMedo, setNivelMedo }: TermometroEmocionalProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termometroRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { toast } = useToast();

  const faixaAtual = useMemo(() => getFaixa(nivelMedo), [nivelMedo]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return; // Só move se o botão estiver pressionado

    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    const rect = termometroRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const y = e.clientY;
    const height = rect.height;
    const top = rect.top;
    
    // Calcula o percentual de baixo para cima
    const pct = 100 - ((y - top) / height) * 100;
    const newNivel = Math.max(0, Math.min(100, Math.round(pct)));
    
    setNivelMedo(newNivel);
  };
  
  const handlePointerDown = (e: React.PointerEvent) => {
    document.body.classList.add('lock-scroll');
    termometroRef.current?.setPointerCapture(e.pointerId);
    handlePointerMove(e); // Atualiza no primeiro clique
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    document.body.classList.remove('lock-scroll');
    termometroRef.current?.releasePointerCapture(e.pointerId);
  };


  const handleNext = () => {
    setIsLoading(true);
    const pontosGanhos = 100;
    const newPoints = pontos + pontosGanhos;
    setPontos(newPoints);
    console.log('[TermometroEmocional]', nivelMedo);

    toast({
        title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
        description: "Suas emoções são importantes.",
        duration: 3000,
    });

    setTimeout(() => {
      router.push(`/plano?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 1500);
  };
  
  const hColuna = nivelMedo * 0.82; 
  const corGradiente = faixaAtual.mercúrioColor;


  return (
     <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
        <Card className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
            <CardContent className="p-4 pt-6 flex flex-col items-center justify-center">
                <h2 className={cn("text-lg font-semibold mb-2 text-card-foreground")}>
                    😨 Como está o seu medo hoje?
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
                    
                    <div 
                      ref={termometroRef}
                      className="relative flex flex-col items-center select-none touch-none cursor-pointer"
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp} // Usa a mesma lógica para cancelar
                    >
                        {/* === TUBO de VIDRO === */}
                        <div className="relative w-12 h-64 rounded-full overflow-hidden border-[5px] border-white/70 shadow-xl bg-white/10 backdrop-blur-lg">
                            {/* Reflexo lateral */}
                            <div className="absolute inset-y-0 left-0 w-[35%] bg-white/30 opacity-30 pointer-events-none" />
                            {/* Coluna de mercúrio */}
                            <motion.div
                                className={cn("absolute bottom-0 left-0 w-full bg-gradient-to-t pointer-events-none", corGradiente)}
                                style={{ height: `${hColuna}%` }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                        </div>

                        {/* === BULBO === */}
                        <div className={cn(
                          "w-20 h-20 -mt-6 rounded-full border-[6px] border-white/70 shadow-inner pointer-events-none bg-gradient-to-br",
                           corGradiente,
                           nivelMedo >= 67 ? 'animate-pulse' : ''
                        )} />
                    </div>
                    
                    <p className={cn("text-sm mt-2 h-10 text-card-foreground")}>
                        {hasInteracted ? faixaAtual.feedback : 'Arraste para ajustar'}
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
