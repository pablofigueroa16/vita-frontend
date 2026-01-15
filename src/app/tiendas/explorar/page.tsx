"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
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

/* ================= TYPES ================= */

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
  timeSlots?: string[];
  desc: string;
  images: [string, string, string, string];
  featured?: boolean;
};

/* ================= MOCK DATA ================= */

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

   {
    id: "b3",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b4",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b5",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b6",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b7",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b8",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
   {
    id: "b9",
    name: "Mateo",
    role: "Clásico / Diseño",
    avatar:
      "https://i.pinimg.com/1200x/94/45/2c/94452ccca5882b26dfa48bed590a0775.jpg",
  },
];

const TIME_SLOTS = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00"];

const MOCK9: Product[] = [
  {
    id: "S-001",
    type: "servicio",
    store: "Barbería Nova",
    name: "Corte de cabello hombre",
    price: 12.99,
    barbers: BARBERS,
    timeSlots: TIME_SLOTS,
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
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-003",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-004",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-005",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-006",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-008",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-009",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
    {
    id: "P-0010",
    type: "producto",
    store: "Barbería Nova",
    name: "Pomada Matte Pro",
    price: 9.5,
    stock: 38,
    colors: ["Black", "Cyan"],
    sizes: ["100ml", "200ml"],
    desc: "Pomada matte para peinados con fijación pro.",
    images: [
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
      "https://i.pinimg.com/736x/e2/0d/62/e20d627af1de82c7287910f47d640e40.jpg",
    ],
  },
];

/* ================= PAGE ================= */

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
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div className="overflow-hidden rounded-[34px] bg-white/[0.06] backdrop-blur-md border border-white/14 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] border border-white/14 bg-white/[0.05] px-3 py-1.5 rounded-full text-white/70">
              <Sparkles className="w-4 h-4" />
              Barbería • reservas & productos
            </p>

            <h1 className="mt-6 text-4xl font-semibold">BARBERÍA NOVA</h1>
            <p className="mt-4 text-white/75 max-w-2xl">
              Reserva tu hora con tu barbero favorito.
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

function ListingCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const isService = p.type === "servicio";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      className="group cursor-pointer overflow-hidden rounded-[28px] bg-white/[0.06] backdrop-blur-md border border-white/14 shadow-[0_22px_80px_rgba(0,0,0,0.35)]"
    >
      <div className="p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/12">
          <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />

          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 top-3 h-10 w-10 rounded-full border border-white/14 bg-white/[0.05] flex items-center justify-center"
          >
            <Heart className="w-4 h-4" />
          </button>

          <div className="absolute left-3 bottom-3">
            <p className="font-semibold">{p.name}</p>
            <p className="text-xs text-white/70">{p.store}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <p className="font-semibold">${p.price.toFixed(2)}</p>
          <span className="text-xs text-white/70">
            {isService ? "Reservas" : `Stock: ${p.stock ?? 0}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MODAL ================= */

function ProductGlassModal({
  p,
  onClose,
}: {
  p: Product;
  onClose: () => void;
}) {
  return (
    <motion.div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-4xl rounded-[32px] bg-white/[0.06] backdrop-blur-md border border-white/14 p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/14 flex items-center justify-center"
          >
            <X />
          </button>

          <p className="text-xl font-semibold">{p.name}</p>
          <p className="text-white/70">{p.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
