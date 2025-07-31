"use client";

import { useCheckout } from '@/contexts/CheckoutContext';

function OrderBump({ id, price, title, desc }: { id: string, price: number, title: string, desc: string }) {
  const { orderBumps, toggleBump } = useCheckout();
  const checked = orderBumps[id] !== undefined;

  return (
    <label className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${checked ? 'bg-emerald-50 ring-2 ring-emerald-400' : 'bg-white'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleBump(id, price)}
        className="h-5 w-5 accent-emerald-600 mt-1"
      />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{desc}</p>
      </div>
      <span className="ml-auto font-semibold text-sm text-emerald-600">
        + R$ {price.toFixed(2).replace('.', ',')}
      </span>
    </label>
  );
}

export default function OrderBumps() {
  return (
    <div className="mt-6 space-y-3 bg-white/60 backdrop-blur-lg rounded-2xl p-5 shadow-md">
      <p className="text-center font-semibold text-sm">
        Adicione ao seu plano por apenas <span className="text-emerald-600">R$ 9,90 – 12,90</span> cada<br />
        <span className="text-xs font-medium">
          Guias rápidos com técnicas práticas e apoio de especialistas
        </span>
      </p>

      <OrderBump id="preeclampsia" price={9.9}
        title="Guia Rápido da Pré-eclâmpsia (Método B.E.M.)"
        desc="Entenda o risco, reconheça sinais e saiba como agir em cada trimestre – protocolo direto." />

      <OrderBump id="amamentacao" price={11.9}
        title="Guia Realista da Amamentação (Método A.P.E.G.A)"
        desc="Preparação, posicionamento, alívio de dor e rotina nos primeiros dias pós-parto." />

      <OrderBump id="ansiedade" price={12.9}
        title="Guia de Ansiedade na Gestação (Técnica C.A.L.M.A)"
        desc="5 passos para lidar com picos emocionais, medos e inseguranças – exercícios no banho e antes de dormir." />
    </div>
  );
}