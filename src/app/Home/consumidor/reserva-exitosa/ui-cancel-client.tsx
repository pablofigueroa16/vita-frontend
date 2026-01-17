"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { X, Scissors } from "lucide-react";

export default function CancelClientOverlay({
  code,
  backHref,
}: {
  code: string;
  backHref: string;
}) {
  const router = useRouter();
  const [cancelView, setCancelView] = React.useState(false);

  function cancelReservationUI() {
    setCancelView(true);
    setTimeout(() => {
      router.push(backHref);
    }, 1300);
  }

  return (
    <>
      <button
        type="button"
        onClick={cancelReservationUI}
        className={cn(
          "h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2 w-full",
          "bg-white text-black hover:opacity-90 transition"
        )}
      >
        <X className="w-4 h-4" />
        Cancelar reserva
      </button>

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
    </>
  );
}

/* local util para no importar cosas raras */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
