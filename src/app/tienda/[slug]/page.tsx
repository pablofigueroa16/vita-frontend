"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { GlassCard, GlassSoft } from "@/components/Glass";
import { PostGrid } from "@/components/PostGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { ReserveModal } from "@/components/ReserveModal";
import { initDb, getMe, getStoreBySlug, listPostsByStore, listServicesByStore, createReservation, saveDb } from "@/app/lib/store";
import type { Post, Service } from "@/app/lib/types";

export default function StorePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = (params?.slug ?? "").toString();

  const [db, setDb] = React.useState(() => initDb());
  const store = getStoreBySlug(db, slug);

  const [tab, setTab] = React.useState<"posts" | "servicios">("posts");
  const [openPost, setOpenPost] = React.useState<Post | null>(null);
  const [reserveService, setReserveService] = React.useState<Service | null>(null);

  if (!store) {
    return (
      <Shell title="Tienda no encontrada" subtitle="Revisa el slug.">
        <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-6">404</div>
      </Shell>
    );
  }

  const posts = listPostsByStore(db, store.id);
  const services = listServicesByStore(db, store.id);

  return (
    <Shell title={store.name} subtitle={store.bio}>
      <GlassCard className="overflow-hidden">
        <div className="relative">
          <img src={store.hero} alt={store.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="relative p-7 lg:p-10">
            <button
              onClick={() => router.back()}
              className="h-11 px-4 rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-2xl text-white/90 hover:bg-white/[0.09] transition"
            >
              Volver
            </button>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-white/70 text-sm">/{store.slug}</p>
                <p className="mt-1 text-white font-semibold text-2xl lg:text-3xl">{store.name}</p>
              </div>

              <div className="rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-2xl p-1">
                <button
                  onClick={() => setTab("posts")}
                  className={`h-10 px-4 rounded-full text-sm font-semibold transition ${
                    tab === "posts" ? "bg-white text-black" : "text-white/75 hover:text-white"
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setTab("servicios")}
                  className={`h-10 px-4 rounded-full text-sm font-semibold transition ${
                    tab === "servicios" ? "bg-white text-black" : "text-white/75 hover:text-white"
                  }`}
                >
                  Servicios
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="mt-6">
        {tab === "posts" ? (
          <GlassSoft className="p-5">
            <div className="flex items-center justify-between px-1">
              <p className="text-white/80 font-semibold">Feed IG (9)</p>
              <p className="text-[12px] text-white/55">click para ver</p>
            </div>
            <div className="mt-5">
              <PostGrid posts={posts} onOpen={(p) => setOpenPost(p)} />
            </div>
          </GlassSoft>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((s) => (
              <ServiceCard key={s.id} s={s} onReserve={() => setReserveService(s)} />
            ))}
          </div>
        )}
      </div>

      {/* modal reserva */}
      {reserveService ? (
        <ReserveModal
          open={!!reserveService}
          onClose={() => setReserveService(null)}
          store={store}
          service={reserveService}
          onConfirm={({ fullName, email, date, time }) => {
            const me = getMe(db);
            const next = createReservation(db, {
              storeId: store.id,
              serviceId: reserveService.id,
              consumerId: me.id,
              fullName,
              email,
              date,
              time,
            });
            setDb(next);
            saveDb(next);
            setReserveService(null);
            router.push("/reservas/mis-reservas");
          }}
        />
      ) : null}

      {/* simple viewer post */}
      {openPost ? (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/75" onClick={() => setOpenPost(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl rounded-[28px] border border-white/12 bg-white/[0.06] backdrop-blur-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <p className="text-white font-semibold line-clamp-1">{openPost.caption}</p>
                <button
                  className="h-10 px-4 rounded-full border border-white/12 bg-white/[0.05] text-white/80 hover:bg-white/[0.08] transition"
                  onClick={() => setOpenPost(null)}
                >
                  Cerrar
                </button>
              </div>
              <div className="p-4">
                <div className="aspect-[16/10] rounded-[22px] overflow-hidden border border-white/12 bg-white/5">
                  <img src={openPost.images[0]} alt={openPost.caption} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}
