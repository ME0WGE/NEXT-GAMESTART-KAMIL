"use client";

import { buyUpgrade, clickCookie } from "@/lib/features/clickerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Upgrade from "@/components/cookie-clicker/Upgrade";
import { HelpCircle } from "lucide-react";
import upgrades from "@/components/cookie-clicker/upgrade.json";

export default function CookieClicker() {
  const clicker = useSelector((state) => state.clicker);
  const dispatch = useDispatch();

  // Increment cookies per second
  useEffect(() => {
    const interval = setInterval(() => {
      if (clicker.cookiesPerSecond > 0) {
        dispatch(clickCookie(clicker.cookiesPerSecond));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clicker.cookiesPerSecond, dispatch]);

  const handleCookieClick = () => {
    dispatch(clickCookie());
  };

  const handleBuyUpgrade = (upgrade) => {
    dispatch(buyUpgrade(upgrade));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            🍪 Cookie Clicker
          </h1>
          <p className="text-gray-300 text-lg">
            Cliquez sur le cookie pour gagner des points !
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm font-medium">Cookies</p>
              <p className="text-3xl font-bold text-yellow-400">
                {clicker.cookies}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Par seconde</p>
              <p className="text-3xl font-bold text-green-400">
                {clicker.cookiesPerSecond}
              </p>
            </div>
            <div className="absolute right-0 top-0 text-yellow-300">
              <HelpCircle size={35} className="cursor-help" />
            </div>
          </div>
        </div>

        {/* Main Cookie */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleCookieClick}
            className="group relative transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center text-6xl transform transition-all duration-200 hover:shadow-yellow-400/25 hover:shadow-3xl">
              🍪
            </div>
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Upgrades Section */}
        {upgrades.map((upgrade) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            key={upgrade.id}>
            <Upgrade
              cookies={clicker.cookies}
              handleBuyUpgrade={handleBuyUpgrade}
              upgrade_name={upgrade.name}
              upgrade_price={upgrade.price}
              upgrade_value={upgrade.value}
              upgrade_icon={upgrade.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
