'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Star,
  MessageSquare,
  Briefcase,
  Sparkles,
  User as UserIcon,
  Check,
  ShoppingBag,
} from 'lucide-react';

type RolVita = 'Emprendedor' | 'Influencer' | 'Consumidor';

type Notificacion = {
  id: number;
  titulo: string;
  descripcion: string;
  tiempo: string;
  tipo: 'venta' | 'pedido' | 'campaña' | 'sistema';
  leida?: boolean;
};

const notificacionesMock: Notificacion[] = [
  {
    id: 1,
    titulo: 'Nueva venta en tu tienda',
    descripcion: 'Has recibido una nueva orden en Vita Store · Glow Skin Pack.',
    tiempo: 'Hace 5 min',
    tipo: 'venta',
  },
  {
    id: 2,
    titulo: 'Campaña aprobada',
    descripcion: 'Tu campaña con @street.vita fue aprobada y está lista para lanzar.',
    tiempo: 'Hace 1 h',
    tipo: 'campaña',
  },
  {
    id: 3,
    titulo: 'Pedido enviado',
    descripcion: 'El pedido #VTA-1023 ha sido marcado como enviado.',
    tiempo: 'Ayer',
    tipo: 'pedido',
    leida: true,
  },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [notisOpen, setNotisOpen] = useState(false);
  const [rolActivo, setRolActivo] = useState<RolVita>('Emprendedor');

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotisOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAvatarOpen(false);
        setNotisOpen(false);
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!mounted) return null;

  const esProfesional = rolActivo === 'Emprendedor' || rolActivo === 'Influencer';

  return (
    <div className="w-full sticky top-0 z-40">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)] h-14 group"
      >
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_65%)]" />

        {/* LEFT */}
        <div className="flex items-center gap-3 relative z-10">
          <img
            src="/vita-logo-blanco.png"
            alt="Vita"
            className="w-12 sm:w-14 md:w-16 object-contain drop-shadow-[0_6px_18px_rgba(0,200,255,0.12)] transition-all duration-300 group-hover:drop-shadow-[0_4px_20px_rgba(0,200,255,0.25)]"
          />

          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex px-2 py-1 rounded-lg border border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
          >
            <span className="text-cyan-300 text-xs font-medium tracking-wide hover:text-[hsl(200_100%_60%)] hover:[text-shadow:0_0_10px_rgba(56,189,248,0.85)] transition-all">
              Hola, Daddy Yankee
            </span>
          </motion.div>
        </div>

        {/* CENTER */}
        <div className="flex-1 flex justify-center px-2 relative z-10">
          <div className="flex items-center gap-2 w-full max-w-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner h-9 hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.4)] focus-within:border-cyan-300/80 transition-all">
            <Search className="w-3.5 h-3.5 text-white/60" />
            <input
              type="text"
              placeholder="Buscar en Vita..."
              className="bg-transparent outline-none w-full text-[11px] sm:text-sm text-white/85 placeholder:text-white/40"
            />
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/55">
              <Sparkles className="w-3 h-3" />
              smart
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 relative z-10">
          <Link href="/carrito" className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-white/10 transition">
            <ShoppingBag className="w-4 h-4 text-white/85" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-cyan-400 text-[9px] font-semibold text-[#020817] flex items-center justify-center">
              2
            </span>
          </Link>

          <div className="relative" ref={notifRef}>
            <IconButton notify onClick={() => setNotisOpen((p) => !p)}>
              <Bell className="w-4 h-4" />
            </IconButton>

            <AnimatePresence>
              {notisOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl z-50"
                >
                  <div className="rounded-2xl p-3 border border-white/10 backdrop-blur-2xl bg-[rgba(10,12,15,0.96)]">
                    {notificacionesMock.map((n) => (
                      <div key={n.id} className="rounded-xl px-3 py-2.5 border border-white/10 bg-white/5 mb-2">
                        <p className="text-xs font-semibold text-white">{n.titulo}</p>
                        <p className="text-[11px] text-white/65">{n.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAvatarOpen((p) => !p)}
              className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-cyan-400 transition"
            >
              <img
                src="https://i.pinimg.com/1200x/1e/36/07/1e3607dbeb328ea7128674cb39ca0393.jpg"
                className="w-full h-full object-cover"
              />
            </button>

            <AnimatePresence>
              {avatarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-64 rounded-xl shadow-2xl z-50"
                >
                  <div className="rounded-xl p-2 border border-white/10 backdrop-blur-xl bg-[rgba(10,12,15,0.92)]">
                    {(['Emprendedor', 'Influencer', 'Consumidor'] as RolVita[]).map((rol) => (
                      <button
                        key={rol}
                        onClick={() => setRolActivo(rol)}
                        className={`w-full text-left rounded-xl px-3 py-2.5 border transition ${
                          rol === rolActivo ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        {rol}
                      </button>
                    ))}
                    <p className="mt-2 text-[11px] text-white/45">
                      {esProfesional ? 'Cuenta profesional activa.' : 'Cuenta estándar activa.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

/* ---------- Auxiliares ---------- */

function IconButton({
  children,
  notify,
  onClick,
}: {
  children: React.ReactNode;
  notify?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 transition"
    >
      {children}
      {notify && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />}
    </button>
  );
}
