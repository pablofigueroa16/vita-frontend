"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function FadeSlide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${className}`}
    >
      {children}
    </div>
  );
}

const categories: { label: string; emoji: string }[] = [
  { label: "Electrónica & Gadgets", emoji: "💻" },
  { label: "Belleza & Cuidado personal", emoji: "💅" },
  { label: "Hogar & Decoración", emoji: "🏠" },
  { label: "Deportes & Fitness", emoji: "🎾" },
  { label: "Supermercado & Gourmet", emoji: "🥑" },
  { label: "Joyería & Relojes", emoji: "💍" },
  { label: "Viajes & Experiencias", emoji: "✈️" },
  { label: "Software & Servicios Digitales", emoji: "📊" },
  { label: "Educación & Cursos", emoji: "📚" },
  { label: "Mascotas", emoji: "🐶" },
  { label: "Bebés & Maternidad", emoji: "🧒" },
  { label: "Arte & Coleccionables", emoji: "🎨" },
  { label: "Bienes Raíces", emoji: "🏢" },
];

const budgetOptions = [
  "< US$50",
  "US$50–150",
  "US$150–500",
  "US$500–2,000",
];

// Nueva lista de prioridades (vista posterior al presupuesto)
const prioritiesOptions: { label: string; icon: string }[] = [
  { label: "Precio bajo / Descuentos", icon: "🏷️" },
  { label: "Envíos rápidos", icon: "📦" },
  { label: "Tiendas Verificadas", icon: "✅" },
  { label: "Pagos en criptomonedas", icon: "🪙" },
  { label: "Pagos con tarjeta / Apple & Google Pay", icon: "💳" },
  { label: "Marcas Globales", icon: "®" },
  { label: "Sostenibilidad / Materiales ECO", icon: "♻️" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [prioritiesSelected, setPrioritiesSelected] = useState<string[]>([]);
  const router = useRouter();

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const getTheme = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    setTheme(getTheme());
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const logoSrc = useMemo(() => (theme === 'light' ? '/vita-logo-negro.png' : '/vita-logo-blanco.png'), [theme]);

  const progress = useMemo(() => (step === 0 ? 35 : step === 1 ? 70 : step === 2 ? 90 : step === 3 ? 95 : 100), [step]);

  // Redirección automática en el último paso (mantiene fidelidad visual)
  useEffect(() => {
    if (step === 4) {
      const t = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [step, router]);

  // Confeti espectacular y optimizado para reemplazar imágenes estáticas
  useEffect(() => {
    if (step !== 4) return;

    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = typeof window !== "undefined" && 
      window.matchMedia && 
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleared = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    (async () => {
      try {
        const mod = await import("canvas-confetti");
        const confetti = mod.default;
        
        if (cleared) return;

        const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
        const scalar = isMobile ? 1.0 : 1.4;

        // Colores vibrantes que coinciden con el tema
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#A8E6CF', '#FF8A80'];

        if (prefersReducedMotion) {
          // Versión sutil para usuarios con preferencia de movimiento reducido
          confetti({
            particleCount: 30,
            spread: 45,
            origin: { y: 0.6 },
            scalar: scalar * 0.7,
            zIndex: 9999,
            colors,
            gravity: 0.5,
            ticks: 120
          });
        } else {
          // Versión completa para usuarios sin restricciones de movimiento
          
          // 1. Estallido central espectacular
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            scalar,
            zIndex: 9999,
            colors,
            shapes: ['square', 'circle'],
            gravity: 0.8,
            drift: 0.2,
            ticks: 250
          });

          // 2. Estallidos desde las esquinas superiores
          timeoutIds.push(setTimeout(() => {
            if (cleared) return;
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { x: 0.1, y: 0.2 },
              scalar,
              zIndex: 9999,
              colors,
              gravity: 0.7,
              ticks: 200,
              angle: 45
            });
          }, 200));

          timeoutIds.push(setTimeout(() => {
            if (cleared) return;
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { x: 0.9, y: 0.2 },
              scalar,
              zIndex: 9999,
              colors,
              gravity: 0.7,
              ticks: 200,
              angle: 135
            });
          }, 400));

          // 3. Lluvia de confeti desde arriba
          timeoutIds.push(setTimeout(() => {
            if (cleared) return;
            confetti({
              particleCount: 100,
              spread: 120,
              origin: { y: 0.1 },
              scalar,
              zIndex: 9999,
              colors,
              gravity: 0.6,
              ticks: 300
            });
          }, 600));

          // 4. Stream lateral continuo más intenso
          const duration = 2500;
          const animationEnd = Date.now() + duration;
          const defaults = { 
            startVelocity: 35, 
            ticks: 150, 
            spread: 70, 
            scalar, 
            zIndex: 9999,
            colors,
            gravity: 0.8
          } as const;

          intervalId = setInterval(() => {
            if (cleared) return;
            
            confetti({
              ...defaults,
              particleCount: 25,
              angle: 60,
              origin: { x: 0, y: 0.7 },
            });
            
            confetti({
              ...defaults,
              particleCount: 25,
              angle: 120,
              origin: { x: 1, y: 0.7 },
            });

            if (Math.random() > 0.7) {
              confetti({
                ...defaults,
                particleCount: 15,
                angle: 90,
                origin: { x: 0.5, y: 0.1 },
                spread: 40
              });
            }

            if (Date.now() > animationEnd && intervalId) {
              clearInterval(intervalId);
              intervalId = null;
              try {
                 const confettiInstance = confetti as { reset?: () => void };
                 confettiInstance.reset?.();
               } catch {
                  // Silently handle cleanup
                }
            }
          }, 150);

          // 5. Efecto final de celebración
          timeoutIds.push(setTimeout(() => {
            if (cleared) return;
            confetti({
              particleCount: 200,
              spread: 100,
              origin: { y: 0.6 },
              scalar: scalar * 1.2,
              zIndex: 9999,
              colors,
              shapes: ['square', 'circle'],
              gravity: 0.9,
              ticks: 300
            });
          }, 1000));
        }

      } catch {
          // Silently handle errors in production
        }
    })();

    return () => {
      cleared = true;
      if (intervalId) clearInterval(intervalId);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [step]);
  const toggle = (label: string) => {
    setSelected((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
        <Image
          src={logoSrc}
          alt="VITA"
          width={220}
          height={80}
          priority
          className="h-32 w-auto opacity-90"
        />

        {step === 0 ? (
          <FadeSlide key="step-0" className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-text-strong">
              Gracias por unirte. En VITA todos somos 100% verificados (KYC/KYB) para compras seguras, pagos
              cripto/fiat y mejores ofertas.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-text-secondary">Personalicemos tu experiencia en 15 segundos.</p>

            <div className="mt-6 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-text-on-primary text-sm font-medium px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Comenzar
              </button>
            </div>
          </FadeSlide>
        ) : step === 1 ? (
          <FadeSlide key="step-1" className="w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-strong">
              ¿Qué categorías te interesan? <span className="text-text-secondary text-lg sm:text-xl">(multi-select, chips)</span>
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {categories.map((c) => {
                const active = selected.includes(c.label);
                return (
                  <button
                    key={c.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(c.label)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-800 ${
                      active
                        ? "bg-primary-700/15 border-primary-400 text-primary-100"
                        : "border-border-subtle text-text-strong hover:bg-bg-hover"
                    }`}
                  >
                    <span className="text-base leading-none">{c.emoji}</span>
                    <span className="whitespace-nowrap">{c.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 sm:mt-16 w-full max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary mb-2">Tu progreso...</p>
              <div className="h-3 w-full rounded-full bg-black/80 dark:bg-black overflow-hidden border border-border-subtle">
                <div
                  className="h-full bg-gradient-to-r from-sky-300 via-primary-500 to-black transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex items-center justify-center rounded-lg border border-border-subtle text-sm font-medium text-text-secondary hover:bg-bg-hover px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-text-on-primary text-sm font-medium px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Siguiente
              </button>
            </div>
          </FadeSlide>
        ) : step === 2 ? (
          <FadeSlide key="step-2" className="w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-strong">
              ¿Cuál es tu presupuesto promedio por compra? <span className="text-text-secondary text-lg sm:text-xl">(single-select, chips)</span>
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {budgetOptions.map((label) => {
                const active = budget === label;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setBudget(active ? null : label)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-800 ${
                      active
                        ? "bg-primary-700/15 border-primary-400 text-primary-100"
                        : "border-border-subtle text-text-strong hover:bg-bg-hover"
                    }`}
                  >
                    <span className="text-base leading-none">💰</span>
                    <span className="whitespace-nowrap">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 sm:mt-16 w-full max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary mb-2">Tu progreso...</p>
              <div className="h-3 w-full rounded-full bg-black/80 dark:bg-black overflow-hidden border border-border-subtle">
                <div
                  className="h-full bg-gradient-to-r from-sky-300 via-primary-500 to-black transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center rounded-lg border border-border-subtle text-sm font-medium text-text-secondary hover:bg-bg-hover px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Atrás
              </button>
              <button
                type="button"
                disabled={!budget}
                onClick={() => budget && setStep(3)}
                className={`inline-flex items-center justify-center rounded-lg text-sm font-medium px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  budget
                    ? "bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-text-on-primary"
                    : "bg-bg-700/40 text-text-secondary cursor-not-allowed"
                }`}
              >
                Continuar
              </button>
            </div>
          </FadeSlide>
        ) : step === 3 ? (
          <FadeSlide key="step-3" className="w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-strong">
              ¿Qué priorizas al comprar? <span className="text-text-secondary text-lg sm:text-xl">(elige hasta 2, chips)</span>
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {prioritiesOptions.map((opt) => {
                const active = prioritiesSelected.includes(opt.label);
                const reachedMax = !active && prioritiesSelected.length >= 2;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={active}
                    aria-disabled={reachedMax}
                    onClick={() => {
                      setPrioritiesSelected((prev) => {
                        if (prev.includes(opt.label)) return prev.filter((l) => l !== opt.label);
                        if (prev.length >= 2) return prev; // limita a 2
                        return [...prev, opt.label];
                      });
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-800 ${
                      active
                        ? "bg-primary-700/15 border-primary-400 text-primary-100"
                        : reachedMax
                        ? "border-border-subtle text-text-secondary opacity-60 cursor-not-allowed"
                        : "border-border-subtle text-text-strong hover:bg-bg-hover"
                    }`}
                  >
                    <span className="text-base leading-none">{opt.icon}</span>
                    <span className="whitespace-nowrap">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 sm:mt-16 w-full max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary mb-2">Tu progreso...</p>
              <div className="h-3 w-full rounded-full bg-black/80 dark:bg-black overflow-hidden border border-border-subtle">
                <div
                  className="h-full bg-gradient-to-r from-sky-300 via-primary-500 to-black transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center rounded-lg border border-border-subtle text-sm font-medium text-text-secondary hover:bg-bg-hover px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Atrás
              </button>
              <button
                type="button"
                disabled={prioritiesSelected.length === 0}
                onClick={() => setStep(4)}
                className={`inline-flex items-center justify-center rounded-lg text-sm font-medium px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                   prioritiesSelected.length > 0
                     ? "bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-text-on-primary"
                     : "bg-bg-700/40 text-text-secondary cursor-not-allowed"
                 }`}
               >
                 Continuar
               </button>
             </div>
           </FadeSlide>
        ) : (
          <FadeSlide key="step-4" className="w-full">
            <div className="relative overflow-visible">
              {/* Área para confeti animado - reemplaza las imágenes estáticas */}
              <div className="absolute inset-0 pointer-events-none" id="confetti-container" />
            </div>
            <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-semibold text-text-strong mt-2">
              Serás redirigido en minutos al home.
            </h2>
            <p className="relative z-10 mt-3 text-lg sm:text-xl md:text-2xl text-text-strong max-w-3xl mx-auto">
              Disfruta de una nueva experiencia de compra donde tú como cliente eres nuestra prioridad.
            </p>
            {/* Mensaje y progreso */}
            <div className="relative mt-14 sm:mt-16 w-full max-w-3xl mx-auto overflow-visible">
              <p className="text-base sm:text-lg text-text-secondary text-center mb-3">¡Felicidades hemos terminado tu configuración!</p>
              <div className="h-3 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-500 to-primary-700 transition-[width] duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Enlace de navegación accesible (no altera la fidelidad visual) */}
            <Link href="/" className="sr-only">Ir al home ahora</Link>
          </FadeSlide>
        )}
      </div>
    </section>
  );
}