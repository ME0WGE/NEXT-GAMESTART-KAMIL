"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Percent } from "lucide-react";
import { GameSkeleton } from "@/components/Carousel/placeholder/GameSkeleton";
import { useDiscountedGames } from "@/lib/hooks/useDiscountedGames";
import GameCard from "@/components/Carousel/GameCard";

export default function DiscountCarousel() {
  const { discountedGames, loading, error } = useDiscountedGames();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Auto-slide effect
  useEffect(() => {
    if (loading || discountedGames.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [discountedGames.length, loading, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        carouselRef.current &&
        carouselRef.current.contains(document.activeElement)
      ) {
        if (e.key === "ArrowLeft") {
          handlePrev();
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          handleNext();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, discountedGames.length]);

  // Navigation functions with animation
  const handleNext = () => {
    if (loading || discountedGames.length === 0 || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % discountedGames.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (loading || discountedGames.length === 0 || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + discountedGames.length) % discountedGames.length
      );
      setIsAnimating(false);
    }, 300);
  };

  // Computed values
  const currentGame = discountedGames[currentIndex];
  const nextGame = discountedGames[(currentIndex + 1) % discountedGames.length];
  const prevGame =
    discountedGames[
      (currentIndex - 1 + discountedGames.length) % discountedGames.length
    ];

  // Pagination indicators
  const renderPaginationDots = () => {
    if (!discountedGames.length) return null;

    return (
      <div className="flex justify-center gap-2 mt-4 md:mt-6">
        {discountedGames.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              currentIndex === index
                ? "bg-yellow-400 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={carouselRef}
      className="bg-slate-900 text-white min-h-screen"
      tabIndex="0"
      aria-roledescription="carousel"
      aria-label="Featured games with 30% discount">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
            Promotions
          </h2>
          <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
            <Percent size={16} className="mr-1" />
            <span className="font-bold">-30%</span>
          </div>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="relative">
          <div className="block md:hidden space-y-4">
            <div className="w-full">
              <div
                className={`bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={handleNext}
                aria-label="Next slide">
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

            {/* Main Content (Center) */}
            <div className="w-full">
              <div
                className={`bg-slate-800 rounded-lg p-4 relative overflow-hidden border-2 border-yellow-400/30 shadow-lg shadow-yellow-400/10 ${
                  isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
                } transition-all duration-300`}>
                {loading ? (
                  <GameSkeleton
                    size="default"
                    className="bg-slate-800 rounded-lg"
                  />
                ) : (
                  <>
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full z-10 shadow-lg transform rotate-3 animate-pulse">
                      <span className="font-bold">-30%</span>
                    </div>
                    <GameCard
                      game={currentGame}
                      size="default"
                      className="bg-slate-800 rounded-lg"
                      showDiscount={true}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Previous Element (Bottom) */}
            <div className="w-full">
              <div
                className={`bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={handlePrev}
                aria-label="Previous slide">
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

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handlePrev}
                disabled={loading || isAnimating}
                aria-label="Previous slide"
                className={`text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  loading || isAnimating
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={loading || isAnimating}
                aria-label="Next slide"
                className={`text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  loading || isAnimating
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronRight size={20} />
              </button>
            </div>

            {renderPaginationDots()}
          </div>

          {/* Desktop Layout - Positioned Elements */}
          <div className="hidden md:block relative h-[500px] lg:h-[600px]">
            {/* Main Content (Center) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-16 lg:px-24">
              <div
                className={`bg-slate-800 rounded-lg p-6 w-full max-w-2xl relative overflow-hidden border-2 border-yellow-400/30 shadow-xl shadow-yellow-400/10 ${
                  isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
                } transition-all duration-300`}>
                {loading ? (
                  <GameSkeleton
                    size="large"
                    className="bg-slate-800 rounded-lg"
                  />
                ) : (
                  <>
                    <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full z-10 shadow-lg transform rotate-3 animate-pulse">
                      <div className="flex items-center">
                        <Percent size={20} className="mr-1" />
                        <span className="font-bold text-xl">-30%</span>
                      </div>
                    </div>
                    <GameCard
                      game={currentGame}
                      size="large"
                      className="bg-slate-800 rounded-lg"
                      showDiscount={true}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Previous Element (Bottom Left) */}
            <div className="absolute bottom-12 left-0 z-5 w-64 lg:w-80">
              <div
                className={`bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={handlePrev}
                aria-label="Previous slide">
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

            {/* Next Element (Top Right) */}
            <div className="absolute top-12 right-0 z-5 w-64 lg:w-80">
              <div
                className={`bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={handleNext}
                aria-label="Next slide">
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

            {/* Desktop Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-20">
              <button
                onClick={handlePrev}
                disabled={loading || isAnimating}
                aria-label="Previous slide"
                className={`pointer-events-auto text-white p-4 rounded-full transition-all duration-200 transform -translate-x-2 hover:-translate-x-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  loading || isAnimating
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={loading || isAnimating}
                aria-label="Next slide"
                className={`pointer-events-auto text-white p-4 rounded-full transition-all duration-200 transform translate-x-2 hover:translate-x-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  loading || isAnimating
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronRight size={24} />
              </button>
            </div>

            {renderPaginationDots()}
          </div>
        </div>
      </div>
    </div>
  );
}
