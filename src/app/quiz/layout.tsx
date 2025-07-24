"use client";

import { QuizProvider, useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function QuizLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { stepIndex, totalSteps, bonusStep, stepLabels } = useQuiz();
  return (
    <>
      <QuizProgressRibbon 
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        bonusStep={bonusStep}
        stepLabels={stepLabels}
      />
      <div className="pt-20"> 
        {children}
      </div>
    </>
  )
}


export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QuizProvider>
      <QuizLayoutContent>
        {children}
      </QuizLayoutContent>
    </QuizProvider>
  )
}
