"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, listReservationsForConsumer, getService, getStoreBySlug, setReservationStatus, saveDb } from "@/app/lib/store";
import { seedStores } from "@/app/lib/mockDb";

export default function MyReservationsPage() {
  const [db, setDb] = React.useState(() => initDb());
  const me = getMe(db);
  const reservations = listReservationsForConsumer(db, me.id);

  // helper: stores by id (simple map)
  const stores = React.useMemo(() => db.stores, [db.stores]);

  return (
    <Shell title="Mis reservas" subtitle="Crea reservas desde una tienda y luego cancélalas aquí.">
      <GlassSoft className="p-5">
        <div className="flex items-center justify-between px-1">
          <p className="text-white/80 font-semibold">Reservas ({reservations.length})</p>
          <p className="text-[12px] text-white/55">front-only</p>
        </div>

        <div className="mt-4 space-y-3">
          {reservations.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-white/65">
              No tienes reservas aún. Entra a una tienda y reserva un servicio.
            </div>
          ) : (
            reservations.map((r) => {
              const service = getService(db, r.serviceId);
              const store = stores.find((s) => s.id === r.storeId);
              return (
                <div
                  key={r.id}
                  className="rounded-[24px] border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-white font-semibold line-clamp-1">
                      {service?.title ?? "Servicio"} • {store?.name ?? "Tienda"}
                    </p>
                    <p className="mt-1 text-white/65 text-sm">
                      {r.date} • {r.time} • estado: <span className="text-white/80">{r.status}</span>
                    </p>
                    <p className="mt-1 text-white/55 text-sm line-clamp-1">
                      {r.fullName} • {r.email}
                    </p>
                  </div>

                  <div className="shrink-0 flex gap-2">
                    {r.status !== "cancelada" ? (
                      <button
                        onClick={() => {
                          const next = setReservationStatus(db, r.id, "cancelada");
                          setDb(next);
                          saveDb(next);
                        }}
                        className="h-11 px-4 rounded-full border border-white/14 bg-white/[0.05] text-white/85 hover:bg-white/[0.08] transition"
                      >
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </GlassSoft>
    </Shell>
  );
}
