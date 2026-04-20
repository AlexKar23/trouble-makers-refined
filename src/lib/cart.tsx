import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product, SwatchKey } from "./products";

export type CartLine = { product: Product; qty: number; swatch: SwatchKey };

type CartCtx = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product, swatch?: SwatchKey, qty?: number) => void;
  remove: (slug: string, swatch: SwatchKey) => void;
  setQty: (slug: string, swatch: SwatchKey, qty: number) => void;
  subtotal: number;
  count: number;
  promo: string | null;
  applyPromo: (code: string) => { ok: boolean; message: string };
  discount: number;
};

const Ctx = createContext<CartCtx | null>(null);
const FREE_SHIPPING_THRESHOLD = 40;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [promo, setPromo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tm-cart");
      if (raw) setLines(JSON.parse(raw));
      const p = localStorage.getItem("tm-promo");
      if (p) setPromo(p);
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("tm-cart", JSON.stringify(lines)); }, [lines]);

  const add: CartCtx["add"] = (p, swatch = p.swatches[0], qty = 1) => {
    setLines((cur) => {
      const idx = cur.findIndex((l) => l.product.slug === p.slug && l.swatch === swatch);
      if (idx >= 0) {
        const copy = [...cur]; copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }; return copy;
      }
      return [...cur, { product: p, swatch, qty }];
    });
    setOpen(true);
  };
  const remove: CartCtx["remove"] = (slug, swatch) =>
    setLines((cur) => cur.filter((l) => !(l.product.slug === slug && l.swatch === swatch)));
  const setQty: CartCtx["setQty"] = (slug, swatch, qty) =>
    setLines((cur) => cur.map((l) => (l.product.slug === slug && l.swatch === swatch ? { ...l, qty: Math.max(1, qty) } : l)));

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.product.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const discount = useMemo(() => {
    if (promo === "TROUBLE10") return Math.round(subtotal * 0.1 * 100) / 100;
    return 0;
  }, [promo, subtotal]);

  const applyPromo: CartCtx["applyPromo"] = (code) => {
    const c = code.trim().toUpperCase();
    if (c === "TROUBLE10") {
      setPromo(c); localStorage.setItem("tm-promo", c);
      return { ok: true, message: "Código aplicado: -10%" };
    }
    return { ok: false, message: "Código no válido" };
  };

  return (
    <Ctx.Provider value={{ lines, isOpen, open: () => setOpen(true), close: () => setOpen(false), add, remove, setQty, subtotal, count, promo, applyPromo, discount }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};

export const FREE_SHIPPING = FREE_SHIPPING_THRESHOLD;
