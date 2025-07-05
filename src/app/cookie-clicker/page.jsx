"use client";

import { buyUpgrade, clickCookie } from "@/lib/features/clickerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Upgrade from "@/components/cookie-clicker/Upgrade";
import upgrades from "@/components/cookie-clicker/data.json";
import StatsBar from "@/components/cookie-clicker/StatsBar";
import Header from "@/components/cookie-clicker/CookieHeader";
import MainButton from "@/components/cookie-clicker/MainButton";
import { CookieIcon } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,165,0,0.05),transparent_50%)]"></div>

      <div className="container mx-auto px-4 py-8 pt-20 relative z-10">
        {/* Header */}
        <Header
          title="Cookie Clicker"
          description="Cliquez sur le cookie pour gagner des points et achetez des améliorations pour augmenter votre production !"
        />

        {/* Stats Bar */}
        <StatsBar clicker={clicker} />

        {/* Main Cookie */}
        <MainButton
          handleCookieClick={handleCookieClick}
          icon={<CookieIcon size={120} />}
        />

        {/* Upgrades Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Améliorations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Upgrade
              upgrades={upgrades}
              clicker={clicker}
              handleBuyUpgrade={handleBuyUpgrade}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
