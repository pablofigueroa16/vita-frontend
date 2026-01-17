"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, saveDb } from "@/app/lib/store";

export default function VendorProfilePage() {
  const [db, setDb] = React.useState(() => initDb());
  const me = getMe(db);

  const myStores = db.stores.filter((s) => s.ownerId === me.id);
  const store = myStores[0];

  const [name, setName] = React.useState(store?.name ?? "MI TIENDA");
  const [slug, setSlug] = React.useState(store?.slug ?? "mi-tienda");
  const [bio, setBio] = React.useState(store?.bio ?? "Bio...");

  return (
    <Shell title="Mi tienda" subtitle="Edita tu perfil de vendedor (front-only).">
      <GlassSoft className="p-6">
        {!store ? (
          <div className="text-white/65">No hay tienda seed para este vendedor.</div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <Field label="Nombre" value={name} onChange={setName} />
              <Field label="Slug (ruta /tienda/[slug])" value={slug} onChange={setSlug} />
              <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
                <p className="text-white/70 text-sm">Ruta preview</p>
                <p className="mt-2 text-white font-semibold">/tienda/{slug}</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Bio</p>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-2 w-full min-h-[120px] rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-3 text-white/90 outline-none focus:border-white/28"
              />
            </div>

            <button
              onClick={() => {
                const next = {
                  ...db,
                  stores: db.stores.map((s) =>
                    s.id === store.id ? { ...s, name, slug, bio } : s
                  ),
                };
                setDb(next);
                saveDb(next);
                alert("Guardado (localStorage).");
              }}
              className="h-12 px-6 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Guardar cambios
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
