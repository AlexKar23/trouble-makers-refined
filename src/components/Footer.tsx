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
        <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
        <form className="mt-6 flex max-w-sm border-b border-foreground" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="tu@email.com" className="flex-1 bg-transparent py-3 outline-none text-sm" />
          <button className="text-[11px] uppercase tracking-[0.2em] font-medium px-3">{t("footer.subscribe")}</button>
        </form>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] mb-4 text-muted-foreground">{t("footer.shop")}</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/coleccion/nueva" className="link-underline">{t("nav.new")}</Link></li>
          <li><Link to="/coleccion/pendientes" className="link-underline">{t("nav.earrings")}</Link></li>
          <li><Link to="/coleccion/anillos" className="link-underline">{t("nav.rings")}</Link></li>
          <li><Link to="/coleccion/colgantes" className="link-underline">{t("nav.pendants")}</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] mb-4 text-muted-foreground">{t("footer.help")}</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/checkout" className="link-underline">{t("footer.shipReturns")}</Link></li>
          <li><Link to="/login" className="link-underline">{t("footer.account")}</Link></li>
          <li><a href="#" className="link-underline">{t("footer.care")}</a></li>
          <li><a href="#" className="link-underline">{t("footer.contact")}</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Trouble Makers Shop · Madrid</p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
          <a href="#" aria-label="Email"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </footer>
  );
};
