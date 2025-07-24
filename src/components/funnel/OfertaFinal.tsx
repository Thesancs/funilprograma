
"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Shield, CreditCard, PlayCircle, Star, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


interface OfertaFinalProps {
  nome: string;
  pontos: number;
  ofertaExpirada: boolean;
  minutos: number;
  segundos: number;
}

const PRECO_ORIGINAL = 147.90;
const PRECO_FINAL = 37.90;
const PONTOS_MAXIMO = 1000;

const beneficios = [
  { text: "Dietas personalizadas por trimestre", icon: CheckCircle },
  { text: "Treinos adaptados para gestantes", icon: PlayCircle },
  { text: "Acompanhamento da saúde mental", icon: CheckCircle },
  { text: "Checklists e orientações semanais", icon: CheckCircle },
  { text: "Grupo VIP exclusivo", icon: Star },
];

const depoimentos = [
  {
    nome: "Juliana S.",
    cidade: "São Paulo, SP",
    trimestre: "2º Trimestre",
    avaliacao: 5,
    depoimento: "O programa mudou minha relação com a comida! Me sinto mais disposta e segura.",
    avatar: "https://i.imgur.com/iIAQUAE.jpeg",
    dataAiHint: "woman portrait"
  },
  {
    nome: "Carla M.",
    cidade: "Recife, PE",
    trimestre: "3º Trimestre",
    avaliacao: 5,
    depoimento: "Os exercícios de respiração me ajudaram muito com a ansiedade. Recomendo demais!",
    avatar: "https://i.imgur.com/11ScJIc.jpeg",
    dataAiHint: "woman portrait"
  },
  {
    nome: "Fernanda L.",
    cidade: "Curitiba, PR",
    trimestre: "1º Trimestre",
    avaliacao: 4,
    depoimento: "Estava perdida com a alimentação e os treinos. O app me deu um norte e mais tranquilidade.",
    avatar: "https://i.imgur.com/qjuaY0w.jpeg",
    dataAiHint: "happy woman"
  },
];


const calcDesconto = (pontos: number) => {
  if (pontos <= 600) return 10;
  if (pontos <= 800) return 30;
  if (pontos <= 1000) return 50;
  return 70;
};

export default function OfertaFinal({ nome, pontos, ofertaExpirada, minutos, segundos }: OfertaFinalProps) {
  const router = useRouter();

  const descontoPercentual = useMemo(() => calcDesconto(pontos), [pontos]);
  const progressPercent = useMemo(() => Math.min((pontos / PONTOS_MAXIMO) * 100, 100), [pontos]);

  const handleCtaClick = () => {
    if (ofertaExpirada) return;
    console.log('[OfertaFinal]', pontos, descontoPercentual);
    // TODO: A rota /checkout não existe
    alert("Redirecionando para o checkout...");
  };

  return (
    <>
      {/* Micro-timer Sticky para Mobile */}
      <div className="fixed md:hidden top-0 left-0 right-0 bg-[#9D4C63] text-white text-center py-2 z-20 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" />
            <p className="font-semibold text-sm">
                {ofertaExpirada ? "Oferta Expirada!" : `Sua oferta expira em: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}
            </p>
          </div>
      </div>
    
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-8 text-center text-[#344154]">
            
          <Image 
            src="https://i.postimg.cc/sXrxmz3H/file-000000002d8c61fab07c5beac8aa5994.png"
            alt="Mockup do programa Bem-Vinda, Mamãe!"
            width={192}
            height={192}
            className="w-40 sm:w-48 mx-auto drop-shadow-lg mb-6"
            loading="lazy"
            data-ai-hint="product mockup"
          />

          <h1 className="text-2xl md:text-3xl font-bold">
            Parabéns, {nome}!
          </h1>
           <p className="mt-2 text-muted-foreground">
            Sua jornada de cuidado te rendeu uma oferta incrível!
          </p>
          <p className="font-bold text-lg text-primary my-4">
            Você acumulou {pontos} Pontos de Cuidado!
          </p>

          <div className="w-full my-4">
            <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%`}}
                />
            </div>
            <p className="text-xs text-center mt-2 font-medium">Você desbloqueou <span className="font-bold">{descontoPercentual}% OFF!</span></p>
          </div>

          <div className="text-center my-4">
            <p className="text-gray-600 line-through">De R$ {PRECO_ORIGINAL.toFixed(2)}</p>
            <p className="text-4xl font-bold">
              Por apenas <span className="text-pink-600">R$ {PRECO_FINAL.toFixed(2)}</span>
            </p>
          </div>

          <ul className="space-y-3 my-6 text-left">
              {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm font-medium">
                      <beneficio.icon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{beneficio.text}</span>
                  </li>
              ))}
          </ul>
          
          <Button 
            size="lg"
            onClick={handleCtaClick}
            disabled={ofertaExpirada}
            className="w-full h-auto py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-pulse hover:animate-none disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none disabled:shadow-none"
          >
            {ofertaExpirada ? "Oferta Expirada" : `Garantir por R$ ${PRECO_FINAL.toFixed(2)}`}
          </Button>

           <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mt-4">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4"/>
                <span>7 Dias de Garantia</span>
              </div>
               <div className="flex items-center gap-1">
                 <Zap className="h-4 w-4" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1">
                 <CreditCard className="h-4 w-4" />
                <span>Compra Segura</span>
              </div>
          </div>
        </div>

        <div className="w-full max-w-sm sm:max-w-md">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/80 text-center">
                🗣️ O que outras mamães estão dizendo
            </h2>
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
            >
            <CarouselContent>
                {depoimentos.map((depoimento, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md px-6 py-6 flex flex-col items-center gap-4 text-foreground">
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
                        <p className="text-center italic">"{depoimento.depoimento}"</p>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 text-foreground bg-white/50 hover:bg-white/80" />
            <CarouselNext className="hidden sm:flex -right-4 text-foreground bg-white/50 hover:bg-white/80" />
            </Carousel>
        </div>
      </div>
    </>
  );
}
