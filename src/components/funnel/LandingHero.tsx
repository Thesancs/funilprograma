
"use client";

import Link from 'next/link';
import { Sparkles, Heart, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';

export default function LandingHero() {

  const handleCtaClick = () => {
    console.log('[LandingHero] CTA clicked, navigating to /cadastro');
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
                <CardTitle className="text-[clamp(1.8rem,5vw,2.75rem)] font-extrabold text-foreground leading-tight">
                  Faça seu cadastro e{' '}
                  <span className="text-pink-600">ganhe uma promoção extra!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col items-center">
                 <CardDescription className="text-lg leading-relaxed max-w-xl mx-auto text-muted-foreground">
                  👉 Responda às perguntas, acumule pontos e desbloqueie um
                  <strong> bônus incrível</strong> que só quem conclui o quiz recebe.
                </CardDescription>
                
                <ul className="flex flex-col gap-3 text-foreground/90 text-left w-full max-w-sm mx-auto">
                    <li className="flex items-start gap-2">
                        <Sparkles size={18} className="text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <span className="flex-grow">Diagnóstico gestacional gratuito em <strong>&lt; 3&nbsp;min</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Sparkles size={18} className="text-primary mt-1 flex-shrink-0" />
                         <span className="flex-grow">Pontos valem <strong>recompensas reais</strong> na etapa final</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Sparkles size={18} className="text-primary mt-1 flex-shrink-0" />
                        <span className="flex-grow">Acesso a conteúdos premium já no primeiro login</span>
                    </li>
                </ul>

                <div className="pt-4 text-center">
                    <Link href="/cadastro" passHref>
                        <Button
                        size="lg"
                        className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
                        onClick={handleCtaClick}
                        >
                        Começar Quiz agora
                        </Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
