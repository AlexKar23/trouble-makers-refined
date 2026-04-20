import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/lib/cart";
import { SearchModal } from "./SearchModal";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  const { open, count } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { to: "/coleccion/nueva", label: t("nav.new") },
    { to: "/coleccion/pendientes", label: t("nav.earrings") },
    { to: "/coleccion/anillos", label: t("nav.rings") },
    { to: "/coleccion/colgantes", label: t("nav.pendants") },
    { to: "/coleccion/minis", label: t("nav.minis") },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between gap-6">
          <button className="md:hidden" aria-label={t("nav.menu")} onClick={() => setMenuOpen(true)}>
            <Menu className="h-5 w-5" strokeWidth={1.4} />
          </button>

          <Link to="/" className="font-display text-2xl tracking-tight leading-none">
            trouble<span className="italic text-primary">makers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.22em] link-underline ${isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button aria-label={t("nav.search")} onClick={() => setSearchOpen(true)} className="hover:text-primary transition-colors">
              <Search className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <Link to="/login" aria-label={t("nav.account")} className="hover:text-primary transition-colors">
              <User className="h-5 w-5" strokeWidth={1.4} />
            </Link>
            <button aria-label={t("nav.cart")} onClick={open} className="relative hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-foreground/60" onClick={() => setMenuOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-background p-6 animate-slide-in-right" style={{animation:"slide-in-right .4s reverse"}}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-xl">{t("nav.menu")}</span>
              <button onClick={() => setMenuOpen(false)} aria-label={t("nav.close")}><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((n) => (
                <NavLink key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-[0.22em]">
                  {n.label}
                </NavLink>
              ))}
              <div className="pt-4"><LanguageSwitcher /></div>
            </nav>
          </aside>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
