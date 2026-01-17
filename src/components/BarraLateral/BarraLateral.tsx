"use client";

import { useState } from "react";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Home,
  Radio,
  Film,
  ChevronUp,
  ChevronDown,
  Store,
  WalletCards,
  Settings,
  Grid2x2,
  PlayCircle,
} from "lucide-react";

type IconProps = {
  size?: number | string;
  className?: string;
};

type MenuItem = {
  name: string;
  icon: ComponentType<IconProps>;
  href: string;
};

export default function MegaDock() {
  const [open, setOpen] = useState(false);

  const fullMenu: MenuItem[] = [
    { name: "Inicio", icon: Home, href: "/" },
    { name: "Market Place", icon: Store, href: "/tiendas" },
    { name: "CRM", icon: Grid2x2, href: "/crm" },
    { name: "Vita Card", icon: WalletCards, href: "/vita-card" },
    { name: "Live", icon: Radio, href: "/live" },
    { name: "Videos", icon: Film, href: "/reels" },
    { name: "Feed", icon: PlayCircle, href: "/feed" },
    { name: "Configuración", icon: Settings, href: "/configuracion" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex w-full -translate-x-1/2 justify-center pointer-events-none">
      <div
        className={`pointer-events-auto flex flex-col items-center gap-4 
          rounded-3xl border border-white/10 bg-white/10 
          shadow-[0_8px_35px_rgba(0,0,0,0.45)] backdrop-blur-2xl
          transition-all duration-300
          ${open ? "px-8 py-5" : "px-5 py-2"}`}
      >
        {/* MENU EXPANDIDO */}
        {open && (
          <div className="grid grid-cols-4 gap-8 px-4 pt-2 pb-4 text-white transition-all">
            {fullMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center text-[11px] text-white hover:text-[#00eaff] transition"
                >
                  <Icon size={24} className="text-white hover:text-[#00eaff]" />
                  <span className="mt-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* MINI DOCK — ORDEN FINAL */}
        <div className="flex items-center gap-10">
          {/* 1. HOME */}
          {!open && (
            <Link href="/" className="hover:text-[#00eaff]">
              <Home
                size={24}
                className="text-white hover:text-[#00eaff] transition"
              />
            </Link>
          )}

          {/* 2. TIENDAS */}
          {!open && (
            <Link href="/tiendas" className="hover:text-[#00eaff]">
              <Store
                size={24}
                className="text-white hover:text-[#00eaff] transition"
              />
            </Link>
          )}

          {/* 3. FLECHA (CENTRO) */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center
              rounded-full border border-white/20 bg-white/20 
              shadow-[0_0_12px_rgba(255,255,255,0.25)] backdrop-blur-xl
              hover:bg-white/30 transition"
          >
            {open ? (
              <ChevronDown size={26} className="text-white" />
            ) : (
              <ChevronUp size={26} className="text-white" />
            )}
          </button>

          {/* 4. LIVE */}
          {!open && (
            <Link href="/live" className="hover:text-[#00eaff]">
              <Radio
                size={24}
                className="text-white hover:text-[#00eaff] transition"
              />
            </Link>
          )}

          {/* 5. CONFIGURACIÓN */}
          {!open && (
            <Link href="/configuracion" className="hover:text-[#00eaff]">
              <Settings
                size={24}
                className="text-white hover:text-[#00eaff] transition"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
