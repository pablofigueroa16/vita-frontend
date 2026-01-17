export type Role = "consumidor" | "vendedor" | "influencer";
export type Category = "belleza" | "peluqueria" | "barberia" | "fitness" | "tech" | "productos";

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
};

export type Store = {
  id: string;
  ownerId: string; // vendedor userId
  slug: string;
  name: string;
  category: Category;
  bio: string;
  hero: string;
  avatar: string;
};

export type Post = {
  id: string;
  storeId: string;
  caption: string;
  images: string[];
  createdAt: string;
};

export type Service = {
  id: string;
  storeId: string;
  title: string;
  price: number;
  durationMin: number;
  desc: string;
  images: string[];
  active: boolean;
};

export type ReservationStatus = "pendiente" | "confirmada" | "cancelada";

export type Reservation = {
  id: string;
  storeId: string;
  serviceId: string;
  consumerId: string;

  fullName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm

  status: ReservationStatus;
  createdAt: string;
};
