import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
        <div className="col-span-2">
          <p className="font-display text-3xl">trouble<span className="italic text-primary">makers</span></p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            {t("Bisutería artesanal hecha en Madrid. Piezas que viajan contigo y cuentan tu historia.")}
          </p>
          <form className="mt-6 flex max-w-sm border-b border-foreground" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder={t("tu@email.com")} className="flex-1 bg-transparent py-3 outline-none text-sm" />
            <button className="text-[11px] uppercase tracking-[0.2em] font-medium px-3">{t("Suscribirse")}</button>
          </form>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] mb-4 text-muted-foreground">{t("Tienda")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/coleccion/nueva" className="link-underline">{t("Nueva Colección")}</Link></li>
            <li><Link to="/coleccion/pendientes" className="link-underline">{t("Pendientes")}</Link></li>
            <li><Link to="/coleccion/anillos" className="link-underline">{t("Anillos")}</Link></li>
            <li><Link to="/coleccion/colgantes" className="link-underline">{t("Colgantes")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] mb-4 text-muted-foreground">{t("Ayuda")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/checkout" className="link-underline">{t("Envíos y devoluciones")}</Link></li>
            <li><Link to="/login" className="link-underline">{t("Mi cuenta")}</Link></li>
            <li><a href="#" className="link-underline">{t("Cuidado de tus joyas")}</a></li>
            <li><a href="#" className="link-underline">{t("Contacto")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {t("Trouble Makers Shop · Madrid")}</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label={t("Instagram")}><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label={t("Email")}><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
