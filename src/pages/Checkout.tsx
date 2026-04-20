import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";
import { productImages } from "@/lib/product-images";
import { useCart, FREE_SHIPPING } from "@/lib/cart";
import { swatchMeta } from "@/lib/products";

type Step = 1 | 2 | 3;

const Checkout = () => {
  const { lines, subtotal, discount, promo } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [guest, setGuest] = useState(true);
  const { t } = useTranslation();

  const shipping = subtotal >= FREE_SHIPPING ? 0 : 5;
  const total = subtotal - discount + shipping;

  const steps = useMemo(() => ([
    { n: 1, label: t("checkout.stepInfo") },
    { n: 2, label: t("checkout.stepShip") },
    { n: 3, label: t("checkout.stepPay") },
  ] as const), [t]);

  return (
    <Layout hideTrust>
      <div className="container py-12">
        <Link to="/" className="font-display text-2xl">trouble<span className="italic text-primary">makers</span></Link>

        {/* Step tracker */}
        <div className="mt-10 flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-3 flex-1">
              <button onClick={() => setStep(s.n as Step)} className={`flex items-center gap-3 ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}>
                <span className={`h-7 w-7 rounded-full grid place-items-center text-xs ${step > s.n ? "bg-primary text-primary-foreground" : step === s.n ? "border-2 border-primary text-primary font-semibold" : "border border-border"}`}>
                  {step > s.n ? <Check className="h-3.5 w-3.5" /> : s.n}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em]">{s.label}</span>
              </button>
              {i < steps.length - 1 && <span className={`flex-1 h-px ${step > s.n ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-14">
          {/* Main */}
          <div>
            {step === 1 && (
              <div className="space-y-8 fade-in-up">
                {/* Guest first — destacado */}
                <div className="border-2 border-primary bg-primary/5 p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" checked={guest} onChange={() => setGuest(true)} className="mt-1 accent-primary" />
                    <div>
                      <p className="font-display text-2xl">{t("checkout.guest")}</p>
                      <p className="text-sm text-muted-foreground mt-1">{t("checkout.guestSub")}</p>
                    </div>
                  </label>
                </div>

                <div className="border border-border p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" checked={!guest} onChange={() => setGuest(false)} className="mt-1 accent-primary" />
                    <div className="flex-1">
                      <p className="font-display text-xl">{t("checkout.signin")}</p>
                      <p className="text-sm text-muted-foreground">{t("checkout.signinSub")}</p>
                      {!guest && (
                        <div className="mt-4 grid gap-3">
                          <input type="email" placeholder={t("checkout.email")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                          <input type="password" placeholder={t("checkout.password")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                          <Link to="/login" className="text-xs link-underline">{t("checkout.noAccount")}</Link>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-4">{t("checkout.contact")}</p>
                  <input required type="email" placeholder={t("checkout.emailConfirm")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" defaultChecked /> {t("checkout.newsletter")}
                  </label>
                  <button className="btn-primary w-full mt-4">{t("checkout.continueShip")}</button>
                </form>
              </div>
            )}

            {step === 2 && (
              <form className="space-y-4 fade-in-up" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{t("checkout.shipAddress")}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required placeholder={t("checkout.name")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                  <input required placeholder={t("checkout.lastname")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                </div>
                <input required placeholder={t("checkout.address")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
                <div className="grid sm:grid-cols-3 gap-3">
                  <input required placeholder={t("checkout.zip")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                  <input required placeholder={t("checkout.city")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                  <input required placeholder={t("checkout.province")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                </div>
                <input required placeholder={t("checkout.phone")} className="w-full border border-border px-3 py-3 text-sm bg-transparent" />

                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-6">{t("checkout.method")}</p>
                <div className="space-y-2">
                  <label className="flex items-center justify-between border border-primary bg-primary/5 px-4 py-3 cursor-pointer">
                    <span className="flex items-center gap-3"><input type="radio" name="ship" defaultChecked className="accent-primary" /> {t("checkout.standard")}</span>
                    <span className="font-medium">{shipping === 0 ? t("checkout.free") : "5,00€"}</span>
                  </label>
                  <label className="flex items-center justify-between border border-border px-4 py-3 cursor-pointer">
                    <span className="flex items-center gap-3"><input type="radio" name="ship" className="accent-primary" /> {t("checkout.express")}</span>
                    <span className="font-medium">9,00€</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-ghost">{t("checkout.back")}</button>
                  <button className="btn-primary flex-1">{t("checkout.continuePay")}</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-5 fade-in-up">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{t("checkout.payMethod")}</p>
                <div className="space-y-2">
                  {[t("checkout.card"), "Google Pay", "Apple Pay", "PayPal"].map((m, i) => (
                    <label key={m} className={`flex items-center gap-3 border px-4 py-3 cursor-pointer ${i===0?"border-primary bg-primary/5":"border-border"}`}>
                      <input type="radio" name="pay" defaultChecked={i===0} className="accent-primary" /> {m}
                    </label>
                  ))}
                </div>

                <div className="grid gap-3 mt-3">
                  <input placeholder={t("checkout.cardNumber")} className="border border-border px-3 py-3 text-sm bg-transparent" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/AA" className="border border-border px-3 py-3 text-sm bg-transparent" />
                    <input placeholder="CVC" className="border border-border px-3 py-3 text-sm bg-transparent" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> {t("checkout.ssl")}
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(2)} className="btn-ghost">{t("checkout.back")}</button>
                  <button onClick={() => alert(t("checkout.confirmedDemo"))} className="btn-primary flex-1">{t("checkout.pay")} {total.toFixed(2)}€</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar resumen */}
          <aside className="bg-surface p-6 lg:p-8 h-fit lg:sticky lg:top-24">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">{t("checkout.summary")}</p>
            {lines.length === 0 && <p className="text-sm text-muted-foreground">{t("checkout.emptyCart")} <Link to="/" className="link-underline text-foreground">{t("checkout.backStore")}</Link></p>}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {lines.map((l) => (
                <div key={l.product.slug+l.swatch} className="flex gap-3">
                  <div className="relative">
                    <ImgPlaceholder src={productImages[l.product.slug]?.[0]} swatch={l.swatch} label={l.product.name} className="w-16 shrink-0" />
                    <span className="absolute -right-1.5 -top-1.5 h-5 w-5 grid place-items-center rounded-full bg-foreground text-background text-[10px]">{l.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{l.product.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{swatchMeta[l.swatch].label}</p>
                  </div>
                  <p className="text-sm font-medium">{(l.product.price * l.qty).toFixed(2)}€</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-5 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("checkout.subtotal")}</span><span>{subtotal.toFixed(2)}€</span></div>
              {promo && <div className="flex justify-between text-primary"><span>{t("checkout.discount")} ({promo})</span><span>-{discount.toFixed(2)}€</span></div>}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("checkout.shipStandard")}</span>
                <span>{shipping === 0 ? t("checkout.free") : "5,00€"}</span>
              </div>
              <div className="flex justify-between font-display text-2xl pt-3 border-t border-border mt-3">
                <span>{t("checkout.total")}</span><span>{total.toFixed(2)}€</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("checkout.protected")}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
