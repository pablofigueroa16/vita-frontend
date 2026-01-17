"use client";

import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";

export default function InfluencerPublish() {
  return (
    <Shell title="Influencer • Publicar" subtitle="Pantalla demo para presentar el rol influencer.">
      <GlassSoft className="p-6">
        <p className="text-white/80 font-semibold">Publicar review / post</p>
        <p className="mt-2 text-white/60 text-sm">
          (Mock) Aquí después conectas afiliados, reseñas, link a tiendas y analytics.
        </p>
      </GlassSoft>
    </Shell>
  );
}
