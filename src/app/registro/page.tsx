"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, LogIn, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  /* ================== VITA GLASS CLEAN ================== */

  const card =
    "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] backdrop-blur-3xl " +
    "shadow-[0_18px_70px_rgba(0,0,0,0.34)] w-full max-w-5xl " +
    "md:h-[540px] md:grid md:grid-cols-2";

  const glassOverlay =
    "absolute inset-0 pointer-events-none " +
    "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),transparent_60%)]";

  const glassSheen =
    "absolute -inset-24 pointer-events-none opacity-60 " +
    "bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_55%)]";

  const chip =
    "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/55 " +
    "border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl";

  const glassInput =
    "w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.045] backdrop-blur-2xl " +
    "border border-white/10 text-white/90 placeholder:text-white/40 outline-none transition " +
    "focus:border-white/25";

  const primaryButton =
    "group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full " +
    "bg-white/[0.10] backdrop-blur-2xl border border-white/15 text-white/95 font-semibold " +
    "transition active:scale-[0.98] hover:bg-white/[0.12] hover:border-white/25";

  const secondaryButton =
    "group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full " +
    "bg-white/[0.045] backdrop-blur-2xl border border-white/10 text-white/75 font-semibold " +
    "transition active:scale-[0.98] hover:bg-white/[0.08] hover:border-white/20 hover:text-white";

  /* ================== STATE ================== */

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );
  const passValid = useMemo(() => pass.trim().length >= 6, [pass]);
  const canSubmit = emailValid && passValid && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
  };

  return (
    <main className="min-h-screen w-screen text-white">
      {/* Fondo general */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <section className="min-h-screen flex items-center justify-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={card}
        >
          <div aria-hidden className={glassOverlay} />
          <div aria-hidden className={glassSheen} />

          {/* ================= LEFT: LOGO + GIF LIMPIO ================= */}
          <div className="relative z-10 border-b md:border-b-0 md:border-r border-white/10">
            <div className="h-full p-6 md:p-8 flex flex-col">
              {/* logo */}
              <div className="flex items-center gap-3">
                <Image
                  src="/vita-logo-blanco.png"
                  alt="Vita"
                  width={36}
                  height={36}
                />
                <span className="text-sm font-semibold tracking-tight">
                  VITA
                </span>
              </div>

              {/* etiqueta */}
              <div className="mt-4">
                <div className={chip}>
                  <span className="h-2 w-2 rounded-full bg-white/50" />
                  PLATAFORMA TODO-EN-UNO
                </div>
              </div>

              {/* GIF TUTORIAL – SIN FONDO */}
              <div className="mt-6 flex-1 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/KYC.gif" // 👈 tu gif real
                    alt="Vita tutorial"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mt-4 text-[11px] text-white/60">
                Cambia entre <span className="text-white/80">Influencer</span> y{" "}
                <span className="text-white/80">Vendedor</span> desde un solo
                ecosistema.
              </p>
            </div>
          </div>

          {/* ================= RIGHT: FORM ================= */}
          <div className="relative z-10">
            <div className="h-full flex flex-col justify-center p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Acceso
              </p>

              <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.05]">
                Iniciar sesión
              </h1>

              <p className="mt-2 text-white/70 text-sm">
                Compra, vende y crea comunidad dentro de Vita.
              </p>

              {/* confianza */}
              <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-white/70">
                <span className="h-7 w-7 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-2xl flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white/80" />
                </span>
                <span>Identidad verificada · Pagos protegidos</span>
              </div>

              <form className="mt-5 space-y-3" onSubmit={onSubmit}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className={glassInput}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Contraseña"
                    className={glassInput}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[11px] text-white/60 hover:text-white/85 hover:underline transition"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    className={primaryButton}
                    disabled={!canSubmit}
                  >
                    <LogIn className="w-5 h-5" />
                    {loading ? "Entrando..." : "Entrar"}
                  </button>

                  <button type="button" className={secondaryButton}>
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </button>
                </div>

                <p className="pt-2 text-[11px] text-white/60">
                  Al continuar aceptas Términos y Privacidad.
                </p>
              </form>

              <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between">
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
