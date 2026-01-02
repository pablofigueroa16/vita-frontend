"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  /* ================== VITA GLASS CLEAN (TOKENS) ================== */

  // Surface principal (clean)
  const card =
    "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

  // Overlay suave (no muy brillante)
  const glassOverlay =
    "absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),transparent_60%)]";

  // Badge / chip (clean)
  const chip =
    "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/55 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-lg";

  // Input glass limpio
  const glassInput =
    "w-full pl-10 pr-4 py-3 rounded-full bg-white/[0.05] backdrop-blur-lg border border-white/10 text-white/90 placeholder:text-white/40 outline-none transition focus:border-white/25";

  // Botón principal (sin blanco sólido)
  const glassButton =
    "group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/[0.08] backdrop-blur-lg border border-white/10 text-white/90 font-semibold transition active:scale-[0.98] hover:bg-white/[0.10] hover:border-white/20";

  // Botón secundario
  const glassButtonGhost =
    "group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/[0.05] backdrop-blur-lg border border-white/10 text-white/75 font-semibold transition active:scale-[0.98] hover:bg-white/[0.08] hover:border-white/20 hover:text-white";

  // Hover premium suave (no LED fuerte)
  const softGlowHover =
    "hover:shadow-[0_18px_70px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.10)]";

  /* ================== LAYOUT ================== */

  return (
    <main className="min-h-screen w-screen text-white">
      {/* fondo clean (glows muy sutiles) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-cyan-500/14 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-violet-600/16 blur-3xl" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <section className="min-h-screen flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`${card} w-full max-w-4xl grid grid-cols-1 md:grid-cols-2`}
        >
          {/* overlay */}
          <div aria-hidden className={glassOverlay} />

          {/* LEFT PANEL */}
          <div className="relative z-10 p-10 border-b md:border-b-0 md:border-r border-white/10">
            <div className={chip}>
              <span className="h-2 w-2 rounded-full bg-white/55" />
              VITA • ACCESS
            </div>

            <div className="mt-8 relative w-full h-[180px] sm:h-[220px]">
              <Image
                src="/vita-logo-blanco.png"
                alt="Logo Vita"
                fill
                priority
                className="object-contain"
              />
            </div>

            <h2 className="mt-8 text-2xl font-semibold tracking-tight">
              Bienvenido a VITA
            </h2>

            <p className="mt-2 text-white/70 max-w-sm leading-relaxed">
              Ingresa a tu cuenta y sigue explorando tiendas reales, ofertas y
              compras sin fricción.
            </p>

            <div className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur-lg p-4">
              <p className="text-[12px] text-white/70">
                *Tu sesión se mantiene segura con verificación Vita.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative z-10 p-10 flex items-center">
            <div className="w-full">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Start here
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
                Iniciar sesión
              </h1>

              <p className="mt-3 text-white/70 max-w-md">
                Accede a tu dashboard, tus compras y tu Vita Card.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* EMAIL */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className={glassInput}
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className={glassInput}
                  />
                </div>

                {/* ACTIONS */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="submit" className={`${glassButton} ${softGlowHover}`}>
                    <LogIn className="w-5 h-5" />
                    Entrar
                  </button>

                  <button type="button" className={`${glassButtonGhost} ${softGlowHover}`}>
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </button>
                </div>
              </form>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <p className="text-sm text-white/70">
                  ¿No tienes cuenta?{" "}
                  <span className="text-white/90 hover:underline cursor-pointer">
                    Crear una
                  </span>
                </p>
                <span className="text-[11px] text-white/45">Vita • 2025</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
