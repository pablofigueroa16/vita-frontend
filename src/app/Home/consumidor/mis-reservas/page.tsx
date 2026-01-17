"use client";

import * as React from "react";
import { ArrowRight, Calendar, Mail, X, QrCode, BadgeCheck } from "lucide-react";
import { cancelReservation } from "@/app/lib/reservations";
import {
  loadLastReservation,
  loadLastEmail,
  saveLastEmail,
  updateLastReservation,
  clearLastReservation,
  type StoredReservation,
} from "@/app/lib/localReservation";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TOKENS UI ================= */
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= UI HELPERS ================= */
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

/** QR “visual” (estético) sin librerías */
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
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
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
export default function MisReservasPage() {
  const [email, setEmail] = React.useState("");
  const [lastRes, setLastRes] = React.useState<StoredReservation | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  // ✅ al entrar: carga email + última reserva guardada
  React.useEffect(() => {
    const e = loadLastEmail();
    if (e) setEmail(e);

    const stored = loadLastReservation();
    setLastRes(stored);
  }, []);

  const onChangeEmail = (v: string) => {
    setEmail(v);
    saveLastEmail(v);
  };

  // ✅ Botón real que pega al backend (PATCH /reservations/:id/cancel)
  const onCancel = async () => {
    if (!lastRes?.id) return;
    if (isCanceled(lastRes.status)) return;

    setLoading(true);
    setErr(null);
    setOk(null);

    try {
      await cancelReservation(lastRes.id);

      // ✅ actualiza localStorage y state (MVP front)
      updateLastReservation({ status: "CANCELED" });

      const updated = loadLastReservation();
      setLastRes(updated);

      setOk("Reserva cancelada ✅");
    } catch (e: any) {
      setErr(e?.message ?? "Error cancelando reserva");
    } finally {
      setLoading(false);
    }
  };

  // ✅ si quieres botón “limpiar ticket” (opcional)
  const onClearTicket = () => {
    clearLastReservation();
    setLastRes(null);
    setOk(null);
    setErr(null);
  };

  const showSuccessBanner = !!lastRes && !isCanceled(lastRes.status);

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-10 pb-44">
        {/* HEADER */}
        <div className={cn(GLASS_SOFT, "rounded-[30px] p-6 sm:p-8 relative overflow-hidden")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.07] blur-[110px]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Home • Consumidor
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                Mis Reservas
              </h1>
              <p className="mt-2 text-white/60 text-sm max-w-2xl">
                MVP Front: mostramos el ticket guardado en localStorage y cancelamos con el backend.
              </p>
            </div>

            <div className="w-full lg:w-[520px]">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Correo del cliente (guardado)
                </span>
                <div className="mt-2 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    placeholder="Ej: laura@mail.com"
                    className={cn(
                      "w-full h-11 rounded-full pl-11 pr-4",
                      "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                      "text-white/90 placeholder:text-white/35 outline-none",
                      "focus:border-white/28 focus:bg-white/[0.07] transition"
                    )}
                  />
                </div>
              </label>

              {err && <p className="mt-2 text-[11px] text-red-300/90">{err}</p>}
              {ok && <p className="mt-2 text-[11px] text-white/70">{ok}</p>}
            </div>
          </div>
        </div>

        {/* ✅ LETRERO ÉXITO + QR + BOTÓN CANCELAR (backend) */}
        {showSuccessBanner && lastRes && (
          <section className={cn("mt-6 rounded-[28px] p-5 relative overflow-hidden", GLASS)}>
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[95px]" />
              <div className="absolute right-[-140px] bottom-[-140px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
            </div>

            <div className="relative flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
              <div className="flex items-start gap-4 min-w-0">
                <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                  <BadgeCheck className="w-5 h-5 text-white/85" />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-semibold text-lg">
                    Tu reserva ha sido exitosa ✅
                  </p>
                  <p className="mt-1 text-white/60 text-sm">
                    Muestra este QR al llegar •{" "}
                    <span className="text-white/80">{lastRes.date}</span>{" "}
                    <span className="text-white/80">{lastRes.startTime}</span>
                  </p>
                  <p className="mt-1 text-white/45 text-[11px] truncate">
                    ID: {lastRes.id} • Provider: {lastRes.providerId}
                  </p>

                  <div className="mt-3">
                    <StatusPill status={lastRes.status} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                    <QrCode className="w-5 h-5 text-white/85" />
                  </div>
                  <FakeQR value={lastRes.id} />
                </div>

                <button
                  onClick={onCancel}
                  disabled={loading}
                  className={cn(
                    "h-11 px-5 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                    "bg-white text-black hover:opacity-90 transition",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <X className="w-4 h-4" />
                  {loading ? "Cancelando..." : "Cancelar reserva"}
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ✅ DETALLE DE LA RESERVA (card) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lastRes ? (
            <div className={cn(GLASS, HOVER_LED, "rounded-[26px] p-5 flex flex-col gap-4")}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {lastRes.customerName || "Reserva"}
                  </p>
                  <p className="text-white/60 text-sm truncate">
                    {lastRes.customerEmail} • Provider: {lastRes.providerId}
                  </p>
                </div>
                <StatusPill status={lastRes.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={cn(GLASS_SOFT, "rounded-[20px] p-4")}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Fecha</p>
                  <p className="mt-1 text-white/85 text-sm inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/70" />
                    {lastRes.date}
                  </p>
                </div>

                <div className={cn(GLASS_SOFT, "rounded-[20px] p-4")}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Hora</p>
                  <p className="mt-1 text-white/85 text-sm">
                    {lastRes.startTime} – {lastRes.endTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={onCancel}
                  disabled={loading || isCanceled(lastRes.status)}
                  className={cn(
                    "h-11 w-full rounded-full font-semibold inline-flex items-center justify-center gap-2",
                    "border border-white/18 bg-white/[0.04] backdrop-blur-2xl hover:bg-white/[0.08] transition",
                    (loading || isCanceled(lastRes.status)) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>

                <button
                  onClick={onClearTicket}
                  className={cn(
                    "h-11 w-full rounded-full font-semibold inline-flex items-center justify-center gap-2",
                    "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                    "text-white/85"
                  )}
                  title="Esto solo limpia el ticket guardado en tu navegador (MVP)."
                >
                  Limpiar ticket (MVP)
                </button>
              </div>

              {isCanceled(lastRes.status) && (
                <p className="text-[11px] text-white/55">
                  Esta reserva ya está cancelada. (UI actualizada desde localStorage)
                </p>
              )}
            </div>
          ) : (
            <div className={cn(GLASS_SOFT, "rounded-[26px] p-8 text-center lg:col-span-2")}>
              <p className="text-base font-semibold">Aún no hay ticket guardado</p>
              <p className="text-sm text-white/60 mt-1">
                Cuando creas una reserva, se guarda en localStorage y aquí aparece el QR + cancelar.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
