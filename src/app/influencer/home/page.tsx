"use client";

import * as React from "react";
import { Shell } from "@/components/Shell";
import { StoreCard } from "@/components/StoreCard";
import { initDb, listStores } from "@/app/lib/store";

export default function InfluencerHome() {
  const [db] = React.useState(() => initDb());
  const stores = listStores(db).slice(0, 6);

  return (
    <Shell title="Influencer • Explorar" subtitle="Explora tiendas y crea contenido (demo).">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stores.map((s) => (
          <StoreCard key={s.id} s={s} />
        ))}
      </div>
    </Shell>
  );
}
