
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Toast } from '@/hooks/use-toast';

interface FlashToast extends Omit<Toast, 'id' | 'title'> {
  title?: string;
  description?: string;
}

interface QuizContextType {
  stepIndex: number;
  setStep: (index: number) => void;
  totalSteps: number;
  bonusStep: number;
  stepLabels: string[];
  pontos: number;
  setInitialPontos: (p: number) => void;
  addPoints: (value: number, toastOptions?: FlashToast) => number;
}

const QuizContext = createContext<QuizContextType | null>(null);

const stepLabels = [
  'Trimestre', 
  'Sono', 
  'Ansiedade', 
  'Respiração', 
  'Bônus 🎁',
  'Alimentação', 
  'Água', 
  'Exercício', 
  'Autoestima',
  'Emoções'
];


const CarePointsFlash = ({ points, onClose }: { points: number, onClose: () => void }) => {
    
    React.useEffect(() => {
        const id = setTimeout(onClose, 1500);
        return () => clearTimeout(id);
    }, [onClose]);
    
    return (
        <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center justify-center"
            role="status"
            aria-live="polite"
        >
             <div className="relative flex items-center justify-center">
                 {/* Halo */}
                <div className="absolute w-40 h-40 rounded-full bg-rose-400/30 blur-2xl" />

                {/* Partículas */}
                {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 8;
                    const radius = 80 + Math.random() * 40;
                    return (
                        <motion.div
                            key={i}
                            className="absolute text-rose-300"
                            style={{ top: '50%', left: '50%' }}
                            initial={{ x: '-50%', y: '-50%', scale: 0.4, opacity: 1, rotate: 0 }}
                            animate={{
                                x: `calc(-50% + ${Math.cos(angle) * radius}px)`,
                                y: `calc(-50% + ${Math.sin(angle) * radius}px)`,
                                scale: [0.4, 1, 0.6],
                                opacity: [1, 1, 0],
                                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
                            }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        >
                            <Heart size={20} fill="currentColor" />
                        </motion.div>
                    );
                })}

                {/* Coração Principal */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1], rotate: [0, -10, 0] }}
                    transition={{ duration: 0.6, times: [0, 0.5, 1], type: "spring", stiffness: 260, damping: 15 }}
                >
                    <Heart size={64} className="text-[#D976B6]" fill="currentColor" />
                </motion.div>
            </div>
            
            {/* Texto */}
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-4xl sm:text-5xl font-bold tracking-wide text-rose-50 drop-shadow-lg mt-4"
            >
                +{points}
            </motion.span>
        </div>
    );
};


export function QuizProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [flashInfo, setFlashInfo] = useState<{ points: number } | null>(null);

  const { toast } = useToast();
  const totalSteps = stepLabels.length; 
  const bonusStep = 4;

  const setStep = (index: number) => {
    console.log(`[QuizContext] Setting step to: ${index}`);
    setStepIndex(index);
  };
  
  const setInitialPontos = (p: number) => {
      setPontos(p);
  }
  
  const addPoints = useCallback((value: number, toastOptions?: FlashToast) => {
      const newTotal = pontos + value;
      setPontos(newTotal);

      if (value > 0) {
        setFlashInfo({ points: value });
      }

      const defaultToastTitle = `✨ +${value} Pontos de Cuidado!`;
      toast({
          title: toastOptions?.title || (value > 0 ? defaultToastTitle : undefined),
          description: toastOptions?.description,
          duration: toastOptions?.duration || (value > 0 ? 3000 : 5000),
      });

      return newTotal;
  }, [pontos, toast]);


  return (
    <QuizContext.Provider value={{ stepIndex, setStep, totalSteps, bonusStep, stepLabels, pontos, setInitialPontos, addPoints }}>
      {children}
      {flashInfo && createPortal(
          <CarePointsFlash 
              points={flashInfo.points}
              onClose={() => setFlashInfo(null)}
          />,
          document.body
      )}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
