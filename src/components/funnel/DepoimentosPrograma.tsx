
"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, CheckCircle } from "lucide-react";
import { Separator } from '../ui/separator';

interface DepoimentosProgramaProps {
  nome: string;
  pontos: number;
}

const depoimentos = [
  {
    nome: "Juliana S.",
    cidade: "São Paulo, SP",
    trimestre: "2º Trimestre",
    avaliacao: 5,
    depoimento: "O programa mudou minha relação com a comida! Me sinto mais disposta e segura.",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "woman portrait"
  },
  {
    nome: "Carla M.",
    cidade: "Recife, PE",
    trimestre: "3º Trimestre",
    avaliacao: 5,
    depoimento: "Os exercícios de respiração me ajudaram muito com a ansiedade. Recomendo demais!",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "woman smiling"
  },
  {
    nome: "Fernanda L.",
    cidade: "Curitiba, PR",
    trimestre: "1º Trimestre",
    avaliacao: 4,
    depoimento: "Estava perdida com a alimentação e os treinos. O app me deu um norte e mais tranquilidade.",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "happy woman"
  },
];

const beneficios = [
  "Dietas personalizadas por trimestre",
  "Treinos adaptados (pilates, caminhada, musculação)",
  "Acompanhamento da saúde mental",
  "Checklists e orientações semanais",
];

export default function DepoimentosPrograma({ nome, pontos }: DepoimentosProgramaProps) {
  const router = useRouter();

  const handleCtaClick = () => {
    console.log('[DepoimentosPrograma] CTA clicked, navigating to /oferta');
    router.push(`/oferta?pontos=${pontos}&nome=${encodeURIComponent(nome)}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 py-8">
        
        <div className="my-4" data-ai-hint="mother baby">
            <Image 
                src="https://i.imgur.com/pWBIXpR.png" 
                alt="Logo Bem-Vinda, Mamãe!" 
                width={144} 
                height={144} 
                className="w-32 h-32 sm:w-36 sm:h-36"
                priority
            />
        </div>

      {/* Seção do Programa */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 text-center lg:text-left">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
             <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">
                👶 Conheça o Programa Bem-Estar Gestacional
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                Uma jornada completa para você viver uma gestação mais leve, saudável e consciente, semana a semana.
            </p>
            <ul className="space-y-3 mb-8">
                {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{beneficio}</span>
                    </li>
                ))}
            </ul>
             <Button 
                size="lg"
                onClick={handleCtaClick}
                className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
                Quero saber mais
            </Button>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <Image 
                src="https://placehold.co/600x400.png"
                alt="Mockup do programa"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="app mockup"
            />
          </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="w-full flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">
          🗣️ O que outras mamães estão dizendo
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <CarouselContent>
            {depoimentos.map((depoimento, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 border-4 border-pink-100">
                      <AvatarImage src={depoimento.avatar} alt={depoimento.nome} data-ai-hint={depoimento.dataAiHint} />
                      <AvatarFallback>{depoimento.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-bold text-lg">{depoimento.nome}</p>
                      <p className="text-sm text-muted-foreground">{depoimento.cidade} | {depoimento.trimestre}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < depoimento.avaliacao ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-center text-foreground italic">"{depoimento.depoimento}"</p>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </div>
  );
}
