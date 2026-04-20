import { useEffect, useMemo, useState } from "react";
import { X, Plus, Minus, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, FREE_SHIPPING } from "@/lib/cart";
import { ImgPlaceholder } from "./ImgPlaceholder";
import { products, swatchMeta } from "@/lib/products";

export const CartDrawer = () => {
  const { isOpen, close, lines, remove, setQty, subtotal, applyPromo, promo, discount, add } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; }, [isOpen]);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  const cross = useMemo(() => {
    const slugs = new Set(lines.map((l) => l.product.slug));
    return products.filter((p) => !slugs.has(p.slug)).slice(0, 3);
  }, [lines]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/50 animate-fade-in" onClick={close} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-elevated flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="font-display text-2xl">Tu carrito <span className="text-muted-foreground text-base">({lines.length})</span></h3>
          <button onClick={close} aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>

        {/* free shipping bar */}
        <div className="px-6 py-4 bg-surface border-b border-border">
          {remaining > 0 ? (
            <p className="text-xs mb-2">Te faltan <span className="font-semibold text-primary">{remaining.toFixed(2)}€</span> para conseguir <strong>ENVÍO GRATIS</strong></p>
          ) : (
            <p className="text-xs mb-2 text-primary font-medium flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> ¡Envío gratis desbloqueado!</p>
          )}
          <progress className="w-full h-1.5" value={progress} max={100} />
        </div>

        {/* lines */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {lines.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display text-2xl mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground mb-6">Empieza a llenarlo de piezas únicas.</p>
              <button onClick={close} className="btn-primary">Explorar joyas</button>
            </div>
          )}
          {lines.map((l) => (
            <div key={l.product.slug + l.swatch} className="flex gap-4">
              <ImgPlaceholder src={productImages[l.product.slug]?.[0]} swatch={l.swatch} label={l.product.name} className="w-20 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <p className="font-display text-lg leading-tight">{l.product.name}</p>
                  <button onClick={() => remove(l.product.slug, l.swatch)} aria-label="Eliminar" className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{swatchMeta[l.swatch].label}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border">
                    <button className="p-1.5" onClick={() => setQty(l.product.slug, l.swatch, l.qty - 1)} aria-label="Menos"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm tabular-nums">{l.qty}</span>
                    <button className="p-1.5" onClick={() => setQty(l.product.slug, l.swatch, l.qty + 1)} aria-label="Más"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-display text-lg">{(l.product.price * l.qty).toFixed(2)}€</p>
                </div>
              </div>
            </div>
          ))}

          {/* cross-sell */}
          {lines.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Completa tu look</p>
              <div className="space-y-3">
                {cross.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3">
                    <ImgPlaceholder src={productImages[p.slug]?.[0]} swatch={p.swatches[0]} label={p.name} className="w-14 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.price}€</p>
                    </div>
                    <button onClick={() => add(p)} className="text-[10px] uppercase tracking-[0.2em] border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors">
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); setMsg(applyPromo(code)); }} className="flex border border-border">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código de descuento" className="flex-1 px-3 py-2.5 bg-transparent text-sm outline-none" />
              <button className="px-4 text-[10px] uppercase tracking-[0.2em] bg-foreground text-background">Aplicar</button>
            </form>
            {msg && <p className={`text-xs ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.message}</p>}
            {promo && <p className="text-xs text-muted-foreground">Activo: <span className="font-medium text-primary">{promo}</span> (-{discount.toFixed(2)}€)</p>}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
              {discount > 0 && <div className="flex justify-between text-primary"><span>Descuento</span><span>-{discount.toFixed(2)}€</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{subtotal >= FREE_SHIPPING ? "Gratis" : "5,00€"}</span></div>
              <div className="flex justify-between font-display text-2xl pt-2"><span>Total</span><span>{(subtotal - discount + (subtotal >= FREE_SHIPPING ? 0 : 5)).toFixed(2)}€</span></div>
            </div>

            <Link to="/checkout" onClick={close} className="btn-primary w-full">Finalizar compra</Link>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Pago seguro · Visa · Mastercard · Google Pay
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
