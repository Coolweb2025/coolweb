import { Suspense } from "react";
import Link from "next/link";
import Header from "./globals/header";
import Footer from "./globals/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading 404 page...</p>}>
        <main
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "70vh",
            maxWidth: "98%",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Ooopssss... The page you are looking for is missing...
            </h1>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              Try to go to the main page ;)
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.25rem",
                background: "#111",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
