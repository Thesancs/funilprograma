
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

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

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function AnaliseAlimentacao({ pontos, setPontos }: AnaliseAlimentacaoProps) {
  const [index, setIndex] = useState(0);
  const [resultados, setResultados] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const x = useMotionValue(0);
  const input = [-150, 0, 150];
  const backgroundColor = useTransform(x, input, [
    "rgba(220, 38, 38, 0.3)",
    "rgba(0, 0, 0, 0)",
    "rgba(34, 197, 94, 0.3)"
  ]);

  const activeIndex = index % pratos.length;
  const prato = pratos[activeIndex];

  const handleSwipe = (swipeDirection: 'bom' | 'ruim') => {
    setDirection(swipeDirection === 'bom' ? 1 : -1);
    
    const currentPrato = pratos[activeIndex];
    const newResultados = [...resultados, currentPrato.tipo === swipeDirection ? 'bom' : 'ruim'];
    setResultados(newResultados);

    if (activeIndex + 1 < pratos.length) {
       setIndex(index + 1);
    } else {
      analisarResultados(newResultados);
    }
  };

  const analisarResultados = (finalResultados: string[]) => {
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
    setPontos(pontos + pontosGanhos);

    toast({
      title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
      description: "Cuidar da alimentação é um ato de amor.",
      duration: 4000
    });
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    router.push('/');
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto overflow-hidden bg-transparent border-0 shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center min-h-[36rem]">
              <div className="w-full text-center flex flex-col justify-center items-center h-full">
              <AnimatePresence>
                  {!showFeedback ? (
                  <motion.div
                      key="quiz"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full flex flex-col items-center"
                  >
                      <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-4 text-white">
                      🍽️ Como está sua alimentação hoje?
                      </h2>
                      <div className="relative h-[400px] w-[300px] flex items-center justify-center">
                      <AnimatePresence initial={false} custom={direction}>
                          <motion.div
                            key={index}
                            className="absolute w-full h-full"
                            style={{ x, backgroundColor }}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -10000) {
                                handleSwipe('ruim');
                                } else if (swipe > 10000) {
                                handleSwipe('bom');
                                }
                            }}
                          >
                            <Card className="w-full h-full rounded-xl shadow-md overflow-hidden">
                                <Image
                                src={prato.imagem}
                                alt={prato.nome}
                                fill
                                className="object-cover"
                                data-ai-hint={prato.dataAiHint}
                                priority
                                />
                                <div className="absolute bottom-0 w-full p-4 bg-white/80 backdrop-blur-sm">
                                <p className="font-bold text-lg text-foreground">{prato.nome}</p>
                                </div>
                            </Card>
                          </motion.div>
                      </AnimatePresence>
                      </div>
                  </motion.div>
                  ) : (
                  <motion.div
                      key="feedback"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-8 bg-white/80 p-6 rounded-lg"
                  >
                      <p className="text-center text-[#344154] text-lg sm:text-xl font-medium">{feedback}</p>
                      <Button 
                          onClick={handleNext}
                          size="lg"
                          className="bg-[#9D4C63] text-white rounded-full px-8 py-6"
                      >
                      Continuar
                      </Button>
                  </motion.div>
                  )}
              </AnimatePresence>
              </div>
          </CardContent>
      </Card>
      {!showFeedback && (
        <p className="text-sm text-white/80 mt-4 text-center">Arraste para o lado para classificar os pratos.</p>
      )}
    </>
  );
}
