"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= PAGE ================= */
export default function CrearTienda() {
  return (
    <main className="w-full min-h-screen text-white">
      <section className="relative min-h-screen flex items-center justify-center">
        {/* halo suave centrado */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="w-full max-w-screen-xl bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
        </div>

        {/* CONTENEDOR CENTRADO REAL */}
        <div className="relative z-10 w-full max-w-screen-xl px-8 flex justify-center">
          {/* ================= GLASS CARD ================= */}
          <div
            className={cn(
              "w-full max-w-[920px]",
              "rounded-[34px]",
              "border border-white/14",
              "bg-white/[0.06]",
              "backdrop-blur-md",
              "ring-1 ring-white/6",
              "shadow-[0_26px_110px_rgba(0,0,0,0.55)]",
              "overflow-hidden"
            )}
          >
            {/* ===== Banner editorial ===== */}
            <div className="relative h-[220px] w-full">
              <Image
                src="https://i.pinimg.com/736x/1e/3c/0e/1e3c0e9ffb1fef49267fe751c9b86548.jpg"
                alt="Vita Store"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85" />

              {/* etiqueta */}
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full grid place-items-center",
                    "border border-white/14 bg-white/[0.06] backdrop-blur-md",
                    "ring-1 ring-white/6 text-white/85"
                  )}
                >
                  <Sparkles className="h-5 w-5 text-cyan-200" />
                </div>

                <div className="leading-tight">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                    VITA • SELLER
                  </div>
                  <div className="text-sm text-white/75">
                    Crear tienda
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="px-6 sm:px-10 py-8 sm:py-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95 leading-[1.05]">
                Crea tu tienda en Vita
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl font-medium">
                Elige cómo empezar. Usa IA para lanzar rápido o crea tu tienda
                manualmente si quieres control total desde el primer producto.
              </p>

              {/* ===== CTA ===== */}
              <div className="mt-8 flex flex-wrap gap-4">
                <GlassPrimary href="/tiendas/crear/ia" icon>
                  Crear con IA
                </GlassPrimary>

                <GlassGhost href="/tiendas/crear/manual">
                  Crear manual
                </GlassGhost>
              </div>

              {/* footer */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                <Link
                  href="/tiendas/mis-tiendas"
                  className="text-sm text-white/65 hover:text-white transition"
                >
                  Ver mis tiendas →
                </Link>

                <span className="text-[11px] text-white/45">
                  2025 • Vita
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= CTA BUTTONS ================= */

function GlassPrimary({
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
      {icon && <ArrowRight className="relative z-10 w-5 h-5" />}
    </Link>
  );
}

function GlassGhost({
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
