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
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="px-4 md:px-8 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Promotions
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
                  className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}

                  <div className="absolute top-2 left-2 text-xs text-slate-400">
                    Next
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Main Content (Center) ------------------------|
              */}
              <div className="w-full">
                <div className="bg-slate-800 rounded-lg p-4 relative overflow-hidden border-2 border-yellow-400/30">
                  {loading ? (
                    <GameSkeleton
                      size="default"
                      className="bg-slate-800 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={currentGame}
                      size="default"
                      className="bg-slate-800 rounded-lg"
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
                  className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}
                  <div className="absolute top-2 left-2 text-xs text-slate-400">
                    Previous
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
                  className={`text-white p-3 rounded-full transition-colors duration-200 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  }`}>
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`text-white p-3 rounded-full transition-colors duration-200 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  }`}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* --------------------------------------------------------------------|
              ------------ Desktop Layout - Positioned Elements ------------------|
            */}
            <div className="hidden md:block relative h-[500px] lg:h-[600px]">
              {/* Main Content (Center) */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-16 lg:px-24">
                <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl relative overflow-hidden border-2 border-yellow-400/30">
                  {loading ? (
                    <GameSkeleton
                      size="large"
                      className="bg-slate-800 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={currentGame}
                      size="large"
                      className="bg-slate-800 rounded-lg"
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
                  className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Next Element (Top Right) -----------------------|
            */}
              <div className="absolute top-12 right-0 z-5 w-64 lg:w-80">
                <div
                  className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
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
                  className={`pointer-events-auto text-white p-4 rounded-full transition-colors duration-200 transform -translate-x-2 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  }`}>
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`pointer-events-auto text-white p-4 rounded-full transition-colors duration-200 transform translate-x-2 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  }`}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
