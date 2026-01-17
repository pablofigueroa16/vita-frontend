// src/lib/localReservation.ts
export type StoredReservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status?: "ACTIVE" | "CANCELED" | "COMPLETED" | string;
  createdAt?: number;
};

const KEY_LAST_RES = "vita_last_reservation_v1";
const KEY_LAST_EMAIL = "vita_last_customer_email_v1";

export function saveLastReservation(data: StoredReservation) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LAST_RES, JSON.stringify(data));
  if (data.customerEmail) localStorage.setItem(KEY_LAST_EMAIL, data.customerEmail);
}

export function loadLastReservation(): StoredReservation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY_LAST_RES);
    if (!raw) return null;
    return JSON.parse(raw) as StoredReservation;
  } catch {
    return null;
  }
}

export function updateLastReservation(patch: Partial<StoredReservation>) {
  const current = loadLastReservation();
  if (!current) return;
  saveLastReservation({ ...current, ...patch });
}

export function clearLastReservation() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_LAST_RES);
}

export function loadLastEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEY_LAST_EMAIL) ?? "";
}

export function saveLastEmail(email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LAST_EMAIL, email);
}
