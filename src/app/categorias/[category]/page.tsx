"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Shell } from "@/components/Shell";
import { StoreCard } from "@/components/StoreCard";
import { initDb, listStores } from "@/app/lib/store";
import type { Category } from "@/app/lib/types";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = (params?.category ?? "productos") as Category;

  const [db] = React.useState(() => initDb());
  const stores = listStores(db, category);

  return (
    <Shell title={`Categoría: ${category}`} subtitle="Tiendas publicadas por vendedores (mock).">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stores.map((s) => (
          <StoreCard key={s.id} s={s} />
        ))}
      </div>
    </Shell>
  );
}
