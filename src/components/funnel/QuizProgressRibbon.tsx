"use client";

import { useQuiz } from '@/contexts/QuizContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
    stepIndex: number;
    totalSteps: number;
    bonusStep: number;
    stepLabels: string[];
};

export default function QuizProgressRibbon({ stepIndex, totalSteps, bonusStep, stepLabels }: Props) {
    
    console.log('[QuizProgressRibbon]', { stepIndex });

    return (
        <div
            className="fixed top-0 left-0 w-full z-30 px-4 py-2 md:px-6 bg-gradient-to-r from-pink-200/70 to-purple-100/70 backdrop-blur-md shadow-sm"
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
        >
            <div className="relative h-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-emerald-500">
                {stepLabels.map((label, i) => {
                    const isCompleted = i < stepIndex;
                    const isCurrent = i === stepIndex;
                    const isBonus = i === bonusStep;

                    return (
                        <div
                            key={i}
                            className="absolute -translate-x-1/2"
                            style={{ top: '50%', left: `${(i / (totalSteps - 1)) * 100}%` }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 -translate-y-1/2",
                                    {
                                        "bg-emerald-600 text-white shadow-md": isCompleted && !isBonus,
                                        "bg-yellow-400 text-gray-900 ring-2 ring-yellow-300 scale-110 animate-pulse shadow-lg": isCurrent,
                                        "bg-white/30 text-white/80 border border-white/50 backdrop-blur-sm": !isCompleted && !isCurrent,
                                        "bg-pink-600 text-white shadow-lg": isBonus && isCompleted
                                    }
                                )}
                                title={isBonus ? "Bônus Desbloqueado!" : label}
                            >
                                {isBonus ? '🎁' : i + 1}
                            </motion.div>
                            <span className="absolute top-6 w-max -translate-x-1/2 text-[10px] md:text-[11px] font-medium text-[#344154] whitespace-nowrap hidden sm:block">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}