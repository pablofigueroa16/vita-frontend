"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function CrearTienda() {
  return (
    <main className="w-screen min-h-screen overflow-hidden text-white">
      <section className="relative w-screen min-h-screen">
        {/* CONTENT */}
        <div className="relative z-10 w-full min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-screen">
            {/* LEFT PANEL */}
            <div className="relative min-h-screen">
              <div className="absolute inset-0">
                <Image
                  src="/hand-card.png"
                  alt="Vita Card"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Fades */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black/85 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,transparent_28%,rgba(0,0,0,0.78)_78%)] opacity-70" />
              </div>

              {/* Label */}
              <div className="absolute left-8 top-8">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  VITA • SELLER
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative flex items-center">
              {/* subtle grid lines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.14]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:120px_120px]" />
              </div>

              <div className="relative w-full px-6 sm:px-10 lg:px-14 py-12">
                {/* BIG GLASS (ocupa más pantalla) */}
                <div
                  className={cn(
                    "relative mx-auto",
                    "w-full max-w-[860px]",
                    "rounded-[34px]",
                    "border border-white/14",
                    "bg-white/[0.06]",
                    "backdrop-blur-md", // ✅ base blur md como pides
                    "ring-1 ring-white/6",
                    "shadow-[0_26px_110px_rgba(0,0,0,0.55)]"
                  )}
                >
                  {/* ===== Banner-media dentro del glass (MISMA CARD) ===== */}
                  <div className="relative h-[160px] w-full overflow-hidden rounded-t-[34px]">
                    {/* Puedes cambiar esta imagen por algo más “Vita” */}
                    <img
                      src="https://i.pinimg.com/1200x/2e/d8/81/2ed8816dc0776c77de77ac6e5ecbb607.jpg"
                      alt="Vita background"
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/80" />

                    {/* Top row inside banner */}
                    <div className="absolute left-6 right-6 top-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-full grid place-items-center",
                            "border border-white/14 bg-white/[0.06] backdrop-blur-md",
                            "ring-1 ring-white/6 text-white/85"
                          )}
                        >
                          ✨
                        </div>
                        <div className="leading-tight">
                          <div className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                            VITA • SELLER
                          </div>
                          <div className="text-sm text-white/75">Crear tienda</div>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-1 text-[11px]",
                          "border border-white/14 bg-white/[0.06] backdrop-blur-md",
                          "text-white/75"
                        )}
                      >
                        Nuevo
                      </span>
                    </div>
                  </div>

                  {/* ===== Content ===== */}
                  <div className="px-6 sm:px-10 pt-8 pb-8">
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55 }}
                      className="
                        text-4xl sm:text-5xl lg:text-6xl
                        font-extrabold text-white
                        leading-[0.95]
                        tracking-tight
                      "
                    >
                      Crea tu tienda
                      <br />
                      hoy mismo
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.06 }}
                      className="
                        mt-4
                        text-base sm:text-lg
                        text-white/75
                        max-w-2xl
                        font-semibold
                        leading-relaxed
                      "
                    >
                      IA o Manual. Todo dentro del ecosistema Vita: tienda, catálogo,
                      pedidos y monetización.
                    </motion.p>

                    {/* ===== Feature list vertical (NO botones) ===== */}
                    <div
                      className={cn(
                        "mt-7",
                        "rounded-[26px]",
                        "border border-white/12",
                        "bg-white/[0.05]",
                        "backdrop-blur-md",
                        "ring-1 ring-white/5"
                      )}
                    >
                      <FeatureRow
                        icon="🛍️"
                        title="Marketplace"
                        desc="Crea tu catálogo y vende en Vita con checkout y stock."
                      />
                      <Divider />
                      <FeatureRow
                        icon="🧑‍🤝‍🧑"
                        title="Red social"
                        desc="Convierte contenido en ventas: posts, reels y etiquetas."
                      />
                      <Divider />
                      <FeatureRow
                        icon="💳"
                        title="Retira con Vita Card"
                        desc="Cobros y retiros más simples para sellers e influencers."
                      />
                    </div>

                    {/* ===== CTA buttons estilo carrusel (glass + LED hover) ===== */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      <GlassCtaPrimary href="/tiendas/crear/ia" icon>
                        Crear con IA
                      </GlassCtaPrimary>

                      <GlassCtaGhost href="/tiendas/crear/manual">
                        Crear manual
                      </GlassCtaGhost>

                      <GlassCtaGhost href="/tiendas/mis-tiendas">
                        Ver mis tiendas
                      </GlassCtaGhost>
                    </div>

                    {/* FOOT */}
                    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-[11px] text-white/45">
                        *Vita Card disponible para cobros
                      </span>
                      <span className="text-[11px] text-white/35">2025 • Vita</span>
                    </div>
                  </div>
                </div>
                {/* end glass */}
              </div>
            </div>
          </div>
          {/* end grid */}
        </div>
      </section>
    </main>
  );
}

/* ================= FEATURES (no botones) ================= */

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <div
        className={cn(
          "h-11 w-11 rounded-full grid place-items-center shrink-0",
          "border border-white/14 bg-white/[0.06] backdrop-blur-md",
          "ring-1 ring-white/6 text-white/85"
        )}
      >
        <span className="text-lg">{icon}</span>
      </div>

      <div className="min-w-0">
        <div className="text-sm font-semibold text-white/90">{title}</div>
        <div className="mt-1 text-sm text-white/60 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

/* ================= CTA Buttons (estilo carrusel) ================= */

function GlassCtaPrimary({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2",
        "h-14 px-8 rounded-full",
        "border border-white/14",
        "bg-white/[0.06] backdrop-blur-md",
        "text-white/90 transition",
        "hover:border-sky-200/70 hover:bg-white/[0.10] hover:text-white",
        "hover:shadow-[0_0_0_1px_rgba(147,197,253,0.55),0_18px_60px_rgba(0,0,0,0.45)]",
        "active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
      )}
    >
      {/* glow (LED) */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-1 rounded-full
          opacity-0 blur-2xl transition-opacity duration-200
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.30),transparent_60%)]
        "
      />
      <span className="relative z-10 font-semibold">{children}</span>
      {icon ? <ArrowRight className="relative z-10 w-5 h-5" /> : null}
    </Link>
  );
}

function GlassCtaGhost({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center",
        "h-14 px-8 rounded-full",
        "border border-white/12",
        "bg-white/[0.04] backdrop-blur-md",
        "text-white/80 transition",
        "hover:border-sky-200/60 hover:bg-white/[0.08] hover:text-white",
        "hover:shadow-[0_0_0_1px_rgba(147,197,253,0.35),0_14px_50px_rgba(0,0,0,0.35)]",
        "active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      )}
    >
      <span className="relative z-10 font-semibold">{children}</span>
    </Link>
  );
}
