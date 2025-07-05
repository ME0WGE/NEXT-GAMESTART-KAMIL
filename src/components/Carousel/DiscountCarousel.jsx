"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameSkeleton } from "@/components/Carousel/placeholder/GameSkeleton";
import { useDiscountedGames } from "@/lib/hooks/useDiscountedGames";
import GameCard from "@/components/Carousel/GameCard";

{
  /* --------------------------------------------------------------------|
    --------------------------- DiscountCarousel ---------------------------|
  */
}
export default function DiscountCarousel() {
  const { discountedGames, loading, error } = useDiscountedGames();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (loading || discountedGames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % discountedGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [discountedGames.length, loading]);

  // Navigation functions
  const handleNext = () => {
    if (loading || discountedGames.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % discountedGames.length);
  };

  const handlePrev = () => {
    if (loading || discountedGames.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + discountedGames.length) % discountedGames.length
    );
  };

  // Computed values
  const currentGame = discountedGames[currentIndex];
  const nextGame = discountedGames[(currentIndex + 1) % discountedGames.length];
  const prevGame =
    discountedGames[
      (currentIndex - 1 + discountedGames.length) % discountedGames.length
    ];

  return (
    <>
      {/* --------------------------------------------------------------------|
        --------------------------- Discounts -----------------------------|
      */}
      <div className="text-white min-h-screen relative">
        <div className="px-4 md:px-8 lg:px-16 py-8">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent tracking-wider uppercase neon-text">
            <span className="text-cyan-400">[</span>
            CYBER PROMOTIONS
            <span className="text-purple-400">]</span>
          </h2>

          {/* --------------------------------------------------------------------|
            --------------------- Mobile Layout - Vertical Stack----------------|
          */}
          <div className="relative">
            {/* --------------------------------------------------------------------|
              --------------------- Next Element (Top) ---------------------------|
            */}
            <div className="block md:hidden space-y-4">
              <div className="w-full">
                <div
                  className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 border border-cyan-500/30 hover:border-fuchsia-500/50"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  )}

                  <div className="absolute top-2 left-2 text-xs text-cyan-300 font-mono">
                    <span className="text-fuchsia-400">[</span>
                    NEXT
                    <span className="text-purple-400">]</span>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Main Content (Center) ------------------------|
              */}
              <div className="w-full">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 relative overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
                  {/* Cyberpunk background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

                  {loading ? (
                    <GameSkeleton
                      size="default"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={currentGame}
                      size="default"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                      showDiscount={true}
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Previous Element (Bottom) --------------------|
              */}
              <div className="w-full">
                <div
                  className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 border border-cyan-500/30 hover:border-fuchsia-500/50"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  )}
                  <div className="absolute top-2 left-2 text-xs text-cyan-300 font-mono">
                    <span className="text-fuchsia-400">[</span>
                    PREV
                    <span className="text-purple-400">]</span>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Mobile Navigation Arrows ---------------------|
              */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={loading}
                  className={`text-white p-3 rounded-full transition-colors duration-200 border border-cyan-400/50 hover:border-fuchsia-400/50 ${
                    loading
                      ? "bg-slate-800 cursor-not-allowed"
                      : "bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90"
                  }`}>
                  <ChevronLeft size={20} className="text-cyan-400" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`text-white p-3 rounded-full transition-colors duration-200 border border-cyan-400/50 hover:border-fuchsia-400/50 ${
                    loading
                      ? "bg-slate-800 cursor-not-allowed"
                      : "bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90"
                  }`}>
                  <ChevronRight size={20} className="text-cyan-400" />
                </button>
              </div>
            </div>

            {/* --------------------------------------------------------------------|
              ------------ Desktop Layout - Positioned Elements ------------------|
            */}
            <div className="hidden md:block relative h-[500px] lg:h-[600px]">
              {/* Main Content (Center) */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-16 lg:px-24">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-6 w-full max-w-2xl relative overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
                  {/* Cyberpunk background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

                  {loading ? (
                    <GameSkeleton
                      size="large"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={currentGame}
                      size="large"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                      showDiscount={true}
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Previous Element (Bottom Left) -----------------|
            */}
              <div className="absolute bottom-12 left-0 z-5 w-64 lg:w-80">
                <div
                  className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 hover:border-fuchsia-500/50"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Next Element (Top Right) -----------------------|
            */}
              <div className="absolute top-12 right-0 z-5 w-64 lg:w-80">
                <div
                  className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 hover:border-fuchsia-500/50"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-900/90 backdrop-blur-xl rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Desktop Navigation Arrows ----------------------|
            */}
              <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={handlePrev}
                  disabled={loading}
                  className={`pointer-events-auto text-white p-4 rounded-full transition-colors duration-200 transform -translate-x-2 border border-cyan-400/50 hover:border-fuchsia-400/50 ${
                    loading
                      ? "bg-slate-800 cursor-not-allowed"
                      : "bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90"
                  }`}>
                  <ChevronLeft size={24} className="text-cyan-400" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`pointer-events-auto text-white p-4 rounded-full transition-colors duration-200 transform translate-x-2 border border-cyan-400/50 hover:border-fuchsia-400/50 ${
                    loading
                      ? "bg-slate-800 cursor-not-allowed"
                      : "bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90"
                  }`}>
                  <ChevronRight size={24} className="text-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
