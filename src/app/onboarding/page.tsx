'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Bienvenido a VITA',
    description:
      'Tu nueva forma de descubrir tiendas, reservar servicios y comprar sin fricción.',
    icon: '✨',
  },
  {
    title: 'Marketplace & Social',
    description:
      'Compra, mira reels, sigue creadores e interactúa con marcas reales.',
    icon: '🛍️',
  },
  {
    title: 'Identidad verificada',
    description:
      'Todos los usuarios y negocios pasan por verificación para tu seguridad.',
    icon: '🛡️',
  },
  {
    title: 'Vita Card',
    description:
      'Paga fácil, rápido y con beneficios exclusivos desde un solo lugar.',
    icon: '💳',
  },
];

export default function OnboardingPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = steps[step];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4 text-white">
      <div className="relative w-full max-w-xl">
        <div
          className="
            relative overflow-hidden rounded-[36px]
            border border-white/15
            bg-white/[0.08] backdrop-blur-2xl
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            px-10 py-14
          "
        >
          {/* Glow */}
          <div
            aria-hidden
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%)]
              pointer-events-none
            "
          />

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center"
            >
              {/* Icon */}
              <div
                className="
                  mx-auto mb-8 flex h-20 w-20 items-center justify-center
                  rounded-2xl border border-white/20
                  bg-white/[0.12] backdrop-blur-xl
                  shadow-[0_0_30px_rgba(255,255,255,0.15)]
                  text-4xl
                "
              >
                {current.icon}
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {current.title}
              </h1>

              <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="relative z-10 mt-14 flex items-center justify-between">
            {/* Progress */}
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-all ${
                    i <= step ? 'bg-white' : 'bg-white/25'
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {/* Back */}
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                disabled={step === 0}
                className={`
                  inline-flex items-center gap-2
                  rounded-full px-5 py-3
                  border border-white/20
                  bg-white/[0.06] backdrop-blur-xl
                  transition
                  ${
                    step === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-white/[0.12]'
                  }
                `}
              >
                <ArrowLeft className="h-5 w-5" />
                Atrás
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  step < steps.length - 1
                    ? setStep(step + 1)
                    : (window.location.href = '/login')
                }
                className="
                  group inline-flex items-center gap-2
                  rounded-full px-6 py-3
                  bg-white text-black font-medium
                  transition hover:bg-white/90
                "
              >
                {step === steps.length - 1 ? 'Entrar a VITA' : 'Siguiente'}
                {step === steps.length - 1 ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
