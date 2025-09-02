import Header from "../globals/header";
import Footer from "../globals/footer";
import { fetchTeam } from "../lib/api";

export default async function Team() {
  const members = await fetchTeam().catch(() => []);
  return (
    <>
      <Header />
      <div className="font-sans w-full p-8 pb-20 sm:p-20">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Our team</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m) => (
              <li key={m.id} className="rounded-lg border p-4 bg-white/50">
                <div className="text-sm text-gray-500 mb-2">{m.image}</div>
                <h3 className="text-lg font-semibold">{m.full_name}</h3>
                <p className="text-sm text-gray-700">{m.role}</p>
                <div className="flex gap-3 mt-2">
                  {m.fb_url && (
                    <a
                      className="text-blue-700 underline"
                      href={m.fb_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  )}
                  {m.linkedin_url && (
                    <a
                      className="text-blue-700 underline"
                      href={m.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </li>
            ))}
            {members.length === 0 && (
              <div className="text-gray-500">We have no team members here</div>
            )}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
