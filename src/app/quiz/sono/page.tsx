"use client";

import { useState } from 'react';
import QuizSono from '@/components/funnel/QuizSono';

export default function QuizSonoPage() {
  const [pontos, setPontos] = useState(150); // Pontuação inicial da etapa anterior

  return (
    <QuizSono pontos={pontos} setPontos={setPontos} />
  );
}
