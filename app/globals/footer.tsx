import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <Suspense fallback={<p>Loading footer...</p>}>
        <div className="mx-auto px-6 py-10 flex justify-center flex-wrap">
          <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Marka / opis */}
            <section aria-labelledby="footer-brand">
              <h2 id="footer-brand" className="sr-only">
                Coolweb – informations
              </h2>
              <div className="mb-4">
                <Image
                  src="/logo.svg"
                  width={180}
                  height={30}
                  alt="Coolweb"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                As Coolweb we create fast, accessible, and modern applications
                and websites tailored to your business needs.
              </p>
            </section>

            {/* Follow us zamiast nawigacji */}
            <section aria-labelledby="footer-follow" className="mt-2">
              <h2
                id="footer-follow"
                className="text-white text-sm font-semibold uppercase tracking-wider mb-4"
              >
                Follow us
              </h2>
              <ul
                className="flex items-center gap-5"
                aria-label="Media społecznościowe"
              >
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579098040738"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    <svg
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24h11.49v-9.294H9.847V11.01h2.968V8.41c0-2.94 1.793-4.543 4.414-4.543 1.255 0 2.333.093 2.646.135v3.067l-1.816.001c-1.424 0-1.699.676-1.699 1.67v2.19h3.396l-.442 3.696h-2.954V24h5.79C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/coolwebcompl/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    <svg
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 2.583 5.8 2.295 7.166 2.233 8.432 2.175 8.812 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.053.072 5.775.13 4.638.428 3.678 1.388 2.718 2.348 2.42 3.485 2.362 4.763 2.304 6.042 2.29 6.451 2.29 9.71v4.58c0 3.259.014 3.668.072 4.947.058 1.278.356 2.415 1.316 3.375.96.96 2.097 1.258 3.375 1.316 1.279.058 1.688.072 4.947.072s3.668-.014 4.947-.072c1.278-.058 2.415-.356 3.375-1.316.96-.96 1.258-2.097 1.316-3.375.058-1.279.072-1.688.072-4.947V9.71c0-3.259-.014-3.668-.072-4.947-.058-1.278-.356-2.415-1.316-3.375-.96-.96-2.097-1.258-3.375-1.316C15.668.014 15.259 0 12 0z" />
                      <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/coolweb-com-pl/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    <svg
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.84v2.18h.05c.53-1.01 1.82-2.08 3.75-2.08 4.01 0 4.75 2.64 4.75 6.08V24h-4v-7.16c0-1.71-.03-3.91-2.38-3.91-2.39 0-2.75 1.86-2.75 3.78V24h-4V8z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </section>

            {/* Oferta – skróty */}
            <nav aria-labelledby="footer-offer" className="mt-2">
              <h2
                id="footer-offer"
                className="text-white text-sm font-semibold uppercase tracking-wider mb-4"
              >
                Our offer
              </h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    className="hover:text-white hover:underline"
                    href="/offer"
                  >
                    WWW websites
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white hover:underline"
                    href="/offer"
                  >
                    E-commerce platforms
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white hover:underline"
                    href="/offer"
                  >
                    Landing pages
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white hover:underline"
                    href="/offer"
                  >
                    Web applications
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Kontakt */}
            <section aria-labelledby="footer-contact" className="mt-2">
              <h2
                id="footer-contact"
                className="text-white text-sm font-semibold uppercase tracking-wider mb-4"
              >
                Contact us
              </h2>
              <address className="not-italic text-gray-300 text-sm space-y-2">
                <p>
                  <span className="sr-only">Adres:</span>
                  Coolweb
                  <br />
                  8:00 - 19:00
                </p>
                <p>
                  <span className="sr-only">Telephone:</span>
                  <a
                    className="hover:text-white hover:underline"
                    href="tel:+48602404988"
                  >
                    +48 602 404 98
                  </a>
                </p>
                <p>
                  <span className="sr-only">E-mail:</span>
                  <a
                    className="hover:text-white hover:underline"
                    href="mailto:biuro@coolweb.com.pl"
                  >
                    biuro@coolweb.com.pl
                  </a>
                </p>
              </address>
            </section>
          </div>

          {/* Dolny pasek */}
          <div className="w-full border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-gray-400 text-sm gap-4">
            <p>© {year} Coolweb. All rights reserved.</p>
            <ul className="flex items-center gap-4" aria-label="Linki w stopce">
              <li>
                <a
                  className="hover:text-white hover:underline"
                  href="mailto:biuro@coolweb.com.pl"
                >
                  biuro@coolweb.com.pl
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Suspense>
    </footer>
  );
}
