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

type Product = {
  id: string;
  type: ListingType;
  category: CategoryKey;
  store: string;
  name: string;
  price: number;
  stock?: number;
  desc: string;
  images: string[]; // 4 images
};

type CategoryKey =
  | "belleza"
  | "barberia"
  | "fitness"
  | "peluqueria"
  | "productos"
  | "tech";

type Reservation = {
  id: string;
  listingId: string;
  category: CategoryKey;
  listingName: string;
  fullName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  createdAt: number;
};

/* ================= TOKENS UI ================= */
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT =
  "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= DATA ================= */
// ✅ categorías válidas
const CATEGORY_LABEL: Record<CategoryKey, string> = {
  belleza: "Belleza",
  barberia: "Barbería",
  fitness: "Fitness",
  peluqueria: "Peluquería",
  productos: "Productos",
  tech: "Tech",
};

// ✅ define qué categorías son “servicio” (reserva) vs “producto”
const CATEGORY_DEFAULT_TYPE: Record<CategoryKey, ListingType> = {
  belleza: "servicio",
  barberia: "servicio",
  fitness: "servicio",
  peluqueria: "servicio",
  productos: "producto",
  tech: "producto",
};

// ✅ helper para slots cada hora (ej: 10:00 a 18:00)
function hourlySlots(startHour = 10, endHour = 18) {
  const out: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    const hh = String(h).padStart(2, "0");
    out.push(`${hh}:00`);
  }
  return out;
}

const DEFAULT_SLOTS = hourlySlots(10, 18);

// ✅ 9 items por categoría (cada uno tiene 4 imgs para el modal)
function seedItems(category: CategoryKey): Product[] {
  const type = CATEGORY_DEFAULT_TYPE[category];

  // imágenes bonitas (pexels) — puedes cambiarlas por tus assets
  const imgPool = {
    belleza: [
      "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&w=1200",
    ],
    barberia: [
      "https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3993315/pexels-photo-3993315.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&w=1200",
    ],
    peluqueria: [
      "https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3993321/pexels-photo-3993321.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3993445/pexels-photo-3993445.jpeg?auto=compress&w=1200",
    ],
    fitness: [
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&w=1200",
    ],
    productos: [
      "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&w=1200",
    ],
    tech: [
      "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1200",
      "https://images.pexels.com/photos/3829560/pexels-photo-3829560.jpeg?auto=compress&w=1200",
    ],
  }[category];

  const store =
    type === "servicio" ? `${CATEGORY_LABEL[category]} Studio` : `Vita ${CATEGORY_LABEL[category]}`;

  // 9 listings
  return Array.from({ length: 9 }).map((_, i) => ({
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
    images: [imgPool[0], imgPool[1], imgPool[2], imgPool[3]],
  }));
}

/* ================= LOCAL STORAGE ================= */
const LS_KEY = "vita_reservations_v1";

function loadReservations(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Reservation[];
  } catch {
    return [];
  }
}

function saveReservations(next: Reservation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(next));
}

/* ================= PAGE ================= */
export default function MarketplaceCategoryPage() {
  const params = useParams<{ category: string }>();
  const router = useRouter();

  const category = (params?.category ?? "productos") as CategoryKey;

  const isValid = (Object.keys(CATEGORY_LABEL) as CategoryKey[]).includes(category);

  React.useEffect(() => {
    if (!isValid) router.replace("/home");
  }, [isValid, router]);

  const items = React.useMemo(() => seedItems(category), [category]);

  const [selected, setSelected] = React.useState<Product | null>(null);

  return (
    <main className="min-h-[100dvh] text-white">
      {/* ✅ padding bottom grande para no tapar con dock */}
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-10 pb-44">
        {/* Top header */}
        <div className={cn(GLASS_SOFT, "rounded-[30px] p-6 sm:p-8 relative overflow-hidden")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.07] blur-[110px]" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Home • Marketplace
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                {CATEGORY_LABEL[category]}
              </h1>
              <p className="mt-2 text-white/60 text-sm max-w-2xl">
                Feed premium 3×3. Abre un item para {CATEGORY_DEFAULT_TYPE[category] === "servicio" ? "reservar por hora" : "comprar"}.
              </p>
            </div>

            <button
              onClick={() => router.push("/home")}
              className={cn(
                "h-11 px-5 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition text-white/85"
              )}
            >
              Volver
            </button>
          </div>
        </div>

        {/* Grid 3x3 */}
        <div className="mt-6 grid grid-cols-3 gap-3">
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

              {/* LED hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -left-10 -top-10 h-[160px] w-[160px] rounded-full bg-white/[0.12] blur-[55px]" />
                <div className="absolute right-[-60px] bottom-[-60px] h-[190px] w-[190px] rounded-full bg-white/[0.10] blur-[60px]" />
              </div>

              <div className="absolute left-3 bottom-3 right-3">
                <p className="text-white/90 font-semibold text-[13px] line-clamp-1">
                  {p.name}
                </p>
                <p className="text-white/55 text-[11px] line-clamp-1 mt-0.5">
                  {p.store}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <ListingModal
            listing={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </main>
  );
}

/* ================= MODAL ================= */
function ListingModal({
  listing,
  onClose,
}: {
  listing: Product;
  onClose: () => void;
}) {
  const isService = listing.type === "servicio";

  const [idx, setIdx] = React.useState(0);

  // Reserva fields
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const today = React.useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [date, setDate] = React.useState(today);
  const [time, setTime] = React.useState("10:00");

  // Product MVP qty
  const [qty, setQty] = React.useState(1);

  // Reservations
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  React.useEffect(() => {
    setReservations(loadReservations());
  }, []);

  const reservedTimesForDay = React.useMemo(() => {
    return new Set(
      reservations
        .filter(
          (r) =>
            r.listingId === listing.id &&
            r.date === date
        )
        .map((r) => r.time)
    );
  }, [reservations, listing.id, date]);

  const canReserve = React.useMemo(() => {
    if (!isService) return false;
    if (!fullName.trim()) return false;
    if (!email.trim()) return false;
    if (!date) return false;
    if (!time) return false;
    if (reservedTimesForDay.has(time)) return false;
    return true;
  }, [isService, fullName, email, date, time, reservedTimesForDay]);

  const onReserve = () => {
    if (!canReserve) return;

    const next: Reservation = {
      id: `r_${Math.random().toString(16).slice(2)}_${Date.now()}`,
      listingId: listing.id,
      category: listing.category,
      listingName: listing.name,
      fullName: fullName.trim(),
      email: email.trim(),
      date,
      time,
      createdAt: Date.now(),
    };

    const updated = [next, ...reservations];
    setReservations(updated);
    saveReservations(updated);

    onClose();
  };

  const onBuy = () => {
    // MVP: solo demo
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
            "relative w-full max-w-5xl overflow-hidden rounded-[32px]",
            "bg-white/[0.06] backdrop-blur-2xl border border-white/14",
            "shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
          )}
        >
          {/* header */}
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

          <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6">
            {/* left images */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-[26px] border border-white/12 overflow-hidden bg-white/5">
                <img
                  src={listing.images[idx]}
                  alt="image"
                  className="h-full w-full object-cover"
                />
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

            {/* right info */}
            <div className="space-y-4">
              <div className={cn("rounded-[26px] p-5", GLASS)}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-2xl tracking-tight">
                      ${listing.price.toFixed(2)}
                    </p>
                    <p className="mt-1 text-white/65 text-sm">
                      {isService ? "Precio por sesión" : "Precio"}
                    </p>
                  </div>

                  {!isService && (
                    <span className="text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/70">
                      Stock: {listing.stock ?? 0}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-white/80 text-sm leading-relaxed">
                  {listing.desc}
                </p>

                {/* SERVICE: Reserva */}
                {isService ? (
                  <div className="mt-5 space-y-4">
                    <Field
                      icon={User}
                      label="Nombre completo"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="Ej: Laura Frontvita"
                    />
                    <Field
                      icon={Mail}
                      label="Correo"
                      value={email}
                      onChange={setEmail}
                      placeholder="Ej: laura@email.com"
                      type="email"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Fecha
                        </span>
                        <input
                          type="date"
                          min={today}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={cn(
                            "mt-2 w-full h-11 rounded-full px-4",
                            "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                            "text-white/90 outline-none",
                            "focus:border-white/28 focus:bg-white/[0.07] transition"
                          )}
                        />
                      </label>

                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Hora (cada hora)
                        </span>
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
                                  "px-3 py-2 rounded-full text-[12px] border transition backdrop-blur-2xl",
                                  disabled
                                    ? "border-white/8 bg-white/[0.03] text-white/30 cursor-not-allowed"
                                    : active
                                    ? "border-white/32 bg-white/[0.10] text-white"
                                    : "border-white/12 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/22"
                                )}
                                title={disabled ? "Hora ocupada" : "Seleccionar"}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </label>
                    </div>

                    <button
                      onClick={onReserve}
                      disabled={!canReserve}
                      className={cn(
                        "mt-2 w-full h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                        "border border-white/18 bg-white/[0.06] backdrop-blur-2xl",
                        "hover:bg-white/[0.10] transition",
                        !canReserve && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Calendar className="w-4 h-4" />
                      Reservar cita
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>

                    <p className="text-[11px] text-white/55">
                      *MVP: reserva local (localStorage). Luego conectamos pagos/calendario.
                    </p>
                  </div>
                ) : (
                  /* PRODUCT: Comprar */
                  <div className="mt-5 space-y-4">
                    <div className={cn("rounded-[22px] p-4", GLASS_SOFT)}>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        Cantidad
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition"
                        >
                          -
                        </button>
                        <div className="h-11 px-5 rounded-full border border-white/12 bg-white/[0.05] grid place-items-center text-white/90 font-semibold">
                          {qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty((q) => q + 1)}
                          className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={onBuy}
                      className={cn(
                        "w-full h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                        "bg-white text-black hover:opacity-90 transition"
                      )}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar ahora
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>

                    <div className={cn("rounded-[22px] p-4", GLASS_SOFT)}>
                      <p className="text-white/85 font-semibold flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-white/80" /> Confianza Vita
                      </p>
                      <p className="mt-1 text-white/60 text-sm">
                        Pagos seguros y soporte dentro del ecosistema.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className={cn(
                  "h-11 w-full rounded-full",
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
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <div className="mt-2 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 rounded-full pl-11 pr-4",
            "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
            "text-white/90 placeholder:text-white/35 outline-none",
            "focus:border-white/28 focus:bg-white/[0.07] transition"
          )}
        />
      </div>
    </label>
  );
}
