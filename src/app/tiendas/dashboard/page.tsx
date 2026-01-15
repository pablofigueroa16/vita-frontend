"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  RefreshCcw,
  Wallet,
  User,
  Plus,
  Search,
  X,
  CheckCircle2,
  Sparkles,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
} from "lucide-react";

type Tab =
  | "inicio"
  | "productos"
  | "pedidos"
  | "envios"
  | "devoluciones"
  | "finanzas"
  | "perfil";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  colors: string[];
  sizes: string[];
  description: string;
  images: [string, string, string, string];
  status: "Activo" | "Borrador";
  createdAt: string;
};

type AITone = "Vita (premium)" | "Cercano" | "Directo" | "Luxury" | "Gen Z";

export default function DashboardVitaMarketplace() {
  const [tab, setTab] = useState<Tab>("productos");

  // Products state (MVP local)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "P-001",
      name: "Hoodie Vita Cyan",
      price: 49.99,
      stock: 34,
      colors: ["Cyan", "Black"],
      sizes: ["S", "M", "L"],
      description: "Hoodie premium con vibe led tech.",
      images: [
        "https://images.unsplash.com/photo-1520975958225-9b8c86f1f4c9?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1520975958225-9b8c86f1f4c9?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1520975958225-9b8c86f1f4c9?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1520975958225-9b8c86f1f4c9?auto=format&fit=crop&w=900&q=60",
      ],
      status: "Activo",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [products, query]);

  // Modal create product
  const [openCreate, setOpenCreate] = useState(false);

  // Finance mock
  const finance = useMemo(
    () => ({
      balance: 1250.35,
      pending: 312.2,
      lastPayout: 480.0,
      monthSales: 3820.5,
    }),
    []
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-32">
      {/* BG */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-dashboard.png"
          alt="Dashboard background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.20),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light vita-noise" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20">
        {/* SHELL */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* SIDEBAR */}
          <aside className="relative overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.06] backdrop-blur-3xl">
            <GlassOverlays />

            <div className="relative z-10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-extrabold text-lg tracking-tight">
                    Vita Dashboard
                  </p>
                  <p className="text-[11px] text-white/55">Marketplace • Seller</p>
                </div>
                <div className="h-10 w-10 rounded-2xl border border-white/25 bg-white/10 backdrop-blur flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-cyan-200" />
                </div>
              </div>

              <nav className="mt-6 space-y-2">
                <NavItem icon={LayoutDashboard} active={tab === "inicio"} onClick={() => setTab("inicio")} label="Inicio" />
                <NavItem icon={Package} active={tab === "productos"} onClick={() => setTab("productos")} label="Productos" />
                <NavItem icon={ShoppingCart} active={tab === "pedidos"} onClick={() => setTab("pedidos")} label="Pedidos" />
                <NavItem icon={Truck} active={tab === "envios"} onClick={() => setTab("envios")} label="Envíos" />
                <NavItem icon={RefreshCcw} active={tab === "devoluciones"} onClick={() => setTab("devoluciones")} label="Devoluciones" />
                <NavItem icon={Wallet} active={tab === "finanzas"} onClick={() => setTab("finanzas")} label="Finanzas" />
                <NavItem icon={User} active={tab === "perfil"} onClick={() => setTab("perfil")} label="Perfil" />
              </nav>

              <div className="mt-6 rounded-2xl border border-white/20 bg-white/[0.05] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                  Estado
                </p>
                <p className="mt-2 text-white font-semibold">Tienda verificada</p>
                <p className="text-[12px] text-white/60 mt-1">
                  Reputación activa • pagos listos
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <section className="relative overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.06] backdrop-blur-3xl">
            <GlassOverlays />

            <div className="relative z-10 p-6">
              {/* TOP BAR */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                    {tabLabel(tab)}
                  </p>
                  <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {tabTitle(tab)}
                  </h1>
                </div>

                {tab === "productos" && (
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative">
                      <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar producto…"
                        className="
                          h-11 w-full sm:w-[280px] pl-10 pr-3 rounded-full
                          bg-white/10 border border-white/20
                          text-white placeholder:text-white/40
                          outline-none
                          focus:border-cyan-300/70
                          focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9)]
                          transition
                        "
                      />
                    </div>

                    <button
                      onClick={() => setOpenCreate(true)}
                      className="
                        inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full
                        border border-cyan-300/70
                        text-cyan-100
                        shadow-[0_0_28px_rgba(34,211,238,0.55)]
                        hover:shadow-[0_0_44px_rgba(34,211,238,0.85)]
                        hover:border-cyan-300/90
                        transition
                      "
                    >
                      <Plus className="w-4 h-4" />
                      Nuevo producto
                    </button>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-6">
                {tab === "inicio" && (
                  <InicioPanel finance={finance} productsCount={products.length} />
                )}
                {tab === "productos" && (
                  <ProductosPanel products={filtered} onCreate={() => setOpenCreate(true)} />
                )}
                {tab === "pedidos" && (
                  <PlaceholderPanel title="Pedidos" desc="Estados, tracking, notas, etiquetas y gestión de clientes." />
                )}
                {tab === "envios" && (
                  <PlaceholderPanel title="Envíos" desc="Reglas, carriers, tiempos, zonas, tarifas y envío gratis." />
                )}
                {tab === "devoluciones" && (
                  <PlaceholderPanel title="Devoluciones" desc="Solicitudes, políticas, reembolsos, cambios y casos." />
                )}
                {tab === "finanzas" && <FinanzasPanel finance={finance} />}
                {tab === "perfil" && <PerfilPanel />}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* MODAL: CREATE PRODUCT */}
      {openCreate && (
        <CreateProductModal
          onClose={() => setOpenCreate(false)}
          onCreate={(p) => {
            setProducts((prev) => [p, ...prev]);
            setOpenCreate(false);
            setTab("productos");
          }}
        />
      )}
    </main>
  );
}

/* ---------------- PANELS ---------------- */

function InicioPanel({ finance, productsCount }: { finance: any; productsCount: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <GlassCard title="Balance" value={`$${finance.balance.toFixed(2)}`} hint="Disponible" />
      <GlassCard title="Pendiente" value={`$${finance.pending.toFixed(2)}`} hint="Por liberar" />
      <GlassCard title="Productos" value={`${productsCount}`} hint="En catálogo" />

      <div className="lg:col-span-3">
        <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
          <p className="text-white font-extrabold text-lg">Checklist pro</p>
          <p className="text-white/65 text-sm mt-1">
            Activa tu tienda en 3 pasos: catálogo, envíos y pagos.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ActionRow title="Sube productos" desc="Fotos, variantes, stock" />
            <ActionRow title="Configura envíos" desc="Tarifas y zonas" />
            <ActionRow title="Revisa finanzas" desc="Pagos, retiros" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductosPanel({ products, onCreate }: { products: Product[]; onCreate: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-white font-extrabold text-lg">Productos</p>
            <p className="text-white/65 text-sm mt-1">
              Crea y gestiona tu catálogo: fotos, tallas, colores, stock y precio.
            </p>
          </div>

          <button
            onClick={onCreate}
            className="
              hidden sm:inline-flex items-center gap-2 h-11 px-5 rounded-full
              border border-cyan-300/70 text-cyan-100
              shadow-[0_0_22px_rgba(34,211,238,0.45)]
              hover:shadow-[0_0_40px_rgba(34,211,238,0.75)]
              transition
            "
          >
            <Plus className="w-4 h-4" />
            Nuevo
          </button>
        </div>
      </div>

      <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-4 border-b border-white/12 text-[11px] uppercase tracking-[0.24em] text-white/55">
          <div className="col-span-5">Producto</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-1 text-right">—</div>
        </div>

        {products.length === 0 ? (
          <div className="p-6 text-white/70">No hay productos aún. Crea tu primer producto.</div>
        ) : (
          <div className="divide-y divide-white/10">
            {products.map((p) => (
              <div key={p.id} className="grid grid-cols-12 px-5 py-4 items-center">
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-2xl border border-white/18 overflow-hidden bg-white/10">
                    <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">{p.name}</p>
                    <p className="text-[12px] text-white/55 truncate">{p.id}</p>
                  </div>
                </div>

                <div className="col-span-2 text-white/85 font-semibold">${p.price.toFixed(2)}</div>
                <div className="col-span-2 text-white/70">{p.stock}</div>

                <div className="col-span-2">
                  <span
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-[12px] border
                      ${
                        p.status === "Activo"
                          ? "border-cyan-300/55 text-cyan-100 bg-cyan-300/10"
                          : "border-white/20 text-white/70 bg-white/5"
                      }
                    `}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="col-span-1 text-right">
                  <button className="text-white/60 hover:text-cyan-100 transition text-sm">
                    Ver
                  </button>
                </div>

                <div className="col-span-12 mt-3">
                  <div className="flex flex-wrap gap-2">
                    <TagPill label={`Colores: ${p.colors.join(", ") || "-"}`} />
                    <TagPill label={`Tallas: ${p.sizes.join(", ") || "-"}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FinanzasPanel({ finance }: { finance: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <GlassCard title="Balance disponible" value={`$${finance.balance.toFixed(2)}`} hint="Listo para retirar" />
      <GlassCard title="Pendiente" value={`$${finance.pending.toFixed(2)}`} hint="Pagos en proceso" />
      <GlassCard title="Ventas del mes" value={`$${finance.monthSales.toFixed(2)}`} hint="Bruto" />

      <div className="lg:col-span-3 rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
        <p className="text-white font-extrabold text-lg">Retiros</p>
        <p className="text-white/65 text-sm mt-1">
          Conecta tu Vita Card o un método externo para retirar ganancias.
        </p>

        <button
          className="
            mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-full
            border border-cyan-300/70 text-cyan-100
            shadow-[0_0_22px_rgba(34,211,238,0.45)]
            hover:shadow-[0_0_40px_rgba(34,211,238,0.75)]
            transition
          "
        >
          <CheckCircle2 className="w-4 h-4" />
          Configurar retiros
        </button>
      </div>
    </div>
  );
}

function PerfilPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
        <p className="text-white font-extrabold text-lg">Perfil</p>
        <p className="text-white/65 text-sm mt-1">
          Datos de la tienda, verificación, branding y configuraciones.
        </p>
      </div>

      <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
        <p className="text-white font-semibold">Sección en construcción</p>
        <p className="text-white/60 text-sm mt-1">
          Aquí irán: logo, cover, bio, enlaces, redes, verificación.
        </p>
      </div>
    </div>
  );
}

function PlaceholderPanel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
      <p className="text-white font-extrabold text-lg">{title}</p>
      <p className="text-white/65 text-sm mt-1">{desc}</p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionRow title="MVP" desc="Listo para conectar backend" />
        <ActionRow title="UI" desc="Glass blanco + cyan tech" />
        <ActionRow title="Next step" desc="Rutas reales por módulo" />
      </div>
    </div>
  );
}

/* ---------------- MODAL CREATE PRODUCT (PRO) ---------------- */

function CreateProductModal({ onClose, onCreate }: { onClose: () => void; onCreate: (p: Product) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Uploader: 4 slots (glass cards)
  const [imgs, setImgs] = useState<(string | null)[]>([null, null, null, null]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // AI
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTone, setAiTone] = useState<AITone>("Vita (premium)");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiBenefits, setAiBenefits] = useState("");
  const [aiTarget, setAiTarget] = useState("Compradores en marketplace");

  const canCreate = useMemo(() => {
    return name.trim().length >= 2 && Number(price) > 0 && !!imgs[0];
  }, [name, price, imgs]);

  const submit = () => {
    const filled = imgs.map((x) => x || placeholderImg()) as string[];
    const p: Product = {
      id: `P-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock || 0),
      colors: splitList(colors),
      sizes: splitList(sizes),
      description: description.trim(),
      images: [filled[0], filled[1], filled[2], filled[3]] as [string, string, string, string],
      status: "Activo",
      createdAt: new Date().toISOString(),
    };
    onCreate(p);
  };

  const onPickFiles = (files: FileList | null, slot?: number) => {
    if (!files?.length) return;

    const urls = Array.from(files).slice(0, 4).map((f) => URL.createObjectURL(f));
    setImgs((prev) => {
      const next = [...prev];
      if (typeof slot === "number") {
        next[slot] = urls[0] || next[slot];
      } else {
        // fill sequentially
        let idx = 0;
        for (let i = 0; i < next.length; i++) {
          if (!next[i] && urls[idx]) {
            next[i] = urls[idx];
            idx++;
          }
        }
        // if still urls remain, overwrite from start
        for (let i = 0; i < next.length && idx < urls.length; i++) {
          if (idx < urls.length) {
            next[i] = next[i] || urls[idx];
            idx++;
          }
        }
      }
      return next;
    });
  };

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target > 3) return;
    setImgs((prev) => {
      const next = [...prev];
      const t = next[idx];
      next[idx] = next[target];
      next[target] = t;
      return next;
    });
  };

  const remove = (idx: number) => {
    setImgs((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  };

  const cover = imgs[0] || placeholderImg();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.08] backdrop-blur-3xl">
          <GlassOverlays />

          <div className="relative z-10 p-6 border-b border-white/15 flex items-center justify-between">
            <div>
              <p className="text-white font-extrabold text-lg">Nuevo producto</p>
              <p className="text-white/60 text-sm mt-1">
                Fotos en cards glass + preview + IA para descripción.
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10 p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left fields */}
            <div className="space-y-3">
              <Field label="Nombre" value={name} onChange={setName} placeholder="Ej: Hoodie Vita Cyan" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Precio" value={price} onChange={setPrice} placeholder="49.99" />
                <Field label="Stock" value={stock} onChange={setStock} placeholder="50" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Colores (coma)" value={colors} onChange={setColors} placeholder="Cyan, Black, White" />
                <Field label="Tallas (coma)" value={sizes} onChange={setSizes} placeholder="S, M, L, XL" />
              </div>

              {/* Description + AI */}
              <div className="rounded-[22px] border border-white/18 bg-white/[0.06] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] text-white/70 font-semibold">Descripción</p>
                    <p className="text-[11px] text-white/55 mt-1">
                      Escribe o usa IA para generar una descripción chebre.
                    </p>
                  </div>

                  <button
                    onClick={() => setAiOpen(true)}
                    className="
                      inline-flex items-center gap-2
                      h-10 px-4 rounded-full
                      border border-cyan-300/55
                      text-cyan-100
                      shadow-[0_0_18px_rgba(34,211,238,0.35)]
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.65)]
                      transition
                    "
                  >
                    <Sparkles className="w-4 h-4" />
                    IA
                  </button>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles, materiales, envío, garantías…"
                  rows={5}
                  className="
                    mt-3 w-full px-4 py-3 rounded-2xl
                    bg-white/10 border border-white/20
                    text-white placeholder:text-white/40
                    outline-none
                    focus:border-cyan-300/70
                    focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9)]
                    transition
                  "
                />
              </div>
            </div>

            {/* Right images + preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-white/70 font-semibold">Fotos (4)</p>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onPickFiles(e.target.files)}
                />

                <button
                  onClick={() => fileRef.current?.click()}
                  className="
                    inline-flex items-center gap-2
                    h-10 px-4 rounded-full
                    border border-white/20 bg-white/10
                    text-white/80 hover:text-white hover:bg-white/15
                    transition
                  "
                >
                  <Plus className="w-4 h-4 text-cyan-200" />
                  Subir
                </button>
              </div>

              {/* 4 glass photo cards */}
              <div className="grid grid-cols-2 gap-3">
                {imgs.map((src, idx) => (
                  <PhotoSlot
                    key={idx}
                    idx={idx}
                    src={src}
                    onPick={(files) => onPickFiles(files, idx)}
                    onUp={() => move(idx, -1)}
                    onDown={() => move(idx, 1)}
                    onRemove={() => remove(idx)}
                  />
                ))}
              </div>

              {/* Preview marketplace glass */}
              <div className="rounded-[22px] border border-white/18 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Preview</p>

                <div className="mt-3 relative overflow-hidden rounded-[22px] border border-white/18 bg-white/[0.06]">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-white/[0.05]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_60%)]" />
                  </div>

                  <div className="relative z-10 p-3">
                    <div className="relative aspect-square rounded-[18px] overflow-hidden border border-white/15 bg-white/10">
                      <img src={cover} alt="preview" className="h-full w-full object-cover" />
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white font-semibold truncate">
                          {name || "Nombre del producto"}
                        </p>
                        <p className="text-white/60 text-sm truncate">
                          {price ? `$${Number(price).toFixed(2)}` : "$0.00"} • stock{" "}
                          {stock || 0}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="
                          h-10 px-4 rounded-full text-sm font-semibold
                          bg-cyan-300 text-black
                          shadow-[0_0_18px_rgba(34,211,238,0.65)]
                          hover:shadow-[0_0_28px_rgba(34,211,238,1)]
                          transition
                        "
                      >
                        Comprar
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TagPill label={`Colores: ${splitList(colors).slice(0, 3).join(", ") || "-"}`} />
                      <TagPill label={`Tallas: ${splitList(sizes).slice(0, 4).join(", ") || "-"}`} />
                    </div>

                    <p className="mt-3 text-[12px] text-white/65 line-clamp-3">
                      {description || "Aquí se verá tu descripción…"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-white/50">
                Tip: la primera foto es la portada. Usa “↑ ↓” para ordenar.
              </p>
            </div>
          </div>

          <div className="relative z-10 p-6 border-t border-white/15 flex items-center justify-between">
            <button
              onClick={onClose}
              className="
                h-11 px-5 rounded-full
                border border-white/20 bg-white/10
                text-white/70 hover:text-white hover:bg-white/15
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={submit}
              disabled={!canCreate}
              className="
                inline-flex items-center gap-2 h-11 px-6 rounded-full
                border border-cyan-300/70
                text-cyan-100
                shadow-[0_0_28px_rgba(34,211,238,0.55)]
                hover:shadow-[0_0_44px_rgba(34,211,238,0.85)]
                hover:border-cyan-300/90
                transition
                disabled:opacity-45 disabled:cursor-not-allowed
              "
            >
              <CheckCircle2 className="w-4 h-4" />
              Crear producto
            </button>
          </div>

          {/* AI modal */}
          {aiOpen && (
            <div className="fixed inset-0 z-[60]">
              <div className="absolute inset-0 bg-black/70" onClick={() => setAiOpen(false)} />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.08] backdrop-blur-3xl">
                  <GlassOverlays />
                  <div className="relative z-10 p-5 border-b border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-white font-extrabold text-lg">IA para descripción</p>
                      <p className="text-white/60 text-sm mt-1">Tono + keywords + beneficios.</p>
                    </div>
                    <button
                      onClick={() => setAiOpen(false)}
                      className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative z-10 p-5 space-y-3">
                    <label className="block">
                      <span className="text-[12px] text-white/70 font-semibold">Tono</span>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value as AITone)}
                        className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:border-cyan-300/70 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9)] transition"
                      >
                        {(["Vita (premium)", "Cercano", "Directo", "Luxury", "Gen Z"] as AITone[]).map((t) => (
                          <option key={t} value={t} className="bg-black">
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Field label="Audiencia" value={aiTarget} onChange={setAiTarget} placeholder="Ej: mujeres 18–30, streetwear lovers" />
                    <Field label="Palabras clave (coma)" value={aiKeywords} onChange={setAiKeywords} placeholder="Ej: premium, cómodo, oversize" />

                    <label className="block">
                      <span className="text-[12px] text-white/70 font-semibold">Beneficios (uno por línea)</span>
                      <textarea
                        value={aiBenefits}
                        onChange={(e) => setAiBenefits(e.target.value)}
                        placeholder={"- Fit perfecto\n- Tela suave\n- Vibe premium"}
                        rows={4}
                        className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-cyan-300/70 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9)] transition"
                      />
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={aiLoading}
                        onClick={async () => {
                          setAiLoading(true);
                          try {
                            const res = await fetch("/api/ai/product-description", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                name: name || "Producto",
                                colors: splitList(colors),
                                sizes: splitList(sizes),
                                tone: aiTone,
                                target: aiTarget,
                                keywords: aiKeywords,
                                benefits: aiBenefits,
                              }),
                            });
                            const data = await res.json();
                            if (data?.description) setDescription(data.description);
                            setAiOpen(false);
                          } finally {
                            setAiLoading(false);
                          }
                        }}
                        className="
                          inline-flex items-center gap-2 h-11 px-5 rounded-full
                          border border-cyan-300/70 text-cyan-100
                          shadow-[0_0_22px_rgba(34,211,238,0.45)]
                          hover:shadow-[0_0_40px_rgba(34,211,238,0.75)]
                          transition
                          disabled:opacity-50
                        "
                      >
                        <Sparkles className="w-4 h-4" />
                        {aiLoading ? "Generando..." : "Generar y usar"}
                      </button>

                      <button
                        onClick={() => setAiOpen(false)}
                        className="h-11 px-5 rounded-full border border-white/20 bg-white/10 text-white/75 hover:text-white hover:bg-white/15 transition"
                      >
                        Cerrar
                      </button>
                    </div>

                    <p className="text-[11px] text-white/50">
                      Nota: este endpoint es demo. Luego lo conectas a tu IA real.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* hidden file input per-slot */}
          <input
            id="vita-slot-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- PHOTO SLOT ---------------- */

function PhotoSlot({
  idx,
  src,
  onPick,
  onUp,
  onDown,
  onRemove,
}: {
  idx: number;
  src: string | null;
  onPick: (files: FileList | null) => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/18 bg-white/[0.06] backdrop-blur-3xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_60%)]" />
      </div>

      <div className="relative z-10 p-2">
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files)}
        />

        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="relative w-full aspect-square rounded-[18px] overflow-hidden border border-white/15 bg-white/10 flex items-center justify-center"
          title={`Subir foto ${idx + 1}`}
        >
          {src ? (
            <img src={src} alt={`Foto ${idx + 1}`} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/60">
              <ImageIcon className="w-5 h-5" />
              <span className="text-[11px] mt-1">{idx === 0 ? "Portada" : `Foto ${idx + 1}`}</span>
            </div>
          )}
        </button>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] text-white/70">{idx === 0 ? "Portada" : `#${idx + 1}`}</span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onUp}
              className="h-8 w-8 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
              title="Subir"
            >
              <ArrowUp className="w-4 h-4 text-white/70" />
            </button>
            <button
              type="button"
              onClick={onDown}
              className="h-8 w-8 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
              title="Bajar"
            >
              <ArrowDown className="w-4 h-4 text-white/70" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="h-8 w-8 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL UI ---------------- */

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition
        ${
          active
            ? "border-cyan-300/55 bg-cyan-300/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.20)]"
            : "border-white/12 bg-white/[0.03] text-white/75 hover:text-white hover:border-white/20 hover:bg-white/[0.05]"
        }
      `}
    >
      <Icon className={`w-4 h-4 ${active ? "text-cyan-200" : "text-white/60"}`} />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

function GlassOverlays() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-white/[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.30),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.18),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)]" />
    </div>
  );
}

function GlassCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-[26px] border border-white/20 bg-white/[0.06] backdrop-blur-3xl p-6">
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">{title}</p>
      <p className="mt-3 text-3xl font-extrabold text-white tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-white/65">{hint}</p>
    </div>
  );
}

function ActionRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/18 bg-white/[0.05] p-4">
      <p className="text-white font-semibold">{title}</p>
      <p className="text-white/60 text-sm mt-1">{desc}</p>
    </div>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] border border-white/18 bg-white/[0.04] text-white/70">
      {label}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-white/70 font-semibold">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          mt-2 w-full px-4 py-3 rounded-2xl
          bg-white/10 border border-white/20
          text-white placeholder:text-white/40
          outline-none
          focus:border-cyan-300/70
          focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9)]
          transition
        "
      />
    </label>
  );
}

function tabLabel(tab: Tab) {
  const map: Record<Tab, string> = {
    inicio: "Resumen",
    productos: "Catálogo",
    pedidos: "Ventas",
    envios: "Logística",
    devoluciones: "Postventa",
    finanzas: "Dinero",
    perfil: "Cuenta",
  };
  return map[tab];
}

function tabTitle(tab: Tab) {
  const map: Record<Tab, string> = {
    inicio: "Inicio",
    productos: "Productos",
    pedidos: "Pedidos",
    envios: "Envíos",
    devoluciones: "Devoluciones",
    finanzas: "Finanzas",
    perfil: "Perfil",
  };
  return map[tab];
}

function splitList(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function placeholderImg() {
  return "https://images.unsplash.com/photo-1520975958225-9b8c86f1f4c9?auto=format&fit=crop&w=900&q=60";
}
