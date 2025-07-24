"use client";

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizSono from '@/components/funnel/QuizSono';
import { useQuiz } from '@/contexts/QuizContext';

function QuizSonoContent() {
  const searchParams = useSearchParams();
  const { setStep } = useQuiz();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  const initialPontos = parseInt(searchParams.get('pontos') || '150', 10);
  const nome = searchParams.get('nome') || 'Mamãe';
  const [pontos, setPontos] = useState(initialPontos);

  return (
    <QuizSono nome={nome} pontos={pontos} setPontos={setPontos} />
  );
}

export default function QuizSonoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <QuizSonoContent />
    </Suspense>
  );
}
