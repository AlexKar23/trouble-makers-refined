import { SwatchKey, swatchMeta } from "@/lib/products";
import { cn } from "@/lib/utils";

interface Props {
  swatch?: SwatchKey;
  label?: string;
  ratio?: "square" | "portrait" | "wide";
  className?: string;
  glyph?: string;
}

export const ImgPlaceholder = ({ swatch = "gold", label, ratio = "square", className, glyph }: Props) => {
  const ratioClass =
    ratio === "portrait" ? "aspect-[3/4]" : ratio === "wide" ? "aspect-[16/9]" : "aspect-square";
  const tone =
    swatch === "silver" ? "silver" : swatch === "rose" ? "rose" : swatch === "teal" ? "teal" : "";
  const text = (glyph ?? label ?? swatchMeta[swatch].label).slice(0, 28);
  return (
    <div className={cn("img-placeholder", tone, ratioClass, className)}>
      <span className="glyph">{text}</span>
    </div>
  );
};
