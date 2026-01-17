import * as React from "react";
import { cn } from "@/components/Shell";

export const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
export const GLASS_SOFT = "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
export const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("rounded-[28px]", GLASS, className)}>{children}</div>;
}

export function GlassSoft({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("rounded-[28px]", GLASS_SOFT, className)}>{children}</div>;
}
