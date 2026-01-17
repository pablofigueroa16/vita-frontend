// src/lib/reservations.ts
// ✅ Front (Next) en :3001  →  Back en :3000
// ✅ Usa NEXT_PUBLIC_API_URL en .env.local (ej: http://localhost:3000)

export type CreateReservationBody = {
  customerName: string;
  customerEmail: string;
  providerId: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  endTime: string;    // HH:MM
};

export type ReservationResponse = any;

type ApiErrorShape = { message?: string; error?: string };

/** Base URL del backend */
const API = process.env.NEXT_PUBLIC_API_URL;

/** Valida que exista NEXT_PUBLIC_API_URL */
function assertApi() {
  if (!API) {
    throw new Error(
      "Falta NEXT_PUBLIC_API_URL. Crea .env.local con NEXT_PUBLIC_API_URL=http://localhost:3000 y reinicia pnpm dev"
    );
  }
}

/** Lee token si tu backend usa Bearer Auth (opcional) */
function getToken() {
  if (typeof window === "undefined") return null;
  // ⚠️ cambia la key si tú guardas el token con otro nombre
  return localStorage.getItem("token");
}

/** Parsea JSON sin romper si el backend devuelve vacío */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * ✅ fetch “pro” para tu API:
 * - agrega Content-Type
 * - agrega Authorization si hay token
 * - maneja errores con mensaje del backend si existe
 */
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  assertApi();

  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  // ✅ Si tu backend usa JWT/Bearer:
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers,
    // ✅ activa si tu backend usa cookies/sesión:
    // credentials: "include",
  });

  const json = await safeJson(res);

  if (!res.ok) {
    const msg =
      (json as ApiErrorShape)?.message ||
      (json as ApiErrorShape)?.error ||
      `Error (${res.status})`;
    throw new Error(msg);
  }

  // si el backend no devuelve body, devolvemos {} para no romper
  return (json ?? ({} as T)) as T;
}

/**
 * ✅ EXACTAMENTE el estilo que te pidieron (pero corregido)
 * - usa template string bien: `${...}`
 * - maneja errores
 * - soporta token (opcional)
 */
export const createReservation = async (data: CreateReservationBody) => {
  return apiFetch<ReservationResponse>("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * ✅ Cancelar reserva
 * Endpoint asumido: PATCH /reservations/:id/cancel
 * (si tu backend usa otra ruta, dime y lo ajusto)
 */
export const cancelReservation = async (reservationId: string) => {
  return apiFetch<ReservationResponse>(`/reservations/${reservationId}/cancel`, {
    method: "PATCH",
  });
};

/**
 * ✅ (Opcional) Traer mis reservas del consumidor
 * Endpoint típico: GET /reservations/me  o  GET /reservations?customerEmail=...
 * Ajusta el path según tu backend.
 */
export const getMyReservations = async () => {
  return apiFetch<ReservationResponse>("/reservations/me", {
    method: "GET",
  });
};
