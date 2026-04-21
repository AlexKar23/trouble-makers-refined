import { useState } from "react";
import { SwatchKey, swatchMeta } from "@/lib/products";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;                // URL real opcional
  swatch?: SwatchKey;
  label?: string;
  ratio?: "square" | "portrait" | "wide";
  className?: string;
  glyph?: string;
  loading?: "lazy" | "eager";
}

/** Imagen editorial con fallback a placeholder de gradiente joya. */
export const ImgPlaceholder = ({ src, swatch = "gold", label, ratio = "square", className, glyph, loading = "lazy" }: Props) => {
  const [failed, setFailed] = useState(false);
  const ratioClass =
    ratio === "portrait" ? "aspect-[3/4]" : ratio === "wide" ? "aspect-[16/9]" : "aspect-square";
  const tone =
    swatch === "silver" ? "silver" : swatch === "rose" ? "rose" : swatch === "teal" ? "teal" : "";
  const text = (glyph ?? label ?? swatchMeta[swatch].label).slice(0, 28);

  if (src && !failed) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", ratioClass, className)}>
        <img
          src={src}
          alt={label ?? "Trouble Makers"}
          loading={loading}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div className={cn("img-placeholder", tone, ratioClass, className)}>
      <span className="glyph">{text}</span>
    </div>
  );
};
