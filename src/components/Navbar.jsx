"use client";

import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 sm:bg-slate-900/70 backdrop-blur-md shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo/Company Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">GameStart</h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#store"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Store
              </a>
              <a
                href="#library"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Ma bilbiothèque
              </a>
              <a
                href="#account"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Mon Compte
              </a>
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200">
              <ShoppingCart size={20} />
            </button>
            <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200">
              <User size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 p-2 rounded-full transition-all duration-200">
              <ShoppingCart size={20} />
            </button>
            <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 p-2 rounded-full transition-all duration-200">
              <User size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-md transition-all duration-200">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/50 rounded-lg mt-2">
              <a
                href="#store"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Store
              </a>
              <a
                href="#library"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Mes jeux
              </a>
              <a
                href="#account"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Compte
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
