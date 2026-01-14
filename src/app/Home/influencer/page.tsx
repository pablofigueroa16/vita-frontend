"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TYPES ================= */
type CardItem = {
  id: string;
  title: string;
  author?: string;
  imageSrc: string;
  onClick?: () => void;
  kicker?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaHint?: string;
  trackId?: string;
};

type ReelItem = {
  id: string;
  user: string;
  displayName?: string;
  avatarSrc: string;
  profileHref: string;
  likes: number;
  comments: number;
  videoSrc: string;
};

/* ================= CONSTANTS ================= */
const REEL_W = 360;
const REEL_H = Math.round(REEL_W * (16 / 9));
const GAP_X = 26;
const CAROUSEL_W = 980;
const CAROUSEL_CARD_W = 360;
const CAROUSEL_GAP = 18;

/* ================= PAGE ================= */
export default function Page() {
  const router = useRouter();

  /* ================= DATA ================= */
  const topCards: CardItem[] = [
    {
      id: "ad1",
      kicker: "ANUNCIO • VITA MARKET",
      title: "Crea tu tienda en 3 minutos. Sin Wix.",
      author: "Vita AI",
      imageSrc:
        "https://i.pinimg.com/1200x/63/2d/24/632d2468cfd6497e75c3c6e82c77dc07.jpg",
      ctaLabel: "Crear tienda",
      ctaHint: "Toma 2 min",
      ctaHref: "/seller/onboarding",
      onClick: () => router.push("/seller/onboarding"),
    },
    {
      id: "ad2",
      kicker: "ANUNCIO • VITA REELS",
      title: "Etiqueta productos en Reels y sube tu conversión.",
      author: "Vita Market",
      imageSrc:
        "https://i.pinimg.com/1200x/4c/8b/cc/4c8bccea4aee5e1c8a18c74cf5ee4dc8.jpg",
      ctaLabel: "Activar tags",
      ctaHint: "Se configura 1 vez",
      ctaHref: "/seller/integrations",
      onClick: () => router.push("/seller/integrations"),
    },
    {
      id: "ad3",
      kicker: "ANUNCIO • VITA CARD",
      title: "Retira ganancias fácil. Pagos listos 24/7.",
      author: "Vita Finance",
      imageSrc:
        "https://i.pinimg.com/1200x/b8/22/31/b82231fe913c96ad2c360dc73cb528e4.jpg",
      ctaLabel: "Ver finanzas",
      ctaHint: "Balance y retiros",
      ctaHref: "/wallet",
      onClick: () => router.push("/wallet"),
    },
  ];

  const reels: ReelItem[] = [
    {
      id: "r1",
      user: "@laura.vita",
      displayName: "Laura",
      avatarSrc:
        "",
      profileHref: "/perfil/laura-vita",
      likes: 12400,
      comments: 320,
      videoSrc: "/Daddy.MP4",
    },
    {
      id: "r2",
      user: "@vita.studio",
      displayName: "Vita Studio",
      avatarSrc:
        "https://i.pinimg.com/1200x/bc/8b/ad/bc8badc2e228c450fdd19c72c5cf9738.jpg",
      profileHref: "/perfil/vita-studio",
      likes: 9100,
      comments: 210,
      videoSrc: "/Daddy.MP4",
    },
  ];

  /* ================= STATE ================= */
  const [reelIndex, setReelIndex] = React.useState(0);
  const current = reels[reelIndex];
  const prevReel = () =>
    setReelIndex((i) => (i - 1 + reels.length) % reels.length);
  const nextReel = () =>
    setReelIndex((i) => (i + 1) % reels.length);

  /* ================= RENDER ================= */
  return (
    <main className="relative mx-auto flex w-full justify-center py-14 mb-18">
      <div className="flex w-full flex-col items-center gap-6">

        {/* ================= CAROUSEL ================= */}
        <TopCardsCarousel
          items={topCards}
          width={CAROUSEL_W}
          cardW={CAROUSEL_CARD_W}
          gap={CAROUSEL_GAP}
        />

        {/* ================= REEL ================= */}
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: `72px ${REEL_W}px 72px`,
            columnGap: GAP_X,
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <GlassCircleButton onClick={prevReel}>
              <ChevronUp />
            </GlassCircleButton>
            <GlassCircleButton onClick={nextReel}>
              <ChevronDown />
            </GlassCircleButton>
          </div>

          <div
            className={cn(
              "relative overflow-hidden rounded-[34px]",
              "bg-white/[0.06] backdrop-blur-md",
              "border border-white/15 ring-1 ring-white/10"
            )}
            style={{ width: REEL_W, height: REEL_H }}
          >
            <video
              key={current.videoSrc}
              src={current.videoSrc}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="flex flex-col items-center gap-3 text-white/70">
            ❤ {format(current.likes)}
            💬 {format(current.comments)}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= HELPERS ================= */
function format(n: number) {
  return Intl.NumberFormat("es-CO", { notation: "compact" }).format(n);
}

/* ================= UI ================= */
function GlassCircleButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-11 w-11 rounded-full grid place-items-center bg-white/[0.08] border border-white/15 text-white/80"
    >
      {children}
    </button>
  );
}

/* ================= CAROUSEL ================= */
function TopCardsCarousel({
  items,
  width,
  cardW,
  gap,
}: {
  items: CardItem[];
  width: number;
  cardW: number;
  gap: number;
}) {
  const [i, setI] = React.useState(0);
  const x = -i * (cardW + gap);

  return (
    <div className="relative overflow-hidden" style={{ width }}>
      <div
        className="flex transition-transform duration-500"
        style={{ gap, transform: `translateX(${x}px)` }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            role="button"
            tabIndex={0}
            onClick={it.onClick}
            className="relative shrink-0 rounded-[22px] overflow-hidden cursor-pointer"
            style={{ width: cardW, height: 210 }}
          >
            <img
              src={it.imageSrc}
              alt={it.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-sm font-semibold">{it.title}</div>
              {it.author && (
                <div className="text-xs text-white/60">{it.author}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2"
        onClick={() => setI((v) => Math.max(0, v - 1))}
      >
        ◀
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setI((v) => Math.min(items.length - 1, v + 1))}
      >
        ▶
      </button>
    </div>
  );
}

/* ================= ICONS ================= */
function ChevronUp() {
  return <span>▲</span>;
}
function ChevronDown() {
  return <span>▼</span>;
}
