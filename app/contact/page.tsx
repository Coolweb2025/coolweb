"use client";

import React, { useState } from "react";
import Header from "../globals/header";
import Footer from "../globals/footer";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        throw new Error(
          (data && (data.error as string)) || "Failed to send message"
        );
      }

      setSuccess(
        (data.message as string) ||
          "Dziękujemy! Twoja wiadomość została wysłana :)"
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Wystąpił błąd podczas wysyłki");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="font-sans max-w-2xl w-full mx-auto p-8 sm:p-12">
        <h1 className="text-2xl font-semibold mb-6">Contact us</h1>
        <span>
          You can contact us in few ways: using our phone{" "}
          <a href="tel:+48602404988">+48 602 404 988</a> or by email{" "}
          <a href="mailto:biuro@coolweb.com.pl">biuro@coolweb.com.pl</a>
        </span>
        <br />
        <br />
        <span>Or You can use our contact form</span>
        <br />
        <br />

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800 border border-green-200">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800 border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 rounded-md text-white focus:outline-none focus:ring focus:ring-blue-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-teal-400 hover:bg-teal-600"
              }`}
            >
              {loading ? "Sending…" : "Send email"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
