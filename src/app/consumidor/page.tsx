"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  User,
} from "lucide-react";

type ListingType = "producto" | "servicio";

type Barber = {
  id: string;
  name: string;
  avatar: string;
  role?: string;
};

type Product = {
  id: string;
  type: ListingType;
  store: string;
  name: string;
  price: number;
  stock?: number;

  colors?: string[];
  sizes?: string[];

  barbers?: Barber[];
  timeSlots?: string[]; // lo dejamos por compatibilidad, pero el modal genera horarios cada hora

  desc: string;
  images: [string, string, string, string];
  featured?: boolean;
};

type Reservation = {
  id: string;
  fullName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:00
  serviceId: string;
  store: string;
  barberId: string;
};

const BARBERS: Barber[] = [
  {
    id: "b1",
    name: "Andrés",
    role: "Fade / Barba",
    avatar:
      "https://i.pinimg.com/1200x/70/e3/77/70e37705932f9f3be62832a170c1f119.jpg",
  },
  {
    id: "b2",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
];

// (ya no dependemos de esto para el modal)
// const TIME_SLOTS = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00"];

const MOCK9: Product[] = [
  {
    id: "S-001",
    type: "servicio",
    store: "Barbería Nova",
    name: "Corte de cabello hombre",
    price: 12.99,
    barbers: BARBERS,
    timeSlots: ["10:00", "11:00", "12:00"], // opcional
    desc: "Corte pro + acabado limpio. Reserva hora y elige tu barbero.",
    images: [
      "https://i.pinimg.com/736x/ab/ed/40/abed40014e7e3155724b4081c7241e46.jpg",
      "https://i.pinimg.com/1200x/6e/23/57/6e23579415c15ddacc8db335ee2e29ba.jpg",
      "https://i.pinimg.com/736x/bd/06/80/bd0680b0cfce5ed0e252ff4cbee61791.jpg",
      "https://i.pinimg.com/1200x/66/95/9d/66959d5e3fc21082c5d6abf1f55adbd0.jpg",
    ],
    featured: true,
  },
  {
    id: "P-002",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro. Acabado natural.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
  {
    id: "S-003",
    type: "servicio",
    store: "Barbería Nova",
    name: "Barba + Perfilado",
    price: 10,
    barbers: BARBERS,
    timeSlots: ["10:00", "11:00", "12:00"], // opcional
    desc: "Perfilado, toalla caliente y acabado fino. Reserva tu hora.",
    images: [
      "https://i.pinimg.com/736x/79/c2/96/79c2965dad68e117406a3299ec61a80f.jpg",
      "https://i.pinimg.com/736x/79/c2/96/79c2965dad68e117406a3299ec61a80f.jpg",
      "https://i.pinimg.com/736x/79/c2/96/79c2965dad68e117406a3299ec61a80f.jpg",
      "https://i.pinimg.com/736x/79/c2/96/79c2965dad68e117406a3299ec61a80f.jpg",
    ],
    featured: true,
  },
  {
    id: "P-004",
    type: "producto",
    store: "Barbería Nova",
    name: "Shampoo Barber Clean",
    price: 8.99,
    stock: 51,
    colors: ["—"],
    sizes: ["250ml"],
    desc: "Limpieza suave, aroma fresh. Ideal para uso diario.",
    images: [
      "https://i.pinimg.com/1200x/eb/bc/b4/ebbcb4a8eac3836bcec553bb74446303.jpg",
      "https://i.pinimg.com/1200x/eb/bc/b4/ebbcb4a8eac3836bcec553bb74446303.jpg",
      "https://i.pinimg.com/1200x/eb/bc/b4/ebbcb4a8eac3836bcec553bb74446303.jpg",
      "https://i.pinimg.com/1200x/eb/bc/b4/ebbcb4a8eac3836bcec553bb74446303.jpg",
    ],
  },
];

/* ---------------- RESERVAS HELPERS ---------------- */

const RES_KEY = "vita_reservations";

const todayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const makeReservationId = () =>
  `VITA-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

// ✅ genera horarios cada hora: 09:00 a 18:00 (endHour no incluido)
function generateHourlySlots(startHour = 9, endHour = 19) {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

function readReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(RES_KEY);
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

function writeReservations(list: Reservation[]) {
  localStorage.setItem(RES_KEY, JSON.stringify(list));
}

function isSlotTaken(params: {
  serviceId: string;
  date: string;
  time: string;
}) {
  const all = readReservations();
  return all.some(
    (r) =>
      r.serviceId === params.serviceId &&
      r.date === params.date &&
      r.time === params.time
  );
}

/* ---------------- PAGE ---------------- */

export default function Explorar() {
  const [selected, setSelected] = useState<Product | null>(null);
  const items = useMemo(() => MOCK9, []);

  return (
    <main className="min-h-screen overflow-x-hidden pb-36 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-market.png"
          alt="Marketplace background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div
          className="
            overflow-hidden rounded-[34px]
            bg-white/[0.06] backdrop-blur-md
            border border-white/14
            shadow-[0_30px_120px_rgba(0,0,0,0.45)]
          "
        >
          <div className="p-6 sm:p-8">
            <p
              className="
                inline-flex items-center gap-2
                text-[11px] uppercase tracking-[0.28em]
                border border-white/14
                bg-white/[0.05] backdrop-blur-md
                px-3 py-1.5 rounded-full
                text-white/70
              "
            >
              <Sparkles className="w-4 h-4 text-white/80" />
              Barbería • reservas & productos
            </p>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05]">
              BARBERÍA NOVA
            </h1>

            <p className="mt-4 text-white/75 max-w-2xl text-base sm:text-lg">
              Reserva tu hora con tu barbero favorito. Rápido, limpio, pro.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <ListingCard key={p.id} p={p} onOpen={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductGlassModal p={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function ListingCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const isService = p.type === "servicio";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      className="
        group text-left
        overflow-hidden rounded-[28px]
        bg-white/[0.06] backdrop-blur-md
        border border-white/14
        shadow-[0_22px_80px_rgba(0,0,0,0.35)]
        transition
      "
    >
      <div className="p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/12 bg-white/5">
          <img
            src={p.images[0]}
            alt={p.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75">
            {isService ? "Servicio • reserva" : "Producto"}
            {p.featured ? " • Featured" : ""}
          </span>

          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="
              absolute right-3 top-3 h-10 w-10 rounded-full
              border border-white/14 bg-white/[0.05] backdrop-blur-md
              text-white/70 hover:text-white
              transition flex items-center justify-center
            "
            aria-label="Guardar"
          >
            <Heart className="w-4 h-4" />
          </button>

          <div className="absolute left-3 bottom-3">
            <p className="text-white font-semibold text-base leading-tight">
              {p.name}
            </p>
            <p className="text-white/70 text-[12px] mt-0.5">{p.store}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-white font-semibold text-lg">
            ${p.price.toFixed(2)}
          </p>

          <span className="text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.04] text-white/70">
            {isService ? "Reservas" : `Stock: ${p.stock ?? 0}`}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {isService ? (
            <>
              <Tag label={`Barberos: ${(p.barbers ?? []).map((b) => b.name).join(", ")}`} />
              <Tag label="Horas: cada hora" />
            </>
          ) : (
            <>
              <Tag label={`Tallas: ${(p.sizes ?? []).join(", ")}`} />
              <Tag label={`Colores: ${(p.colors ?? []).join(", ")}`} />
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[12px] text-white/65 line-clamp-1">
            {p.desc}
          </span>
          <span className="text-white/80 text-sm font-semibold group-hover:translate-x-0.5 transition">
            Ver →
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ProductGlassModal({ p, onClose }: { p: Product; onClose: () => void }) {
  const isService = p.type === "servicio";

  const [idx, setIdx] = useState(0);

  const [barberId, setBarberId] = useState(p.barbers?.[0]?.id ?? "");

  // ✅ reserva fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(todayISO());

  // ✅ slots cada hora
  const hourlySlots = useMemo(() => generateHourlySlots(9, 19), [date]);

  const [slot, setSlot] = useState(hourlySlots[0] ?? "09:00");

  useEffect(() => {
    // si cambia la fecha, resetea a la primera hora disponible
    setSlot(hourlySlots[0] ?? "09:00");
  }, [date, hourlySlots]);

  const [size, setSize] = useState((p.sizes?.[0] ?? "") as string);
  const [color, setColor] = useState((p.colors?.[0] ?? "") as string);

  const next = () => setIdx((i) => (i + 1) % p.images.length);
  const prev = () => setIdx((i) => (i - 1 + p.images.length) % p.images.length);

  const selectedBarber = p.barbers?.find((b) => b.id === barberId);

  const emailOk = email.trim().includes("@") && email.trim().includes(".");
  const canReserve =
    !isService ||
    (fullName.trim().length >= 3 &&
      emailOk &&
      date.length === 10 &&
      slot.length === 5 &&
      !isSlotTaken({ serviceId: p.id, date, time: slot }));

  const onReserve = () => {
    if (!isService) return;
    if (!canReserve) return;

    const reservation: Reservation = {
      id: makeReservationId(),
      fullName: fullName.trim(),
      email: email.trim(),
      date,
      time: slot,
      serviceId: p.id,
      store: p.store,
      barberId,
    };

    const prevR = readReservations();
    writeReservations([reservation, ...prevR]);

    console.log("✅ Reserva creada:", reservation);
    onClose();
  };

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
          className="
            relative w-full max-w-5xl overflow-hidden rounded-[32px]
            bg-white/[0.06] backdrop-blur-md
            border border-white/14
            shadow-[0_40px_140px_rgba(0,0,0,0.65)]
          "
        >
          <div
            className="
              sticky top-0 z-20
              p-5 border-b border-white/10
              bg-white/[0.06] backdrop-blur-md
              flex items-center justify-between
            "
          >
            <div>
              <p className="text-white font-semibold text-lg">{p.name}</p>
              <p className="text-white/60 text-sm">
                {p.store} • {isService ? "Servicio" : "Producto"} • {p.id}
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                h-11 w-11 sm:h-11 sm:w-11 lg:h-12 lg:w-12
                rounded-full
                border border-white/14 bg-white/[0.05] backdrop-blur-md
                text-white/80 hover:text-white transition
                flex items-center justify-center
              "
              aria-label="Cerrar"
              title="Cerrar"
            >
              <X className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6">
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-[26px] border border-white/12 overflow-hidden bg-white/5">
                <img
                  src={p.images[idx]}
                  alt="product"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={prev}
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full
                    border border-white/14 bg-white/[0.05] backdrop-blur-md
                    text-white/75 hover:text-white transition
                    flex items-center justify-center
                  "
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full
                    border border-white/14 bg-white/[0.05] backdrop-blur-md
                    text-white/75 hover:text-white transition
                    flex items-center justify-center
                  "
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
                    className={`
                      aspect-[4/3] rounded-2xl overflow-hidden border transition
                      ${i === idx ? "border-white/35" : "border-white/12 hover:border-white/25"}
                    `}
                    aria-label={`Ver foto ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt="thumb"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[26px] border border-white/14 bg-white/[0.06] backdrop-blur-md p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-2xl tracking-tight">
                      ${p.price.toFixed(2)}
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

                <p className="mt-4 text-white/80 text-sm leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isService ? (
                    <>
                      <SelectPill
                        label="Barbero"
                        options={(p.barbers ?? []).map((b) => b.id)}
                        value={barberId}
                        onChange={setBarberId}
                        renderLabel={(id) => {
                          const b = p.barbers?.find((x) => x.id === id);
                          return b ? b.name : id;
                        }}
                      />

                      {/* ✅ hora cada hora + bloqueadas */}
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Hora
                        </span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {hourlySlots.map((t) => {
                            const taken = isSlotTaken({
                              serviceId: p.id,
                              date,
                              time: t,
                            });
                            const active = t === slot;

                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={taken}
                                onClick={() => setSlot(t)}
                                className={`
                                  px-3 py-1.5 rounded-full text-[12px] border transition backdrop-blur-md
                                  ${
                                    taken
                                      ? "border-white/10 bg-white/[0.03] text-white/30 cursor-not-allowed"
                                      : active
                                      ? "border-white/35 bg-white/[0.10] text-white"
                                      : "border-white/14 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/25"
                                  }
                                `}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </label>

                      {/* ✅ fecha */}
                      <label className="block sm:col-span-2">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          Fecha
                        </span>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="
                            mt-2 w-full h-11 px-4 rounded-full
                            bg-white/[0.06] border border-white/14
                            text-white/90
                            outline-none
                            focus:border-white/25
                            focus:shadow-[0_0_0_1px_rgba(255,255,255,0.18)]
                            transition
                          "
                        />
                      </label>

                      {/* ✅ nombre + correo */}
                      <GlassInput
                        label="Nombre completo"
                        value={fullName}
                        onChange={setFullName}
                        placeholder="Ej: Laura Front"
                      />
                      <GlassInput
                        label="Correo"
                        value={email}
                        onChange={setEmail}
                        placeholder="tucorreo@gmail.com"
                      />
                    </>
                  ) : (
                    <>
                      <SelectPill
                        label="Talla"
                        options={p.sizes ?? []}
                        value={size}
                        onChange={setSize}
                      />
                      <SelectPill
                        label="Color"
                        options={p.colors ?? []}
                        value={color}
                        onChange={setColor}
                      />
                    </>
                  )}
                </div>

                {isService && selectedBarber && (
                  <div className="mt-4 rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-md p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedBarber.avatar}
                        alt={selectedBarber.name}
                        className="h-10 w-10 rounded-full object-cover border border-white/12"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white/90">
                          {selectedBarber.name}{" "}
                          <span className="text-white/55 font-normal">
                            • {date} • {slot}
                          </span>
                        </p>
                        <p className="text-[12px] text-white/55">
                          {selectedBarber.role ?? "Barbero"}
                        </p>
                      </div>
                      <div className="ml-auto h-10 w-10 rounded-full grid place-items-center border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={isService ? onReserve : undefined}
                    disabled={isService ? !canReserve : false}
                    className="
                      flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full
                      border border-white/18
                      bg-white/[0.06] backdrop-blur-md
                      text-white/90 font-semibold
                      hover:bg-white/[0.10] hover:text-white
                      transition
                      disabled:opacity-45 disabled:cursor-not-allowed
                    "
                  >
                    <Calendar className="w-4 h-4" />
                    {isService ? "Reservar cita" : "Comprar ahora"}
                    <ArrowRight className="w-4 h-4 opacity-80" />
                  </button>

                  <button
                    disabled={isService}
                    className="
                      flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full
                      border border-white/14
                      bg-white/[0.05] backdrop-blur-md
                      text-white/85 font-semibold
                      hover:bg-white/[0.09] hover:text-white
                      transition
                      disabled:opacity-45 disabled:cursor-not-allowed
                    "
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Añadir al carrito
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-white/55">
                  {isService
                    ? "*Reserva guarda: nombre, correo, fecha, hora e id en localStorage (vita_reservations)."
                    : "*El carrito es MVP (local). Luego conectamos checkout."}
                </p>
              </div>

              <div className="rounded-[26px] border border-white/14 bg-white/[0.06] backdrop-blur-md p-5">
                <p className="text-white font-semibold">Confianza Vita</p>
                <p className="text-white/65 text-sm mt-1">
                  Verificación, reputación y soporte dentro del ecosistema.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Verificada</Pill>
                  <Pill>Pago seguro</Pill>
                  <Pill>Soporte</Pill>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="
                h-11 px-5 rounded-full
                border border-white/14
                bg-white/[0.05] backdrop-blur-md
                text-white/75 hover:text-white hover:bg-white/[0.08]
                transition
              "
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] border border-white/14 bg-white/[0.04] text-white/70">
      {label}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] border-white/14 bg-white/[0.05] backdrop-blur-md text-white/70">
      {children}
    </span>
  );
}

function GlassInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          mt-2 w-full h-11 px-4 rounded-full
          bg-white/[0.06] border border-white/14
          text-white/90 placeholder:text-white/35
          outline-none
          focus:border-white/25
          focus:shadow-[0_0_0_1px_rgba(255,255,255,0.18)]
          transition
        "
      />
    </label>
  );
}

function SelectPill({
  label,
  options,
  value,
  onChange,
  renderLabel,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  renderLabel?: (opt: string) => string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          const text = renderLabel ? renderLabel(opt) : opt;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`
                px-3 py-1.5 rounded-full text-[12px] border transition backdrop-blur-md
                ${
                  active
                    ? "border-white/35 bg-white/[0.10] text-white"
                    : "border-white/14 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/25"
                }
              `}
            >
              {text}
            </button>
          );
        })}
      </div>
    </label>
  );
}
