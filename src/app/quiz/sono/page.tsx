"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizSono from '@/components/funnel/QuizSono';

function QuizSonoContent() {
  const searchParams = useSearchParams();
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
