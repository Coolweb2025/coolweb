import Image from "next/image";
import Header from "../globals/header";
import Footer from "../globals/footer";
import { fetchOffer } from "../lib/api";

export default async function Offer() {
  const items = await fetchOffer().catch(() => []);
  return (
    <>
      <Header />
      <div className="font-sans w-full p-8 pb-20 sm:p-20">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Our offer</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((it) => (
              <li
                key={it.id}
                className="rounded-lg border p-4 bg-white/50 flex flex-col"
              >
                <div className="text-sm text-gray-500 mb-2 flex justify-center">
                  <Image
                    src={`/images/${it.icon}`}
                    alt={it.icon}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-lg font-semibold flex justify-center">
                  {it.title}
                </h3>
                <div className="text-sm text-gray-700">{it.content}</div>
              </li>
            ))}
            {items.length === 0 && (
              <div className="text-gray-500">
                We have no offers at this moment...
              </div>
            )}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
