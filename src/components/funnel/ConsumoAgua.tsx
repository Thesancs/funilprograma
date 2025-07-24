
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface ConsumoAguaProps {
  nome: string;
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConsumoAgua({ nome, pontos, setPontos }: ConsumoAguaProps) {
  const [litros, setLitros] = useState(2.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setLitros(parseFloat(event.target.value));
  };
  
  const nivelPercent = ((litros - 0.5) / (5.0 - 0.5)) * 100;

  const getFeedback = () => {
    if (!hasInteracted) return "Ajuste a quantidade de água";
    if (litros < 1.5) return "Hidrate-se mais! 🫤";
    if (litros >= 1.5 && litros < 2.5) return "Hidratação razoável. 💧";
    return "Ótimo nível de água! 🥰";
  };

  const handleNext = () => {
    setIsLoading(true);
    const pontosGanhos = 100;
    const newPoints = pontos + pontosGanhos;
    setPontos(newPoints);
    console.log('[ConsumoAgua]', litros);

    toast({
      title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
      description: "Manter-se hidratada é fundamental.",
      duration: 3000,
    });

    setTimeout(() => {
      router.push(`/quiz/atividade-fisica?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 text-card-foreground">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-4">
          💧 Quanto de água você bebe por dia?
        </h2>

        <div className="flex items-end justify-center w-full my-6 gap-4">
            <div 
                className="relative w-28 sm:w-32 h-72 rounded-t-2xl border-2 border-b-0 border-[#344154]/40 overflow-hidden bg-white/50"
                style={{ pointerEvents: 'none' }}
            >
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-[#A0C4E3]"
                    style={{ height: `${nivelPercent}%`, pointerEvents: 'none' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${nivelPercent}%`}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
            
            <input
              type="range"
              min={0.5}
              max={5.0}
              step={0.1}
              value={litros}
              onChange={handleSliderChange}
              className="h-72 w-4 cursor-pointer appearance-none bg-transparent accent-primary [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-primary/20 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              aria-label="Quantidade de água em litros"
            />
             
            <div className="relative h-72 w-12 text-xs text-muted-foreground">
                <span className="absolute -top-6 text-foreground font-bold text-lg">{litros.toFixed(1)} L</span>
            </div>
        </div>

        <p className="text-center text-muted-foreground h-6">{getFeedback()}</p>

        <div className="mt-8">
          {hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
               <Button 
                onClick={handleNext} 
                size="lg" 
                disabled={isLoading}
                className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Avançar
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
