"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useDimensions from "react-cool-dimensions";
import arrayCeil from "../../lib/arrayCeil";
import { fetchHero } from "../../lib/api";

export default function Hero() {
  const [heroImage, setHeroImage] = useState("hero-1920.jpg");
  const imageSizes = [600, 1280, 1920];

  const [hero, setHero] = useState({ main_title: "", tiles: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchHero();
        if (!cancelled) setHero(data ?? { main_title: "", tiles: [] });
      } catch (e) {
        if (!cancelled) setHero({ main_title: "", tiles: [] });
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("fetchHero failed", e);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { observe } = useDimensions({
    onResize: ({ observe, unobserve, width }) => {
      setHeroImage(`hero-${arrayCeil(imageSizes, width)}.jpg`);
      // Reconnect observer to keep measurements fresh
      unobserve();
      observe();
    },
  });

  return (
    <div
      ref={observe}
      className="w-full h-screen flex justify-center items-center overflow-hidden relative bg-black"
    >
      <Image
        src={`/images/${heroImage}`}
        alt="Hero Image"
        className="opacity-60 object-cover"
        fill
      />
      <section className="max-w-5xl mx-auto z-10 text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">
          {hero.main_title || ""}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hero.tiles && hero.tiles.length > 0 ? (
            hero.tiles.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border p-4 bg-white/50 flex justify-center flex-col align-middle ml-2 mr-2"
              >
                <div className="text-sm text-gray-500 mb-2 flex justify-center">
                  <Image
                    src={`/images/${t.icon}`}
                    alt={t.icon}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.title}</h3>
              </div>
            ))
          ) : (
            <div className="text-gray-500">
              {isLoading ? "Loading hero..." : "There is no hero data"}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
