"use client";

import { useQuiz } from '@/contexts/QuizContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function QuizProgress() {
  const { stepIndex, totalSteps, bonusStep } = useQuiz();

  const percent = ((stepIndex + 1) / totalSteps) * 100;
  const bonusPercent = (bonusStep / totalSteps) * 100;
  const bonusReached = stepIndex >= bonusStep;

  console.log('[QuizProgress]', { stepIndex, totalSteps, percent });

  return (
    <div 
        className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg px-4 py-3 shadow-sm md:px-6"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
    >
      <div className="h-2 rounded-full bg-rose-100 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ width: '0%' }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <span
          className={cn(
            "absolute -top-3 text-xl transition-all duration-500",
            bonusReached && "scale-110"
          )}
          style={{ left: `calc(${bonusPercent}% - 12px)` }}
          title="Bônus desbloqueado aqui!"
        >
          🎁
        </span>
      </div>
      <p className="text-xs text-[#344154] text-right mt-1">
        Etapa {stepIndex + 1} de {totalSteps}
      </p>
    </div>
  );
}
