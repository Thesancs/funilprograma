
"use client";

import { useState, useMemo } from 'react';
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
    mercúrioColor: "bg-emerald-400",
    textColor: "text-emerald-900",
  },
  medio: {
    emoji: "😬",
    feedback: "Entendemos; vamos equilibrar juntas.",
    bgColor: "bg-amber-100",
    mercúrioColor: "bg-amber-400",
    textColor: "text-amber-900",
  },
  alto: {
    emoji: "😱",
    feedback: "Você não está sozinha. Vamos te apoiar.",
    bgColor: "bg-rose-100",
    mercúrioColor: "bg-rose-500",
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
  
  const router = useRouter();
  const { toast } = useToast();

  const faixaAtual = useMemo(() => getFaixa(nivelMedo), [nivelMedo]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setNivelMedo(parseInt(event.target.value));
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
  
  const coluna = Math.min(nivelMedo, 100);

  return (
     <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
        <Card className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
            <CardContent className="p-4 flex flex-col items-center justify-center">
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
                        className="relative flex flex-col items-center"
                    >
                        {/* === Tubo === */}
                        <div className="relative w-8 h-64 bg-gray-200 rounded-full border-[4px] border-gray-400 overflow-hidden">
                            {/* Mercúrio */}
                            <motion.div
                                className={cn('absolute bottom-0 left-0 w-full', faixaAtual.mercúrioColor)}
                                initial={{ height: 0 }}
                                animate={{ height: `${coluna}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>

                        {/* === Bulbo Fixo === */}
                        <div className={cn('w-14 h-14 -mt-4 rounded-full border-[6px] border-gray-400 shadow-inner', faixaAtual.mercúrioColor, nivelMedo >= 67 && "animate-pulse")} />
                        
                        {/* Slider invisível sobreposto */}
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={nivelMedo}
                            onChange={handleSliderChange}
                            onPointerDown={() => document.body.classList.add('lock-scroll')}
                            onPointerUp={() => document.body.classList.remove('lock-scroll')}
                            onPointerCancel={() => document.body.classList.remove('lock-scroll')}
                            className="absolute inset-0 opacity-0 naked cursor-pointer"
                            aria-label="Nível de medo"
                        />
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
