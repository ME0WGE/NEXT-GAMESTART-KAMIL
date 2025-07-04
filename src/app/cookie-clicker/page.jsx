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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <Header
          title="🍪 Cookie Clicker"
          description="Cliquez sur le cookie pour gagner des points !"
        />

        {/* Stats Bar */}
        <StatsBar clicker={clicker} />

        {/* Main Cookie */}
        <MainButton
          handleCookieClick={handleCookieClick}
          icon={<CookieIcon size={110} />}
        />

        {/* Upgrades Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Upgrade
            upgrades={upgrades}
            clicker={clicker}
            handleBuyUpgrade={handleBuyUpgrade}
          />
        </div>
      </div>
    </div>
  );
}
