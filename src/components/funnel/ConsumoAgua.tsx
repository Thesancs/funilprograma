
"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


interface ConsumoAguaProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const BOTTLE_HEIGHT_PX = 288; // 18rem or h-72
const MIN_LITERS = 0.5;
const MAX_LITERS = 5.0;

export default function ConsumoAgua({ pontos, setPontos }: ConsumoAguaProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [litrosSelecionados, setLitrosSelecionados] = useState(2.5);

  const router = useRouter();
  const { toast } = useToast();
  const constraintsRef = useRef(null);
  
  const y = useMotionValue(BOTTLE_HEIGHT_PX / 2);

  const waterHeightPercentage = useTransform(y, [BOTTLE_HEIGHT_PX, 0], [0, 100]);
  
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    const currentY = y.get();
    const newLitros = ((BOTTLE_HEIGHT_PX - currentY) / BOTTLE_HEIGHT_PX) * (MAX_LITERS - MIN_LITERS) + MIN_LITERS;
    setLitrosSelecionados(Math.max(MIN_LITERS, Math.min(MAX_LITERS, newLitros)));
  };

  const getFeedback = () => {
    if (!hasInteracted) return "Arraste o círculo para ajustar";
    if (litrosSelecionados < 1.5) return "Hidrate-se mais! 🫤";
    if (litrosSelecionados >= 1.5 && litrosSelecionados < 2.5) return "Hidratação razoável. 💧";
    return "Ótimo nível de água! 🥰";
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
          <div 
            ref={constraintsRef}
            className="relative w-28 sm:w-32 h-72 bg-[#DEEAF5] rounded-t-2xl border-2 border-b-0 border-[#344154]/40 overflow-hidden"
          >
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-[#A0C4E3]"
              style={{ height: waterHeightPercentage }}
            />
            <div className="absolute -top-10 w-full text-center pointer-events-none">
              <span className="font-bold text-lg">{litrosSelecionados.toFixed(1)} L</span>
            </div>
             <motion.div
              className="absolute w-full h-full cursor-grab active:cursor-grabbing flex items-end justify-center"
              style={{ y }}
              drag="y"
              dragConstraints={constraintsRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
            >
                <div className="w-6 h-6 rounded-full bg-primary/80 border-2 border-white mb-[-12px]"/>
            </motion.div>
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
