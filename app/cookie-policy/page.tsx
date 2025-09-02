import type { Metadata } from "next";
import Header from "../globals/header";
import Footer from "../globals/footer";

export const metadata: Metadata = {
  title: "Cookies policy | CoolWeb",
  description:
    "Information on the use of cookies on the CoolWeb website: types of cookies, purposes, legal basis and ways of managing consent.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="font-sans max-w-3xl w-full mx-auto p-8 sm:p-12">
        <h1 className="text-2xl font-semibold mb-6">Cookie Policy</h1>

        <div className="space-y-6 text-sm leading-6 text-gray-800">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. What are cookies?</h2>
            <p>
              Cookies are small text files saved on the user's device when using
              a website. They enable, among other things, the proper functioning
              of the website, improving its functionality, and analyzing
              traffic.{" "}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              2. What cookies do we use?
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Necessary – required for the proper operation of the website and
                to provide services available on the website.
              </li>
              <li>
                Analytical/performance – help us understand how the website is
                used (e.g., number of visits, traffic sources), which allows us
                to improve it.
              </li>
              <li>
                Functional – remember user choices (e.g., preferences) to
                provide a personalized experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Legal Basis</h2>
            <p>
              The basis for processing data within necessary cookies is our
              legitimate interest in ensuring the proper functioning of the
              website. In the case of analytical and functional cookies, the
              basis for processing is your consent, which you can withdraw at
              any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Managing Cookies</h2>
            <p>
              Most web browsers accept cookies by default. You can change your
              browser settings to block the automatic handling of cookies or to
              be notified whenever they are placed on your device. Restricting
              the use of cookies may affect some website functionalities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Contact</h2>
            <p>
              If you have any questions about our cookie policy, please contact
              us:
              <br />
              e-mail:{" "}
              <a className="underline" href="mailto:biuro@coolweb.com.pl">
                biuro@coolweb.com.pl
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
