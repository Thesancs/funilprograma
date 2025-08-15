import Image from "next/image";
import { CheckCircle } from "lucide-react";

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

  const planTitle = planTitles[plan] ?? (plan ? plan : "Seu programa");
  
  // Parse order bumps
  let orderBumps: Record<string, number> = {};
  try {
    orderBumps = JSON.parse(bumps);
  } catch (error) {
    console.error("Erro ao parsear bumps:", error);
  }

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