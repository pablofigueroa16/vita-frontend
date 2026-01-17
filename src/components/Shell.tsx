"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Store, CalendarDays, PlusSquare, User2, Home, Users } from "lucide-react";
import type { Role } from "@/app/lib/types";
import { getRole, setRole } from "@/app/lib/store";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3 py-2 border transition",
        active
          ? "border-white/22 bg-white/[0.08] text-white"
          : "border-white/10 bg-white/[0.03] text-white/75 hover:text-white hover:bg-white/[0.06] hover:border-white/18"
      )}
    >
      <span className="text-white/80">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}

export function Shell({
  title,
  subtitle,
  children,
  mode = "auto",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  mode?: "auto" | Role;
}) {
  const router = useRouter();
  const [role, setRoleState] = React.useState<Role>("consumidor");

  React.useEffect(() => {
    setRoleState(getRole());
  }, []);

  const effectiveRole: Role = mode === "auto" ? role : mode;

  const menus: Record<Role, Array<{ href: string; label: string; icon: React.ReactNode }>> = {
    consumidor: [
      { href: "/home", label: "Home", icon: <Home className="w-4 h-4" /> },
      { href: "/reservas/mis-reservas", label: "Mis reservas", icon: <CalendarDays className="w-4 h-4" /> },
    ],
    vendedor: [
      { href: "/vendedor/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
      { href: "/vendedor/perfil", label: "Mi tienda", icon: <Store className="w-4 h-4" /> },
      { href: "/vendedor/publicar", label: "Publicar", icon: <PlusSquare className="w-4 h-4" /> },
      { href: "/vendedor/servicios", label: "Servicios", icon: <Store className="w-4 h-4" /> },
      { href: "/vendedor/reservas", label: "Reservas", icon: <CalendarDays className="w-4 h-4" /> },
    ],
    influencer: [
      { href: "/influencer/home", label: "Explorar", icon: <Users className="w-4 h-4" /> },
      { href: "/influencer/publicar", label: "Publicar", icon: <PlusSquare className="w-4 h-4" /> },
      { href: "/influencer/perfil", label: "Perfil", icon: <User2 className="w-4 h-4" /> },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-12 pt-10 pb-20">
      <header className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/60 border border-white/14 bg-white/[0.05] px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-white/75" />
            Vita demo • glass
          </div>
          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
            {title}
          </h1>
          {subtitle ? <p className="mt-3 text-white/65 max-w-2xl">{subtitle}</p> : null}
        </div>

        {/* selector rol (solo demo) */}
        <div className="shrink-0">
          <div className="rounded-[22px] border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-2">
            <div className="flex gap-2">
              {(["consumidor", "vendedor", "influencer"] as Role[]).map((r) => {
                const active = r === effectiveRole;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleState(r);
                      // rutas por rol
                      router.push(
                        r === "consumidor"
                          ? "/home"
                          : r === "vendedor"
                          ? "/vendedor/dashboard"
                          : "/influencer/home"
                      );
                    }}
                    className={cn(
                      "h-10 px-4 rounded-full text-sm font-semibold border transition",
                      active
                        ? "border-white/28 bg-white text-black"
                        : "border-white/12 bg-white/[0.03] text-white/75 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside className="rounded-[28px] border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-4 h-fit">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 px-2">
            Navegación
          </div>
          <div className="mt-3 space-y-2">
            {menus[effectiveRole].map((m) => (
              <NavItem key={m.href} href={m.href} label={m.label} icon={m.icon} />
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-[12px] text-white/60">
            Demo front-only (localStorage). Todo clicable para presentar al socio.
          </div>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
