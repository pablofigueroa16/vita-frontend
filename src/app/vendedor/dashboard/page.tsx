"use client";

import * as React from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, listReservationsForVendor } from "@/app/lib/store";

export default function VendorDashboardPage() {
  const [db] = React.useState(() => initDb());
  const me = getMe(db);
  const res = listReservationsForVendor(db, me.id);

  const pending = res.filter((r) => r.status === "pendiente").length;
  const confirmed = res.filter((r) => r.status === "confirmada").length;
  const canceled = res.filter((r) => r.status === "cancelada").length;

  return (
    <Shell title="Dashboard vendedor" subtitle="Publica posts, crea servicios y gestiona reservas.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassSoft className="p-5">
          <p className="text-white/70 text-sm">Pendientes</p>
          <p className="mt-2 text-3xl font-semibold">{pending}</p>
        </GlassSoft>
        <GlassSoft className="p-5">
          <p className="text-white/70 text-sm">Confirmadas</p>
          <p className="mt-2 text-3xl font-semibold">{confirmed}</p>
        </GlassSoft>
        <GlassSoft className="p-5">
          <p className="text-white/70 text-sm">Canceladas</p>
          <p className="mt-2 text-3xl font-semibold">{canceled}</p>
        </GlassSoft>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Link href="/vendedor/publicar" className="rounded-[28px] border border-white/12 bg-white/[0.05] p-6 hover:bg-white/[0.07] transition">
          <p className="text-white font-semibold text-lg">Publicar post</p>
          <p className="mt-1 text-white/60 text-sm">Sube fotos (URLs) + caption (demo).</p>
        </Link>
        <Link href="/vendedor/servicios" className="rounded-[28px] border border-white/12 bg-white/[0.05] p-6 hover:bg-white/[0.07] transition">
          <p className="text-white font-semibold text-lg">Crear servicios</p>
          <p className="mt-1 text-white/60 text-sm">Servicios reservables (precio, duración, etc).</p>
        </Link>
      </div>
    </Shell>
  );
}
