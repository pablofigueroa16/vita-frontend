"use client";

import * as React from "react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function format(n: number) {
  return Intl.NumberFormat("es-CO", { notation: "compact" }).format(n);
}

/* ================= DATA ================= */
const heroCards = [
  {
    title: "Tu tienda está lista",
    desc: "Empieza a vender hoy",
    cta: "Ir a mi tienda",
    img: "https://i.pinimg.com/1200x/63/2d/24/632d2468cfd6497e75c3c6e82c77dc07.jpg",
  },
  {
    title: "Reels que venden",
    desc: "7x más conversión",
    cta: "Crear Reel",
    img: "https://i.pinimg.com/1200x/4c/8b/cc/4c8bccea4aee5e1c8a18c74cf5ee4dc8.jpg",
  },
  {
    title: "Tus ganancias",
    desc: "Retiros 24/7",
    cta: "Ver balance",
    img: "https://i.pinimg.com/1200x/b8/22/31/b82231fe913c96ad2c360dc73cb528e4.jpg",
  },
];

const videos = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  src: "/Daddy.MP4",
  likes: Math.floor(Math.random() * 12000),
}));

const products = [
  {
    title: "Producto Vita",
    price: "$89.000",
    img: "https://i.pinimg.com/736x/6f/ea/d7/6fead7032700b31efef07d6c628ca883.jpg",
  },
  {
    title: "Producto Pro",
    price: "$120.000",
    img: "https://i.pinimg.com/736x/03/54/8b/03548b784e8eb4e1f5bd8c78c0707380.jpg",
  },
  {
    title: "Edición limitada",
    price: "$159.000",
    img: "https://i.pinimg.com/736x/1e/8c/8d/1e8c8d76e57b4c7a4039ef289fbb45b2.jpg",
  },
];

/* ================= PAGE ================= */
export default function SellerHome() {
  const [tab, setTab] = React.useState<
    "para-ti" | "explorar" | "siguiendo"
  >("para-ti");

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white pb-40">
      {/* HERO */}
      <CarouselSection>
        {heroCards.map((c, i) => (
          <HeroCard key={i} {...c} />
        ))}
      </CarouselSection>

      {/* TABS */}
      <HomeTabs value={tab} onChange={setTab} />

      {/* PARA TI */}
      {tab === "para-ti" && (
        <CarouselSection title="Videos que venden hoy" cta="Ver analítica">
          {videos.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </CarouselSection>
      )}

      {/* EXPLORAR */}
      {tab === "explorar" && (
        <CarouselSection title="Productos destacados" cta="Ver inventario">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </CarouselSection>
      )}

      {/* SIGUIENDO */}
      {tab === "siguiendo" && (
        <CarouselSection title="Creadores que sigues" cta="Ver perfiles">
          {videos.slice(0, 4).map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </CarouselSection>
      )}

      {/* FINANZAS */}
      <section className="mt-16 px-4 max-w-6xl mx-auto">
        <FinanceGlass />
      </section>
    </main>
  );
}

/* ================= TABS ================= */
function HomeTabs({
  value,
  onChange,
}: {
  value: "para-ti" | "explorar" | "siguiendo";
  onChange: (v: "para-ti" | "explorar" | "siguiendo") => void;
}) {
  return (
    <div className="flex justify-center gap-6 mt-12 mb-6">
      {[
        { id: "para-ti", label: "Para ti" },
        { id: "explorar", label: "Explorar" },
        { id: "siguiendo", label: "Siguiendo" },
      ].map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id as any)}
          className={cn(
            "px-6 py-2 rounded-full text-sm backdrop-blur-xl transition",
            value === t.id
              ? "bg-white/25 ring-1 ring-white/40"
              : "bg-white/10 text-white/60 hover:text-white"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ================= CAROUSEL ================= */
function CarouselSection({
  title,
  cta,
  children,
}: {
  title?: string;
  cta?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-14">
      {(title || cta) && (
        <div className="max-w-6xl mx-auto px-4 flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          {cta && (
            <button className="text-sm text-white/70 hover:text-white underline">
              {cta}
            </button>
          )}
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        <GlassArrow left onClick={() => scroll("left")} />
        <div
          ref={ref}
          className="flex gap-6 px-12 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {children}
        </div>
        <GlassArrow onClick={() => scroll("right")} />
      </div>
    </section>
  );
}

/* ================= GLASS ================= */
function Glass({ className, children }: any) {
  return (
    <div
      className={cn(
        "backdrop-blur-2xl bg-white/[0.14] border border-white/25 ring-1 ring-white/30",
        className
      )}
    >
      {children}
    </div>
  );
}

function GlassArrow({
  left,
  onClick,
}: {
  left?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full",
        "backdrop-blur-xl bg-white/10 hover:bg-white/20",
        "border border-white/30 text-white transition",
        left ? "left-2" : "right-2"
      )}
    >
      {left ? "‹" : "›"}
    </button>
  );
}

/* ================= CARDS ================= */
function HeroCard({ title, desc, cta, img }: any) {
  return (
    <Glass className="relative w-[340px] h-[190px] rounded-3xl overflow-hidden shrink-0">
      <img src={img} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative p-4 flex flex-col h-full justify-between">
        <div>
          <div className="text-xs text-white/70">{desc}</div>
          <div className="text-lg font-semibold">{title}</div>
        </div>
        <button className="self-start px-4 py-1 rounded-full bg-white/25 text-sm">
          {cta}
        </button>
      </div>
    </Glass>
  );
}

function VideoCard({ src, likes }: any) {
  return (
    <Glass className="w-[230px] rounded-3xl shrink-0 overflow-hidden">
      <video
        src={src}
        muted
        loop
        autoPlay
        playsInline
        className="h-[320px] w-full object-cover"
      />
      <div className="p-3 text-sm">❤ {format(likes)}</div>
    </Glass>
  );
}

function ProductCard({ title, price, img }: any) {
  return (
    <Glass className="w-[230px] rounded-3xl p-3 shrink-0">
      <img src={img} className="h-40 w-full rounded-xl object-cover mb-3" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-white/60">{price}</div>
      <button className="mt-2 text-xs px-3 py-1 rounded-full bg-white/25">
        Editar
      </button>
    </Glass>
  );
}

function FinanceGlass() {
  return (
    <Glass className="rounded-3xl p-6 flex justify-between items-center">
      <div>
        <div className="text-xs text-white/60">Balance disponible</div>
        <div className="text-2xl font-semibold">$1.240.000</div>
      </div>
      <button className="px-5 py-2 rounded-full bg-white/30">
        Retirar
      </button>
    </Glass>
  );
}
