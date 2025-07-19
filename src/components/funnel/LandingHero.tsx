"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Leaf, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Logo = () => (
    <svg width="112" height="112" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 sm:w-28 sm:h-28 text-primary">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5ZM6 7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5C18 10.8137 15.3137 13.5 12 13.5C8.68629 13.5 6 10.8137 6 7.5Z" fill="currentColor"/>
        <path d="M4.10842 16.2023C4.48243 15.1189 5.37876 14.25 6.5 14.25H17.5C18.6212 14.25 19.5176 15.1189 19.8916 16.2023L21.7821 21.6069C22.0945 22.4925 21.5034 23.5 20.5693 23.5H3.43068C2.49657 23.5 1.90549 22.4925 2.21793 21.6069L4.10842 16.2023Z" fill="currentColor"/>
    </svg>
);


export default function LandingHero() {
  useEffect(() => {
    console.log('[LandingHero] Component mounted');
  }, []);

  const handleCtaClick = () => {
    console.log('[LandingHero] CTA clicked, navigating to /cadastro');
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 sm:px-6 overflow-hidden">
        <Heart className="absolute top-[20%] left-[5%] h-6 w-6 text-primary/20 opacity-80 animate-pulse " data-ai-hint="heart" />
        <Leaf className="absolute top-[40%] right-[8%] h-8 w-8 text-primary/20 opacity-80 rotate-45 animate-pulse delay-500" data-ai-hint="leaf" />
        <Heart className="absolute bottom-[25%] right-[10%] h-5 w-5 text-primary/20 opacity-80 animate-pulse delay-200" data-ai-hint="heart" />
        <Leaf className="absolute bottom-[30%] left-[12%] h-7 w-7 text-primary/20 opacity-80 -rotate-45 animate-pulse delay-700" data-ai-hint="leaf" />

        <div className="z-10 flex flex-col items-center justify-center space-y-4 md:space-y-6 py-16">
            <div className="mb-4 animate-in fade-in slide-in-from-top-12 duration-1000" data-ai-hint="mother baby">
                <Logo />
            </div>

            <Card className="w-full max-w-2xl text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl font-bold text-foreground">
                  👶 Crie sua conta de gestante e desbloqueie sua jornada personalizada de bem-estar
                </CardTitle>
                <CardDescription className="font-body text-base md:text-lg text-muted-foreground pt-2">
                  Seu corpo muda a cada semana, e sua alimentação precisa acompanhar esse ritmo. Vamos montar um caminho leve, baseado em como você está hoje.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-body text-base text-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Diagnóstico gratuito</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Pontuação com recompensas reais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Desconto exclusivo com base no seu esforço</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="pt-6 animate-in fade-in zoom-in-95 duration-1000 delay-600">
                <Link href="/cadastro" passHref>
                    <Button
                    size="lg"
                    className="px-8 py-6 text-base md:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
                    onClick={handleCtaClick}
                    >
                    Fazer meu diagnóstico gratuito
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
