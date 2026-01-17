"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BadgeCheck, Calendar, X, QrCode } from "lucide-react";
import { cancelReservation } from "@/app/lib/reservations";
import {
  loadLastReservation,
  updateLastReservation,
  clearLastReservation,
  type StoredReservation,
} from "@/app/lib/localReservation";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TOKENS UI ================= */
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const GLASS_CARD =
  "bg-white/[0.05] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= HELPERS ================= */
function isCanceled(status?: string) {
  return (status ?? "").toUpperCase().includes("CANCEL");
}

function StatusPill({ status }: { status?: string }) {
  const s = (status ?? "ACTIVE").toUpperCase();

  const ok =
    "text-[11px] px-3 py-1 rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-100/90";
  const danger =
    "text-[11px] px-3 py-1 rounded-full border border-red-300/30 bg-red-300/10 text-red-100/90";
  const base =
    "text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/75";

  if (s.includes("CANCEL")) return <span className={danger}>Cancelada</span>;
  if (s.includes("COMP")) return <span className={base}>Completada</span>;
  return <span className={ok}>Activa</span>;
}

/** QR “visual” sin librerías (estético) */
function FakeQR({ value }: { value: string }) {
  const size = 23;

  const grid = React.useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }

    const m: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
    const isFinder = (r: number, c: number) =>
      (r < 7 && c < 7) || (r < 7 && c > size - 8) || (r > size - 8 && c < 7);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (isFinder(r, c)) {
          const rr = r % 7;
          const cc = c % 7;
          const on =
            rr === 0 ||
            rr === 6 ||
            cc === 0 ||
            cc === 6 ||
            (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
          m[r][c] = on ? 1 : 0;
          continue;
        }
        h ^= (r + 1) * 31 + (c + 1) * 17;
        h = Math.imul(h, 1103515245) + 12345;
        m[r][c] = (h >>> 0) % 5 === 0 ? 1 : 0;
      }
    }
    return m;
  }, [value]);

  return (
    <div
      className={cn(
        "rounded-[18px] border border-white/14 bg-white/[0.05] backdrop-blur-2xl p-3",
        "shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
      )}
      aria-label="QR"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {grid.flatMap((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={cn("aspect-square", cell ? "bg-white/85" : "bg-transparent")}
              style={{ borderRadius: 2 }}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function ReservaExitosaPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const rid = sp.get("rid"); // opcional (si lo mandas por query)

  const [res, setRes] = React.useState<StoredReservation | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = loadLastReservation();
    // si viene rid, puedes validar/mostrar. MVP: mostramos lo guardado.
    if (stored) setRes(stored);
  }, [rid]);

  const onCancel = async () => {
    if (!res?.id) return;
    if (isCanceled(res.status)) return;

    setLoading(true);
    setErr(null);

    try {
      // ✅ pega al backend
      await cancelReservation(res.id);

      // ✅ actualiza storage/state (MVP)
      updateLastReservation({ status: "CANCELED" });
      const updated = loadLastReservation();
      setRes(updated);

      router.push("/Home/consumidor/reserva-cancelada");
    } catch (e: any) {
      setErr(e?.message ?? "Error cancelando reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-10 py-10 pb-44">
        {/* HEADER */}
        <div className={cn(GLASS_SOFT, "rounded-[30px] p-6 sm:p-8 relative overflow-hidden")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.07] blur-[110px]" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Home • Consumidor
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                Reserva exitosa
              </h1>
              <p className="mt-2 text-white/60 text-sm max-w-2xl">
                Te dejamos el ticket con QR y un botón de cancelar conectado al backend.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap sm:justify-end">
              <button
                onClick={() => router.push("/Home/consumidor/mis-reservas")}
                className={cn(
                  "h-11 px-5 rounded-full font-semibold text-sm inline-flex items-center gap-2",
                  "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                  "text-white/90"
                )}
              >
                Ver mis reservas
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                onClick={() => router.push("/Home/consumidor/marketplace/productos")}
                className={cn(
                  "h-11 px-5 rounded-full font-semibold text-sm",
                  "bg-white text-black hover:opacity-90 transition"
                )}
              >
                Seguir explorando
              </button>
            </div>
          </div>
        </div>

        {/* ✅ CARD GLASS PRINCIPAL */}
        <section
          className={cn(
            "mt-6 rounded-[28px] p-5 relative overflow-hidden",
            GLASS_CARD,
            HOVER_LED
          )}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[95px]" />
            <div className="absolute right-[-140px] bottom-[-140px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          {res ? (
            <div className="relative flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
              <div className="flex items-start gap-4 min-w-0">
                <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                  <BadgeCheck className="w-5 h-5 text-white/85" />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-semibold text-lg">Tu reserva ha sido exitosa ✅</p>
                  <p className="mt-1 text-white/60 text-sm">
                    <span className="text-white/80">{res.date}</span>{" "}
                    <span className="text-white/80">{res.startTime}</span> –{" "}
                    <span className="text-white/80">{res.endTime}</span>
                  </p>
                  <p className="mt-1 text-white/45 text-[11px] truncate">
                    ID: {res.id} • Provider: {res.providerId}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <StatusPill status={res.status} />
                    {err && <span className="text-[11px] text-red-300/90">{err}</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                    <QrCode className="w-5 h-5 text-white/85" />
                  </div>
                  <FakeQR value={String(res.id)} />
                </div>

                <button
                  onClick={onCancel}
                  disabled={loading || isCanceled(res.status)}
                  className={cn(
                    "h-11 px-5 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                    "bg-white text-black hover:opacity-90 transition",
                    (loading || isCanceled(res.status)) && "opacity-50 cursor-not-allowed"
                  )}
                  title={isCanceled(res.status) ? "Ya está cancelada" : "Cancelar reserva"}
                >
                  <X className="w-4 h-4" />
                  {loading ? "Cancelando..." : "Cancelar"}
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative text-center py-10">
              <p className="text-base font-semibold">No encontré un ticket guardado</p>
              <p className="text-sm text-white/60 mt-1">
                Crea una reserva y vuelve aquí para ver el QR y cancelar.
              </p>
            </div>
          )}
        </section>

        {/* DETALLE (opcional) */}
        {res && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={cn(GLASS_SOFT, "rounded-[26px] p-5")}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Cliente</p>
              <p className="mt-1 text-white/85 text-sm">{res.customerName}</p>
              <p className="text-white/60 text-sm">{res.customerEmail}</p>
            </div>

            <div className={cn(GLASS_SOFT, "rounded-[26px] p-5")}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Horario</p>
              <p className="mt-2 text-white/85 text-sm inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/70" />
                {res.date} • {res.startTime} – {res.endTime}
              </p>

              <button
                onClick={() => {
                  clearLastReservation();
                  setRes(null);
                }}
                className={cn(
                  "mt-3 h-10 px-5 rounded-full text-sm",
                  "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                  "text-white/80"
                )}
              >
                Limpiar ticket (MVP)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
