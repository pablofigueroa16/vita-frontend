"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Calendar,
  Mail,
  User,
  X,
  ArrowLeft,
  Scissors,
} from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TOKENS UI ================= */
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";

export default function ReservaExitosaPage() {
  const sp = useSearchParams();
  const router = useRouter();

  // ✅ params que ya envías desde tu modal
  const code = sp.get("code") ?? "VITA-XXXX-0000";
  const name = sp.get("name") ?? "—";
  const email = sp.get("email") ?? "—";
  const date = sp.get("date") ?? "—";
  const time = sp.get("time") ?? "—";
  const category = sp.get("category") ?? "productos";
  const service = sp.get("service") ?? "Reserva";
  const store = sp.get("store") ?? "Vita Studio";
  const barber = sp.get("barber") ?? "—";

  const [cancelView, setCancelView] = React.useState(false);

  // ✅ botón cancelar: SOLO UI por ahora (sin backend)
  function cancelReservationUI() {
    setCancelView(true);

    // luego de 1.3s vuelve al marketplace
    setTimeout(() => {
      router.push(`/Home/consumidor`);
    }, 1300);
  }

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[980px] px-6 lg:px-10 pt-10 pb-44">
        {/* top row */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className={cn(
              "h-11 px-4 rounded-full inline-flex items-center gap-2",
              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
              "hover:bg-white/[0.09] hover:border-white/22 transition"
            )}
          >
            <ArrowLeft className="w-4 h-4 text-white/80" />
            <span className="text-sm font-semibold text-white/90">Volver</span>
          </button>

          <span className="text-[11px] uppercase tracking-[0.28em] text-white/55">
            Vita • Ticket
          </span>
        </div>

        {/* ticket card */}
        <section className={cn("relative overflow-hidden rounded-[34px]", GLASS)}>
          {/* led lights */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/[0.10] blur-[95px]" />
            <div className="absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          <div className="relative p-7 sm:p-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-white font-semibold text-2xl sm:text-3xl">
                  Tu reserva ha sido exitosa 
                </p>
                <p className="mt-2 text-white/60">
                  Presenta este ticket al llegar al local.
                </p>
              </div>

              <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/80">
                <BadgeCheck className="w-5 h-5" />
              </div>
            </div>

            {/* info blocks */}
            <div className={cn("mt-6 rounded-[28px] p-5", GLASS_SOFT)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow icon={User} label="Nombre" value={name} />
                <InfoRow icon={Mail} label="Correo" value={email} />
                <InfoRow icon={Calendar} label="Fecha" value={date} />
                <InfoRow icon={Calendar} label="Hora" value={time} />
              </div>

              <div className="mt-5 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Servicio
                </p>
                <p className="mt-2 text-white font-semibold">{service}</p>
                <p className="mt-2 text-white/55 text-sm">
                  {store} • {barber !== "—" ? `con ${barber}` : "—"}
                </p>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Código
                </p>
                <p className="mt-2 text-white font-semibold tracking-[0.14em]">
                  {code}
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => router.push(`/Home/consumidor/marketplace/${category}`)}
                className={cn(
                  "h-12 rounded-full font-semibold",
                  "border border-white/14 bg-white/[0.05] backdrop-blur-2xl text-white/85",
                  "hover:bg-white/[0.10] hover:text-white transition"
                )}
              >
                Volver al marketplace
              </button>

              <button
                type="button"
                onClick={cancelReservationUI}
                className={cn(
                  "h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                  "bg-white text-black hover:opacity-90 transition"
                )}
              >
                <X className="w-4 h-4" />
                Cancelar reserva
              </button>
            </div>

            <p className="mt-5 text-[11px] text-white/55">
              *MVP UI: cancelación visual. Luego conectamos backend.
            </p>
          </div>
        </section>
      </div>

      {/* ================= CANCEL VIEW (glass) ================= */}
      <AnimatePresence>
        {cancelView && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/75" />

            <motion.div
              initial={{ y: 14, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={cn(
                "relative w-full max-w-md overflow-hidden rounded-[30px]",
                "border border-white/14 bg-white/[0.07] backdrop-blur-2xl",
                "shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
              )}
            >
              {/* led lights */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 -top-16 h-[220px] w-[220px] rounded-full bg-white/[0.10] blur-[70px]" />
                <div className="absolute right-[-70px] bottom-[-70px] h-[260px] w-[260px] rounded-full bg-white/[0.08] blur-[90px]" />
              </div>

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Reserva cancelada ❌
                    </p>
                    <p className="mt-1 text-white/60 text-sm">
                      Te estamos llevando al marketplace…
                    </p>
                  </div>

                  <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/85">
                    <Scissors className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                    Código cancelado
                  </p>
                  <p className="mt-2 text-white font-semibold tracking-[0.14em]">
                    {code}
                  </p>
                </div>

                <div className="mt-5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-full bg-white/50 animate-[progress_1.3s_linear_forwards]" />
                </div>

                <style jsx>{`
                  @keyframes progress {
                    from {
                      transform: translateX(-100%);
                    }
                    to {
                      transform: translateX(0%);
                    }
                  }
                `}</style>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
      <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center">
        <Icon className="w-4 h-4 text-white/80" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
          {label}
        </p>
        <p className="text-white/90 font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}
