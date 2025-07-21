
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Heart, Loader2 } from 'lucide-react';
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
    cardTextColor: "text-gray-800"
  },
  medio: {
    emoji: "😬",
    feedback: "Entendemos; vamos equilibrar juntas.",
    bgColor: "bg-[#F4D35E]",
    mercúrioColor: "bg-yellow-300",
    textColor: "text-gray-800",
    cardTextColor: "text-gray-800"
  },
  alto: {
    emoji: "😱",
    feedback: "Você não está sozinha. Vamos te apoiar.",
    bgColor: "bg-[#B16262]",
    mercúrioColor: "bg-red-300",
    textColor: "text-white",
    cardTextColor: "text-gray-800"
  }
};

const getFaixa = (nivel: number) => {
  if (nivel <= 33) return faixas.baixo;
  if (nivel <= 66) return faixas.medio;
  return faixas.alto;
};

export const getBackgroundColor = (nivel: number) => {
    return getFaixa(nivel).bgColor;
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
      // Navegar para a próxima etapa (a ser definida)
      router.push(`/?pontos=${newPoints}`);
    }, 1500);
  };

  return (
     <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <div className={cn("absolute top-4 right-4 flex items-center gap-2 font-semibold", faixaAtual.textColor)}>
            <Heart className="h-5 w-5" />
            <span>Pontos de cuidado: {pontos}</span>
        </div>
        <Card className="w-full bg-card/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 flex flex-col items-center justify-center">
                <h2 className={cn("text-xl sm:text-2xl font-semibold mb-4 text-card-foreground")}>
                    😨 Como está o seu medo na gestação hoje?
                </h2>

                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={faixaAtual.emoji}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl sm:text-5xl"
                        >
                            {faixaAtual.emoji}
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="relative w-8 sm:w-10 h-64 sm:h-72">
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
                    
                    <p className={cn("text-base sm:text-lg mt-2 h-10 text-card-foreground")}>
                        {faixaAtual.feedback}
                    </p>
                </div>

                <div className="mt-6">
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
