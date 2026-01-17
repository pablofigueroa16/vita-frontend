"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Scissors, ArrowRight } from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** PATCH http://localhost:3000/reservations/:id/cancel */
async function cancelReservation(reservationId: string) {
  const token = getToken();

  const res = await fetch(`${API}/reservations/${reservationId}/cancel`, {
    method: "PATCH",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const json = await safeJson(res);

  if (!res.ok) {
    const msg =
      (json as any)?.message ??
      (json as any)?.error ??
      `Error (${res.status}) cancelando`;
    throw new Error(msg);
  }

  return json ?? {};
}

/* ================= COMPONENT ================= */
export default function CancelClientOverlay({
  code,
  reservationId,
  backHref,
}: {
  code: string;
  reservationId: string;
  backHref: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const disabled = !reservationId || loading;

  const onCancel = async () => {
    // si no hay id, no se puede pegar al back
    if (!reservationId) {
      setErr("Falta reservationId (id real de la reserva).");
      setOpen(true);
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      await cancelReservation(reservationId);

      // ✅ opcional: marca localStorage como cancelada (si lo estás usando)
      try {
        const raw = localStorage.getItem("vita_last_reservation_v1");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.id === reservationId) {
            localStorage.setItem(
              "vita_last_reservation_v1",
              JSON.stringify({ ...parsed, status: "CANCELED" })
            );
          }
        }
      } catch {}

      setOpen(true);

      setTimeout(() => {
        router.push(backHref);
      }, 1200);
    } catch (e: any) {
      setErr(e?.message ?? "Error cancelando reserva");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className={cn(
          "h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
          "bg-white text-black hover:opacity-90 transition",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        title={!reservationId ? "Falta reservationId en la URL" : "Cancelar reserva"}
      >
        <X className="w-4 h-4" />
        {loading ? "Cancelando..." : "Cancelar reserva"}
        <ArrowRight className="w-4 h-4 opacity-80" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
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
              onClick={(e) => e.stopPropagation()}
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
                      {err ? "Error ❌" : "Reserva cancelada ✅"}
                    </p>
                    <p className="mt-1 text-white/60 text-sm">
                      {err ? "Revisa el mensaje y vuelve a intentar." : "Te estamos llevando…"}
                    </p>
                  </div>

                  <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/85">
                    <Scissors className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                    Código
                  </p>
                  <p className="mt-2 text-white font-semibold tracking-[0.10em] break-all">
                    {code}
                  </p>
                  <p className="mt-2 text-[11px] text-white/50 break-all">
                    ID: {reservationId || "—"}
                  </p>

                  {err && <p className="mt-3 text-[11px] text-red-200/90">{err}</p>}
                </div>

                {!err && (
                  <div className="mt-5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-full bg-white/50 animate-[progress_1.2s_linear_forwards]" />
                  </div>
                )}

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

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full h-11 rounded-full border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition text-white/85 font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
