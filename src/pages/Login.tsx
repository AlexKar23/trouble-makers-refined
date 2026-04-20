import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";
import { heroImages } from "@/lib/product-images";

const Login = () => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { t } = useTranslation();

  return (
    <Layout hideTrust>
      <div className="container py-16 grid lg:grid-cols-2 gap-12 items-stretch min-h-[70vh]">
        <div className="hidden lg:block">
          <ImgPlaceholder src={heroImages[0]} swatch="gold" ratio="portrait" label={t("login.myAccount")} className="h-full" />
        </div>
        <div className="max-w-md w-full mx-auto self-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> {t("login.myAccount")}</p>
          <h1 className="font-display text-5xl">{tab === "login" ? t("login.welcomeBack") : t("login.joinHouse")}</h1>
          <p className="text-muted-foreground mt-2">{tab === "login" ? t("login.loginSub") : t("login.registerSub")}</p>

          <div className="mt-8 flex border-b border-border">
            {(["login","register"] as const).map((tab2) => (
              <button key={tab2} onClick={() => setTab(tab2)} className={`flex-1 py-3 text-[11px] uppercase tracking-[0.22em] ${tab===tab2?"border-b-2 border-primary text-primary -mb-px":"text-muted-foreground"}`}>
                {tab2 === "login" ? t("login.tabLogin") : t("login.tabRegister")}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); alert(t("login.demoAlert")); }}>
            {tab === "register" && <input required placeholder={t("login.name")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />}
            <input required type="email" placeholder={t("login.email")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
            <input required type="password" placeholder={t("login.password")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
            {tab === "login" && <Link to="#" className="block text-xs link-underline">{t("login.forgot")}</Link>}
            <button className="btn-primary w-full mt-2">{tab === "login" ? t("login.enter") : t("login.create")}</button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex-1 h-px bg-border" /> {t("login.or")} <span className="flex-1 h-px bg-border" />
          </div>
          <button className="w-full border border-foreground py-3 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors">
            {t("login.google")}
          </button>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            {t("login.guestQ")} <Link to="/checkout" className="link-underline text-foreground">{t("login.guestLink")}</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
