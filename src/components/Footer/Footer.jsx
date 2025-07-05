"use client";

import Link from "next/link";
import { useState } from "react";
import CopyrightDisclaimer from "./CopyrightDisclaimer/CopyrightDisclaimer";
import FooterNavLinks from "./NavLinks/FooterNavLinks";
import Newsletter from "./Newsletter/Newsletter";
import footer_data from "./data.json";

export default function Footer() {
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2500);
  };

  return (
    <>
      <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Cyberpunk background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:30px_30px]"></div>

        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan-line"></div>

        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 relative z-10">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 pr-12 transition-all duration-100 translate-y-8">
              <Link href={"/"} className="flex items-center group">
                <span className="self-center text-2xl font-black whitespace-nowrap text-white tracking-wider neon-text">
                  <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                    GAMESTART™
                  </span>
                </span>
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-0">
              <FooterNavLinks links={footer_data} />

              <Newsletter
                handleNewsletter={handleNewsletter}
                newsletterSuccess={newsletterSuccess}
              />
            </div>
          </div>
          <hr className="my-6 border-cyan-500/30 sm:mx-auto lg:my-8" />
          <CopyrightDisclaimer />
        </div>

        {/* Corner brackets */}
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 animate-neon-flicker"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-fuchsia-400 animate-neon-flicker delay-300"></div>
      </footer>
    </>
  );
}
