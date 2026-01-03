"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  /* ================== VITA GLASS CLEAN (TOKENS) ================== */

  const card =
    "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

  const glassOverlay =
    "absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),transparent_60%)]";

  const chip =
    "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/55 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-lg";

  const glassInputBase =
    "w-full pl-10 pr-12 py-3 rounded-full bg-white/[0.05] backdrop-blur-lg border text-white/90 placeholder:text-white/40 outline-none transition focus:border-white/25";

  /* 🔵 BOTÓN PRINCIPAL – AZUL VITA */
  const glassButtonPrimary =
    "group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full " +
    "bg-white/[0.08] backdrop-blur-lg border border-white/15 text-white/95 font-semibold " +
    "transition-all duration-200 active:scale-[0.98] " +
    "hover:bg-cyan-500/15 hover:border-cyan-400/40 " +
    "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_18px_60px_rgba(34,211,238,0.25)] " +
    "disabled:opacity-45 disabled:cursor-not-allowed";

  const glassButtonGhost =
    "group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/[0.05] backdrop-blur-lg border border-white/10 text-white/75 font-semibold transition active:scale-[0.98] hover:bg-white/[0.08] hover:border-white/20 hover:text-white disabled:opacity-45 disabled:cursor-not-allowed";

  const errorText = "mt-1 text-[11px] text-red-400";
  const errorInputBorder = "border-red-500/55 focus:border-red-500/70";

  const formErrorRow =
    "mt-2 rounded-[22px] border border-red-500/35 bg-red-500/10 backdrop-blur-lg px-3.5 py-3 text-[11px] text-red-300 flex items-start gap-2";

  /* ================== STATE + VALIDATIONS ================== */

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({ email: false, pass: false });
  const [formError, setFormError] = useState("");

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );
  const passValid = useMemo(() => pass.trim().length >= 6, [pass]);

  const emailError =
    touched.email && !emailValid ? "Ingresa un correo válido." : "";
  const passError =
    touched.pass && !passValid ? "La contraseña debe tener mínimo 6 caracteres." : "";

  const canSubmit = emailValid && passValid && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setTouched({ email: true, pass: true });

    if (!emailValid || !passValid) {
      setFormError("Revisa los campos marcados en rojo para continuar.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      console.log("LOGIN:", { email, pass });
    } catch {
      setFormError("No pudimos iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /* ================== LAYOUT ================== */

  return (
    <main className="min-h-screen w-screen text-white">
      {/* fondo */}
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
          <div aria-hidden className={glassOverlay} />

          {/* LEFT */}
          <div className="relative z-10 p-10 border-b md:border-b-0 md:border-r border-white/10">
            <div className={chip}>
              <span className="h-2 w-2 rounded-full bg-white/55" />
              VITA • ACCESS
            </div>

            <div className="mt-8 relative w-full h-[200px]">
              <Image
                src="/vita-logo-blanco.png"
                alt="Logo Vita"
                fill
                priority
                className="object-contain"
              />
            </div>

            <h2 className="mt-8 text-2xl font-semibold">Bienvenido a VITA</h2>
            <p className="mt-2 text-white/70 max-w-sm">
              Ingresa a tu cuenta y sigue explorando el ecosistema Vita.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative z-10 p-10 flex items-center">
            <div className="w-full">
              <h1 className="text-3xl font-semibold">Iniciar sesión</h1>

              <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
                {/* EMAIL */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      placeholder="Correo electrónico"
                      className={`${glassInputBase} ${
                        emailError ? errorInputBorder : "border-white/10"
                      }`}
                    />
                  </div>
                  {emailError && <p className={errorText}>{emailError}</p>}
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/55" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, pass: true }))}
                      placeholder="Contraseña"
                      className={`${glassInputBase} ${
                        passError ? errorInputBorder : "border-white/10"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/10 bg-white/[0.05] text-white/70 hover:text-white"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passError && <p className={errorText}>{passError}</p>}
                </div>

                {formError && (
                  <div className={formErrorRow}>
                    <AlertCircle size={16} />
                    {formError}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={glassButtonPrimary}
                  >
                    <LogIn size={18} />
                    {loading ? "Entrando..." : "Entrar"}
                  </button>

                  <button type="button" className={glassButtonGhost}>
                    <FcGoogle size={18} />
                    Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
