"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  stepIndex: number;
  setStep: (index: number) => void;
  totalSteps: number;
  bonusStep: number;
  stepLabels: string[];
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


export function QuizProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = stepLabels.length; 
  const bonusStep = 4;

  const setStep = (index: number) => {
    console.log(`[QuizContext] Setting step to: ${index}`);
    setStepIndex(index);
  };

  return (
    <QuizContext.Provider value={{ stepIndex, setStep, totalSteps, bonusStep, stepLabels }}>
      {children}
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
