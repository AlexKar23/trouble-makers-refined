import { useTranslation } from "react-i18next";

export const SmartBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase">
      <div className="container flex items-center justify-center gap-3 py-2.5 text-center">
        <span className="hidden sm:inline opacity-70">·</span>
        <span>{t("Envío gratis +40€")}</span>
        <span className="opacity-50">/</span>
        <span className="font-medium">{t("10% con código")} <span className="underline underline-offset-4">{t("TROUBLE10")}</span></span>
        <span className="opacity-50">/</span>
        <span className="hidden sm:inline">{t("Hecho en Madrid")}</span>
      </div>
    </div>
  );
};
