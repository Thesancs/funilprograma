
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';

export default function LandingHero() {

  const handleCtaClick = () => {
    console.log('[LandingHero] CTA clicked, navigating to /quiz');
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
                  <span className="text-pink-600">Este é um momento só seu:</span> descubra o que sua{' '}
                  gestação está <span className="text-pink-600">tentando</span> te mostrar… e receba um{' '}
                  <span className="text-pink-600">presente exclusivo</span> no final!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col items-center">
                 <CardDescription className="text-lg leading-relaxed max-w-xl mx-auto text-muted-foreground">
                   Responda algumas perguntas com carinho. Ao final, além de conhecer melhor seu corpo e emoções, você pode receber um{' '}
                  <strong>benefício exclusivo de até 70% OFF</strong> em algo feito pra te apoiar nessa fase única da vida.
                </CardDescription>
                
                <ul className="flex flex-col gap-3 text-foreground/90 text-left w-full max-w-sm mx-auto">
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">💖</span>
                        <span className="flex-grow">É <strong>simples, rápido e transformador</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">🎁</span>
                         <span className="flex-grow"><strong>Bônus especial</strong> liberado apenas pra quem chegar até o final!</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-xl mt-1 flex-shrink-0">👉</span>
                        <span className="flex-grow">Clique abaixo e <strong>comece sua jornada</strong></span>
                    </li>
                </ul>

                <div className="pt-4 text-center">
                    <Link href="/quiz" passHref>
                        <Button
                        size="lg"
                        className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
                        onClick={handleCtaClick}
                        >
                        Começar agora
                        </Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
