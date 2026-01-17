"use client";

import { Shell } from "@/components/Shell";
import { GlassSoft } from "@/components/Glass";

export default function InfluencerProfile() {
  return (
    <Shell title="Influencer • Perfil" subtitle="Perfil demo.">
      <GlassSoft className="p-6">
        <p className="text-white/80 font-semibold">Perfil</p>
        <p className="mt-2 text-white/60 text-sm">En el backend: followers, posts, links, etc.</p>
      </GlassSoft>
    </Shell>
  );
}
