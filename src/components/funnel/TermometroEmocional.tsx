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
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
  nivelMedo: number;
  setNivelMedo: React.Dispatch<React.SetStateAction<number>>;
}

const faixas = {
  baixo: {
    emoji: "😌",
    feedback: "Está tudo bem, continue respirando.",
    bgColor: "bg-[#344154]",
    mercúrioColor: "bg-blue-300",
    textColor: "text-white",
  },
  medio: {
    emoji: "😬",
    feedback: "Entendemos; vamos equilibrar juntas.",
    bgColor: "bg-[#F4D35E]",
    mercúrioColor: "bg-yellow-300",
    textColor: "text-gray-800",
  },
  alto: {
    emoji: "😱",
    feedback: "Você não está sozinha. Vamos te apoiar.",
    bgColor: "bg-[#B16262]",
    mercúrioColor: "bg-red-300",
    textColor: "text-white",
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

export default function TermometroEmocional({ pontos, setPontos, nivelMedo, setNivelMedo }: TermometroEmocionalProps) {
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
      router.push(`/plano?pontos=${newPoints}`);
    }, 1500);
  };

  return (
     <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
        <Card className="w-full bg-card/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-4 flex flex-col items-center justify-center">
                <h2 className={cn("text-lg font-semibold mb-2 text-card-foreground")}>
                    😨 Como está o seu medo hoje?
                </h2>

                <div className="flex flex-col items-center justify-center gap-2 w-full">
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
                    
                    <div className="relative w-8 h-48">
                        <div className="absolute inset-0 w-full h-full rounded-full bg-gray-200 border border-[#344154]/40 overflow-hidden">
                            <motion.div 
                                className={cn("absolute bottom-0 left-0 w-full", faixaAtual.mercúrioColor)}
                                initial={{ height: "0%" }}
                                animate={{ height: `${nivelMedo}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={nivelMedo}
                            onChange={handleSliderChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{ writingMode: 'vertical-lr' }}
                            aria-label="Nível de medo"
                        />
                    </div>
                    
                    <p className={cn("text-sm mt-2 h-10 text-card-foreground")}>
                        {faixaAtual.feedback}
                    </p>
                </div>

                <div className="mt-4">
                    <Button 
                        onClick={handleNext} 
                        size="lg" 
                        disabled={!hasInteracted || isLoading}
                        className="bg-[#9D4C63] text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
