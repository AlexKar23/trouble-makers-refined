export const SmartBanner = () => (
  <div className="bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase">
    <div className="container flex items-center justify-center gap-3 py-2.5 text-center">
      <span className="hidden sm:inline opacity-70">·</span>
      <span>Envío gratis +40€</span>
      <span className="opacity-50">/</span>
      <span className="font-medium">10% con código <span className="underline underline-offset-4">TROUBLE10</span></span>
      <span className="opacity-50">/</span>
      <span className="hidden sm:inline">Hecho en Madrid</span>
    </div>
  </div>
);
