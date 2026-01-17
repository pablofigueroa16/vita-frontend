"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, ArrowRight, User, Mail } from "lucide-react";
import type { Service, Store } from "@/app/lib/types";
import { cn } from "./Shell";

function buildHourlySlots(startHour = 9, endHour = 19) {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) slots.push(`${String(h).padStart(2, "0")}:00`);
  return slots;
}
const HOURLY_SLOTS = buildHourlySlots(9, 19);

export function ReserveModal({
  open,
  onClose,
  store,
  service,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  store: Store;
  service: Service;
  onConfirm: (payload: { fullName: string; email: string; date: string; time: string }) => void;
}) {
  const [idx, setIdx] = React.useState(0);
  const next = () => setIdx((i) => (i + 1) % service.images.length);
  const prev = () => setIdx((i) => (i - 1 + service.images.length) % service.images.length);

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState(() => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  });
  const [time, setTime] = React.useState(HOURLY_SLOTS[0]);

  React.useEffect(() => {
    if (!open) return;
    setIdx(0);
    setFullName("");
    setEmail("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/75" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-6xl overflow-hidden rounded-[32px] bg-white/[0.06] backdrop-blur-2xl border border-white/14 shadow-[0_40px_140px_rgba(0,0,0,0.65)]">
              {/* header */}
              <div className="sticky top-0 z-20 p-5 border-b border-white/10 bg-white/[0.06] backdrop-blur-2xl flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-white font-semibold text-lg leading-tight line-clamp-1">
                    Reservar • {service.title}
                  </p>
                  <p className="text-white/60 text-sm line-clamp-1">{store.name}</p>
                </div>

                <button
                  onClick={onClose}
                  className="shrink-0 h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/80 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
                {/* left - images */}
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-[26px] border border-white/12 overflow-hidden bg-white/5">
                    <img src={service.images[idx]} alt="img" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.10] transition flex items-center justify-center"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <span className="absolute left-3 bottom-3 text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75">
                      {idx + 1} / {service.images.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {service.images.map((src, i) => (
                      <button
                        key={src + i}
                        onClick={() => setIdx(i)}
                        className={cn(
                          "aspect-[4/3] rounded-2xl overflow-hidden border transition",
                          i === idx ? "border-white/35" : "border-white/12 hover:border-white/25"
                        )}
                        aria-label={`Ver foto ${i + 1}`}
                      >
                        <img src={src} alt="thumb" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* right - form */}
                <div className="rounded-[26px] border border-white/14 bg-white/[0.06] backdrop-blur-2xl p-5">
                  <p className="text-white font-semibold">Datos de reserva</p>
                  <p className="text-white/60 text-sm mt-1">Todo es demo (front-only).</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Fecha</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={cn(
                            "h-11 flex-1 rounded-full px-4",
                            "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                            "text-white/90 outline-none",
                            "focus:border-white/28 focus:bg-white/[0.07] transition"
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Hora</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {HOURLY_SLOTS.map((t) => {
                          const active = t === time;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTime(t)}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[12px] border transition backdrop-blur-md",
                                active
                                  ? "border-white/35 bg-white/[0.10] text-white"
                                  : "border-white/14 bg-white/[0.05] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/25"
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Nombre completo</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ej: Laura Front"
                            className={cn(
                              "h-11 flex-1 rounded-full px-4",
                              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                              "text-white/90 placeholder:text-white/35 outline-none",
                              "focus:border-white/28 focus:bg-white/[0.07] transition"
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Correo</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/75">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className={cn(
                              "h-11 flex-1 rounded-full px-4",
                              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
                              "text-white/90 placeholder:text-white/35 outline-none",
                              "focus:border-white/28 focus:bg-white/[0.07] transition"
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!fullName.trim()) return alert("Escribe tu nombre completo.");
                        if (!email.trim() || !email.includes("@")) return alert("Escribe un correo válido.");
                        onConfirm({ fullName, email, date, time });
                      }}
                      className={cn(
                        "mt-2 w-full h-12 rounded-full font-semibold inline-flex items-center justify-center gap-2",
                        "bg-white text-black hover:opacity-90 transition"
                      )}
                    >
                      Confirmar reserva
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>

                    <div className="text-[11px] text-white/55">
                      *Esto crea una reserva en localStorage para demo.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-white/10 flex justify-end">
                <button
                  onClick={onClose}
                  className="h-11 px-5 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/75 hover:text-white hover:bg-white/[0.08] transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
