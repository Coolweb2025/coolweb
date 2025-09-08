"use client";

import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      type Resp = { status?: string; message?: string; error?: string };
      let data: Resp = {};
      try {
        data = (await res.json()) as Resp;
      } catch {
        data = {};
      }

      if (!res.ok) {
        const msg = (data && (data.error as string)) || "Subscription failed";
        throw new Error(msg);
      }

      setSuccess(
        (data && (data.message as string)) || "Thank you for your subscription"
      );
      setEmail("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "We have some problems with singing up your email";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <div className="mb-3 rounded-md bg-green-50 p-3 text-green-800 border border-green-200">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-3 rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row gap-2 max-w-sm"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 border rounded-md px-3 py-2 text-sm bg-white/90 text-black focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white text-sm whitespace-nowrap focus:outline-none focus:ring focus:ring-blue-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-teal-400 hover:bg-teal-600"
          }`}
        >
          {loading ? "Saving…" : "Subscribe"}
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2 max-w-sm">
        By signing up, you accept our{" "}
        <a href="/privacy-policy">privacy policy</a>. You can unsubscribe at any
        time.
      </p>
    </div>
  );
}
