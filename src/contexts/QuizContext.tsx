"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  stepIndex: number;
  setStep: (index: number) => void;
  totalSteps: number;
  bonusStep: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = 9; 
  const bonusStep = 4; // A respiração guiada é a 4ª etapa (índice 3)

  const setStep = (index: number) => {
    console.log(`[QuizContext] Setting step to: ${index}`);
    setStepIndex(index);
  };

  return (
    <QuizContext.Provider value={{ stepIndex, setStep, totalSteps, bonusStep }}>
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
