// src/lib/reservations.ts
// ✅ Front (Next) en :3001  →  Back (Nest) en :3000
// ✅ Usa NEXT_PUBLIC_API_URL en .env.local (ej: http://localhost:3000)

export type CreateReservationBody = {
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
};

type ApiErrorShape = { message?: string; error?: string };

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token"); // ⚠️ cambia si tu key es otra
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  // ✅ si tu backend usa Bearer, esto es correcto
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...init, headers });
  const json = await safeJson(res);

  if (!res.ok) {
    const msg =
      (json as ApiErrorShape)?.message ||
      (json as ApiErrorShape)?.error ||
      `Error (${res.status})`;
    throw new Error(msg);
  }

  return (json ?? ({} as T)) as T;
}

/**
 * ✅ POST http://localhost:3000/reservations
 */
export const createReservation = async (data: CreateReservationBody) => {
  return apiFetch<any>("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * ✅ PATCH http://localhost:3000/reservations/:id/cancel
 */
export const cancelReservation = async (id: string) => {
  return apiFetch<any>(`/reservations/${id}/cancel`, {
    method: "PATCH",
  });
};
