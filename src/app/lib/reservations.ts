// src/lib/reservations.ts
// ✅ Front: http://localhost:3001
// ✅ Back:  http://localhost:3000  (NEXT_PUBLIC_API_URL)

export type CreateReservationBody = {
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  endTime: string;    // HH:MM
};

type ApiErrorShape = { message?: string; error?: string };
export type ReservationResponse = any;

const API = process.env.NEXT_PUBLIC_API_URL;

function assertApi() {
  if (!API) {
    throw new Error(
      "Falta NEXT_PUBLIC_API_URL. Crea .env.local con NEXT_PUBLIC_API_URL=http://localhost:3000 y reinicia pnpm dev"
    );
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token"); // cambia si usas otra key
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  assertApi();

  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  // Si tu backend usa Bearer:
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers,
  });

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

// ✅ POST http://localhost:3000/reservations
export const createReservation = async (data: CreateReservationBody) => {
  return apiFetch<ReservationResponse>("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// ✅ PATCH http://localhost:3000/reservations/:id/cancel
export const cancelReservation = async (id: string) => {
  if (!id) throw new Error("Falta id de reserva");
  return apiFetch<ReservationResponse>(`/reservations/${id}/cancel`, {
    method: "PATCH",
  });
};
