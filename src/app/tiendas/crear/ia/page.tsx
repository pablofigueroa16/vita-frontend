"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TYPES ================= */
type GeneratedStore = {
  name: string;
  handle: string;
  tagline: string;
  city: string;
  heroImage: string;
};

/* ================= MOCK IA ================= */
function generateBarberStore(prompt: string): GeneratedStore {
  const cityMatch = prompt.match(/en\s+([A-Za-zÀ-ÿ\s]{3,})/i);

  return {
    name: "Barbería Nova",
    handle: "barberia-nova",
    tagline: "Cortes limpios. Barba perfecta. Estilo Vita.",
    city: cityMatch?.[1] ?? "Tu ciudad",
    heroImage:
      "https://i.pinimg.com/736x/5e/26/3c/5e263c493aa22a8eaba0421568f307bb.jpg",
  };
}

/* ================= PAGE ================= */
export default function CrearConIA() {
  const router = useRouter();

  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [store, setStore] = React.useState<GeneratedStore | null>(null);

  const canCreate = input.trim().length > 6 && !loading;

  const onCreate = async () => {
    if (!canCreate) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    setStore(generateBarberStore(input));
    setLoading(false);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6">
      <section className="relative w-full max-w-[980px]">
        {/* halo suave */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.10),transparent_60%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* ===== TITLE ===== */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-white/95">
            Ahora cuéntame de tu tienda
          </h1>
          <p className="mt-3 text-white/55 max-w-xl">
            Describe tu negocio y deja que Vita cree la estructura inicial por ti.
          </p>

          {/* ===== INPUT GLASS ===== */}
          <div
            className={cn(
              "mt-10 w-full max-w-2xl",
              "rounded-[28px]",
              "border border-white/14",
              "bg-white/[0.06]",
              "backdrop-blur-md",
              "ring-1 ring-white/6",
              "shadow-[0_22px_90px_rgba(0,0,0,0.45)]"
            )}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {/* 🔍 LUPA GLASS */}
              <div
                className={cn(
                  "h-11 w-11 shrink-0 rounded-full grid place-items-center",
                  "border border-white/14",
                  "bg-white/[0.06] backdrop-blur-md",
                  "text-white/70",
                  "hover:bg-white/[0.10] hover:text-white",
                  "transition"
                )}
              >
                <SearchIcon />
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Ej: Quiero una barbería moderna en Medellín con servicios y productos premium…"
                className={cn(
                  "flex-1 resize-none bg-transparent outline-none",
                  "text-sm sm:text-base text-white/85",
                  "placeholder:text-white/35"
                )}
              />

              <button
                onClick={onCreate}
                disabled={!canCreate}
                className={cn(
                  "relative h-11 px-5 rounded-full",
                  "border border-white/14",
                  "bg-white/[0.06] backdrop-blur-md",
                  "text-sm font-semibold text-white/85",
                  canCreate
                    ? "hover:bg-white/[0.10] hover:border-sky-200/70 hover:text-white"
                    : "opacity-40 cursor-not-allowed",
                  "transition active:scale-[0.98]"
                )}
              >
                {loading ? "Creando…" : "Crear"}
              </button>
            </div>
          </div>

          {/* ===== RESULT ===== */}
          {store && (
            <div
              className={cn(
                "mt-12 w-full max-w-2xl overflow-hidden",
                "rounded-[30px]",
                "border border-white/14",
                "bg-white/[0.06]",
                "backdrop-blur-md",
                "ring-1 ring-white/6",
                "shadow-[0_22px_90px_rgba(0,0,0,0.45)]"
              )}
            >
              <div className="relative h-[220px]">
                <img
                  src={store.heroImage}
                  alt={store.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="text-xs tracking-widest text-white/60 uppercase">
                    {store.city}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-white">
                    {store.name}
                  </div>
                  <p className="mt-1 text-sm text-white/70">
                    {store.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 flex justify-between items-center">
                <div className="text-sm text-white/60">
                  Tu tienda inicial ya está lista.
                </div>

                {/* 🔥 RUTA CORRECTA */}
                <button
                  onClick={() => router.push("/tiendas/explorar")}
                  className={cn(
                    "h-11 px-6 rounded-full",
                    "border border-white/14",
                    "bg-white/[0.06] backdrop-blur-md",
                    "text-sm font-semibold text-white/85",
                    "hover:bg-white/[0.10] hover:border-sky-200/70 hover:text-white",
                    "transition"
                  )}
                >
                  Ir a explorar →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= ICON ================= */
function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
