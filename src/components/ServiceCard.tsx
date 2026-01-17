"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BadgeCheck, Info, Clock, DollarSign } from "lucide-react";
import type { Service } from "@/app/lib/types";
import { cn } from "./Shell";
import { HOVER_LED } from "./Glass";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function InfoPopover({
  title,
  lines,
}: {
  title: string;
  lines: { icon?: React.ReactNode; text: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          "h-10 w-10 rounded-full border border-white/14 bg-white/[0.06] backdrop-blur-md",
          "grid place-items-center text-white/85 hover:bg-white/[0.10] transition"
        )}
        aria-label="Ver detalles"
      >
        <Info className="w-4 h-4" />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute right-0 top-12 z-30 w-[290px] rounded-2xl p-3",
            "border border-white/14 bg-black/60 backdrop-blur-2xl",
            "shadow-[0_30px_120px_rgba(0,0,0,0.70)]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white font-semibold text-[13px] leading-tight line-clamp-1">
            {title}
          </p>
          <div className="mt-2 space-y-1.5">
            {lines.map((l, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[12px] text-white/75">
                {l.icon ? <span className="text-white/70">{l.icon}</span> : null}
                <span>{l.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-white/45">Hover desktop • Tap mobile</div>
        </div>
      ) : null}
    </div>
  );
}

export function ServiceCard({ s, onReserve }: { s: Service; onReserve: (service: Service) => void }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      className={cn(
        "overflow-hidden rounded-[28px] border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
        "shadow-[0_22px_80px_rgba(0,0,0,0.35)]",
        HOVER_LED
      )}
    >
      <div className="p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-white/12 bg-white/5">
          <img src={s.images[0]} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* top bar: 1 chip + popover (no se pisan) */}
          <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-white/80">
              Servicio • reserva
            </span>

            <InfoPopover
              title={s.title}
              lines={[
                { icon: <DollarSign className="w-4 h-4" />, text: `Precio: ${money(s.price)}` },
                { icon: <Clock className="w-4 h-4" />, text: `Duración: ${s.durationMin} min` },
                { icon: <BadgeCheck className="w-4 h-4" />, text: "Vita Verified" },
              ]}
            />
          </div>

          <div className="absolute left-3 bottom-3 right-3">
            <p className="text-white font-semibold text-base leading-tight line-clamp-1">{s.title}</p>
            <p className="text-white/70 text-[12px] mt-0.5 line-clamp-1">{s.desc}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-white font-semibold text-lg">{money(s.price)}</p>

          <button
            type="button"
            onClick={() => onReserve(s)}
            className={cn(
              "h-11 px-4 rounded-full font-semibold inline-flex items-center gap-2",
              "bg-white text-black hover:opacity-90 transition"
            )}
          >
            <Calendar className="w-4 h-4" />
            Reservar
            <ArrowRight className="w-4 h-4 opacity-80" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
