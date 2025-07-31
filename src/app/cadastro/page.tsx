
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

export default function CadastroPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setSubmittedName(values.name);
    setIsLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams({
        nome: values.name,
        email: values.email,
      });
      router.push(`/quiz?${params.toString()}`);
    }, 4000);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background">
        <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-xl font-semibold text-foreground">Criando sua conta, aguarde...</p>
          <p className="text-md text-muted-foreground">
            Parabéns pelo seu primeiro passo, {submittedName}! Vamos te ajudar a viver uma gestação mais leve e consciente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background">
      <Card className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Crie sua conta</CardTitle>
          <CardDescription>Insira seus dados para começar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha🔐</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Sua senha segura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="px-1 text-center text-sm text-muted-foreground">
                Ao criar sua conta, você desbloqueia acesso completo ao seu plano personalizado, com evolução ao longo da gestação.
              </p>
               <Button 
                type="submit" 
                className="w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Criar minha conta
              </Button>
            </form>
          </Form>
           <div className="flex justify-center">
            <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Voltar para a página inicial
              </Link>
           </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                  © 2025 Bem-Estar Gestacional | Todos os direitos reservados
              </p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
