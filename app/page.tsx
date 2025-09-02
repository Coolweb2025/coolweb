import { Suspense } from "react";
import Header from "./globals/header";
import Footer from "./globals/footer";
import Hero from "./components/hero/hero";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-sans w-full relative">
        <Suspense fallback={<p>Loading hero content...</p>}>
          <Hero />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
