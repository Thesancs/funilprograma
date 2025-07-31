
"use client";

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, CheckCircle, Sparkles } from "lucide-react";

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

const beneficios = [
    {
        title: "Etapa 1 – Nutrição Essencial por Trimestre",
        description: "Planos adaptados ao seu corpo, com foco em energia, imunidade e desenvolvimento saudável do bebê."
    },
    {
        title: "Etapa 2 – Bem-estar Emocional e Ansiedade Gestacional",
        description: "Técnicas validadas por psicólogas que ajudam a lidar com medos, insegurança e pressão do dia a dia."
    },
    {
        title: "Etapa 3 – Movimento Seguro e Ativo",
        description: "Rotinas simples de alongamento, caminhada e respiração, pra aliviar dores e melhorar o sono."
    },
    {
        title: "Etapa 4 – Apoio e Acompanhamento no WhatsApp",
        description: "Grupo exclusivo com especialistas e outras gestantes, pra você nunca se sentir sozinha."
    }
];

export default function DepoimentosPrograma({ nome, pontos }: DepoimentosProgramaProps) {
  const router = useRouter();
  const programaSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToProgram = () => {
    programaSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleCtaClick = () => {
    console.log('[DepoimentosPrograma] CTA clicked, navigating to /oferta');
    router.push(`/oferta?pontos=${pontos}&nome=${encodeURIComponent(nome)}`);
  };

  const handleFinalCtaClick = () => {
    router.push('/checkout?plan=completo');
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

        {/* Seção 1: Headline */}
        <Card className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-6 flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
                Conheça o Programa Bem-Estar Gestacional
            </h1>
            <p className="text-center text-[17px] font-medium mt-2 text-[#344154] max-w-sm mx-auto">
                ✨ Seu plano de bem-estar físico e emocional durante a gravidez, feito pra sua realidade e sua rotina.
            </p>
            <Button
                variant="ghost"
                onClick={handleScrollToProgram}
                className="text-primary hover:bg-pink-100/50"
            >
                Quero começar agora
            </Button>
        </Card>

        {/* Seção 2: Apresentação do Programa */}
        <section ref={programaSectionRef} id="programa" className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 text-center lg:text-left">
            <Card className="lg:w-1/2 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-8 flex flex-col items-center lg:items-start">
                <div className="text-center lg:text-left mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                        Você terá acesso ao Método B.E.M. – Bem-Estar Materno
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Um passo a passo criado pra ajudar você a viver sua gestação com mais segurança, leveza e equilíbrio, do início ao final da gravidez.
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-foreground w-full">
                    📦 O que você vai desbloquear dentro do método:
                </h3>

                <ul className="space-y-4 mb-6 text-left">
                    {beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="mt-1">✅</span>
                            <div className="flex-1">
                                <span className="font-semibold text-foreground">{beneficio.title}</span>
                                <p className="text-sm text-muted-foreground">{beneficio.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <p className="text-sm text-muted-foreground text-center lg:text-left w-full mb-8">
                    📌 Tudo entregue de forma prática: vídeos rápidos, áudio-guias e ferramentas pra usar no seu tempo.
                </p>

                 <Button 
                    size="lg"
                    onClick={handleCtaClick}
                    className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                    Quero acesso ao Método B.E.M.
                </Button>
            </Card>
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

        {/* Seção 3: Prova Social e Autoridade */}
        <section className="w-full flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/80">
            🗣️ O que outras mamães estão dizendo
            </h2>
            <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-sm sm:max-w-md"
            >
            <CarouselContent>
                {depoimentos.map((depoimento, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md px-6 py-6 flex flex-col items-center gap-4">
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

        <section className="w-full max-w-2xl text-center">
             <Card className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-6 flex flex-col items-center gap-4">
                 <Sparkles className="w-8 h-8 text-primary" data-ai-hint="sparkles" />
                <h3 className="text-xl font-semibold text-foreground">Quem criou este programa?</h3>
                <p className="text-muted-foreground">
                    Criado por um time de especialistas (nutrição, fisioterapia pélvica e psicologia), baseado em evidências científicas e com mais de 3.740 mamães acompanhadas.
                </p>
            </Card>
        </section>

         <div className="w-full max-w-lg px-4">
            <Button
                size="lg"
                onClick={handleFinalCtaClick}
                className="w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
                Quero começar minha jornada com segurança
            </Button>
        </div>
    </div>
  );
}
