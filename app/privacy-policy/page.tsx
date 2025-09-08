import type { Metadata } from "next";
import Header from "../globals/header";
import Footer from "../globals/footer";

export const metadata: Metadata = {
  title: "Privacy policy | CoolWeb",
  description: "Coolweb Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="font-sans max-w-3xl w-full mx-auto p-8 sm:p-12">
        <h1 className="text-2xl font-semibold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-sm leading-6 text-gray-800">
          <section>
            <h2 className="text-lg font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information (e.g., name, email address)
              and non-personal information (e.g., IP address, browser type) to
              improve our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use collected data to operate and improve our website,
              communicate with users, analyze traffic, and comply with legal
              obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              Cookies help us provide a better user experience and analyze
              website performance. You can manage or disable cookies in your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell or rent your personal information. We may share
              data with trusted service providers or when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data against unauthorized access, disclosure, or
              destruction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Your Rights</h2>
            <p>
              You may request access, correction, deletion, or limitation of the
              processing of your data. Contact us at the email address below to
              exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Contact</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us:
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
