"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Store,
  CalendarCheck,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Bienvenida a VITA",
    description:
      "Tu nueva forma de descubrir tiendas, reservar servicios y comprar sin fricción.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Reservas inteligentes",
    description:
      "Agenda citas en segundos con tus negocios favoritos, sin llamadas.",
    icon: CalendarCheck,
  },
  {
    id: 3,
    title: "Tiendas reales",
    description:
      "Explora productos y servicios verificados, con experiencias premium.",
    icon: Store,
  },
  {
    id: 4,
    title: "Vita Card",
    description:
      "Pagos rápidos, control total y beneficios exclusivos en un solo lugar.",
    icon: CreditCard,
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const Icon = step.icon;

  const cardClass =
    "relative overflow-hidden rounded-[36px] border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] px-10 py-14";

  const overlayClass =
    "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%)] pointer-events-none";

  const iconWrapperClass =
    "mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]";

  const buttonClass =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white/[0.08] border border-white/20 backdrop-blur-xl hover:bg-white/[0.14] transition";

  return (
    <main className="min-h-screen w-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center px-6">
      <div className="relative w-full max-w-4xl">
        <div className={cardClass}>
          <div aria-hidden className={overlayClass} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center"
            >
              <div className={iconWrapperClass}>
                <Icon className="h-9 w-9 text-white" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {step.title}
              </h1>

              <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 mt-14 flex items-center justify-between">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-all ${
                    i <= index ? "bg-white" : "bg-white/25"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                index < steps.length - 1
                  ? setIndex(index + 1)
                  : (window.location.href = "/")
              }
              className={buttonClass}
            >
              <span className="font-medium">
                {index === steps.length - 1 ? "Entrar a VITA" : "Continuar"}
              </span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
