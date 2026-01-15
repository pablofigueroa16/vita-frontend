"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BadgeCheck, QrCode, ChevronLeft } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";

export default function ReservaExitosaPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const code = sp.get("code") ?? "VITA-XXXX-0000";
  const name = sp.get("name") ?? "—";
  const email = sp.get("email") ?? "—";
  const date = sp.get("date") ?? "—";
  const time = sp.get("time") ?? "—";
  const category = sp.get("category") ?? "—";
  const service = sp.get("service") ?? "—";
  const store = sp.get("store") ?? "—";
  const barber = sp.get("barber") ?? "—";

  const payload = JSON.stringify(
    {
      type: "reserva",
      code,
      name,
      email,
      date,
      time,
      category,
      service,
      store,
      barber,
    },
    null,
    0
  );

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    payload
  )}`;

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[980px] px-6 lg:px-10 pt-8 pb-28">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] hover:border-white/22 transition"
          >
            <ChevronLeft className="w-4 h-4 text-white/80" />
            <span className="text-sm font-semibold text-white/90">Volver</span>
          </button>

          <Link
            href="/Home"
            className="text-[11px] uppercase tracking-[0.28em] text-white/55 hover:text-white transition"
          >
            Ir a Home
          </Link>
        </div>

        {/* ticket */}
        <motion.section
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={cn("mt-6 relative overflow-hidden rounded-[34px] p-6 sm:p-8", GLASS)}
        >
          {/* LED glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-[260px] w-[260px] rounded-full bg-white/[0.10] blur-[80px]" />
            <div className="absolute right-[-90px] bottom-[-90px] h-[320px] w-[320px] rounded-full bg-white/[0.08] blur-[95px]" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/60 border border-white/14 bg-white/[0.05] px-3 py-1.5 rounded-full">
              <BadgeCheck className="w-4 h-4 text-white/75" />
              Reserva exitosa
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
              Tu reserva ha sido exitosa ✅
            </h1>
            <p className="mt-2 text-white/65">
              Presenta este ticket (QR) cuando llegues al local para validar tu cita.
            </p>

            {/* content */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              {/* left: details */}
              <div className={cn("rounded-[28px] p-5 sm:p-6", GLASS_SOFT)}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Código de reserva
                </p>
                <p className="mt-2 text-white font-semibold tracking-[0.14em] text-lg">
                  {code}
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Nombre" value={name} />
                  <Field label="Correo" value={email} />
                  <Field label="Fecha" value={date} />
                  <Field label="Hora" value={time} />
                  <Field label="Categoría" value={category} />
                  <Field label="Servicio" value={service} />
                  <Field label="Local" value={store} />
                  <Field label="Especialista" value={barber} />
                </div>

                <div className="mt-6 rounded-[22px] border border-white/12 bg-white/[0.04] p-4">
                  <p className="text-white/80 text-sm font-semibold">
                    Recomendación
                  </p>
                  <p className="mt-1 text-white/60 text-sm">
                    Llega 10 minutos antes y muestra este QR en recepción.
                  </p>
                </div>
              </div>

              {/* right: QR */}
              <div className={cn("rounded-[28px] p-5 sm:p-6 grid place-items-center", GLASS_SOFT)}>
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-white/75" />
                    <p className="text-white/80 font-semibold">QR de verificación</p>
                  </div>

                  <div className="mt-4 rounded-[24px] border border-white/12 bg-white/[0.06] p-4 grid place-items-center">
                    <img
                      src={qrSrc}
                      alt="QR"
                      className="h-[260px] w-[260px] rounded-[18px] border border-white/12 bg-white/5"
                    />
                  </div>

                  <p className="mt-4 text-[11px] text-white/55">
                    *MVP: QR generado en el cliente. Luego lo validamos con backend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/12 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">{label}</p>
      <p className="mt-1 text-white/85 text-sm font-semibold break-words">{value}</p>
    </div>
  );
}
