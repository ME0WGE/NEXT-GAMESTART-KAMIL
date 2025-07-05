"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarNavLinks } from "./NavLinks/NavbarNavLinks";
import navbar_data from "./data.json";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu, { MobileMenuNavLinks } from "./Menu/MobileMenu";

export default function Navbar() {
  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle Search
  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  // Focus on search input when search is open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when click outside of its body
  const handleSearchBlur = (e) => {
    setTimeout(() => setIsSearchOpen(false), 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl shadow-2xl border-b border-cyan-500/30">
        {/* Cyberpunk background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan-line"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="group">
                <div className="relative">
                  <Image
                    src="/gamestart-2.png"
                    width={80}
                    height={80}
                    alt="GameStart logo"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Neon glow effect on logo */}
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block ml-10 items-baseline space-x-8">
              <NavbarNavLinks
                links={navbar_data || []}
                toggleMenu={toggleMenu}
              />
            </div>

            {/* Desktop Menu*/}
            <div className="hidden md:flex items-center space-x-4">
              <DesktopMenu
                isSearchOpen={isSearchOpen}
                handleSearchClick={handleSearchClick}
                handleSearchBlur={handleSearchBlur}
                searchInputRef={searchInputRef}
              />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </div>
          </div>

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <MobileMenuNavLinks
              links={navbar_data || []}
              toggleMenu={toggleMenu}
            />
          )}
        </div>

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 animate-neon-flicker"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-fuchsia-400 animate-neon-flicker delay-300"></div>
      </nav>
    </>
  );
}
