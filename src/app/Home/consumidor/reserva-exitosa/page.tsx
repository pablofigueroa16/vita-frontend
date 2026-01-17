"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Calendar, Clock, User, Mail, X } from "lucide-react";

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

type ReservationFromPost = {
  id: string;
  providerId: string;
  customerName: string;
  customerEmail: string;
  date: string; // "2026-01-23T00:00:00.000Z"
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  status: string; // "CONFIRMED"
  notes?: any;
  metadata?: any;
  createdAt?: string;
  updatedAt?: string;
};

const KEY = "vita_last_reservation_v1";

function isCanceled(status?: string) {
  return (status ?? "").toUpperCase().includes("CANCEL");
}

function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
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
  if (s.includes("CONF")) return <span className={ok}>Confirmada</span>;
  return <span className={base}>{status ?? "Activa"}</span>;
}

function ReadField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  return (
    <div className={cn(GLASS_SOFT, "rounded-[22px] p-4")}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">{label}</p>
      <div className="mt-2 flex items-center gap-2 text-white/85">
        <span className="text-white/65">
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-sm font-semibold truncate">{value || "-"}</span>
      </div>
    </div>
  );
}

function loadReservation(): ReservationFromPost | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReservationFromPost;
  } catch {
    return null;
  }
}

function saveReservation(r: ReservationFromPost) {
  localStorage.setItem(KEY, JSON.stringify(r));
}

export default function ReservaExitosaPage() {
  const router = useRouter();
  const [res, setRes] = React.useState<ReservationFromPost | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    setRes(loadReservation());
  }, []);

  const onCancel = async () => {
    if (!res?.id) return;
    if (isCanceled(res.status)) return;

    setLoading(true);
    setErr(null);

    try {
      const url = `http://localhost:3001/reservations/${encodeURIComponent(res.id)}/cancel`;
      const resp = await fetch(url, { method: "PATCH" });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(`Error cancelando (${resp.status}). ${txt || "Intenta de nuevo."}`);
      }

      // si el PATCH devuelve json, lo usamos; si no, actualizamos local
      let patched: any = null;
      try {
        patched = await resp.json();
      } catch {}

      const updated: ReservationFromPost = patched?.id ? patched : { ...res, status: "CANCELED" };
      saveReservation(updated);
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
                Mostrando la reserva recién creada (guardada desde la respuesta del POST).
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

              {/* ✅ CANCELAR */}
              <button
                onClick={onCancel}
                disabled={loading || !res?.id || isCanceled(res?.status)}
                className={cn(
                  "h-11 px-5 rounded-full font-semibold text-sm inline-flex items-center gap-2",
                  "bg-white text-black hover:opacity-90 transition",
                  (loading || !res?.id || isCanceled(res?.status)) && "opacity-50 cursor-not-allowed"
                )}
              >
                <X className="w-4 h-4" />
                {loading ? "Cancelando..." : "Cancelar reserva"}
              </button>
            </div>
          </div>
        </div>

        {/* CARD + FORM */}
        <section className={cn("mt-6 rounded-[28px] p-5 relative overflow-hidden", GLASS_CARD, HOVER_LED)}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[95px]" />
            <div className="absolute right-[-140px] bottom-[-140px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          {res ? (
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl grid place-items-center">
                  <BadgeCheck className="w-5 h-5 text-white/85" />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-semibold text-lg">Confirmación ✅</p>
                  <div className="mt-3 flex items-center gap-2">
                    <StatusPill status={res.status} />
                    {err && <span className="text-[11px] text-red-300/90">{err}</span>}
                  </div>
                  <p className="mt-2 text-white/45 text-[11px] truncate">
                    ID: {res.id} • Provider: {res.providerId}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <ReadField icon={User} label="Nombre" value={res.customerName} />
                <ReadField icon={Mail} label="Correo" value={res.customerEmail} />
                <ReadField icon={Calendar} label="Día" value={formatDate(res.date)} />
                <ReadField icon={Clock} label="Hora" value={`${res.startTime} – ${res.endTime}`} />
              </div>
            </div>
          ) : (
            <div className="relative text-center py-10">
              <p className="text-base font-semibold">No hay reserva para mostrar</p>
              <p className="text-sm text-white/60 mt-1">
                Debes guardar la respuesta del POST en localStorage con key:{" "}
                <span className="text-white/80">{KEY}</span>
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
