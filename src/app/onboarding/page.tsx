"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./onboarding.module.css";

type AuthMode = "register" | "login";

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

const STORAGE_KEY = "vita.appToken";
const REMEMBER_EMAIL_KEY = "vita.rememberEmail";
const API_PREFIX = "/api/vita";

function safeJsonParse(text: string): unknown {
  try {
    return text ? (JSON.parse(text) as unknown) : null;
  } catch {
    return text;
  }
}

function errorToMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Error desconocido";
  }
}

async function apiRequest<T>(
  path: string,
  init: RequestInit,
  token?: string
): Promise<{ ok: true; data: T } | { ok: false; error: string; details?: unknown }> {
  const headers = new Headers(init.headers);
  headers.set("accept", "application/json");
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (token) headers.set("authorization", `Bearer ${token}`);

  const res = await fetch(`${API_PREFIX}${path}`,
    {
      ...init,
      headers,
      cache: "no-store",
    }
  );

  const text = await res.text();
  const parsed = safeJsonParse(text);

  if (!res.ok) {
    const msg =
      typeof parsed === "object" && parsed !== null && "message" in parsed
        ? String((parsed as { message?: unknown }).message)
        : typeof parsed === "string"
          ? parsed
          : res.statusText || `HTTP ${res.status}`;

    return { ok: false, error: msg, details: parsed };
  }

  return { ok: true, data: parsed as T };
}

function maskToken(token: string): string {
  if (token.length < 18) return token;
  return `${token.slice(0, 10)}…${token.slice(-8)}`;
}

type LoginResponse = { appToken?: string; user?: unknown; cognito?: unknown };
type KycInitiateResponse = { sessionId?: string; url?: string };
type KycStatusResponse = {
  status?: string;
  diditVerificationUrl?: string | null;
  diditSessionId?: string | null;
};

function IconUser({ title }: { title?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 13a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconEye({ off, title }: { off?: boolean; title?: string }) {
  return off ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.7 10.7A2.5 2.5 0 0 0 12 14.5a2.5 2.5 0 0 0 2.3-3.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.4 6.4C4.6 7.8 3.3 9.7 2.5 12c1.8 5.1 5.9 8 9.5 8 1.6 0 3.3-.6 4.9-1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.2 4.5A9.2 9.2 0 0 1 12 4c3.6 0 7.7 2.9 9.5 8a12.2 12.2 0 0 1-3.1 4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M2.5 12C4.3 6.9 8.4 4 12 4s7.7 2.9 9.5 8c-1.8 5.1-5.9 8-9.5 8s-7.7-2.9-9.5-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function OnboardingPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState<JsonValue | string | null>(null);

  const [appToken, setAppToken] = useState<string>("");
  const [rememberEmail, setRememberEmail] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register-only
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Confirm
  const [confirmCode, setConfirmCode] = useState("");

  const hasToken = appToken.trim().length > 0;

  useEffect(() => {
    const savedToken = window.localStorage.getItem(STORAGE_KEY);
    if (savedToken) setAppToken(savedToken);

    const rememberedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberEmail(true);
    }
  }, []);

  useEffect(() => {
    if (appToken) window.localStorage.setItem(STORAGE_KEY, appToken);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [appToken]);

  useEffect(() => {
    if (!rememberEmail) {
      window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
      return;
    }
    if (email) window.localStorage.setItem(REMEMBER_EMAIL_KEY, email);
  }, [rememberEmail, email]);

  const quickStatus = useMemo(() => {
    if (!hasToken) return "sin sesión";
    return `token: ${maskToken(appToken)}`;
  }, [appToken, hasToken]);

  async function run<T>(fn: () => Promise<T>) {
    setBusy(true);
    setOutput(null);
    try {
      const result = await fn();
      setOutput(result as unknown as JsonValue);
    } catch (e) {
      setOutput({ error: errorToMessage(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.split}>
          <section className={styles.leftPane}>
            <div className={styles.heroPhone}>
              <div className={styles.heroScreen}>
                <Image
                  className={styles.heroGif}
                  src="/didit.gif"
                  alt="Flujo de verificación de identidad (DIDIT)"
                  fill
                  sizes="(max-width: 980px) 90vw, 380px"
                  unoptimized
                  priority
                />
              </div>
            </div>

            <h2 className={styles.heroTitle}>
              <span className={styles.heroTitleAccent}>Verifica</span> tu identidad
            </h2>
            <p className={styles.heroSubtitle}>KYC rápido con IA</p>
            <p className={styles.heroText}>Compra seguro y evita cuentas falsas.</p>

            <a
              className={styles.ctaBtn}
              href="#form"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("form");
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                window.setTimeout(() => {
                  const input = document.getElementById("auth-email") as HTMLInputElement | null;
                  input?.focus();
                }, 250);
              }}
            >
              Continuar
              <span className={styles.ctaIcon} aria-hidden="true">
                →
              </span>
            </a>
          </section>

          <div className={styles.rightPane} id="form">
            <section className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <h1 className={styles.authTitle}>{mode === "login" ? "Login" : "Sign up"}</h1>
                <p className={`${styles.cardSubtitle} ${styles.authSubtitle}`}>
                  <span className={styles.pill}>{quickStatus}</span>
                </p>
              </div>

              <div className={styles.cardBody}>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    void run(async () => {
                      if (mode === "register") {
                        const payload = { email, password, firstName, lastName };
                        return await apiRequest("/auth/register", {
                          method: "POST",
                          body: JSON.stringify(payload),
                        });
                      }

                      const payload = { email, password };
                      const res = await apiRequest<LoginResponse>(
                        "/auth/login",
                        {
                          method: "POST",
                          body: JSON.stringify(payload),
                        }
                      );

                      if (res.ok && res.data?.appToken) {
                        const token = String(res.data.appToken);
                        setAppToken(token);
                        window.localStorage.setItem(STORAGE_KEY, token);

                        // Auto: iniciar KYC inmediatamente y redirigir a DIDIT URL
                        const kyc = await apiRequest<KycInitiateResponse>(
                          "/kyc/initiate",
                          { method: "POST" },
                          token
                        );

                        // Si el backend devuelve URL, redirigimos
                        if (kyc.ok && kyc.data.url) {
                          const url = String(kyc.data.url);
                          window.location.assign(url);
                          return { login: res, kyc, redirect: url };
                        }

                        // Si ya había KYC en proceso (u otro caso), intentamos recuperar la URL existente
                        const status = await apiRequest<KycStatusResponse>(
                          "/kyc/status",
                          { method: "GET" },
                          token
                        );
                        if (status.ok && status.data.diditVerificationUrl) {
                          const url = String(status.data.diditVerificationUrl);
                          window.location.assign(url);
                          return { login: res, kyc, status, redirect: url };
                        }

                        return { login: res, kyc, status };
                      }

                      return res;
                    });
                  }}
                >
                  <div className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <div className={styles.inputWrap}>
                      <input
                        id="auth-email"
                        className={`${styles.input} ${styles.inputPadded}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                      <span className={styles.iconRight} aria-hidden="true">
                        <IconUser />
                      </span>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Password</span>
                    <div className={styles.inputWrap}>
                      <input
                        className={`${styles.input} ${styles.inputPadded}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        required
                      />
                      <button
                        type="button"
                        className={`${styles.iconRight} ${styles.iconBtn}`}
                        onClick={() => setShowPassword((v) => !v)}
                        title={showPassword ? "Ocultar password" : "Mostrar password"}
                        aria-label={showPassword ? "Ocultar password" : "Mostrar password"}
                      >
                        <IconEye off={!showPassword} />
                      </button>
                    </div>
                  </div>

                  {mode === "register" && (
                    <div className={styles.row2}>
                      <label className={styles.label}>
                        Nombre
                        <input
                          className={styles.input}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Pablo"
                        />
                      </label>
                      <label className={styles.label}>
                        Apellido
                        <input
                          className={styles.input}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Figueroa"
                        />
                      </label>
                    </div>
                  )}

                  <div className={styles.rowBetween}>
                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        checked={rememberEmail}
                        onChange={(e) => setRememberEmail(e.target.checked)}
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className={styles.textBtn}
                      onClick={() =>
                        void run(async () => {
                          if (!email) return { ok: false, error: "Ingresa el email primero." };
                          return await apiRequest("/auth/forgot-password", {
                            method: "POST",
                            body: JSON.stringify({ email }),
                          });
                        })
                      }
                      disabled={busy}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button className={`${styles.btn} ${styles.btnPrimary}`} disabled={busy}>
                    {busy ? "Procesando…" : mode === "login" ? "Login" : "Sign up"}
                  </button>

                  <div className={styles.footerRow}>
                    <span>{mode === "login" ? "Don't have an account?" : "Already have an account?"}</span>
                    <button
                      type="button"
                      className={styles.textBtn}
                      onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
                      disabled={busy}
                    >
                      {mode === "login" ? "Sign up" : "Login"}
                    </button>
                  </div>
                </form>

                {output !== null && (
                  <pre className={styles.monoBox}>
                    {typeof output === "string" ? output : JSON.stringify(output, null, 2)}
                  </pre>
                )}

                {mode === "register" && (
                  <>
                    <div className={styles.divider} />
                    <p className={styles.sectionTitle}>Confirmar cuenta (si aplica)</p>
                    <form
                      className={styles.form}
                      onSubmit={(e) => {
                        e.preventDefault();
                        void run(async () => {
                          const payload = { email, code: confirmCode };
                          return await apiRequest("/auth/confirm", {
                            method: "POST",
                            body: JSON.stringify(payload),
                          });
                        });
                      }}
                    >
                      <label className={styles.label}>
                        Código
                        <input
                          className={styles.input}
                          value={confirmCode}
                          onChange={(e) => setConfirmCode(e.target.value)}
                          placeholder="123456"
                        />
                      </label>
                      <button className={styles.btn} disabled={busy || !email || !confirmCode}>
                        Confirmar
                      </button>
                    </form>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
