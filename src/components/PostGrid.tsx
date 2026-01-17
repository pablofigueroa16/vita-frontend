"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Post } from "@/app/lib/types";
import { cn } from "./Shell";
import { HOVER_LED } from "./Glass";

export function PostGrid({ posts, onOpen }: { posts: Post[]; onOpen: (p: Post) => void }) {
  const grid = posts.slice(0, 9);
  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-4">
      {grid.map((p) => (
        <motion.button
          key={p.id}
          type="button"
          onClick={() => onOpen(p)}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 170, damping: 22 }}
          className={cn(
            "group text-left overflow-hidden rounded-[22px] border border-white/14 bg-white/[0.05] backdrop-blur-2xl",
            "shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
            HOVER_LED
          )}
        >
          <div className="relative aspect-square overflow-hidden">
            <img src={p.images[0]} alt={p.caption} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute left-3 right-3 bottom-3">
              <p className="text-white font-semibold text-[13px] leading-tight line-clamp-1">{p.caption}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
