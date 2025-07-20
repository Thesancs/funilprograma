
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface AnaliseAlimentacaoProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const pratos = [
  { id: 'frutas', nome: 'Frutas Frescas', imagem: 'https://placehold.co/300x400.png', tipo: 'bom', dataAiHint: 'fresh fruits' },
  { id: 'salada', nome: 'Salada Colorida', imagem: 'https://placehold.co/300x400.png', tipo: 'bom', dataAiHint: 'colorful salad' },
  { id: 'grelhados', nome: 'Frango Grelhado', imagem: 'https://placehold.co/300x400.png', tipo: 'bom', dataAiHint: 'grilled chicken' },
  { id: 'fritura', nome: 'Batata Frita', imagem: 'https://placehold.co/300x400.png', tipo: 'ruim', dataAiHint: 'french fries' },
  { id: 'doces', nome: 'Doces e Bolos', imagem: 'https://placehold.co/300x400.png', tipo: 'ruim', dataAiHint: 'sweets cakes' },
  { id: 'legumes', nome: 'Legumes Cozidos', imagem: 'https://placehold.co/300x400.png', tipo: 'bom', dataAiHint: 'cooked vegetables' },
  { id: 'refrigerante', nome: 'Refrigerante', imagem: 'https://placehold.co/300x400.png', tipo: 'ruim', dataAiHint: 'soda can' },
  { id: 'graos', nome: 'Grãos Integrais', imagem: 'https://placehold.co/300x400.png', tipo: 'bom', dataAiHint: 'whole grains' },
];

export default function AnaliseAlimentacao({ pontos, setPontos }: AnaliseAlimentacaoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultados, setResultados] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-20, 20]);
  const opacity = useTransform(x, [-150, 150], [0.5, 0.5]);

  const handleSwipe = (direction: 'bom' | 'ruim') => {
    const newResultados = [...resultados, pratos[currentIndex].tipo === direction ? 'bom' : 'ruim'];
    setResultados(newResultados);

    if (currentIndex + 1 < pratos.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      analisarResultados(newResultados);
    }
  };

  const analisarResultados(finalResultados: string[]) => {
    console.log('[AnaliseAlimentacao]', finalResultados);
    const escolhasBoas = finalResultados.filter(r => r === 'bom').length;
    const total = finalResultados.length;
    const percentualBom = (escolhasBoas / total) * 100;

    let pontosGanhos = escolhasBoas * 50;
    let feedbackFinal = '';

    if (percentualBom >= 70) {
      feedbackFinal = "Sua alimentação parece balanceada, porém podemos melhorar. 💪";
      pontosGanhos += 100; // bônus
    } else if (percentualBom >= 40) {
      feedbackFinal = "Sua alimentação está boa, mas pode melhorar. 🌿";
    } else {
      feedbackFinal = "Sua gravidez corre risco se continuar assim. 😟";
    }
    
    setFeedback(feedbackFinal);
    setShowFeedback(true);
    setPontos(pontos + pontosGanhos);

    toast({
      title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
      description: "Cuidar da alimentação é um ato de amor.",
      duration: 4000
    });
  };

  const handleNext = () => {
    setIsLoading(true);
    // Navegar para uma página de resultados/plano final, por enquanto, volta para o início.
    router.push('/');
  }

  return (
    <div className="w-full max-w-md mx-auto text-center flex flex-col justify-center items-center h-full">
      <AnimatePresence>
        {!showFeedback ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-8">
              🍽️ Como está sua alimentação hoje?
            </h2>
            <div className="relative h-[450px] flex items-center justify-center">
              <AnimatePresence>
                {pratos.slice(currentIndex).map((prato, index) => {
                  const isTop = index === 0;
                  return (
                    <motion.div
                      key={prato.id}
                      className="absolute w-[300px] h-[400px]"
                      style={isTop ? { x, rotate, opacity } : { scale: 1 - (index * 0.05), y: index * 10 }}
                      drag={isTop ? "x" : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x > 100) handleSwipe('bom');
                        if (offset.x < -100) handleSwipe('ruim');
                      }}
                    >
                      <Card className="w-full h-full rounded-xl shadow-md overflow-hidden">
                        <Image
                          src={prato.imagem}
                          alt={prato.nome}
                          fill
                          className="object-cover"
                          data-ai-hint={prato.dataAiHint}
                          priority={isTop}
                        />
                        <div className="absolute bottom-0 w-full p-4 bg-white/80 backdrop-blur-sm">
                          <p className="font-bold text-lg text-foreground">{prato.nome}</p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                }).reverse()}
              </AnimatePresence>
            </div>
             <div className="flex justify-between w-full max-w-xs mx-auto mt-8 text-lg font-bold">
                <span className="text-destructive">👈 Não OK</span>
                <span className="text-green-600">OK 👉</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-center text-[#344154] text-lg sm:text-xl font-medium">{feedback}</p>
            <Button 
                onClick={handleNext} 
                disabled={isLoading}
                size="lg"
                className="bg-[#9D4C63] text-white rounded-full px-8 py-6"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continuar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
