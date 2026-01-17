import { buildImageSet, heroImage } from "./images";
import type { Category, Post, Service, Store, User, Reservation } from "./types";

export const DEMO_USERS: Record<string, User> = {
  consumidor: { id: "u-cons-1", role: "consumidor", name: "Laura (Consumidor)", email: "laura@demo.com" },
  vendedor: { id: "u-vend-1", role: "vendedor", name: "Laura (Vendedor)", email: "laura@demo.com" },
  influencer: { id: "u-inf-1", role: "influencer", name: "Laura (Influencer)", email: "laura@demo.com" },
};

export const CATEGORIES: Array<{ key: Category; title: string; chip: string }> = [
  { key: "belleza", title: "Belleza", chip: "Skincare, uñas, estética" },
  { key: "peluqueria", title: "Peluquería", chip: "Corte, color, styling" },
  { key: "barberia", title: "Barbería", chip: "Fade, barba, pro" },
  { key: "fitness", title: "Fitness", chip: "Wellness, rutinas" },
  { key: "tech", title: "Tech", chip: "Gadgets y drops" },
  { key: "productos", title: "Productos", chip: "Marketplace" },
];

export function seedStores(): Store[] {
  const mk = (slug: string, name: string, category: Category, q: string): Store => ({
    id: `st-${slug}`,
    ownerId: DEMO_USERS.vendedor.id,
    slug,
    name,
    category,
    bio: "Portafolio premium. Reserva en 2 taps. Estética glass.",
    hero: heroImage(`${q} modern studio aesthetic`),
    avatar: heroImage(`${q} logo minimal`),
  });

  return [
    mk("laura-nails", "LAURA NAILS", "belleza", "manicure nails salon"),
    mk("vita-beauty", "VITA BEAUTY", "belleza", "skincare beauty product"),
    mk("nova-barber", "BARBERÍA NOVA", "barberia", "barbershop fade"),
    mk("pelu-nova", "PELUQUERÍA NOVA", "peluqueria", "hair salon styling"),
    mk("fit-vita", "FIT VITA", "fitness", "fitness wellness gym"),
    mk("tech-vita", "TECH VITA", "tech", "technology gadgets minimal"),
  ];
}

export function seedPosts(stores: Store[]): Post[] {
  const now = new Date();
  return stores.flatMap((s) => {
    const baseQ = `${s.category} ${s.name} premium aesthetic`;
    return Array.from({ length: 9 }).map((_, i) => ({
      id: `po-${s.slug}-${i + 1}`,
      storeId: s.id,
      caption: `${s.name} • post #${i + 1}`,
      images: buildImageSet(`${baseQ} photo ${i + 1}`),
      createdAt: new Date(now.getTime() - i * 3600_000).toISOString(),
    }));
  });
}

export function seedServices(stores: Store[]): Service[] {
  const byCat: Record<string, Array<{ title: string; q: string; price: number; dur: number }>> = {
    belleza: [
      { title: "Manicure premium", q: "manicure nails luxury", price: 18.99, dur: 60 },
      { title: "Uñas gel", q: "gel nails minimal", price: 24.5, dur: 75 },
      { title: "Pedicure", q: "pedicure spa", price: 22.0, dur: 60 },
    ],
    barberia: [
      { title: "Fade + barba", q: "barber fade beard", price: 14.99, dur: 45 },
      { title: "Barba pro", q: "beard grooming", price: 10.5, dur: 30 },
    ],
    peluqueria: [
      { title: "Corte + styling", q: "haircut styling", price: 16.99, dur: 45 },
      { title: "Color premium", q: "hair color salon", price: 34.99, dur: 90 },
    ],
    fitness: [
      { title: "Clase 1:1", q: "personal training", price: 19.99, dur: 60 },
      { title: "Evaluación", q: "fitness assessment", price: 12.5, dur: 30 },
    ],
    tech: [
      { title: "Setup creator", q: "creator desk setup", price: 29.99, dur: 60 },
    ],
    productos: [
      { title: "Kit premium", q: "premium product kit", price: 9.99, dur: 0 },
    ],
  };

  return stores.flatMap((s) => {
    const list = byCat[s.category] ?? byCat.productos;
    return list.map((it, i) => ({
      id: `sv-${s.slug}-${i + 1}`,
      storeId: s.id,
      title: it.title,
      price: it.price,
      durationMin: it.dur,
      desc: "Servicio curado. Reserva rápida. Experiencia premium.",
      images: buildImageSet(`${it.q} ${s.name} aesthetic`),
      active: true,
    }));
  });
}

export function seedReservations(): Reservation[] {
  return [];
}
