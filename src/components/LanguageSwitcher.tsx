import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage?.startsWith("en") ? "en" : "es";
  const toggle = (lng: "es" | "en") => i18n.changeLanguage(lng);

  return (
    <div role="group" aria-label="Idioma" className="hidden sm:flex items-center text-[10px] uppercase tracking-[0.22em] border border-border">
      {(["es", "en"] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => toggle(lng)}
          aria-pressed={current === lng}
          className={`px-2.5 py-1 transition-colors ${current === lng ? "bg-foreground text-background" : "hover:text-primary"}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};