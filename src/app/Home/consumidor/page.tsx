"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  BadgeCheck,
  Flame,
  ArrowRight,
  Store,
  Scissors,
  Brush,
  Dumbbell,
  Smartphone,
  Star,
  Heart,
  Truck,
  RefreshCcw,
  Headphones,
  ChevronDown,
  X,
} from "lucide-react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TYPES ================= */
type TabKey = "para-ti" | "explorar" | "siguiendo";

type Category = {
  key: string;
  label: string;
  icon: any;
};

type Product = {
  id: string;
  name: string;
  price: string;
  store: string;
  badge?: string;
  img: string;
};

type Creator = {
  id: string;
  name: string;
  niche: string;
  avatar: string;
  verified?: boolean;
};

/* ================= DATA ================= */
const categories: Category[] = [
  { key: "belleza", label: "Belleza", icon: Sparkles },
  { key: "peluqueria", label: "Peluquería", icon: Brush },
  { key: "barberia", label: "Barbería", icon: Scissors },
  { key: "fitness", label: "Fitness", icon: Dumbbell },
  { key: "tech", label: "Tech", icon: Smartphone },
  { key: "productos", label: "Productos", icon: ShoppingBag },
];

const offers: Product[] = [
  {
    id: "p1",
    name: "Pomada Matte Pro",
    price: "$9.50",
    store: "Barbería Nova",
    badge: "Flash",
    img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&w=1200",
  },
  {
    id: "p2",
    name: "Shampoo Barber Clean",
    price: "$8.99",
    store: "Barbería Nova",
    badge: "Top",
    img: "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&w=1200",
  },
  {
    id: "p3",
    name: "Kit Glow Skin",
    price: "$12.40",
    store: "Vita Beauty",
    badge: "Premium",
    img: "https://images.pexels.com/photos/3373723/pexels-photo-3373723.jpeg?auto=compress&w=1200",
  },
];

const creators: Creator[] = [
  {
    id: "c1",
    name: "@laura.vita",
    niche: "Lifestyle • Fashion",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400",
    verified: true,
  },
  {
    id: "c2",
    name: "@street.vita",
    niche: "Streetwear • Drops",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=400",
    verified: true,
  },
  {
    id: "c3",
    name: "@fitvita",
    niche: "Fitness • Wellness",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=400",
    verified: false,
  },
  {
    id: "c4",
    name: "@beauty.vita",
    niche: "Beauty • Skincare",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=400",
    verified: true,
  },
  {
    id: "c5",
    name: "@tech.vita",
    niche: "Tech • Reviews",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=400",
    verified: false,
  },
];

/* ================= TOKENS UI ================= */
const R = "rounded-[26px]";
const GLASS =
  "bg-white/[0.06] border border-white/12 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]";
const GLASS_SOFT =
  "bg-white/[0.04] border border-white/10 backdrop-blur-2xl";
const BTN =
  "h-11 px-5 rounded-full font-semibold transition border border-white/14 bg-white/[0.06] hover:bg-white/[0.12]";
const TEXT_DIM = "text-white/60";

const HOVER_LED =
  "transition will-change-transform hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.60)]";

/* ================= PAGE ================= */
export default function HomeConsumidor() {
  const [tab, setTab] = React.useState<TabKey>("para-ti");

  const pathname = usePathname();
  const [openCats, setOpenCats] = React.useState(false);

  return (
    <main className="min-h-[100dvh] text-white">
      {/* padding-bottom grande para dock */}
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-10 pb-44">
        {/* ================= HERO ================= */}
        <section className={cn("overflow-hidden relative", GLASS, "rounded-[34px]")}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/[0.10] blur-[90px]" />
            <div className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-white/[0.08] blur-[110px]" />
            <div className="absolute left-1/2 bottom-[-160px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]" />
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=1600"
              alt="hero"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

            <div className="relative p-7 sm:p-10">
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/60 border border-white/14 bg-white/[0.05] px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-white/70" />
                Identidad verificada • pagos seguros • reputación
              </p>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
                Descubre. Mira. Compra.
                <br />
                Todo dentro de <span className="text-white">Vita</span>.
              </h1>

              <p className={cn("mt-4 max-w-2xl text-base sm:text-lg", TEXT_DIM)}>
                Marketplace + red social + reservas en un solo ecosistema.
                Experiencia premium estilo dark glass.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button className="h-12 px-6 rounded-full bg-white text-black font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2">
                  Explorar ahora <ArrowRight className="w-4 h-4" />
                </button>

                <button className={cn(BTN, "h-12 px-6")}>Ver ofertas</button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= NAVBAR MARKETPLACE (NEW) ================= */}
        <section className="mt-7">
          <div className="sticky top-4 z-40">
            <div className={cn(GLASS_SOFT, "rounded-[24px] px-3 py-3")}>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenCats((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 h-11 rounded-full",
                    "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
                    "hover:bg-white/[0.09] hover:border-white/22 transition"
                  )}
                  aria-expanded={openCats}
                >
                  <span className="text-sm font-semibold text-white/90">
                    Marketplace
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/70 transition",
                      openCats && "rotate-180"
                    )}
                  />
                </button>

                {/* Pills desktop */}
                <div className="hidden lg:flex items-center gap-2 overflow-hidden">
                  {categories.map((c) => {
                    const Icon = c.icon;
                    const href = `/Home/consumidor/marketplace/${c.key}`;
                    const active = pathname === href;

                    return (
                      <Link
                        key={c.key}
                        href={href}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 h-11 rounded-full border backdrop-blur-2xl transition",
                          active
                            ? "border-white/28 bg-white/[0.10] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)]"
                            : "border-white/12 bg-white/[0.05] text-white/80 hover:text-white hover:bg-white/[0.09] hover:border-white/22"
                        )}
                      >
                        <Icon className="w-4 h-4 text-white/75" />
                        <span className="text-sm font-semibold">{c.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="ml-auto hidden sm:flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                    Categorías
                  </span>
                </div>
              </div>

              {/* Dropdown grid */}
              {openCats && (
                <div className="mt-3">
                  <div className={cn(GLASS, "rounded-[22px] p-3")}>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                        Elige una categoría
                      </p>
                      <button
                        type="button"
                        onClick={() => setOpenCats(false)}
                        className="h-9 w-9 rounded-full border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] transition grid place-items-center"
                        aria-label="Cerrar"
                      >
                        <X className="w-4 h-4 text-white/80" />
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {categories.map((c) => {
                        const Icon = c.icon;
                        const href = `/Home/consumidor/marketplace/${c.key}`;
                        const active = pathname === href;

                        return (
                          <Link
                            key={c.key}
                            href={href}
                            onClick={() => setOpenCats(false)}
                            className={cn(
                              "group relative overflow-hidden rounded-[18px] border bg-white/[0.05] backdrop-blur-2xl px-3 py-3 transition",
                              active
                                ? "border-white/28 bg-white/[0.10]"
                                : "border-white/12 hover:bg-white/[0.09] hover:border-white/22"
                            )}
                          >
                            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                              <span className="absolute -left-14 -top-14 h-[220px] w-[220px] rounded-full bg-white/[0.10] blur-[70px]" />
                              <span className="absolute right-[-70px] bottom-[-70px] h-[260px] w-[260px] rounded-full bg-white/[0.07] blur-[90px]" />
                            </span>

                            <div className="relative flex items-center gap-2">
                              <div className="h-9 w-9 rounded-[14px] border border-white/10 bg-white/[0.05] grid place-items-center group-hover:bg-white/[0.08] transition">
                                <Icon className="w-4 h-4 text-white/80" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white/90">
                                  {c.label}
                                </p>
                                <p className="text-[11px] text-white/55">
                                  Abrir feed
                                </p>
                              </div>
                              <span className="ml-auto text-white/35 group-hover:text-white/70 transition font-semibold">
                                →
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-white/55 text-sm">
            Abre una categoría para ver su marketplace.
          </p>
        </section>

        {/* ================= MAIN GRID ================= */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          {/* LEFT */}
          <div className="min-w-0 space-y-10">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                    Ofertas
                  </p>
                  <h3 className="mt-2 text-xl font-semibold inline-flex items-center gap-2">
                    <Flame className="w-5 h-5 text-white/80" />
                    Imperdibles de hoy
                  </h3>
                </div>

                <button
                  className={cn(
                    BTN,
                    "bg-white/[0.05] border-white/12 hover:bg-white/[0.09] text-white/80"
                  )}
                >
                  Ver más
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <InfoChipModern icon={Truck} title="Envío rápido" desc="24–48h" />
                <InfoChipModern icon={RefreshCcw} title="Devolución" desc="7 días" />
                <InfoChipModern icon={Headphones} title="Soporte" desc="Chat en Vita" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {offers.map((p) => (
                <MiniProductCard key={p.id} p={p} />
              ))}
            </div>

            <div className={cn("relative overflow-hidden", GLASS_SOFT, R, "p-6")}>
              <div className="pointer-events-none absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full bg-white/[0.08] blur-[95px]" />
              <p className="relative font-semibold flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-white/80" />
                Confianza Vita
              </p>
              <p className="relative mt-2 text-sm text-white/60">
                Verificación, reputación y soporte dentro del ecosistema.
              </p>

              <div className="relative mt-4 flex flex-wrap gap-2">
                <Pill>
                  <ShieldCheck className="w-4 h-4" /> Verificada
                </Pill>
                <Pill>
                  <ShoppingBag className="w-4 h-4" /> Pago seguro
                </Pill>
                <Pill>
                  <Store className="w-4 h-4" /> Tiendas top
                </Pill>
              </div>
            </div>

            <CreatorsGrid creators={creators} />
          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-8 h-fit space-y-3">
            <div className={cn("flex gap-1 rounded-full p-1 w-fit", GLASS_SOFT)}>
              <TabButton active={tab === "para-ti"} onClick={() => setTab("para-ti")}>
                Para ti
              </TabButton>
              <TabButton active={tab === "explorar"} onClick={() => setTab("explorar")}>
                Explorar
              </TabButton>
              <TabButton active={tab === "siguiendo"} onClick={() => setTab("siguiendo")}>
                Siguiendo
              </TabButton>
            </div>

            <Reel
              label={tab === "para-ti" ? "Para ti" : tab === "explorar" ? "Explorar" : "Siguiendo"}
              videoSrc="/Daddy.MP4"
              likes={tab === "para-ti" ? "12.4K" : tab === "explorar" ? "8.9K" : "3.2K"}
              comments={tab === "para-ti" ? "320" : tab === "explorar" ? "210" : "98"}
            />
          </aside>
        </section>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2 rounded-full text-sm transition-all",
        active
          ? "bg-white text-black font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.18)]"
          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
      )}
    >
      {children}
    </button>
  );
}

function InfoChipModern({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden text-left",
        "rounded-[18px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl",
        "px-4 py-3",
        "transition will-change-transform",
        "hover:-translate-y-[2px] hover:border-white/22 hover:bg-white/[0.07]",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_24px_90px_rgba(0,0,0,0.55)]"
      )}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <span className="absolute -left-14 -top-14 h-[220px] w-[220px] rounded-full bg-white/[0.09] blur-[70px]" />
        <span className="absolute right-[-70px] bottom-[-70px] h-[260px] w-[260px] rounded-full bg-white/[0.06] blur-[90px]" />
      </span>

      <div className="relative flex items-center gap-3">
        <div className="h-10 w-10 rounded-[14px] grid place-items-center border border-white/10 bg-white/[0.05] group-hover:bg-white/[0.08] group-hover:border-white/16 transition">
          <Icon className="w-4 h-4 text-white/80 group-hover:text-white transition" />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-white/85 group-hover:text-white transition">
            {title}
          </p>
          <p className="text-[12px] text-white/55 group-hover:text-white/70 transition">
            {desc}
          </p>
        </div>

        <div className="ml-auto text-white/35 group-hover:text-white/70 transition text-sm font-semibold">
          →
        </div>
      </div>
    </button>
  );
}

function MiniProductCard({ p }: { p: Product }) {
  return (
    <button className={cn("group text-left overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.05]", HOVER_LED)}>
      <div className="relative h-[110px]">
        <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {p.badge && (
          <span className="absolute left-2 top-2 text-[10px] px-2 py-0.5 rounded-full border border-white/14 bg-white/[0.05] text-white/70">
            {p.badge}
          </span>
        )}
        <div className="absolute right-2 top-2 h-9 w-9 rounded-full border border-white/14 bg-white/[0.05] backdrop-blur grid place-items-center hover:bg-white/[0.10] transition">
          <Heart className="w-4 h-4 text-white/80" />
        </div>
      </div>

      <div className="p-3">
        <p className="text-white/90 font-semibold text-[13px] line-clamp-1">{p.name}</p>
        <p className="text-white/50 text-[11px] mt-1 line-clamp-1">{p.store}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-white font-semibold text-[13px]">{p.price}</span>
          <span className="text-[11px] text-white/55 font-semibold group-hover:text-white/80 transition">→</span>
        </div>
      </div>
    </button>
  );
}

function CreatorsGrid({ creators }: { creators: Creator[] }) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">Creadores</p>
          <h3 className="mt-2 text-xl font-semibold inline-flex items-center gap-2">
            <Star className="w-5 h-5 text-white/80" />
            Creadores en tendencia
          </h3>
        </div>

        <button className={cn(BTN, "bg-white/[0.05] border-white/12 hover:bg-white/[0.09] text-white/80")}>
          Ver más
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {creators.map((c) => (
          <CreatorTile key={c.id} c={c} />
        ))}
      </div>
    </section>
  );
}

function CreatorTile({ c }: { c: Creator }) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-[22px]",
        "border border-white/12 bg-white/[0.05] backdrop-blur-2xl",
        "transition will-change-transform hover:-translate-y-[3px]",
        "hover:bg-white/[0.08] hover:border-white/24",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_30px_110px_rgba(0,0,0,0.62)]"
      )}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <span className="absolute -left-16 -top-16 h-[220px] w-[220px] rounded-full bg-white/[0.10] blur-[70px]" />
        <span className="absolute right-[-70px] bottom-[-70px] h-[260px] w-[260px] rounded-full bg-white/[0.08] blur-[90px]" />
      </span>

      <div className="relative p-4 flex items-center gap-3">
        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover border border-white/12" />
        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold text-white/92 truncate flex items-center gap-2">
            {c.name}
            {c.verified && <BadgeCheck className="w-4 h-4 text-white/75" />}
          </p>
          <p className="text-[12px] text-white/55 truncate">{c.niche}</p>
        </div>
        <span className="ml-auto text-[12px] text-white/55 font-semibold group-hover:text-white/85 transition">Ver →</span>
      </div>
    </button>
  );
}

function Reel({
  videoSrc,
  likes,
  comments,
  label,
}: {
  videoSrc: string;
  likes: string;
  comments: string;
  label: string;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute left-6 top-8 h-[220px] w-[220px] rounded-full bg-white/[0.08] blur-[90px]" />
        <div className="absolute right-0 bottom-0 h-[260px] w-[260px] rounded-full bg-white/[0.06] blur-[110px]" />
      </div>

      <div
        className={cn(
          "relative w-full h-[620px] rounded-[34px] overflow-hidden",
          "bg-white/[0.06] backdrop-blur-xl",
          "border border-white/14 ring-1 ring-white/10",
          "hover:border-white/22 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_26px_110px_rgba(0,0,0,0.65)] transition"
        )}
      >
        <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/85" />

        <div className="absolute top-4 left-4 bg-white/[0.06] border border-white/14 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
          {label}
        </div>

        <div className="absolute right-4 bottom-6 flex flex-col items-center gap-3 text-white">
          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.06] backdrop-blur grid place-items-center hover:bg-white/[0.10] transition">❤️</div>
          <span className="text-xs text-white/80">{likes}</span>
          <div className="h-11 w-11 rounded-full border border-white/14 bg-white/[0.06] backdrop-blur grid place-items-center hover:bg-white/[0.10] transition">💬</div>
          <span className="text-xs text-white/80">{comments}</span>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.05] text-[12px] text-white/70">
      {children}
    </span>
  );
}
