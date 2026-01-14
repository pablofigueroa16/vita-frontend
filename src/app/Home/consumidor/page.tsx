"use client";

import * as React from "react";

/* ================= UTIL ================= */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= TYPES ================= */
type TabKey = "para-ti" | "explorar" | "siguiendo";

/* ================= PAGE ================= */
export default function HomeConsumidor() {
  const [tab, setTab] = React.useState<TabKey>("para-ti");

  return (
    <main className="relative mx-auto flex w-full justify-center py-14">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-6">

        {/* ================= CAROUSEL / HERO ================= */}
        <div className="relative w-full h-[210px] rounded-[26px] overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
          <img
            src="https://i.pinimg.com/1200x/63/2d/24/632d2468cfd6497e75c3c6e82c77dc07.jpg"
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs tracking-wide text-white/70">
              VITA • MARKETPLACE
            </p>
            <h2 className="text-xl font-semibold">
              Descubre, mira y compra en segundos
            </h2>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-1 rounded-full bg-white/10 p-1 backdrop-blur-xl border border-white/20">
          <TabButton
            active={tab === "para-ti"}
            onClick={() => setTab("para-ti")}
          >
            Para ti
          </TabButton>
          <TabButton
            active={tab === "explorar"}
            onClick={() => setTab("explorar")}
          >
            Explorar
          </TabButton>
          <TabButton
            active={tab === "siguiendo"}
            onClick={() => setTab("siguiendo")}
          >
            Siguiendo
          </TabButton>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="w-full flex justify-center pt-2">
          {tab === "para-ti" && (
            <Reel
              label="Para ti"
              videoSrc="/Daddy.MP4"
              likes="12.4K"
              comments="320"
            />
          )}

          {tab === "explorar" && (
            <Reel
              label="Explorar"
              videoSrc="/Daddy.MP4"
              likes="8.9K"
              comments="210"
            />
          )}

          {tab === "siguiendo" && (
            <Reel
              label="Siguiendo"
              videoSrc="/Daddy.MP4"
              likes="3.2K"
              comments="98"
            />
          )}
        </div>
      </div>
    </main>
  );
}

/* ================= TAB BUTTON ================= */
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
          ? "bg-white text-black font-semibold"
          : "text-white/70 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

/* ================= REEL ================= */
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
    <div
      className={cn(
        "relative w-[360px] h-[640px] rounded-[34px] overflow-hidden",
        "bg-white/[0.06] backdrop-blur-xl",
        "border border-white/20 ring-1 ring-white/10"
      )}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* label */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
        {label}
      </div>

      {/* actions */}
      <div className="absolute right-4 bottom-6 flex flex-col items-center gap-4 text-white">
        <span className="text-sm">❤️ {likes}</span>
        <span className="text-sm">💬 {comments}</span>
      </div>
    </div>
  );
}
