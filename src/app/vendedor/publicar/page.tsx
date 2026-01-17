"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";
import { initDb, getMe, createPost } from "@/app/lib/store";
import { buildImageSet } from "@/app/lib/images";

export default function VendorPublishPage() {
  const [db, setDb] = React.useState(() => initDb());
  const me = getMe(db);
  const myStore = db.stores.find((s) => s.ownerId === me.id);

  const [caption, setCaption] = React.useState("Nuevo set de uñas • glass vibes ✨");
  const [img, setImg] = React.useState(""); // opcional URL
  const [auto, setAuto] = React.useState(true);

  return (
    <Shell title="Publicar post" subtitle="Demo: crea posts para que aparezcan en /tienda/[slug].">
      <GlassSoft className="p-6">
        {!myStore ? (
          <div className="text-white/65">No hay tienda para este vendedor.</div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Caption</p>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="mt-2 h-11 w-full rounded-full border border-white/14 bg-white/[0.05] px-4 text-white/90 outline-none focus:border-white/28"
              />
            </div>

            <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Imagen (URL opcional)</p>
                  <p className="text-white/55 text-sm mt-1">Si no pones URL, genera por título (estético).</p>
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
                  auto (Unsplash)
                </label>
              </div>

              <input
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="https://..."
                className="mt-3 h-11 w-full rounded-full border border-white/14 bg-white/[0.05] px-4 text-white/90 outline-none focus:border-white/28"
              />
            </div>

            <button
              onClick={() => {
                if (!caption.trim()) return alert("Escribe un caption.");
                const imgs = auto || !img.trim()
                  ? buildImageSet(`${myStore.category} ${myStore.name} ${caption} nails aesthetic`)
                  : [img.trim()];
                const next = createPost(db, myStore.id, caption, imgs);
                setDb(next);
                alert("Post creado. Revisa tu tienda en /tienda/[slug].");
              }}
              className="h-12 px-6 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Publicar
            </button>
          </div>
        )}
      </GlassSoft>
    </Shell>
  );
}
