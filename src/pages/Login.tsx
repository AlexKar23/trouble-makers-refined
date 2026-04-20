import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";

const Login = () => {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <Layout hideTrust>
      <div className="container py-16 grid lg:grid-cols-2 gap-12 items-stretch min-h-[70vh]">
        <div className="hidden lg:block">
          <ImgPlaceholder swatch="gold" ratio="portrait" label="Tu joyero" className="h-full" />
        </div>
        <div className="max-w-md w-full mx-auto self-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> Mi cuenta</p>
          <h1 className="font-display text-5xl">{tab === "login" ? "Bienvenida de nuevo" : "Únete a la casa"}</h1>
          <p className="text-muted-foreground mt-2">{tab === "login" ? "Accede a tus pedidos, listas y direcciones." : "Crea tu cuenta y guarda tus piezas favoritas."}</p>

          <div className="mt-8 flex border-b border-border">
            {(["login","register"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-[11px] uppercase tracking-[0.22em] ${tab===t?"border-b-2 border-primary text-primary -mb-px":"text-muted-foreground"}`}>
                {t === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Demo · sin backend"); }}>
            {tab === "register" && <input required placeholder="Nombre" className="w-full border border-border px-3 py-3 text-sm bg-transparent" />}
            <input required type="email" placeholder="Email" className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
            <input required type="password" placeholder="Contraseña" className="w-full border border-border px-3 py-3 text-sm bg-transparent" />
            {tab === "login" && <Link to="#" className="block text-xs link-underline">¿Olvidaste tu contraseña?</Link>}
            <button className="btn-primary w-full mt-2">{tab === "login" ? "Entrar" : "Crear cuenta"}</button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex-1 h-px bg-border" /> o <span className="flex-1 h-px bg-border" />
          </div>
          <button className="w-full border border-foreground py-3 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors">
            Continuar con Google
          </button>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            ¿Solo quieres comprar? <Link to="/checkout" className="link-underline text-foreground">Continuar como invitado</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
