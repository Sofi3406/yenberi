// Improved Landing Page with Sliding Image Carousel
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const message = `በደራሲ ዴልታ መሀመድ የተፀፈው የሻይድ መፃፍ ሽያጭ ... (trimmed for clarity)`;

  const sliderImages = [
    '/images/dorm.jpg',
    '/images/hayrenStudent.jpg',
    '/images/dorm.jpg',
    '/images/hayrenStudent.jpg',
    '/images/dorm.jpg'
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <Link href="/">
          <Image src="/image/logo.svg" alt="SLMA" width={150} height={50} />
        </Link>

        <nav className="flex gap-6 text-gray-800 font-medium">
          <Link href="/auth/register">Register</Link>
          <Link href="/auth/login">Login</Link>
          <Link href="/about-silte">About</Link>
          <Link href="/donate">Donate</Link>
        </nav>
      </header>

      <main className="font-sans bg-gray-50 min-h-screen pb-20">
        <div className="max-w-6xl mx-auto p-6">
          {/* HERO + SLIDER */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-10">
            {/* LEFT TEXT BOX */}
            <article className="bg-white p-6 rounded-xl shadow-lg">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">SLMA Development News</h1>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[16px]">{message}</p>

              <div className="mt-6">
                <Link href="/auth/register">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg shadow-md transition">
                    Create Account →
                  </button>
                </Link>
              </div>
            </article>

            {/* RIGHT IMAGE SLIDER */}
            <aside className="relative w-full h-[330px] rounded-xl overflow-hidden shadow-xl">
              {sliderImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="slide image"
                  fill
                  className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
                    index === current ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </aside>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6 text-gray-600 mt-10">
        <div>© {new Date().getFullYear()} SLMA. All rights reserved.</div>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}