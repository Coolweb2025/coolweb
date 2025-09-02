import Header from "../globals/header";
import Footer from "../globals/footer";
import { fetchBlog } from "../lib/api";
import Image from "next/image";

export default async function Blog() {
  const items = await fetchBlog().catch(() => []);
  return (
    <>
      <Header />
      <div className="font-sans w-full p-8 pb-20 sm:p-20">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Blog</h1>
          <ul className="space-y-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((it) => (
              <li key={it.id} className="rounded-lg border p-4 bg-white/50">
                <div className="text-sm text-gray-500 mb-2 flex justify-center">
                  <Image
                    src={`/images/blog/${it.image}`}
                    alt={it.title}
                    width={500}
                    height={400}
                  />
                </div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="text-sm text-gray-700">{it.short_description}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-teal-700">
                    Read more
                  </summary>
                  <div className="prose max-w-none text-sm mt-2 whitespace-pre-wrap">
                    {it.long_description}
                  </div>
                </details>
              </li>
            ))}
            {items.length === 0 && (
              <div className="text-gray-500">Brak wpisów</div>
            )}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
