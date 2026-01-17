"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getService } from "@/app/lib/store";

export default function CheckoutReservePage() {
  const params = useParams<{ serviceId: string }>();
  const router = useRouter();
  const [db] = React.useState(() => initDb());

  const serviceId = (params?.serviceId ?? "").toString();
  const service = getService(db, serviceId);

  return (
    <Shell title="Checkout reserva" subtitle="Ruta dedicada (demo).">
      <GlassSoft className="p-6">
        {service ? (
          <>
            <p className="text-white/80 font-semibold">{service.title}</p>
            <p className="mt-2 text-white/60 text-sm">{service.desc}</p>
          </>
        ) : (
          <p className="text-white/65">Servicio no encontrado.</p>
        )}

        <button
          onClick={() => router.back()}
          className="mt-6 h-11 px-5 rounded-full border border-white/14 bg-white/[0.05] text-white/85 hover:bg-white/[0.08] transition"
        >
          Volver
        </button>
      </GlassSoft>
    </Shell>
  );
}
