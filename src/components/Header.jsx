// src/components/Header.jsx
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="w-full relative">
      {/* Cyberpunk overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/5 to-transparent z-10"></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan-line z-10"></div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 animate-neon-flicker z-20"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-fuchsia-400 animate-neon-flicker delay-300 z-20"></div>

      {/* Desktop/tablette */}
      <div className="relative w-full h-[180px] md:h-[320px] hidden sm:block">
        {/* <Image
          src="/gog.com-summer-sale.jpg"
          alt="Summer Sale Banner Desktop"
          fill
          sizes="auto"
          className="object-cover w-full h-full"
          priority
        /> */}

        {/* Cyberpunk text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 neon-text">
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
                CYBER SALE
              </span>
            </h1>
            <p className="text-cyan-300 text-lg md:text-xl font-mono tracking-wider animate-neon-flicker">
              <span className="text-fuchsia-400">[</span>
              HACK THE PRICES • DOMINATE THE MARKET
              <span className="text-purple-400">]</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative w-full h-[320px] sm:hidden">
        <Image
          src="/gog.com-summer-sale-mobile.jpg"
          alt="Summer Sale Banner Mobile"
          fill
          sizes="auto"
          className="object-cover w-full h-full"
          priority
        />

        {/* Cyberpunk text overlay for mobile */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-3xl font-black mb-3 neon-text">
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
                CYBER SALE
              </span>
            </h1>
            <p className="text-cyan-300 text-sm font-mono tracking-wider animate-neon-flicker">
              <span className="text-fuchsia-400">[</span>
              HACK THE PRICES
              <span className="text-purple-400">]</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
