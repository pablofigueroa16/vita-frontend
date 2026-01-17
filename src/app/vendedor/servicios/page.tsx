"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, createService } from "@/app/lib/store";
import { buildImageSet } from "@/app/lib/images";

export default function VendorServicesPage() {
  const [db, setDb] = React.useState(() => initDb());
  const me = getMe(db);
  const myStore = db.stores.find((s) => s.ownerId === me.id);

  const [title, setTitle] = React.useState("Manicure premium");
  const [price, setPrice] = React.useState(18.99);
  const [durationMin, setDurationMin] = React.useState(60);
  const [desc, setDesc] = React.useState("Servicio premium con acabado glass.");

  return (
    <Shell title="Servicios" subtitle="Crea servicios reservables para tu tienda.">
      <GlassSoft className="p-6">
        {!myStore ? (
          <div className="text-white/65">No hay tienda para este vendedor.</div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <Field label="Título" value={title} onChange={(v) => setTitle(v)} />
              <Field label="Precio" value={String(price)} onChange={(v) => setPrice(Number(v || 0))} />
              <Field label="Duración (min)" value={String(durationMin)} onChange={(v) => setDurationMin(Number(v || 0))} />
            </div>

            <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Descripción</p>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-2 w-full min-h-[110px] rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-3 text-white/90 outline-none focus:border-white/28"
              />
            </div>

            <button
              onClick={() => {
                if (!title.trim()) return alert("Título requerido.");
                const imgs = buildImageSet(`${myStore.category} ${myStore.name} ${title} premium aesthetic`);
                const next = createService(db, myStore.id, {
                  title,
                  price,
                  durationMin,
                  desc,
                  images: imgs,
                  active: true,
                });
                setDb(next);
                alert("Servicio creado. Revisa tu tienda /tienda/[slug] pestaña Servicios.");
              }}
              className="h-12 px-6 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Crear servicio
            </button>
          </div>
        )}
      </GlassSoft>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-full border border-white/14 bg-white/[0.05] px-4 text-white/90 outline-none focus:border-white/28"
      />
    </div>
  );
}
