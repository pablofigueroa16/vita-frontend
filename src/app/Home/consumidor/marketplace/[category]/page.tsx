"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  ShoppingBag,
  BadgeCheck,
  Sparkles,
  User,
  Mail,
} from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

/* ================= TOKENS UI ================= */
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= TYPES ================= */
type ListingType = "producto" | "servicio";

type Listing = {
  id: string;
  type: ListingType;
  category: string;
  store: string;
  name: string;
  price: number;
  stock?: number;
  desc: string;
  images: string[];
  featured?: boolean;

  // servicio
  barbers?: { id: string; name: string; role?: string; avatar: string }[];
};

/* ================= CATEGORY META ================= */
const CATEGORY_META: Record<
  string,
  { title: string; subtitle: string; hero: string; chip: string }
> = {
  belleza: {
    title: "VITA BEAUTY",
    subtitle: "Skincare, glow kits y servicios premium en estética glass.",
    chip: "Belleza • productos & servicios",
    hero: "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1600",
  },
  peluqueria: {
    title: "PELUQUERÍA NOVA",
    subtitle: "Cortes, color y styling con reserva rápida.",
    chip: "Peluquería • reservas & productos",
    hero: "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&w=1600",
  },
  barberia: {
    title: "BARBERÍA NOVA",
    subtitle: "Reserva tu hora con tu barbero favorito. Rápido, limpio, pro.",
    chip: "Barbería • reservas & productos",
    hero: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=1600",
  },
  fitness: {
    title: "FIT VITA",
    subtitle: "Wellness, rutinas y productos con checkout rápido.",
    chip: "Fitness • marketplace",
    hero: "https://images.pexels.com/photos/4753892/pexels-photo-4753892.jpeg?auto=compress&w=1600",
  },
  tech: {
    title: "TECH VITA",
    subtitle: "Gadgets, reviews y drops curados para creators.",
    chip: "Tech • marketplace",
    hero: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&w=1600",
  },
  productos: {
    title: "PRODUCTOS",
    subtitle: "Catálogo premium — compra en segundos dentro de Vita.",
    chip: "Productos • marketplace",
    hero: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=1600",
  },
};

/* ================= MOCK DATA (9 items por categoría) ================= */
const BARBERS = [
  {
    id: "b1",
    name: "Andrés",
    role: "Fade / Barba",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=400",
  },
  {
    id: "b2",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=400",
  },
];

function makeGrid9(category: string): Listing[] {
  const imgA = [
    "https://i.pinimg.com/1200x/6e/23/57/6e23579415c15ddacc8db335ee2e29ba.jpg",
    "https://i.pinimg.com/1200x/66/95/9d/66959d5e3fc21082c5d6abf1f55adbd0.jpg",
    "https://i.pinimg.com/736x/bd/06/80/bd0680b0cfce5ed0e252ff4cbee61791.jpg",
    "https://i.pinimg.com/736x/ab/ed/40/abed40014e7e3155724b4081c7241e46.jpg",
  ];

  const imgB = [
    "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
    "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=1200",
  ];

  const base: Listing[] = [
    {
      id: `${category}-S1`,
      type: "servicio",
      category,
      store: "Vita Studio",
      name: "Reserva premium",
      price: 12.99,
      barbers: BARBERS,
      desc: "Reserva pro + acabado limpio. Elige hora y especialista.",
      images: imgA,
      featured: true,
    },
    {
      id: `${category}-P2`,
      type: "producto",
      category,
      store: "Vita Store",
      name: "Producto top",
      price: 9.5,
      stock: 38,
      desc: "Edición curada — calidad premium dentro de Vita.",
      images: imgB,
    },
    {
      id: `${category}-S3`,
      type: "servicio",
      category,
      store: "Vita Studio",
      name: "Servicio express",
      price: 10.0,
      barbers: BARBERS,
      desc: "Rápido, limpio y listo. Reserva tu hora en 2 taps.",
      images: imgA.slice().reverse(),
      featured: true,
    },
    {
      id: `${category}-P4`,
      type: "producto",
      category,
      store: "Vita Store",
      name: "Pack premium",
      price: 18.99,
      stock: 51,
      desc: "Pack premium para elevar tu rutina diaria.",
      images: imgB.slice().reverse(),
    },
  ];

  const out: Listing[] = [];
  while (out.length < 9) {
    const i = out.length;
    const pick = base[i % base.length];
    out.push({
      ...pick,
      id: `${pick.id}-${i + 1}`,
      name: `${pick.name} #${i + 1}`,
      price:
        pick.price + (pick.type === "producto" ? (i % 3) * 1.25 : (i % 2) * 0.75),
      stock: pick.type === "producto" ? (pick.stock ?? 20) + i * 2 : undefined,
      featured: i % 3 === 0 ? true : pick.featured,
    });
  }
  return out;
}

/* ================= TIME SLOTS (cada hora) ================= */
function buildHourlySlots(startHour = 9, endHour = 19) {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    const hh = String(h).padStart(2, "0");
    slots.push(`${hh}:00`);
  }
  return slots;
}
const HOURLY_SLOTS = buildHourlySlots(9, 19);

/* ================= PAGE ================= */
export default function MarketplaceCategoryPage() {
  const params = useParams<{ category: string }>();
  const router = useRouter();
  const category = (params?.category ?? "productos").toString();

  const meta = CATEGORY_META[category] ?? CATEGORY_META["productos"];
  const items = React.useMemo(() => makeGrid9(category), [category]);

  const [selected, setSelected] = React.useState<Listing | null>(null);

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 pt-8 pb-44">
        {/* ===== HERO ===== */}
        <section className={cn("relative overflow-hidden rounded-[34px]", GLASS)}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[110px]" />
            <div className="absolute left-1/2 bottom-[-160px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]" />
          </div>

          <div className="relative">
            <img
              src={meta.hero}
              alt={meta.title}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

            <div className="relative p-7 sm:p-10">
              <button
                type="button"
                onClick={() => router.back()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 h-11",
                  "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                  "hover:bg-white/[0.09] hover:border-white/22 transition"
                )}
              >
                <ChevronLeft className="w-4 h-4 text-white/80" />
                <span className="text-sm font-semibold text-white/90">Volver</span>
              </button>

              <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/60 border border-white/14 bg-white/[0.05] px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-white/75" />
                {meta.chip}
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
                {meta.title}
              </h1>
              <p className="mt-3 text-white/65 max-w-2xl">{meta.subtitle}</p>
            </div>
          </div>
        </section>

        {/* ===== GRID 9 ===== */}
        <section className="mt-7">
          <div className={cn("rounded-[34px] p-4 sm:p-5", GLASS_SOFT)}>
            <div className="flex items-center justify-between gap-3 px-1">
              <p className="text-white/80 font-semibold">Feed • {meta.title}</p>
              <p className="text-[12px] text-white/55">9 items • click para ver</p>
            </div>

            <div className="mt-4 max-h-[calc(100dvh-320px)] overflow-auto pr-1 scrollbar-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p) => (
                  <ListingCard key={p.id} p={p} onOpen={() => setSelected(p)} />
                ))}
              </div>

              <div className="h-10" />
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductGlassModal
            p={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ================= CARD ================= */
function ListingCard({ p, onOpen }: { p: Listing; onOpen: () => void }) {
  const isService = p.type === "servicio";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      className={cn(
        "group text-left overflow-hidden rounded-[28px] border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
        "shadow-[0_22px_80px_rgba(0,0,0,0.35)]",
        HOVER_LED
      )}
    >
      <div className="p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/12 bg-white/5">
          <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <span className="absolute left-3 top-3 text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75">
            {isService ? "Servicio • reserva" : "Producto"}
            {p.featured ? " • Featured" : ""}
          </span>

          <div className="absolute right-3 top-3 h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md grid place-items-center text-white/75 group-hover:bg-white/[0.10] transition">
            <BadgeCheck className="w-4 h-4" />
          </div>

          <div className="absolute left-3 bottom-3">
            <p className="text-white font-semibold text-base leading-tight">{p.name}</p>
            <p className="text-white/70 text-[12px] mt-0.5">{p.store}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-white font-semibold text-lg">{money(p.price)}</p>

          <span className="text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/70">
            {isService ? "Reservas hoy" : `Stock: ${p.stock ?? 0}`}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[12px] text-white/65 line-clamp-2">{p.desc}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[12px] text-white/60">Ver →</span>
          <span className="text-[12px] text-white/45 group-hover:text-white/70 transition">
            {isService ? "Reservar" : "Comprar"}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ================= MODAL (CORREGIDO: navegar a la page de ticket) ================= */
function ProductGlassModal({ p, onClose }: { p: Listing; onClose: () => void }) {
  const router = useRouter(); // ✅ clave para navegar
  const isService = p.type === "servicio";
  const [idx, setIdx] = React.useState(0);

  // compra
  const [qty, setQty] = React.useState(1);

  // reserva
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState(() => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  });
  const [slot, setSlot] = React.useState(HOURLY_SLOTS[0]);
  const [barberId, setBarberId] = React.useState(p.barbers?.[0]?.id ?? "");

  const [booked, setBooked] = React.useState<Record<string, Set<string>>>({});
  const selectedBarber = p.barbers?.find((b) => b.id === barberId);

  const next = () => setIdx((i) => (i + 1) % p.images.length);
  const prev = () => setIdx((i) => (i - 1 + p.images.length) % p.images.length);

  const dayBooked = booked[date] ?? new Set<string>();

  function reserve() {
    if (!fullName.trim()) return alert("Escribe tu nombre completo.");
    if (!email.trim() || !email.includes("@")) return alert("Escribe un correo válido.");
    if (!date) return alert("Selecciona una fecha.");
    if (!slot) return alert("Selecciona una hora.");
    if (dayBooked.has(slot)) return alert("Esa hora ya está reservada. Elige otra.");

    setBooked((prevState) => {
      const copy: Record<string, Set<string>> = { ...prevState };
      const set = new Set(copy[date] ?? []);
      set.add(slot);
      copy[date] = set;
      return copy;
    });

    const code = `VITA-${Math.random().toString(16).slice(2, 6).toUpperCase()}-${Date.now()
      .toString()
      .slice(-4)}`;

    // ✅ en vez de modal confirm, redirige a la vista ticket
    const url =
      `/Home/consumidor/reserva-exitosa` +
      `?code=${encodeURIComponent(code)}` +
      `&name=${encodeURIComponent(fullName)}` +
      `&email=${encodeURIComponent(email)}` +
      `&date=${encodeURIComponent(date)}` +
      `&time=${encodeURIComponent(slot)}` +
      `&category=${encodeURIComponent(p.category)}` +
      `&service=${encodeURIComponent(p.name)}` +
      `&store=${encodeURIComponent(p.store)}` +
      `&barber=${encodeURIComponent(selectedBarber?.name ?? "—")}`;

    onClose();
    router.push(url);
  }

  function buy() {
    alert(`Compra MVP: ${p.name} x${qty} • ${money(p.price * qty)}`);
  }

  return (
    <motion.div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <div
          className={cn(
            "relative w-full max-w-5xl overflow-hidden rounded-[32px]",
            "bg-white/[0.06] backdrop-blur-2xl border border-white/14",
            "shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
          )}
        >
          {/* header */}
          <div className="sticky top-0 z-20 p-5 border-b border-white/10 bg-white/[0.06] backdrop-blur-2xl flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-lg">{p.name}</p>
              <p className="text-white/60 text-sm">
                {p.store} • {isService ? "Servicio" : "Producto"} • {p.id}
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/80 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6">
            {/* left - images */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-[26px] border border-white/12 overflow-hidden bg-white/5">
                <img src={p.images[idx]} alt="img" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="absolute left-3 bottom-3 text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75">
                  {idx + 1} / {p.images.length}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {p.images.map((src, i) => (
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

            {/* right - details */}
            <div className="space-y-4">
              <div className="rounded-[26px] border border-white/14 bg-white/[0.06] backdrop-blur-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-2xl tracking-tight">
                      {money(p.price)}
                    </p>
                    <p className="mt-1 text-white/65 text-sm">
                      {isService ? "Precio desde" : "Precio"}
                    </p>
                  </div>

                  {!isService && (
                    <span className="text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/70">
                      Stock: {p.stock ?? 0}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-white/80 text-sm leading-relaxed">{p.desc}</p>

                {isService ? (
                  <div className="mt-5 space-y-3">
                    {/* barbero */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        Especialista
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(p.barbers ?? []).map((b) => {
                          const active = b.id === barberId;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setBarberId(b.id)}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[12px] border transition backdrop-blur-md",
                                active
                                  ? "border-white/35 bg-white/[0.10] text-white"
                                  : "border-white/14 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/25"
                              )}
                            >
                              {b.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* fecha */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        Fecha
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={cn(
                            "h-11 flex-1 rounded-full px-4",
                            "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                            "text-white/90 outline-none",
                            "focus:border-white/28 focus:bg-white/[0.07] transition"
                          )}
                        />
                      </div>
                    </div>

                    {/* hora */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        Hora (cada hora)
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {HOURLY_SLOTS.map((t) => {
                          const active = t === slot;
                          const disabled = dayBooked.has(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={disabled}
                              onClick={() => setSlot(t)}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[12px] border transition backdrop-blur-md",
                                disabled
                                  ? "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
                                  : active
                                  ? "border-white/35 bg-white/[0.10] text-white"
                                  : "border-white/14 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/25"
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* nombre + correo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Nombre completo
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ej: Laura Front"
                            className={cn(
                              "h-11 flex-1 rounded-full px-4",
                              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                              "text-white/90 placeholder:text-white/35 outline-none",
                              "focus:border-white/28 focus:bg-white/[0.07] transition"
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Correo
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className={cn(
                              "h-11 flex-1 rounded-full px-4",
                              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                              "text-white/90 placeholder:text-white/35 outline-none",
                              "focus:border-white/28 focus:bg-white/[0.07] transition"
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={reserve}
                        className={cn(
                          "w-full h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                          "bg-white text-black hover:opacity-90 transition"
                        )}
                      >
                        <Calendar className="w-4 h-4" />
                        Reservar cita
                        <ArrowRight className="w-4 h-4 opacity-80" />
                      </button>
                      <p className="mt-3 text-[11px] text-white/55">
                        *Ahora te manda a /Home/consumidor/reserva-exitosa con el ticket.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                      <p className="text-white/80 text-sm">Cantidad</p>
                      <div className="flex items-center gap-2">
                        <button
                          className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] hover:bg-white/[0.10] transition"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-white font-semibold">
                          {qty}
                        </span>
                        <button
                          className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] hover:bg-white/[0.10] transition"
                          onClick={() => setQty((q) => q + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={buy}
                      className={cn(
                        "w-full h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                        "bg-white text-black hover:opacity-90 transition"
                      )}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar ahora • {money(p.price * qty)}
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-[26px] border border-white/14 bg-white/[0.06] backdrop-blur-2xl p-5">
                <p className="text-white font-semibold">Confianza Vita</p>
                <p className="text-white/65 text-sm mt-1">
                  Verificación, reputación y soporte dentro del ecosistema.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.05] text-[12px] text-white/70">
                    <BadgeCheck className="w-4 h-4" /> Verificada
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.05] text-[12px] text-white/70">
                    <ShoppingBag className="w-4 h-4" /> Pago seguro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="p-5 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="h-11 px-5 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.08] transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
