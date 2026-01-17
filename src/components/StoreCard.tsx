"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { Store } from "@/app/lib/types";
import { cn } from "./Shell";
import { HOVER_LED } from "./Glass";

export function StoreCard({ s }: { s: Store }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 160, damping: 22 }}>
      <Link
        href={`/tienda/${s.slug}`}
        className={cn(
          "block overflow-hidden rounded-[28px] border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
          "shadow-[0_22px_80px_rgba(0,0,0,0.35)]",
          HOVER_LED
        )}
      >
        <div className="relative aspect-[16/10]">
          <img src={s.hero} alt={s.name} className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-md text-[11px] text-white/75">
            <BadgeCheck className="w-4 h-4" />
            Tienda verificada
          </div>

          <div className="absolute left-4 right-4 bottom-4">
            <p className="text-white font-semibold text-lg leading-tight line-clamp-1">{s.name}</p>
            <p className="mt-1 text-white/65 text-sm line-clamp-2">{s.bio}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
