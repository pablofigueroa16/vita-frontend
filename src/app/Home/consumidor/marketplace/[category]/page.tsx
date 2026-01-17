"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Mail,
  ShoppingBag,
  User,
  X,
  BadgeCheck,
} from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TYPES ================= */
type ListingType = "producto" | "servicio";

type CategoryKey =
  | "belleza"
  | "barberia"
  | "fitness"
  | "peluqueria"
  | "productos"
  | "tech";

type Product = {
  id: string;
  type: ListingType;
  category: CategoryKey;
  store: string;
  name: string;
  price: number;
  stock?: number;
  desc: string;
  images: string[];
  providerId?: string;
};

type StoredReservation = {
  reservationId: string;
  listingId: string;
  providerId: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  createdAt: number;
};

/* ================= TOKENS UI ================= */
const GLASS_SOFT =
  "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= BACKEND API ================= */
const API_BASE = "http://localhost:3000";

type CreateReservationBody = {
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string;
  startTime: string;
  endTime: string;
};

function addOneHour(startTime: string) {
  const [hh, mm] = startTime.split(":").map((n) => Number(n));
  const d = new Date(2000, 0, 1, hh, mm || 0, 0, 0);
  d.setHours(d.getHours() + 1);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

async function createReservation(body: CreateReservationBody) {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let msg = `Error creando reserva (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.message ?? data?.error ?? msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json().catch(() => ({}));
}

async function cancelReservation(reservationId: string) {
  const res = await fetch(`${API_BASE}/reservations/${reservationId}/cancel`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    let msg = `Error cancelando reserva (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.message ?? data?.error ?? msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json().catch(() => ({}));
}

/* ================= DATA ================= */
const CATEGORY_LABEL: Record<CategoryKey, string> = {
  belleza: "Belleza",
  barberia: "Barbería",
  fitness: "Fitness",
  peluqueria: "Peluquería",
  productos: "Productos",
  tech: "Tech",
};

const CATEGORY_DEFAULT_TYPE: Record<CategoryKey, ListingType> = {
  belleza: "servicio",
  barberia: "servicio",
  fitness: "servicio",
  peluqueria: "servicio",
  productos: "producto",
  tech: "producto",
};

function hourlySlots(startHour = 10, endHour = 18) {
  const out: string[] = [];
  for (let h = startHour; h <= endHour; h++) out.push(`${String(h).padStart(2, "0")}:00`);
  return out;
}
const DEFAULT_SLOTS = hourlySlots(10, 18);

const DEMO_PROVIDER_ID = "87f5ad07-ed05-450e-90e4-444e284f2166";

const IMG_POOL_9: Record<CategoryKey, string[]> = {
  belleza: [
    "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993326/pexels-photo-3993326.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993450/pexels-photo-3993450.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3998004/pexels-photo-3998004.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&w=1200",
  ],
  barberia: [
    "https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993315/pexels-photo-3993315.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3992873/pexels-photo-3992873.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3998422/pexels-photo-3998422.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993317/pexels-photo-3993317.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3998420/pexels-photo-3998420.jpeg?auto=compress&w=1200",
  ],
  peluqueria: [
    "https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993321/pexels-photo-3993321.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993445/pexels-photo-3993445.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&w=1200",
  ],
  fitness: [
    "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/841132/pexels-photo-841132.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1552246/pexels-photo-1552246.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/414030/pexels-photo-414030.jpeg?auto=compress&w=1200",
  ],
  productos: [
    "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/5632391/pexels-photo-5632391.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/6214386/pexels-photo-6214386.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/6214391/pexels-photo-6214391.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/5632393/pexels-photo-5632393.jpeg?auto=compress&w=1200",
  ],
  tech: [
    "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3829560/pexels-photo-3829560.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/4526405/pexels-photo-4526405.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3829561/pexels-photo-3829561.jpeg?auto=compress&w=1200",
  ],
};

function seedItems(category: CategoryKey): Product[] {
  const type = CATEGORY_DEFAULT_TYPE[category];
  const imgPool = IMG_POOL_9[category];

  const store =
    type === "servicio"
      ? `${CATEGORY_LABEL[category]} Studio`
      : `Vita ${CATEGORY_LABEL[category]}`;

  return Array.from({ length: 9 }).map((_, i) => {
    const images = Array.from({ length: 4 }).map((__, k) => imgPool[(i + k) % imgPool.length]);

    return {
      id: `${category}-${i + 1}`,
      type,
      category,
      store,
      name:
        type === "servicio"
          ? `${CATEGORY_LABEL[category]} • Sesión ${i + 1}`
          : `${CATEGORY_LABEL[category]} • Item ${i + 1}`,
      price: type === "servicio" ? 12.99 + i : 9.5 + i,
      stock: type === "producto" ? 40 - i * 2 : undefined,
      desc:
        type === "servicio"
          ? "Reserva por hora. Confirmación instantánea dentro de Vita."
          : "Producto premium seleccionado. Compra rápida dentro del ecosistema.",
      images,
      providerId: type === "servicio" ? DEMO_PROVIDER_ID : undefined,
    };
  });
}

/* ================= localStorage última reserva ================= */
function resKey(listingId: string) {
  return `vita_last_reservation_v1:${listingId}`;
}
function loadLastReservation(listingId: string): StoredReservation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(resKey(listingId));
    if (!raw) return null;
    return JSON.parse(raw) as StoredReservation;
  } catch {
    return null;
  }
}
function saveLastReservation(listingId: string, data: StoredReservation) {
  if (typeof window === "undefined") return;
  localStorage.setItem(resKey(listingId), JSON.stringify(data));
}
function clearLastReservation(listingId: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(resKey(listingId));
}

/* ================= PAGE ================= */
export default function MarketplaceCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const raw = (params?.category ?? "productos") as string;
  const category = decodeURIComponent(raw) as CategoryKey;

  const isValid = (Object.keys(CATEGORY_LABEL) as CategoryKey[]).includes(category);

  React.useEffect(() => {
    if (!isValid) router.replace("/Home/consumidor/productos");
  }, [isValid, router]);

  const items = React.useMemo(() => seedItems(category), [category]);
  const [selected, setSelected] = React.useState<Product | null>(null);

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-10 pb-44">
        {/* ✅ HERO / BANNER con logo + contacto + CTAs */}
        <div className={cn(GLASS_SOFT, "rounded-[30px] p-6 sm:p-8 relative overflow-hidden")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.07] blur-[110px]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
            {/* Left */}
            <div className="flex gap-5 items-start">
              {/* LOGO */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border border-white/14 bg-white/[0.06] backdrop-blur-2xl grid place-items-center overflow-hidden">
                {/* Cambia por: <img src="/logo.png" alt="Vita" className="h-full w-full object-contain p-3" /> */}
                <span className="text-white/80 text-sm font-semibold">VITA</span>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Home • Marketplace
                </p>

                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                  {CATEGORY_LABEL[category]}
                </h1>

                <p className="mt-2 text-white/60 text-sm max-w-2xl">
                  Feed premium 3×3 estilo Instagram. Abre un item para{" "}
                  {CATEGORY_DEFAULT_TYPE[category] === "servicio" ? "reservar por hora" : "comprar"}.
                </p>

                {/* CONTACTO */}
                <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-white/70">
                  <span className="px-3 py-1 rounded-full border border-white/12 bg-white/[0.04]">
                    ✉️ soporte@vita.app
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/12 bg-white/[0.04]">
                    📞 +57 300 000 0000
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/12 bg-white/[0.04]">
                    📷 @vita
                  </span>
                </div>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-end">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <button
                  onClick={() => router.push("/Home/consumidor/mis-reservas")}
                  className={cn(
                    "h-11 px-5 rounded-full font-semibold text-sm",
                    "border border-white/14 bg-white/[0.06] hover:bg-white/[0.10] transition",
                    "text-white"
                  )}
                >
                  Mis reservas
                </button>

                <button
                  onClick={() => router.push("/Home/consumidor/productos")}
                  className={cn(
                    "h-11 px-5 rounded-full font-semibold text-sm",
                    "bg-white text-black hover:opacity-90 transition"
                  )}
                >
                  Explorar catálogo
                </button>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <button
                  onClick={() => router.push("/Home/consumidor/contacto")}
                  className={cn(
                    "h-11 px-5 rounded-full text-sm",
                    "border border-white/14 bg-white/[0.04] hover:bg-white/[0.08] transition",
                    "text-white/85"
                  )}
                >
                  Contactar
                </button>

                <button
                  onClick={() => router.back()}
                  className={cn(
                    "h-11 px-5 rounded-full text-sm",
                    "border border-white/14 bg-white/[0.04] hover:bg-white/[0.08] transition",
                    "text-white/85"
                  )}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div className="relative mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-white/70 text-sm">
              ⚡ Tip: abre un item y reserva en 1 minuto dentro de Vita.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById("vita-grid");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "h-10 px-4 rounded-full text-sm font-semibold",
                  "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                  "text-white/85"
                )}
              >
                Ver feed
              </button>

              <button
                onClick={() => router.push("/Home/consumidor/mis-reservas")}
                className={cn(
                  "h-10 px-4 rounded-full text-sm font-semibold",
                  "bg-white text-black hover:opacity-90 transition"
                )}
              >
                Ver mis reservas
              </button>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div id="vita-grid" className="mt-6 grid grid-cols-3 gap-3">
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.05]",
                HOVER_LED
              )}
              aria-label={`Abrir ${p.name}`}
            >
              <img src={p.images[0]} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -left-10 -top-10 h-[160px] w-[160px] rounded-full bg-white/[0.12] blur-[55px]" />
                <div className="absolute right-[-60px] bottom-[-60px] h-[190px] w-[190px] rounded-full bg-white/[0.10] blur-[60px]" />
              </div>

              <div className="absolute left-3 bottom-3 right-3">
                <p className="text-white/90 font-semibold text-[13px] line-clamp-1">{p.name}</p>
                <p className="text-white/55 text-[11px] line-clamp-1 mt-0.5">{p.store}</p>
              </div>
            </button>
          ))}
        </div>

        {selected && <ListingModal listing={selected} onClose={() => setSelected(null)} />}
      </div>
    </main>
  );
}

/* ================= MODAL ================= */
function ListingModal({ listing, onClose }: { listing: Product; onClose: () => void }) {
  const router = useRouter();
  const isService = listing.type === "servicio";
  const [idx, setIdx] = React.useState(0);

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const today = React.useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const [date, setDate] = React.useState(today);
  const [time, setTime] = React.useState("10:00");
  const [qty, setQty] = React.useState(1);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const [lastRes, setLastRes] = React.useState<StoredReservation | null>(null);
  const [reservedLocal, setReservedLocal] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!isService) return;
    const stored = loadLastReservation(listing.id);
    setLastRes(stored);
    if (stored?.date && stored?.startTime) {
      setReservedLocal((prev) => {
        const next = new Set(prev);
        next.add(`${stored.date}|${stored.startTime}`);
        return next;
      });
    }
  }, [isService, listing.id]);

  const reservedTimesForDay = React.useMemo(() => {
    const set = new Set<string>();
    reservedLocal.forEach((k) => {
      const [d, t] = k.split("|");
      if (d === date) set.add(t);
    });
    return set;
  }, [reservedLocal, date]);

  const missingReason = React.useMemo(() => {
    if (!isService) return null;
    if (!listing.providerId) return "Falta providerId";
    if (!fullName.trim()) return "Falta nombre";
    if (!email.trim()) return "Falta email";
    if (!date) return "Falta fecha";
    if (!time) return "Falta hora";
    if (reservedTimesForDay.has(time)) return "Hora ocupada";
    return null;
  }, [isService, listing.providerId, fullName, email, date, time, reservedTimesForDay]);

  const canReserve = isService && !isSubmitting && missingReason === null;
  const canCancel = isService && !isSubmitting && !!lastRes?.reservationId;

  const onReserve = async () => {
    if (!canReserve) return;
    setApiError(null);
    setIsSubmitting(true);

    try {
      const payload: CreateReservationBody = {
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        providerId: listing.providerId!,
        date,
        startTime: time,
        endTime: addOneHour(time),
      };

      const data = await createReservation(payload);

      const reservationId =
        data?.id ?? data?.reservation?.id ?? data?.data?.id ?? data?.reservationId ?? null;

      if (!reservationId) throw new Error("Reserva creada, pero el backend no devolvió 'id'.");

      const stored: StoredReservation = {
        reservationId: String(reservationId),
        listingId: listing.id,
        providerId: listing.providerId!,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        createdAt: Date.now(),
      };

      saveLastReservation(listing.id, stored);
      setLastRes(stored);

      setReservedLocal((prev) => {
        const next = new Set(prev);
        next.add(`${payload.date}|${payload.startTime}`);
        return next;
      });

      onClose();
      router.push("/Home/consumidor/mis-reservas");
    } catch (e: any) {
      setApiError(e?.message ?? "Error creando reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancel = async () => {
    if (!canCancel || !lastRes) return;
    setApiError(null);
    setIsSubmitting(true);

    try {
      await cancelReservation(lastRes.reservationId);

      setReservedLocal((prev) => {
        const next = new Set(prev);
        next.delete(`${lastRes.date}|${lastRes.startTime}`);
        return next;
      });

      clearLastReservation(listing.id);
      setLastRes(null);
    } catch (e: any) {
      setApiError(e?.message ?? "Error cancelando reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBuy = () => {
    console.log("Comprar:", { listingId: listing.id, qty });
    onClose();
  };

  const nextImg = () => setIdx((i) => (i + 1) % listing.images.length);
  const prevImg = () => setIdx((i) => (i - 1 + listing.images.length) % listing.images.length);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[32px] flex flex-col",
            "bg-white/[0.06] backdrop-blur-2xl border border-white/14",
            "shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
          )}
        >
          <div className="sticky top-0 z-20 p-5 border-b border-white/10 bg-white/[0.06] backdrop-blur-2xl flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-white font-semibold text-lg truncate">{listing.name}</p>
              <p className="text-white/60 text-sm truncate">
                {listing.store} • {isService ? "Servicio" : "Producto"} • {listing.id}
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition grid place-items-center"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-white/85" />
            </button>
          </div>

          <div className="p-5 pb-28 overflow-y-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">
            {/* left images */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-[24px] border border-white/12 overflow-hidden bg-white/5">
                <img src={listing.images[idx]} alt="image" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.09] transition grid place-items-center"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-white/85" />
                </button>

                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.09] transition grid place-items-center"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-white/85" />
                </button>

                <span className="absolute left-3 bottom-3 text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-2xl text-white/75">
                  {idx + 1} / {listing.images.length}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "aspect-[4/3] rounded-2xl overflow-hidden border transition",
                      i === idx ? "border-white/35" : "border-white/12 hover:border-white/25"
                    )}
                    aria-label={`Ver foto ${i + 1}`}
                  >
                    <img src={src} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col min-h-0">
              <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-6">
                <div className={cn("rounded-[18px] p-3", "bg-white/[0.05] border border-white/10 backdrop-blur-2xl")}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-white font-semibold text-xl tracking-tight">
                        ${listing.price.toFixed(2)}
                      </p>
                      <p className="mt-1 text-white/65 text-[12px]">
                        {isService ? "Precio por sesión" : "Precio"}
                      </p>
                    </div>

                    {!isService && (
                      <span className="text-[10px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/70">
                        Stock: {listing.stock ?? 0}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-white/75 text-[12px] leading-relaxed">{listing.desc}</p>

                  {isService ? (
                    <div className="mt-3 space-y-2.5">
                      <Field icon={User} label="Nombre completo" value={fullName} onChange={setFullName} placeholder="Ej: Laura Frontvita" />
                      <Field icon={Mail} label="Correo" value={email} onChange={setEmail} placeholder="Ej: laura@email.com" type="email" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="block">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">Fecha</span>
                          <input
                            type="date"
                            min={today}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={cn(
                              "mt-2 w-full h-10 rounded-full px-4 text-sm",
                              "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                              "text-white/90 outline-none",
                              "focus:border-white/28 focus:bg-white/[0.07] transition"
                            )}
                          />
                        </label>

                        <label className="block">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">Hora (cada hora)</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {DEFAULT_SLOTS.map((s) => {
                              const disabled = reservedTimesForDay.has(s);
                              const active = s === time;
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => setTime(s)}
                                  className={cn(
                                    "px-2.5 py-1.5 rounded-full text-[11px] border transition backdrop-blur-2xl",
                                    disabled
                                      ? "border-white/8 bg-white/[0.03] text-white/30 cursor-not-allowed"
                                      : active
                                      ? "border-white/32 bg-white/[0.10] text-white"
                                      : "border-white/12 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/22"
                                  )}
                                >
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </label>
                      </div>

                      {apiError && <p className="text-[11px] text-red-300/90">{apiError}</p>}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <div className={cn("rounded-[18px] p-3", GLASS_SOFT)}>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Cantidad</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition"
                          >
                            -
                          </button>
                          <div className="h-10 px-5 rounded-full border border-white/12 bg-white/[0.05] grid place-items-center text-white/90 font-semibold text-sm">
                            {qty}
                          </div>
                          <button
                            type="button"
                            onClick={() => setQty((q) => q + 1)}
                            className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className={cn("rounded-[18px] p-3", GLASS_SOFT)}>
                        <p className="text-white/85 font-semibold flex items-center gap-2 text-sm">
                          <BadgeCheck className="w-4 h-4 text-white/80" /> Confianza Vita
                        </p>
                        <p className="mt-1 text-white/60 text-[12px]">
                          Pagos seguros y soporte dentro del ecosistema.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="rounded-[18px] border border-white/12 bg-black/25 backdrop-blur-2xl p-3">
                  {isService ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={onReserve}
                        disabled={!canReserve}
                        className={cn(
                          "h-11 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2",
                          "border border-white/18 bg-white/[0.08] hover:bg-white/[0.12] transition",
                          (!canReserve || isSubmitting) && "opacity-50 cursor-not-allowed"
                        )}
                        title={!canReserve && missingReason ? missingReason : "Reservar"}
                      >
                        <Calendar className="w-4 h-4" />
                        {isSubmitting ? "Reservando..." : "Reservar"}
                        <ArrowRight className="w-4 h-4 opacity-80" />
                      </button>

                      <button
                        onClick={onCancel}
                        disabled={!canCancel}
                        className={cn(
                          "h-11 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2",
                          "border border-white/18 bg-white/[0.04] hover:bg-white/[0.08] transition",
                          (!canCancel || isSubmitting) && "opacity-50 cursor-not-allowed"
                        )}
                        title={!canCancel ? "No hay reserva para cancelar" : "Cancelar"}
                      >
                        Cancelar
                        <ArrowRight className="w-4 h-4 opacity-80" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={onBuy}
                      className={cn(
                        "w-full h-11 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2",
                        "bg-white text-black hover:opacity-90 transition"
                      )}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar ahora
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className={cn(
                      "mt-2 w-full h-10 rounded-full text-sm",
                      "border border-white/14 bg-white/[0.05] hover:bg-white/[0.09] transition",
                      "text-white/80"
                    )}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">{label}</span>
      <div className="mt-2 relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60">
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-10 rounded-full pl-10 pr-4 text-sm",
            "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
            "text-white/90 placeholder:text-white/35 outline-none",
            "focus:border-white/28 focus:bg-white/[0.07] transition"
          )}
        />
      </div>
    </label>
  );
}
