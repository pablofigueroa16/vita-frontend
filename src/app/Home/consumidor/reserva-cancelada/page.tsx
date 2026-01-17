"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, XCircle } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const GLASS_CARD =
  "bg-white/[0.05] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";

export default function ReservaCanceladaPage() {
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[900px] px-6 lg:px-10 py-10 pb-44">
        <div className={cn(GLASS_SOFT, "rounded-[30px] p-6 sm:p-8 relative overflow-hidden")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.07] blur-[110px]" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">Home • Consumidor</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              Reserva cancelada ✅
            </h1>
            <p className="mt-2 text-white/60 text-sm">
              La cancelación se envió al backend correctamente.
            </p>
          </div>
        </div>

        <section className={cn("mt-6 rounded-[28px] p-6 relative overflow-hidden", GLASS_CARD)}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[95px]" />
            <div className="absolute right-[-140px] bottom-[-140px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                <XCircle className="w-6 h-6 text-white/85" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Cancelación confirmada</p>
                <p className="mt-1 text-white/60 text-sm">Puedes reservar de nuevo cuando quieras.</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/Home/consumidor/mis-reservas")}
              className={cn(
                "h-11 px-5 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2",
                "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                "text-white/90"
              )}
            >
              Ir a Mis reservas
              <ArrowRight className="w-4 h-4 opacity-80" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
