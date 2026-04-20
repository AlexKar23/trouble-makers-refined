import { Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { icon: Truck, labelKey: "Envío en 1-3 días" },
  { icon: ShieldCheck, labelKey: "Pago 100% seguro" },
  { icon: RotateCcw, labelKey: "Devolución gratuita 14 días" },
  { icon: Sparkles, labelKey: "Hecho a mano en Madrid" },
];

export const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <div className="border-y border-border bg-surface">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        {items.map(({ icon: Icon, labelKey }) => (
          <div key={labelKey} className="flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" strokeWidth={1.4} />
            <span>{t(labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
