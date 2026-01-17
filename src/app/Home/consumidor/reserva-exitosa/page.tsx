import * as React from "react";
import Link from "next/link";
import CancelClientOverlay from "@/app/Home/consumidor/reserva-exitosa/ui-cancel-client";
import {
  BadgeCheck,
  Calendar,
  Mail,
  User,
  ArrowLeft,
} from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TOKENS UI ================= */
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";

type SP = Record<string, string | string[] | undefined>;

function spGet(sp: SP, key: string, fallback: string) {
  const v = sp[key];
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

export default function ReservaExitosaPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  // ✅ params (server-safe)
  const code = spGet(searchParams, "code", "VITA-XXXX-0000");
  const name = spGet(searchParams, "name", "—");
  const email = spGet(searchParams, "email", "—");
  const date = spGet(searchParams, "date", "—");
  const time = spGet(searchParams, "time", "—");
  const category = spGet(searchParams, "category", "productos");
  const service = spGet(searchParams, "service", "Reserva");
  const store = spGet(searchParams, "store", "Vita Studio");
  const barber = spGet(searchParams, "barber", "—");

  return (
    <main className="min-h-[100dvh] text-white">
      <div className="mx-auto w-full max-w-[980px] px-6 lg:px-10 pt-10 pb-44">
        {/* top row */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            href={`/Home/consumidor`}
            className={cn(
              "h-11 px-4 rounded-full inline-flex items-center gap-2",
              "border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
              "hover:bg-white/[0.09] hover:border-white/22 transition"
            )}
          >
            <ArrowLeft className="w-4 h-4 text-white/80" />
            <span className="text-sm font-semibold text-white/90">Volver</span>
          </Link>

          <span className="text-[11px] uppercase tracking-[0.28em] text-white/55">
            Vita • Ticket
          </span>
        </div>

        {/* ticket card */}
        <section className={cn("relative overflow-hidden rounded-[34px]", GLASS)}>
          {/* led lights */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/[0.10] blur-[95px]" />
            <div className="absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          <div className="relative p-7 sm:p-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-white font-semibold text-2xl sm:text-3xl">
                  Tu reserva ha sido exitosa
                </p>
                <p className="mt-2 text-white/60">
                  Presenta este ticket al llegar al local.
                </p>
              </div>

              <div className="h-12 w-12 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center text-white/80">
                <BadgeCheck className="w-5 h-5" />
              </div>
            </div>

            {/* info blocks */}
            <div className={cn("mt-6 rounded-[28px] p-5", GLASS_SOFT)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow icon={User} label="Nombre" value={name} />
                <InfoRow icon={Mail} label="Correo" value={email} />
                <InfoRow icon={Calendar} label="Fecha" value={date} />
                <InfoRow icon={Calendar} label="Hora" value={time} />
              </div>

              <div className="mt-5 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Servicio
                </p>
                <p className="mt-2 text-white font-semibold">{service}</p>
                <p className="mt-2 text-white/55 text-sm">
                  {store} • {barber !== "—" ? `con ${barber}` : "—"}
                </p>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/12 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  Código
                </p>
                <p className="mt-2 text-white font-semibold tracking-[0.14em]">
                  {code}
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/Home/consumidor/marketplace/${encodeURIComponent(
                  category
                )}`}
                className={cn(
                  "h-12 rounded-full font-semibold grid place-items-center",
                  "border border-white/14 bg-white/[0.05] backdrop-blur-2xl text-white/85",
                  "hover:bg-white/[0.10] hover:text-white transition"
                )}
              >
                Volver al marketplace
              </Link>

              {/* ✅ cancel overlay sigue siendo client (UI) */}
              <CancelClientOverlay code={code} backHref="/Home/consumidor" />
            </div>

            <p className="mt-5 text-[11px] text-white/55">
              *MVP UI: cancelación visual. Luego conectamos backend.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
      <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center">
        <Icon className="w-4 h-4 text-white/80" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
          {label}
        </p>
        <p className="text-white/90 font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}
