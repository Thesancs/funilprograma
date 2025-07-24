"use client";

import { QuizProvider } from '@/contexts/QuizContext';
import QuizProgress from '@/components/funnel/QuizProgress';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QuizProvider>
      <QuizProgress />
      <div className="pt-16">
        {children}
      </div>
    </QuizProvider>
  )
}
