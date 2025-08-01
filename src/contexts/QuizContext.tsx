
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Heart, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Toast } from '@/hooks/use-toast';

interface FlashToast extends Omit<Toast, 'id' | 'title'> {
  title?: React.ReactNode;
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
                <div className="absolute w-48 h-48 rounded-full bg-primary/40 blur-3xl" />

                {/* Partículas */}
                {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 8;
                    const radius = 80 + Math.random() * 40;
                    return (
                        <motion.div
                            key={i}
                            className="absolute text-primary opacity-80"
                            style={{ 
                              top: '50%', 
                              left: '50%', 
                              filter: 'drop-shadow(0 0 5px hsl(var(--primary)))' 
                            }}
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
                    className="text-primary"
                    style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}
                >
                    <Heart size={64} fill="currentColor" />
                </motion.div>
            </div>
            
            {/* Texto */}
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-4xl sm:text-5xl font-bold tracking-wide text-white"
                style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--primary)))' }}
            >
                +{points}
            </motion.span>
        </div>
    );
};

const fakePurchases = [
    { name: 'Juliana S.', plan: 'Método Gestante Blindada™' },
    { name: 'Fernanda L.', plan: 'Nutrição Expressa™' },
    { name: 'Carla M.', plan: 'Método Gestante Blindada™' },
    { name: 'Aline P.', plan: 'Método Gestante Blindada™' },
    { name: 'Mariana C.', plan: 'Nutrição Expressa™' },
    { name: 'Patrícia A.', plan: 'Método Gestante Blindada™' },
];

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

      if (toastOptions) {
          toast({
              title: toastOptions.title,
              description: toastOptions.description,
              duration: toastOptions.duration || 3000,
          });
      }
      
      return newTotal;
  }, [pontos, toast]);

  useEffect(() => {
    let socialProofInterval: NodeJS.Timeout;

    const showSocialProofToast = () => {
        const randomPurchase = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
        toast({
            title: (
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                    <p className="text-sm font-medium text-foreground">
                        <span className="font-bold">{randomPurchase.name}</span>
                        {' acabou de adquirir o '}
                        <span className="font-semibold text-primary/90">{randomPurchase.plan}</span>!
                    </p>
                </div>
            ),
            duration: 4000,
        });

        // Schedule next toast
        const nextInterval = Math.random() * (45000 - 25000) + 25000; // between 25-45 seconds
        socialProofInterval = setTimeout(showSocialProofToast, nextInterval);
    };

    // Start the first toast after a delay
    socialProofInterval = setTimeout(showSocialProofToast, 12000); // Wait 12 seconds before the first one

    return () => {
        clearTimeout(socialProofInterval);
    };
}, [toast]);


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
