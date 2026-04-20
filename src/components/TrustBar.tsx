import { Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TrustBar = () => {
  const { t } = useTranslation();
  const items = [
    { icon: Truck, label: t("trust.shipping") },
    { icon: ShieldCheck, label: t("trust.secure") },
    { icon: RotateCcw, label: t("trust.returns") },
    { icon: Sparkles, label: t("trust.handmade") },
  ];
  return (
    <div className="border-y border-border bg-surface">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" strokeWidth={1.4} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
