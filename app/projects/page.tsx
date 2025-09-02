import Header from "../globals/header";
import Footer from "../globals/footer";
import { fetchProjects } from "../lib/api";
import Image from "next/image";

export default async function Projects() {
  const items = await fetchProjects().catch(() => []);
  return (
    <>
      <Header />
      <div className="font-sans w-full p-8 pb-20 sm:p-20">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Projects</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((it) => (
              <li
                key={it.id}
                className="rounded-lg border p-4 bg-white/50 flex justify-center flex-col"
              >
                <div className="text-sm text-gray-500 mb-2 flex justify-center">
                  <Image
                    src={`/images/projects/${it.image}`}
                    alt={it.title}
                    width={500}
                    height={400}
                  />
                </div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="text-sm text-gray-700">{it.description}</p>
                <a
                  className="text-teal-600 underline"
                  href={it.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project
                </a>
              </li>
            ))}
            {items.length === 0 && (
              <div className="text-gray-500">
                There is no projects available
              </div>
            )}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
