
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';

export default function LandingHero() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleCtaClick = () => {
    // console.log('[LandingHero] CTA clicked, navigating to /quiz');
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 sm:px-6 overflow-hidden py-16">
        <Heart className="absolute top-[20%] left-[5%] h-6 w-6 text-primary/20 opacity-80 animate-pulse " data-ai-hint="heart" />
        <Leaf className="absolute top-[40%] right-[8%] h-8 w-8 text-primary/20 opacity-80 rotate-45 animate-pulse delay-500" data-ai-hint="leaf" />
        <Heart className="absolute bottom-[25%] right-[10%] h-5 w-5 text-primary/20 opacity-80 animate-pulse delay-200" data-ai-hint="heart" />
        <Leaf className="absolute bottom-[30%] left-[12%] h-7 w-7 text-primary/20 opacity-80 -rotate-45 animate-pulse delay-700" data-ai-hint="leaf" />

        <div className="z-10 flex flex-col items-center justify-center space-y-4 md:space-y-6">
            <Card className="w-full max-w-2xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
              <CardHeader>
                {/* Imagem da gestante */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg ring-4 ring-pink-200/50">
                    <Image
                      src="/gestante-hero.png"
                      alt="Gestante feliz tocando a barriga"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                <CardTitle className="text-[clamp(1.8rem,5vw,2.75rem)] font-extrabold text-foreground leading-tight">
                    <span className="text-red-600 uppercase">MAMÃE, SEU CORPO TÁ TENTANDO DIZER ALGO...</span><br />
                  Descubra <span className="text-red-600">AGORA</span> o que é — e desbloqueie um{' '}
                  <span className="text-red-600">presente exclusivo</span> no final!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col items-center">
                 <CardDescription className="text-lg leading-relaxed max-w-xl mx-auto text-muted-foreground">
                  
                </CardDescription>
                
                <ul className="flex flex-col gap-3 text-foreground/90 text-left w-full max-w-lg mx-auto">
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">✅</span>
                        <span className="flex-grow"><strong>Método validado por mais de 3.740 mil gestantes no Brasil</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">✅</span>
                        <span className="flex-grow"><strong>Reduz dores, controla ansiedade e devolve a leveza da sua gravidez</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">✅</span>
                        <span className="flex-grow"><strong>Técnica 100% segura e aprovada por especialistas</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">✅</span>
                        <span className="flex-grow"><strong>Leva menos de 3 minutos pra descobrir</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">✅</span>
                        <span className="flex-grow"><strong>Presente final liberado só pra quem vai até o fim (por tempo limitado)</strong></span>
                    </li>
                </ul>

                <div className="pt-4 text-center space-y-3">
                    <div className="text-sm font-semibold text-red-600">
                         <strong>IMPORTANTE:</strong> Esse acesso com bônus tá disponível até 23:59 do dia {currentDate}<br />
                        Clique no botão abaixo e comece agora antes que acabe.
                    </div>
                    <Link href="/quiz" passHref>
                        <Button
                        size="lg"
                        className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
                        onClick={handleCtaClick}
                        >
                         Quero descobrir agora!
                        </Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
