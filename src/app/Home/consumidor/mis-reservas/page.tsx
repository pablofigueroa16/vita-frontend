"use client";

import * as React from "react";
import { ArrowRight, Calendar, Mail, X } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT =
  "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= API (como tu screenshot) ================= */
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...init, headers });

  if (!res.ok) {
    let msg = `Error (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.message ?? data?.error ?? msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json().catch(() => ({} as T));
}

/** Ajusta esto al JSON real que te devuelva el backend */
type ReservationDTO = {
  id: string;
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: "ACTIVE" | "CANCELED" | "COMPLETED" | string;
  createdAt?: string | number;
};

async function fetchReservationsByEmail(customerEmail: string): Promise<ReservationDTO[]> {
  const data = await apiFetch<any>(
    `/reservations?customerEmail=${encodeURIComponent(customerEmail)}`,
    { method: "GET" }
  );

  return Array.isArray(data)
    ? data
    : Array.isArray(data?.reservations)
    ? data.reservations
    : [];
}

async function cancelReservation(reservationId: string) {
  return apiFetch<any>(`/reservations/${reservationId}/cancel`, { method: "PATCH" });
}

function StatusPill({ status }: { status?: string }) {
  const s = (status ?? "ACTIVE").toUpperCase();
  const base =
    "text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/75";
  const danger =
    "text-[11px] px-3 py-1 rounded-full border border-red-300/30 bg-red-300/10 text-red-100/90";

  if (s.includes("CANCEL")) return <span className={danger}>Cancelada</span>;
  if (s.includes("COMP")) return <span className={base}>Completada</span>;
  return <span className={base}>Activa</span>;
}

export default function MisReservasPage() {
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    const last = localStorage.getItem("vita_last_customer_email_v1");
    if (last) setEmail(last);
  }, []);

  const [items, setItems] = React.useState<ReservationDTO[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  const load = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setErr(null);
    setOk(null);
    try {
      const data = await fetchReservationsByEmail(email.trim());
      setItems(data);
      localStorage.setItem("vita_last_customer_email_v1", email.trim());
    } catch (e: any) {
      setErr(e?.message ?? "Error cargando reservas");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async (id: string) => {
    setLoading(true);
    setErr(null);
    setOk(null);
    try {
      await cancelReservation(id);
      setOk("Reserva cancelada ✅");
      const data = await fetchReservationsByEmail(email.trim());
      setItems(data);
    } catch (e: any) {
      setErr(e?.message ?? "Error cancelando reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-10 pb-44">
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
                Busca tus reservas por correo y cancela desde aquí.
              </p>
            </div>

            <div className="w-full lg:w-[520px]">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Correo del cliente
                </span>
                <div className="mt-2 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: manuel@mail.com"
                    className={cn(
                      "w-full h-11 rounded-full pl-11 pr-28",
                      "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                      "text-white/90 placeholder:text-white/35 outline-none",
                      "focus:border-white/28 focus:bg-white/[0.07] transition"
                    )}
                  />
                  <button
                    onClick={load}
                    disabled={!email.trim() || loading}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full",
                      "border border-white/14 bg-white/[0.06] hover:bg-white/[0.10] transition",
                      (!email.trim() || loading) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {loading ? "Cargando..." : "Buscar"}
                  </button>
                </div>
              </label>

              {err && <p className="mt-2 text-[11px] text-red-300/90">{err}</p>}
              {ok && <p className="mt-2 text-[11px] text-white/70">{ok}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((r) => {
            const isCanceled = (r.status ?? "").toUpperCase().includes("CANCEL");

            return (
              <div
                key={r.id}
                className={cn(GLASS, HOVER_LED, "rounded-[26px] p-5 flex flex-col gap-4")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">
                      {r.customerName || "Reserva"}
                    </p>
                    <p className="text-white/60 text-sm truncate">
                      {r.customerEmail} • Provider: {r.providerId}
                    </p>
                  </div>
                  <StatusPill status={r.status} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={cn(GLASS_SOFT, "rounded-[20px] p-4")}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                      Fecha
                    </p>
                    <p className="mt-1 text-white/85 text-sm inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/70" />
                      {r.date}
                    </p>
                  </div>

                  <div className={cn(GLASS_SOFT, "rounded-[20px] p-4")}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                      Hora
                    </p>
                    <p className="mt-1 text-white/85 text-sm">
                      {r.startTime} – {r.endTime}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onCancel(r.id)}
                  disabled={loading || isCanceled}
                  className={cn(
                    "h-11 w-full rounded-full font-semibold inline-flex items-center justify-center gap-2",
                    "border border-white/18 bg-white/[0.04] backdrop-blur-2xl hover:bg-white/[0.08] transition",
                    (loading || isCanceled) && "opacity-50 cursor-not-allowed"
                  )}
                  title={isCanceled ? "Ya está cancelada" : "Cancelar"}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </div>
            );
          })}

          {!loading && email.trim() && items.length === 0 && (
            <div className={cn(GLASS_SOFT, "rounded-[26px] p-8 text-center lg:col-span-2")}>
              <p className="text-base font-semibold">No encontramos reservas</p>
              <p className="text-sm text-white/60 mt-1">Revisa el correo o intenta más tarde.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
