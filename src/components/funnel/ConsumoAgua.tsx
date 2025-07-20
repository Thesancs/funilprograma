
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface ConsumoAguaProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConsumoAgua({ pontos, setPontos }: ConsumoAguaProps) {
  const [litrosSelecionados, setLitrosSelecionados] = useState(2.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const minLitros = 0.5;
  const maxLitros = 5.0;
  const waterPercentage = ((litrosSelecionados - minLitros) / (maxLitros - minLitros)) * 100;

  const getFeedback = () => {
    if (litrosSelecionados < 1.5) return "Hidrate-se mais! 🫤";
    if (litrosSelecionados >= 1.5 && litrosSelecionados < 2.5) return "Hidratação razoável. 💧";
    return "Ótimo nível de água! 🥰";
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    const value = parseFloat(event.target.value);
    setLitrosSelecionados(value);
    console.log('[ConsumoAgua]', value);
  };

  const handleNext = () => {
    setIsLoading(true);
    const pontosGanhos = 100;
    const newPoints = pontos + pontosGanhos;
    setPontos(newPoints);

    toast({
      title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
      description: "Manter-se hidratada é fundamental.",
      duration: 3000,
    });

    setTimeout(() => {
      // TODO: Navigate to the next step when it's created
      router.push(`/?pontos=${newPoints}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-4">
          💧 Quanto de água você bebe por dia?
        </h2>

        <div className="flex items-center justify-center w-full my-6">
          <div className="relative w-28 sm:w-32 h-72 sm:h-80 bg-[#DEEAF5] rounded-t-2xl border-2 border-b-0 border-[#344154]/40">
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-[#A0C4E3]"
              style={{ height: `${waterPercentage}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${waterPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute -top-8 w-full text-center">
              <span className="font-bold text-lg">{litrosSelecionados.toFixed(1)} L</span>
            </div>
          </div>

          <input
            type="range"
            min={minLitros}
            max={maxLitros}
            step="0.5"
            value={litrosSelecionados}
            onChange={handleSliderChange}
            className="w-72 sm:w-80 h-2 ml-4 appearance-none [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            style={{ transform: 'rotate(-90deg)' }}
            aria-label="Quantidade de água em litros"
          />
        </div>

        <p className="text-center text-muted-foreground h-6">{getFeedback()}</p>

        <div className="mt-8">
          {hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={handleNext} size="lg" disabled={isLoading}>
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
