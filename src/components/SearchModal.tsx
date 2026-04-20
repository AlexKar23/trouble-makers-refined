import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import { ImgPlaceholder } from "./ImgPlaceholder";
import { productImages } from "@/lib/product-images";

export const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 4);
    return products.filter((p) => (p.name + " " + p.collection).toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) { document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 mx-auto mt-0 w-full max-w-3xl bg-background shadow-elevated">
        <div className="flex items-center gap-4 border-b border-border px-6 py-5">
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar joyas, colecciones, materiales…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} aria-label="Cerrar" className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {q ? `${results.length} resultados` : "Sugerencias"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {results.map((p) => (
              <Link key={p.slug} to={`/producto/${p.slug}`} onClick={onClose} className="group">
                <ImgPlaceholder src={productImages[p.slug]?.[0]} swatch={p.swatches[0]} label={p.name} ratio="square" />
                <p className="mt-2 font-display text-lg leading-tight">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.price}€</p>
              </Link>
            ))}
            {q && results.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">
                No encontramos nada. Prueba con "aros", "plata" o "colgante".
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
