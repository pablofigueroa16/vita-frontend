"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, listReservationsForVendor, getService, saveDb, setReservationStatus } from "@/app/lib/store";

export default function VendorReservationsPage() {
  const [db, setDb] = React.useState(() => initDb());
  const me = getMe(db);
  const reservations = listReservationsForVendor(db, me.id);

  return (
    <Shell title="Reservas recibidas" subtitle="Confirma o cancela reservas (front-only).">
      <GlassSoft className="p-5">
        <div className="flex items-center justify-between px-1">
          <p className="text-white/80 font-semibold">Reservas ({reservations.length})</p>
          <p className="text-[12px] text-white/55">acciones</p>
        </div>

        <div className="mt-4 space-y-3">
          {reservations.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-white/65">
              Aún no tienes reservas. Haz una como consumidor para ver el flujo.
            </div>
          ) : (
            reservations.map((r) => {
              const service = getService(db, r.serviceId);
              return (
                <div
                  key={r.id}
                  className="rounded-[24px] border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-white font-semibold line-clamp-1">{service?.title ?? "Servicio"}</p>
                    <p className="mt-1 text-white/65 text-sm">
                      {r.date} • {r.time} • estado: <span className="text-white/80">{r.status}</span>
                    </p>
                    <p className="mt-1 text-white/55 text-sm line-clamp-1">
                      {r.fullName} • {r.email}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={() => {
                        const next = setReservationStatus(db, r.id, "confirmada");
                        setDb(next); saveDb(next);
                      }}
                      className="h-10 px-4 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => {
                        const next = setReservationStatus(db, r.id, "cancelada");
                        setDb(next); saveDb(next);
                      }}
                      className="h-10 px-4 rounded-full border border-white/14 bg-white/[0.05] text-white/85 hover:bg-white/[0.08] transition"
                    >
                      Cancelar
                    </button>
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
