"use client";

import Image from "next/image";
import { CheckCircle, MessageCircle, Mail, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type SearchParams = {
  tx?: string;
  plan?: "essencial" | "completo" | string;
  value?: string;
  name?: string;
  email?: string;
  bumps?: string;
};

const planTitles: Record<string, string> = {
  essencial: "Nutrição Expressa™",
  completo: "Método Gestante Blindada™",
};

const bumpTitles: Record<string, string> = {
  preeclampsia: "Guia Rápido da Pré-eclâmpsia",
  amamentacao: "Guia Realista da Amamentação",
  ansiedade: "Guia de Ansiedade na Gestação"
};

export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    tx = "",
    plan = "",
    value = "",
    name = "Mamãe",
    email = "",
    bumps = "{}",
  } = searchParams;

  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'paid' | 'pending' | 'cancelled'>('checking');
  const [isLoading, setIsLoading] = useState(true);

  const planTitle = planTitles[plan] ?? (plan ? plan : "Seu programa");
  
  // Parse order bumps
  let orderBumps: Record<string, number> = {};
  try {
    orderBumps = JSON.parse(bumps);
  } catch (error) {
    // console.error("Erro ao parsear bumps:", error);
  }

  // Verificar status do pagamento
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!tx) {
        setPaymentStatus('pending');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/pix/status/${tx}`);
        const data = await response.json();
        
        if (response.ok) {
          setPaymentStatus(data.status);
        } else {
          // console.error('Erro ao verificar status:', data);
          setPaymentStatus('pending');
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error);
        setPaymentStatus('pending');
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
    
    // Verificar novamente a cada 30 segundos se ainda estiver pendente
    const interval = setInterval(() => {
      if (paymentStatus === 'pending' || paymentStatus === 'checking') {
        checkPaymentStatus();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [tx, paymentStatus]);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen md:h-screen">
        <Image
          src="https://i.postimg.cc/RFbg7KVC/file-000000006d8c623095818c1747892548.png"
          alt="Fundo decorativo"
          fill
          className="object-cover object-top"
          quality={80}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-300/40 to-white/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mx-4">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Obrigado pela sua compra!
          </h1>
          <p className="text-gray-600 mt-2">
            {name ? `${name}, ` : ""}seu pagamento foi confirmado com sucesso.
          </p>

          <div className="w-full bg-gray-50 rounded-xl border border-gray-100 p-4 mt-6 text-sm text-gray-700">
            <h3 className="font-semibold text-gray-800 mb-3">Resumo da Compra</h3>
            
            <div className="flex justify-between">
              <span className="font-medium">Programa Principal</span>
              <span>{planTitle}</span>
            </div>

            {/* Listagem de Order Bumps */}
            {Object.keys(orderBumps).length > 0 && (
              <>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-800 block">Bônus Inclusos:</span>
                  {Object.entries(orderBumps).map(([bumpId, price]) => (
                    <div key={bumpId} className="flex justify-between text-xs">
                      <span className="text-emerald-600">✓ {bumpTitles[bumpId] || bumpId}</span>
                      <span>+ R$ {price.toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {value && (
              <>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between font-semibold">
                  <span>Valor Total</span>
                  <span>R$ {value.replace(".", ",")}</span>
                </div>
              </>
            )}
            
            {tx && (
              <div className="flex justify-between mt-2">
                <span className="font-medium">Transação</span>
                <span className="font-mono text-gray-600">{tx}</span>
              </div>
            )}
            {email && (
              <div className="flex justify-between mt-2">
                <span className="font-medium">E-mail</span>
                <span className="text-gray-600">{email}</span>
              </div>
            )}
          </div>

          {/* Status do Pagamento */}
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="text-blue-700 font-medium">Verificando status do pagamento...</span>
            </div>
          ) : paymentStatus === 'paid' ? (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                🎉 Pagamento Confirmado! Acesso Liberado
              </h3>
              <p className="text-emerald-700 text-sm mb-4">
                Parabéns! Seu pagamento foi confirmado. Agora você tem acesso completo ao programa.
              </p>
              
              <div className="space-y-3">
                <a
                  href="https://chat.whatsapp.com/Fm9YwzZwpYR8DdwX70zjGL" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Entrar no Grupo WhatsApp
                </a>
                
                <a
                  href="mailto:agenciasancs@gmail.com"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-4 transition"
                >
                  <Mail className="w-5 h-5" />
                  Contato: agenciasancs@gmail.com
                </a>
              </div>
            </div>
          ) : paymentStatus === 'pending' ? (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Aguardando Pagamento</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Seu pagamento ainda está sendo processado. Esta página será atualizada automaticamente quando o pagamento for confirmado.
              </p>
            </div>
          ) : paymentStatus === 'cancelled' ? (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-800 font-medium">Pagamento Cancelado ou Expirado</span>
              <p className="text-red-700 text-sm mt-1">
                Entre em contato conosco se precisar de ajuda.
              </p>
            </div>
          ) : null}

          <p className="text-xs text-gray-500 mt-3">
            Você receberá um e-mail com os detalhes de acesso em instantes.
            Verifique também a sua caixa de spam.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
            <a
              href="/"
              className="flex-1 inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition"
            >
              Voltar ao Início
            </a>
            <a
              href={`mailto:${email || ""}`}
              className="flex-1 inline-flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 transition"
            >
              Reenviar comprovante
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}