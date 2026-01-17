"use client";

import type { Post, Reservation, Service, Store, User, Role, ReservationStatus, Category } from "./types";
import { DEMO_USERS, seedPosts, seedReservations, seedServices, seedStores } from "./mockDb";

type DB = {
  users: Record<Role, User>;
  stores: Store[];
  posts: Post[];
  services: Service[];
  reservations: Reservation[];
};

const KEY = "vita_demo_db_v1";
const ROLE_KEY = "vita_demo_role_v1";

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try { return JSON.parse(s) as T; } catch { return null; }
}

export function initDb(): DB {
  if (typeof window === "undefined") {
    // SSR safety fallback
    const stores = seedStores();
    return {
      users: DEMO_USERS,
      stores,
      posts: seedPosts(stores),
      services: seedServices(stores),
      reservations: seedReservations(),
    };
  }

  const existing = safeParse<DB>(localStorage.getItem(KEY));
  if (existing) return existing;

  const stores = seedStores();
  const db: DB = {
    users: DEMO_USERS,
    stores,
    posts: seedPosts(stores),
    services: seedServices(stores),
    reservations: seedReservations(),
  };
  localStorage.setItem(KEY, JSON.stringify(db));
  return db;
}

export function saveDb(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function getRole(): Role {
  if (typeof window === "undefined") return "consumidor";
  return (localStorage.getItem(ROLE_KEY) as Role) || "consumidor";
}

export function setRole(role: Role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getMe(db: DB): User {
  return db.users[getRole()];
}

/* ====== queries ====== */
export function listStores(db: DB, category?: Category) {
  return category ? db.stores.filter((s) => s.category === category) : db.stores;
}

export function getStoreBySlug(db: DB, slug: string) {
  return db.stores.find((s) => s.slug === slug) ?? null;
}

export function listPostsByStore(db: DB, storeId: string) {
  return db.posts.filter((p) => p.storeId === storeId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listServicesByStore(db: DB, storeId: string) {
  return db.services.filter((s) => s.storeId === storeId && s.active);
}

export function getService(db: DB, serviceId: string) {
  return db.services.find((s) => s.id === serviceId) ?? null;
}

export function listReservationsForVendor(db: DB, ownerId: string) {
  const storeIds = new Set(db.stores.filter((s) => s.ownerId === ownerId).map((s) => s.id));
  return db.reservations.filter((r) => storeIds.has(r.storeId)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listReservationsForConsumer(db: DB, consumerId: string) {
  return db.reservations.filter((r) => r.consumerId === consumerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/* ====== mutations ====== */
export function createPost(db: DB, storeId: string, caption: string, images: string[]): DB {
  const post = {
    id: `po-${Math.random().toString(16).slice(2)}-${Date.now()}`,
    storeId,
    caption,
    images,
    createdAt: new Date().toISOString(),
  };
  const next = { ...db, posts: [post, ...db.posts] };
  saveDb(next);
  return next;
}

export function createService(db: DB, storeId: string, input: Omit<Service, "id" | "storeId" | "images"> & { images: string[] }): DB {
  const sv: Service = {
    id: `sv-${Math.random().toString(16).slice(2)}-${Date.now()}`,
    storeId,
    title: input.title,
    price: input.price,
    durationMin: input.durationMin,
    desc: input.desc,
    images: input.images,
    active: input.active,
  };
  const next = { ...db, services: [sv, ...db.services] };
  saveDb(next);
  return next;
}

export function setReservationStatus(db: DB, reservationId: string, status: ReservationStatus): DB {
  const nextRes = db.reservations.map((r) => (r.id === reservationId ? { ...r, status } : r));
  const next = { ...db, reservations: nextRes };
  saveDb(next);
  return next;
}

export function createReservation(db: DB, r: Omit<Reservation, "id" | "createdAt" | "status">): DB {
  const reservation: Reservation = {
    id: `rs-${Math.random().toString(16).slice(2)}-${Date.now()}`,
    ...r,
    status: "pendiente",
    createdAt: new Date().toISOString(),
  };
  const next = { ...db, reservations: [reservation, ...db.reservations] };
  saveDb(next);
  return next;
}
