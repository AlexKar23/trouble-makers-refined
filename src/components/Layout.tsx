import { ReactNode } from "react";
import { SmartBanner } from "./SmartBanner";
import { Header } from "./Header";
import { TrustBar } from "./TrustBar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export const Layout = ({ children, hideTrust = false }: { children: ReactNode; hideTrust?: boolean }) => (
  <div className="min-h-screen flex flex-col">
    <SmartBanner />
    <Header />
    {!hideTrust && <TrustBar />}
    <main className="flex-1">{children}</main>
    <Footer />
    <CartDrawer />
  </div>
);
